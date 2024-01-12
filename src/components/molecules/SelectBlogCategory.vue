<script setup>
import { onMounted, ref, watch } from 'vue'
import {
    RadioGroup,
    RadioGroupOption,
} from '@headlessui/vue'
import moment from 'moment';

const times = [
    'Hot News',
    'Artikel',
    'E-Book'
]

const selected = ref(times[0])
const emit = defineEmits(['response'])

watch(selected, (newSelected) => {
    emit('response', newSelected)
})

onMounted(() => {
})

</script>

<template>
    <RadioGroup 
    v-model="selected" 
    class="grid grid-cols-3 gap-[6px] mt-[12px]">
        <RadioGroupOption 
        v-slot="{ checked }" 
        :value="item" 
        v-for="(item, index) in times" :key="index">
            <button type="button" class="p-[9px] text-[12px] font-black w-full border border-[#23690A]"
                :class="[checked ? 'bg-[#23690A] text-white' : 'text-[#23690A]']">
                {{item}}
            </button>
        </RadioGroupOption>
    </RadioGroup>
</template>