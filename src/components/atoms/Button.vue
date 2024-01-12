<script setup>
import { computed } from 'vue';

const props = defineProps({
    type: {
        type: String,
        default: 'submit',
    },
    variant: {
        type: String,
        required: false
    },
    disabled: Boolean,
});

let { variant } = props

const variantClasses = computed(() => {
    switch (variant) {
        case 'info':
            return variant = 'bg-indigo-500 border-transparent text-white hover:bg-indigo-600 focus:border-indigo-600 focus:ring-indigo-200 active:bg-indigo-500';
        case 'info-outline':
            return variant = 'text-indigo-500 hover:text-white border border-indigo-500 hover:bg-indigo-500 focus:outline-none focus:ring-indigo-200';
        case 'danger':
            return variant = 'bg-red-600 border-transparent text-white hover:bg-red-500 focus:border-red-700 focus:ring-red-200 active:bg-red-600';
        case 'danger-outline':
            return variant = 'text-red-600 hover:text-white border border-red-600 hover:bg-red-600 focus:outline-none focus:ring-red-200';
        case 'secondary':
            return variant = 'bg-white border-gray-300 text-gray-700 hover:text-gray-500 focus:border-blue-300 focus:ring-blue-200 active:text-gray-800 active:bg-gray-50';
        case 'success':
            return variant = 'bg-[#3D622F] border-transparent text-white hover:bg-green-800 focus:border-green-700 focus:ring-green-300 active:bg-green-700';
        case 'success-outline':
            return variant = 'text-green-600 hover:text-white border border-green-600 hover:bg-green-600 focus:outline-none focus:ring-green-300';
        case 'warning':
            return variant = 'bg-[#FD8709] border-transparent text-black hover:bg-yellow-300 focus:border-yellow-500 focus:ring-yellow-200 active:bg-yellow-400';
        case 'warning-outline':
            return variant = 'text-yellow-400 hover:text-gray-800 border border-yellow-400 hover:bg-yellow-400 focus:outline-none focus:ring-yellow-200';
        case 'primary-outline':
            return variant = 'text-gray-800 hover:text-white border border-gray-800 hover:bg-gray-800 focus:outline-none focus:ring-gray-300';
        case 'primary':
        default:
            return variant = 'bg-[#61DAFB] text-black border-transparent hover:bg-gray-700 active:bg-gray-900 focus:border-gray-900 focus:ring-gray-300';
    }
})
</script>

<template>
    <button :type="type"
        class="inline-flex items-center justify-center p-[8px] border rounded-md focus:outline-none focus:ring disabled:opacity-25 transition"
        :class="[variantClasses]" :disabled="disabled">
        <slot />
    </button>
</template>