<script setup>
import { ref, watch } from 'vue'
import {
    RadioGroup,
    RadioGroupOption,
} from '@headlessui/vue'
import moment from 'moment';

const dates = [];

for (let i = 0;i < 7;i++) {
    dates[i] = moment().add(i, 'days');
}

const selected = ref(dates[0])

const emit = defineEmits(['response'])

watch(selected, (newSelected) => {
    emit('response', newSelected)
})
</script>

<template>
    <RadioGroup v-model="selected" class="grid grid-cols-7 bg-[#D1D1D1] rounded-[9px]">
        <RadioGroupOption v-slot="{ checked }" :value="item" v-for="(item, index) in dates" :key="index">
            <div class="flex flex-col items-center font-bold gap-[1px] px-[8px] py-[4px] cursor-pointer"
                :class="[checked ? 'text-white bg-[#23690A] rounded-[9px]' : 'text-[#23690A]']">
                <span>{{ item.format('MMM').toUpperCase() }}</span>
                <span>{{ item.format('D') }}</span>
                <span>{{ item.format('ddd').toUpperCase() }}</span>
            </div>
        </RadioGroupOption>
    </RadioGroup>
</template>