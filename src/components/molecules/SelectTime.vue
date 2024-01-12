<script setup>
import { onMounted, ref, watch } from 'vue'
import {
    RadioGroup,
    RadioGroupOption,
} from '@headlessui/vue'
import moment from 'moment';

const times = [
    'PAGI',
    'SIANG',
    'SORE'
]

const selected = ref(times[0])
const emit = defineEmits(['response'])

watch(selected, (newSelected) => {
    emit('response', newSelected)
})

onMounted(() => {
    const timeNow = moment().format('H');

    switch (true) {
        case (timeNow >= 13):
            selected.value = times[2]
            break;
        case (timeNow >= 9):
            selected.value = times[1]
            break;
        case (timeNow >= 5):
            selected.value = times[0]
            break;
        default:
            selected.value = times[2]
            break;
    }
})

</script>

<template>
    <RadioGroup v-model="selected" class="flex gap-[50px] mt-[20px]">
        <RadioGroupOption v-slot="{ checked }" :value="item" v-for="(item, index) in times" :key="index">
            <button type="button" class="py-[2px] px-[10px] text-[20px] font-medium rounded-[16px]"
                :class="[checked ? 'bg-[#23690A] text-white' : '']">
                {{item}}
            </button>
        </RadioGroupOption>
    </RadioGroup>
</template>