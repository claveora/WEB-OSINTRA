<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Division;
use App\Models\Proker;
use App\Models\Message;
use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    /**
     * Get dashboard statistics.
     */
    public function index()
    {
        // Basic counts
        $stats = [
            'total_users' => User::where('status', 'active')->count(),
            'total_divisions' => Division::count(),
            'total_prokers' => Proker::count(),
            'unread_messages' => Message::where('status', 'unread')->count(),
        ];

        // Financial stats
        $income = Transaction::where('type', 'income')->sum('amount');
        $expense = Transaction::where('type', 'expense')->sum('amount');
        $stats['balance'] = (float) ($income - $expense);
        $stats['total_income'] = (float) $income;
        $stats['total_expense'] = (float) $expense;

        // Proker status breakdown
        $stats['proker_status'] = [
            'planned' => Proker::where('status', 'planned')->count(),
            'ongoing' => Proker::where('status', 'ongoing')->count(),
            'done' => Proker::where('status', 'done')->count(),
        ];

        // Recent prokers
        $stats['recent_prokers'] = Proker::with('divisions')
            ->orderBy('date', 'desc')
            ->limit(5)
            ->get();

        // Recent messages
        $stats['recent_messages'] = Message::orderBy('created_at', 'desc')
            ->limit(5)
            ->get();

        // User distribution by division
        $stats['users_by_division'] = Division::withCount('users')
            ->get()
            ->map(function($division) {
                return [
                    'name' => $division->name,
                    'count' => $division->users_count,
                ];
            });

        // Monthly transaction trend (last 6 months)
        $stats['transaction_trend'] = Transaction::select(
                DB::raw('DATE_FORMAT(date, "%Y-%m") as month'),
                DB::raw('SUM(CASE WHEN type = "income" THEN amount ELSE 0 END) as income'),
                DB::raw('SUM(CASE WHEN type = "expense" THEN amount ELSE 0 END) as expense')
            )
            ->where('date', '>=', now()->subMonths(6))
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->map(function($item) {
                return [
                    'month' => $item->month,
                    'income' => (float) $item->income,
                    'expense' => (float) $item->expense,
                ];
            });

        return response()->json($stats);
    }
}
