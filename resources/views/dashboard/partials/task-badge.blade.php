@php
    $colorGradients = [
        'blue' => 'from-blue-500 to-blue-600',
        'green' => 'from-green-500 to-green-600',
        'purple' => 'from-purple-500 to-purple-600',
        'indigo' => 'from-indigo-500 to-indigo-600',
        'orange' => 'from-orange-500 to-orange-600',
        'red' => 'from-red-500 to-red-600',
        'yellow' => 'from-yellow-500 to-yellow-600'
    ];
    
    $progressGradients = [
        'blue' => 'from-blue-400 to-blue-500',
        'green' => 'from-green-400 to-green-500',
        'purple' => 'from-purple-400 to-purple-500',
        'indigo' => 'from-indigo-400 to-indigo-500',
        'orange' => 'from-orange-400 to-orange-500',
        'red' => 'from-red-400 to-red-500',
        'yellow' => 'from-yellow-400 to-yellow-500'
    ];
    
    $colorGradient = $colorGradients[$color] ?? $colorGradients['blue'];
    $progressGradient = $progressGradients[$color] ?? $progressGradients['blue'];
    $progressPercentage = $due > 0 ? round(($completed / ($completed + $due)) * 100) : 0;
@endphp

<div class="bg-white rounded-xl shadow-sm border border-gray-300 p-5 cursor-pointer hover:shadow-lg hover:border-blue-400 transition-all duration-300 group task-badge" 
     data-task-type="{{ $taskType }}">
    <!-- Header with Icon -->
    <div class="flex items-center justify-between mb-4">
        <div class="p-2.5 rounded-lg bg-gradient-to-br {{ $colorGradient }} group-hover:scale-110 transition-transform duration-200">
            <i data-lucide="{{ $icon }}" class="w-5 h-5 text-white"></i>
        </div>
    </div>

    <!-- Task Label -->
    <h3 class="text-sm font-semibold text-gray-800 mb-4 leading-tight">{{ $label }}</h3>

    <!-- Metrics Row -->
    <div class="flex items-center">
        <!-- Due Tasks -->
        <div class="flex-1 flex flex-col items-center justify-center">
            <div class="text-2xl font-bold {{ $due === 0 ? 'text-gray-400' : 'text-red-600' }} mb-1">
                {{ $due }}
            </div>
            <div class="text-xs text-gray-500 font-medium tracking-wide text-center">
                DUE
            </div>
        </div>

        <!-- Divider -->
        <div class="h-12 w-px bg-gray-300"></div>

        <!-- Completed Tasks -->
        <div class="flex-1 flex flex-col items-center justify-center">
            <div class="text-2xl font-bold text-green-600 mb-1">
                {{ $completed }}
            </div>
            <div class="text-xs text-gray-500 font-medium tracking-wide text-center">
                COMPLETED
            </div>
        </div>
    </div>

    <!-- Progress Indicator - Only show if tasks are still due -->
    @if($due > 0)
        <div class="mt-4 pt-3 border-t border-gray-300">
            <div class="flex items-center justify-between text-xs text-gray-500 mb-1">
                <span>Progress</span>
                <span>{{ $progressPercentage }}%</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div class="h-1.5 rounded-full bg-gradient-to-r {{ $progressGradient }} transition-all duration-500"
                     style="width: {{ $progressPercentage }}%"></div>
            </div>
        </div>
    @endif

    <!-- Celebration Message for Completed Tasks -->
    @if($due === 0 && $completed > 0)
        <div class="mt-4 pt-3 border-t border-gray-300">
            <div class="flex items-center justify-center">
                <div class="flex items-center bg-gradient-to-r from-yellow-400 to-amber-500 px-3 py-1.5 rounded-full shadow-sm">
                    <i data-lucide="trophy" class="w-4 h-4 text-white mr-1.5"></i>
                    <span class="text-white font-semibold text-xs tracking-wide">ALL DONE!</span>
                </div>
            </div>
        </div>
    @endif
</div>