<?php

namespace App\Filament\Widgets;

use App\Models\Listing;
use App\Models\Transaction;
use Carbon\Carbon;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Support\Number;

class StatsOverview extends BaseWidget
{
    protected static ?int $sort = 1;
    protected int|string|array $columnSpan = '12';

    private function getPercentage(int|float $from, int|float $to): float
    {
        // Kalau dua-duanya 0 → tidak ada perubahan
        if ($from === 0 && $to === 0) {
            return 0;
        }

        // Kalau sebelumnya 0, sekarang ada nilai → anggap 100% growth
        if ($from === 0) {
            return 100;
        }

        return (($to - $from) / $from) * 100;
    }

    protected function getStats(): array
    {
        $newListing = Listing::whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year)
            ->count();

        $transactions = Transaction::whereStatus('approved')
            ->whereMonth('created_at', Carbon::now()->month)
            ->whereYear('created_at', Carbon::now()->year);

        $prevTransactions = Transaction::whereStatus('approved')
            ->whereMonth('created_at', Carbon::now()->subMonth()->month)
            ->whereYear('created_at', Carbon::now()->subMonth()->year);

        $transactionPercentage = $this->getPercentage(
            $prevTransactions->count(),
            $transactions->count()
        );

        $revenuePercentage = $this->getPercentage(
            $prevTransactions->sum('total_price'),
            $transactions->sum('total_price')
        );

        return [
            Stat::make('New Listing of the month', $newListing),

            Stat::make('Transaction of the month', $transactions->count())
                ->description($transactionPercentage >= 0 ? "{$transactionPercentage}% increase" : abs($transactionPercentage) . "% decrease")
                ->descriptionIcon($transactionPercentage >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($transactionPercentage >= 0 ? 'success' : 'danger'),

            Stat::make('Revenue of the month', Number::currency($transactions->sum('total_price'), 'USD'))
                ->description($revenuePercentage >= 0 ? "{$revenuePercentage}% increase" : abs($revenuePercentage) . "% decrease")
                ->descriptionIcon($revenuePercentage >= 0 ? 'heroicon-m-arrow-trending-up' : 'heroicon-m-arrow-trending-down')
                ->color($revenuePercentage >= 0 ? 'success' : 'danger'),
        ];
    }
}
