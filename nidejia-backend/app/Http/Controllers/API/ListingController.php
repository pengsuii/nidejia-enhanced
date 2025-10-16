<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Listing;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Carbon\Carbon;

class ListingController extends Controller
{
    public function index(): JsonResponse
    {
        $listings = Listing::withCount('transaction')
            ->orderBy('transaction_count', 'desc')
            ->paginate();

        return response()->json([
            'success' => true,
            'message' => 'Get all listings',
            'data' => $listings
        ]);
    }

    public function show(Listing $listing): JsonResponse
    {
        return response()->json([
            'success' => true,
            'message' => 'Get detail listing',
            'data' => $listing
        ]);
    }

    /**
     * GET /api/listings
     * Mendukung featured listings on-the-fly tanpa mengubah skema DB.
     * Response schema: { data: { data: [...], meta: { total, limit, offset } } }
     */
    public function indexV2(Request $request): JsonResponse
    {
        // Sanitasi & default params
        $featured = filter_var($request->query('featured', 'false'), FILTER_VALIDATE_BOOLEAN);
        $strategy = $request->query('strategy', 'score');
        $limit = (int) ($request->query('limit', 12));
        $offset = (int) ($request->query('offset', 0));

        if ($limit < 1) { $limit = 12; }
        if ($limit > 50) { $limit = 50; }
        if ($offset < 0) { $offset = 0; }

        if ($featured) {
            // Untuk saat ini hanya support strategy=score
            if ($strategy !== 'score') {
                return response()->json([
                    'success' => false,
                    'message' => 'Unknown strategy',
                ], 400);
            }

            $cacheTtlSeconds = 120; // 60–300 detik, pilih 120 detik untuk MVP
            $cacheKey = sprintf('featured:listings:%s:l%d:o%d', $strategy, $limit, $offset);

            $payload = Cache::remember($cacheKey, $cacheTtlSeconds, function () use ($limit, $offset) {
                // Fallback MVP: skor = recency_boost(created_at) saja.
                // recency_boost(created_at) = exp(-days_since_created/30)
                // Karena monoton terhadap created_at, kita gunakan ORDER BY created_at DESC
                $baseQuery = Listing::query()
                    ->select(['id','title','slug','price_per_day','sqft','max_person','wifi_speed','attachments','created_at'])
                    ->orderBy('created_at', 'desc');

                $total = (clone $baseQuery)->count();

                $items = $baseQuery
                    ->skip($offset)
                    ->take($limit)
                    ->get()
                    ->map(function (Listing $l) {
                        // Hitung skor recency (didokumentasikan untuk referensi masa depan)
                        $days = Carbon::parse($l->created_at)->diffInDays(Carbon::now());
                        $recencyBoost = exp(-$days / 30);
                        // Catatan: rating/popularity belum tersedia → skor menggunakan recency saja.
                        $score = $recencyBoost; // 0..1

                        return [
                            'id' => $l->id,
                            'title' => $l->title,
                            'slug' => $l->slug,
                            'price_per_day' => (int) $l->price_per_day,
                            'sqft' => (int) $l->sqft,
                            'max_person' => (int) $l->max_person,
                            'wifi_speed' => (int) $l->wifi_speed,
                            // attachments sudah di-cast array; pastikan array of string
                            'attachments' => array_values(array_map('strval', (array) ($l->attachments ?? []))),
                            // Tidak diekspose dalam response, hanya digunakan internal: $score
                            // Simpan komentar saja agar jelas rumusnya.
                        ];
                    })->values();

                return [
                    'data' => $items,
                    'meta' => [
                        'total' => $total,
                        'limit' => $limit,
                        'offset' => $offset,
                    ],
                ];
            });

            return response()->json([
                'data' => $payload,
            ]);
        }

        // Non-featured: pertahankan perilaku logika sort existing namun dengan schema baru.
        $baseQuery = Listing::withCount('transaction')
            ->orderBy('transaction_count', 'desc')
            ->select(['id','title','slug','price_per_day','sqft','max_person','wifi_speed','attachments']);

        $total = (clone $baseQuery)->count();

        $items = $baseQuery
            ->skip($offset)
            ->take($limit)
            ->get()
            ->map(function (Listing $l) {
                return [
                    'id' => $l->id,
                    'title' => $l->title,
                    'slug' => $l->slug,
                    'price_per_day' => (int) $l->price_per_day,
                    'sqft' => (int) $l->sqft,
                    'max_person' => (int) $l->max_person,
                    'wifi_speed' => (int) $l->wifi_speed,
                    'attachments' => array_values(array_map('strval', (array) ($l->attachments ?? []))),
                ];
            })->values();

        return response()->json([
            'data' => [
                'data' => $items,
                'meta' => [
                    'total' => $total,
                    'limit' => $limit,
                    'offset' => $offset,
                ],
            ],
        ]);
    }
}