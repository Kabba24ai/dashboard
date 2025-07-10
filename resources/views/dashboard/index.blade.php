@extends('layouts.app')

@section('title', 'Dashboard Overview')

@section('content')
<div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
        <!-- Header -->
        <div class="mb-8">
            <h1 class="text-3xl font-bold text-gray-900 mb-2">Dashboard Overview</h1>
            <p class="text-gray-600">Rental & Sales Management System</p>
        </div>

        <!-- Section 1: Task Badges -->
        <div class="mb-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Block 1: Schedule -->
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
                    <div class="flex items-center mb-4">
                        <i data-lucide="clock" class="w-6 h-6 text-blue-600 mr-3"></i>
                        <h3 class="text-lg font-semibold text-gray-800">Schedule</h3>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        @include('dashboard.partials.task-badge', [
                            'icon' => 'truck',
                            'label' => 'Deliveries - Truck',
                            'due' => $taskData['deliveriesTruck']['due'],
                            'completed' => $taskData['deliveriesTruck']['completed'],
                            'taskType' => 'deliveries-truck',
                            'color' => 'blue'
                        ])
                        @include('dashboard.partials.task-badge', [
                            'icon' => 'store',
                            'label' => 'Deliveries - In Store',
                            'due' => $taskData['deliveriesStore']['due'],
                            'completed' => $taskData['deliveriesStore']['completed'],
                            'taskType' => 'deliveries-store',
                            'color' => 'green'
                        ])
                        @include('dashboard.partials.task-badge', [
                            'icon' => 'truck',
                            'label' => 'Returns - Truck',
                            'due' => $taskData['returnsTruck']['due'],
                            'completed' => $taskData['returnsTruck']['completed'],
                            'taskType' => 'returns-truck',
                            'color' => 'purple'
                        ])
                        @include('dashboard.partials.task-badge', [
                            'icon' => 'store',
                            'label' => 'Returns - In Store',
                            'due' => $taskData['returnsStore']['due'],
                            'completed' => $taskData['returnsStore']['completed'],
                            'taskType' => 'returns-store',
                            'color' => 'indigo'
                        ])
                    </div>
                </div>

                <!-- Block 2: Operations -->
                <div class="bg-white rounded-xl shadow-lg p-6 border border-gray-300">
                    <div class="flex items-center mb-4">
                        <i data-lucide="wrench" class="w-6 h-6 text-orange-600 mr-3"></i>
                        <h3 class="text-lg font-semibold text-gray-800">Operations</h3>
                    </div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        @include('dashboard.partials.task-badge', [
                            'icon' => 'wrench',
                            'label' => 'Maintenance Hold',
                            'due' => $taskData['maintenanceHold']['due'],
                            'completed' => $taskData['maintenanceHold']['completed'],
                            'taskType' => 'maintenance',
                            'color' => 'orange'
                        ])
                        @include('dashboard.partials.task-badge', [
                            'icon' => 'alert-triangle',
                            'label' => 'Damaged Items',
                            'due' => $taskData['damaged']['due'],
                            'completed' => $taskData['damaged']['completed'],
                            'taskType' => 'damaged',
                            'color' => 'red'
                        ])
                        @include('dashboard.partials.task-badge', [
                            'icon' => 'clock',
                            'label' => 'Tasks Overdue',
                            'due' => $taskData['tasksOverdue']['due'],
                            'completed' => $taskData['tasksOverdue']['completed'],
                            'taskType' => 'overdue',
                            'color' => 'red'
                        ])
                        @include('dashboard.partials.task-badge', [
                            'icon' => 'check-circle',
                            'label' => 'Tasks Due Today',
                            'due' => $taskData['tasksDue']['due'],
                            'completed' => $taskData['tasksDue']['completed'],
                            'taskType' => 'due-today',
                            'color' => 'yellow'
                        ])
                    </div>
                </div>
            </div>
        </div>

        <!-- Section 2: Sales Line Chart -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-800">Sales Trend Analysis</h2>
                <div class="flex items-center space-x-2">
                    <button class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                    </button>
                    <button class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <i data-lucide="download" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
            
            <!-- Sales Metrics Cards -->
            <div class="flex justify-center mb-6">
                <div class="flex flex-wrap justify-center gap-4 max-w-5xl" id="sales-metrics">
                    <!-- Metrics will be populated by JavaScript -->
                </div>
            </div>
            
            <!-- Period Selector -->
            <div class="flex space-x-2 mb-4" id="sales-period-selector">
                <button class="period-btn active px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white" data-period="rolling30">Rolling 30 Days</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="currentMonth">Current Month</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="lastMonth">Last Month</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="currentYear">Current Year</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="lastYear">Last Year</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="yearComparison">Year vs Year</button>
            </div>
            
            <div class="relative h-96">
                <canvas id="salesChart"></canvas>
            </div>
            
            <!-- Chart Footer -->
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div class="text-sm text-gray-500" id="last-updated">
                    Last updated: {{ now()->format('M j, Y g:i A') }}
                </div>
                <div class="text-sm text-gray-500" id="data-points">
                    Data points: 30
                </div>
            </div>
        </div>

        <!-- Section 3: Sales by Category Bar Chart -->
        <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-800">Top 10 Categories by Sales</h2>
                <div class="flex items-center space-x-2">
                    <button class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                    </button>
                    <button class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <i data-lucide="download" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
            
            <!-- Category Metrics Cards -->
            <div class="flex justify-center mb-6">
                <div class="flex flex-wrap justify-center gap-4 max-w-5xl" id="category-metrics">
                    <!-- Metrics will be populated by JavaScript -->
                </div>
            </div>
            
            <!-- Period Selector -->
            <div class="flex space-x-2 mb-4" id="category-period-selector">
                <button class="period-btn active px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white" data-period="rolling30">Rolling 30 Days</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="currentMonth">Current Month</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="lastMonth">Last Month</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="currentYear">Current Year</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="lastYear">Last Year</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="yearComparison">Year vs Year</button>
            </div>
            
            <div class="relative h-96">
                <canvas id="categoryChart"></canvas>
            </div>
            
            <!-- Chart Footer -->
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div class="text-sm text-gray-500">
                    Showing top 10 categories
                </div>
                <div class="text-sm text-gray-500">
                    Last updated: {{ now()->format('M j, Y g:i A') }}
                </div>
            </div>
        </div>

        <!-- Section 4: Sales by Product Bar Chart -->
        <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center justify-between mb-6">
                <h2 class="text-xl font-semibold text-gray-800">Top 10 Products by Sales</h2>
                <div class="flex items-center space-x-2">
                    <button class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                    </button>
                    <button class="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                        <i data-lucide="download" class="w-4 h-4"></i>
                    </button>
                </div>
            </div>
            
            <!-- Product Metrics Cards -->
            <div class="flex justify-center mb-6">
                <div class="flex flex-wrap justify-center gap-4 max-w-5xl" id="product-metrics">
                    <!-- Metrics will be populated by JavaScript -->
                </div>
            </div>
            
            <!-- Period Selector -->
            <div class="flex space-x-2 mb-4" id="product-period-selector">
                <button class="period-btn active px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-blue-600 text-white" data-period="rolling30">Rolling 30 Days</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="currentMonth">Current Month</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="lastMonth">Last Month</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="currentYear">Current Year</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="lastYear">Last Year</button>
                <button class="period-btn px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 hover:bg-gray-200" data-period="yearComparison">Year vs Year</button>
            </div>
            
            <div class="relative h-96">
                <canvas id="productChart"></canvas>
            </div>
            
            <!-- Chart Footer -->
            <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                <div class="text-sm text-gray-500">
                    Showing top 10 products
                </div>
                <div class="text-sm text-gray-500">
                    Last updated: {{ now()->format('M j, Y g:i A') }}
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('scripts')
<script src="{{ asset('js/dashboard.js') }}"></script>
@endpush