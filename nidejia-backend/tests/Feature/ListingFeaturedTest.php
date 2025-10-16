<?php

namespace Tests\Feature;

use App\Models\Listing;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Carbon\Carbon;

class ListingFeaturedTest extends TestCase
{
    use RefreshDatabase;

    public function test_parsing_params_defaults_and_limit_capping(): void
    {
        Listing::factory()->count(3)->create();

        $res = $this->getJson('/api/listings');
        $res->assertOk();
        $res->assertJsonStructure([
            'data' => [
                'data',
                'meta' => ['total', 'limit', 'offset']
            ]
        ]);
        $this->assertEquals(0, $res->json('data.meta.offset'));

        // Limit > 50 will be capped
        $res2 = $this->getJson('/api/listings?limit=999');
        $res2->assertOk();
        $this->assertEquals(50, $res2->json('data.meta.limit'));
    }

    public function test_featured_sorted_by_recency_desc(): void
    {
        // Create 3 listings with different created_at
        $l1 = Listing::factory()->create([ 'created_at' => Carbon::now()->subDays(10) ]);
        $l2 = Listing::factory()->create([ 'created_at' => Carbon::now()->subDays(5) ]);
        $l3 = Listing::factory()->create([ 'created_at' => Carbon::now()->subDays(1) ]);

        $res = $this->getJson('/api/listings?featured=true&strategy=score&limit=3&offset=0');
        $res->assertOk();

        $ids = array_column($res->json('data.data'), 'id');
        // Newest first: l3, l2, l1
        $this->assertEquals([$l3->id, $l2->id, $l1->id], $ids);
    }
}


