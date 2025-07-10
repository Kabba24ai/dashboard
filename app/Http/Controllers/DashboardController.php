<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index()
    {
        $taskData = $this->getTaskData();
        $salesData = $this->getSalesData();
        $categoryData = $this->getCategoryData();
        $productData = $this->getProductData();

        return view('dashboard.index', compact('taskData', 'salesData', 'categoryData', 'productData'));
    }

    public function getSalesData(Request $request): JsonResponse
    {
        $period = $request->get('period', 'rolling30');
        
        $salesData = [
            'rolling30' => [
                ['date' => '6/1', 'current' => 8500, 'previous' => 7200],
                ['date' => '6/2', 'current' => 12500, 'previous' => 9800],
                ['date' => '6/3', 'current' => 15200, 'previous' => 11200],
                ['date' => '6/4', 'current' => 9800, 'previous' => 8500],
                ['date' => '6/5', 'current' => 18500, 'previous' => 14200],
                ['date' => '6/6', 'current' => 22000, 'previous' => 18500],
                ['date' => '6/7', 'current' => 25500, 'previous' => 21000],
                ['date' => '6/8', 'current' => 19200, 'previous' => 16800],
                ['date' => '6/9', 'current' => 13500, 'previous' => 12100],
                ['date' => '6/10', 'current' => 16800, 'previous' => 14500],
                ['date' => '6/11', 'current' => 14200, 'previous' => 13200],
                ['date' => '6/12', 'current' => 19500, 'previous' => 17200],
                ['date' => '6/13', 'current' => 28000, 'previous' => 24500],
                ['date' => '6/14', 'current' => 31500, 'previous' => 27800],
                ['date' => '6/15', 'current' => 29200, 'previous' => 25200],
                ['date' => '6/16', 'current' => 17500, 'previous' => 15800],
                ['date' => '6/17', 'current' => 12800, 'previous' => 11500],
                ['date' => '6/18', 'current' => 15200, 'previous' => 13800],
                ['date' => '6/19', 'current' => 18500, 'previous' => 16200],
                ['date' => '6/20', 'current' => 22800, 'previous' => 19500],
                ['date' => '6/21', 'current' => 26500, 'previous' => 23200],
                ['date' => '6/22', 'current' => 24200, 'previous' => 21800],
                ['date' => '6/23', 'current' => 16800, 'previous' => 14500],
                ['date' => '6/24', 'current' => 13500, 'previous' => 12200],
                ['date' => '6/25', 'current' => 17200, 'previous' => 15500],
                ['date' => '6/26', 'current' => 20500, 'previous' => 18200],
                ['date' => '6/27', 'current' => 35000, 'previous' => 31500],
                ['date' => '6/28', 'current' => 38500, 'previous' => 34200],
                ['date' => '6/29', 'current' => 32500, 'previous' => 28800],
                ['date' => '6/30', 'current' => 21500, 'previous' => 19200]
            ],
            'currentMonth' => [
                ['date' => 'Week 1', 'current' => 45000, 'previous' => 42000],
                ['date' => 'Week 2', 'current' => 52000, 'previous' => 48000],
                ['date' => 'Week 3', 'current' => 48000, 'previous' => 51000],
                ['date' => 'Week 4', 'current' => 55000, 'previous' => 47000]
            ],
            'lastMonth' => [
                ['date' => 'Week 1', 'current' => 42000, 'previous' => 38000],
                ['date' => 'Week 2', 'current' => 48000, 'previous' => 44000],
                ['date' => 'Week 3', 'current' => 51000, 'previous' => 46000],
                ['date' => 'Week 4', 'current' => 47000, 'previous' => 43000]
            ],
            'currentYear' => [
                ['date' => 'Jan', 'current' => 180000, 'previous' => 165000],
                ['date' => 'Feb', 'current' => 195000, 'previous' => 172000],
                ['date' => 'Mar', 'current' => 210000, 'previous' => 188000],
                ['date' => 'Apr', 'current' => 225000, 'previous' => 195000],
                ['date' => 'May', 'current' => 240000, 'previous' => 208000],
                ['date' => 'Jun', 'current' => 255000, 'previous' => 220000]
            ],
            'lastYear' => [
                ['date' => 'Jan', 'current' => 165000, 'previous' => 150000],
                ['date' => 'Feb', 'current' => 172000, 'previous' => 158000],
                ['date' => 'Mar', 'current' => 188000, 'previous' => 175000],
                ['date' => 'Apr', 'current' => 195000, 'previous' => 182000],
                ['date' => 'May', 'current' => 208000, 'previous' => 195000],
                ['date' => 'Jun', 'current' => 220000, 'previous' => 205000]
            ],
            'yearComparison' => [
                ['date' => 'Jan', 'current' => 180000, 'previous' => 165000],
                ['date' => 'Feb', 'current' => 195000, 'previous' => 172000],
                ['date' => 'Mar', 'current' => 210000, 'previous' => 188000],
                ['date' => 'Apr', 'current' => 225000, 'previous' => 195000],
                ['date' => 'May', 'current' => 240000, 'previous' => 208000],
                ['date' => 'Jun', 'current' => 255000, 'previous' => 220000]
            ]
        ];

        return response()->json($salesData[$period] ?? $salesData['rolling30']);
    }

    public function getCategoryData(Request $request): JsonResponse
    {
        $period = $request->get('period', 'rolling30');
        
        $categoryData = [
            'rolling30' => [
                ['name' => 'Party Supplies', 'sales' => 85000],
                ['name' => 'Wedding Decor', 'sales' => 72000],
                ['name' => 'Corporate Events', 'sales' => 68000],
                ['name' => 'Tables & Chairs', 'sales' => 55000],
                ['name' => 'Audio/Visual', 'sales' => 48000],
                ['name' => 'Linens', 'sales' => 42000],
                ['name' => 'Lighting', 'sales' => 38000],
                ['name' => 'Tents', 'sales' => 35000],
                ['name' => 'Catering Equipment', 'sales' => 32000],
                ['name' => 'Games & Entertainment', 'sales' => 28000]
            ],
            'currentMonth' => [
                ['name' => 'Wedding Decor', 'sales' => 95000],
                ['name' => 'Party Supplies', 'sales' => 88000],
                ['name' => 'Tables & Chairs', 'sales' => 75000],
                ['name' => 'Corporate Events', 'sales' => 62000],
                ['name' => 'Audio/Visual', 'sales' => 58000],
                ['name' => 'Linens', 'sales' => 45000],
                ['name' => 'Lighting', 'sales' => 42000],
                ['name' => 'Tents', 'sales' => 38000],
                ['name' => 'Catering Equipment', 'sales' => 35000],
                ['name' => 'Games & Entertainment', 'sales' => 32000]
            ],
            // Add other periods...
        ];

        return response()->json($categoryData[$period] ?? $categoryData['rolling30']);
    }

    public function getProductData(Request $request): JsonResponse
    {
        $period = $request->get('period', 'rolling30');
        
        $productData = [
            'rolling30' => [
                ['name' => 'Round Table (8-seat)', 'sales' => 25000],
                ['name' => 'White Chiavari Chair', 'sales' => 22000],
                ['name' => 'Dance Floor (20x20)', 'sales' => 18000],
                ['name' => 'LED Uplighting', 'sales' => 15000],
                ['name' => 'White Tablecloth', 'sales' => 12000],
                ['name' => 'Wireless Microphone', 'sales' => 11000],
                ['name' => 'Cocktail Table', 'sales' => 9500],
                ['name' => 'Projector & Screen', 'sales' => 8500],
                ['name' => 'Centerpiece (Gold)', 'sales' => 7200],
                ['name' => 'Photo Booth Props', 'sales' => 6800]
            ],
            // Add other periods...
        ];

        return response()->json($productData[$period] ?? $productData['rolling30']);
    }

    private function getTaskData()
    {
        return [
            'deliveriesTruck' => ['due' => 0, 'completed' => 15],
            'deliveriesStore' => ['due' => 3, 'completed' => 8],
            'returnsTruck' => ['due' => 2, 'completed' => 12],
            'returnsStore' => ['due' => 1, 'completed' => 6],
            'maintenanceHold' => ['due' => 4, 'completed' => 3],
            'damaged' => ['due' => 1, 'completed' => 2],
            'tasksOverdue' => ['due' => 2, 'completed' => 0],
            'tasksDue' => ['due' => 5, 'completed' => 18]
        ];
    }

    private function getSalesData()
    {
        return [
            'rolling30' => [
                ['date' => '6/1', 'current' => 8500, 'previous' => 7200],
                ['date' => '6/2', 'current' => 12500, 'previous' => 9800],
                // Add more data points...
            ]
        ];
    }

    private function getCategoryData()
    {
        return [
            'rolling30' => [
                ['name' => 'Party Supplies', 'sales' => 85000],
                ['name' => 'Wedding Decor', 'sales' => 72000],
                // Add more categories...
            ]
        ];
    }

    private function getProductData()
    {
        return [
            'rolling30' => [
                ['name' => 'Round Table (8-seat)', 'sales' => 25000],
                ['name' => 'White Chiavari Chair', 'sales' => 22000],
                // Add more products...
            ]
        ];
    }
}