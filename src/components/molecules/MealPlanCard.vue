<script setup>
import ModalMealPlanDetail from './ModalMealPlanDetail.vue';

const props = defineProps({
    data: Object
})

</script>

<template>
    <ul class="space-y-[30px]">
        <li v-for="(item, index) in props.data.meal_plan" :key="index">
            <div class="card">
                <div class="relative -z-10">
                    <img class="rounded-[19px] h-[126px] w-full object-cover" :src="item.url_image" alt="">
                    <div
                        class="bg-[#23690a] absolute top-[10px] left-[9px] text-white rounded-[16px] py-[8px] px-[13px]">
                        <p>{{ item.time }}</p>
                    </div>
                </div>
                <div class="flex justify-between items-end mt-[11px]">
                    <div class="font-black text-[20px]">
                        <p>
                            {{ item.name }}
                        </p>
                        <p> {{ item.calories }} kcal</p>
                    </div>
                    <div v-if="item.category !== 'JUICE'">
                        <ModalMealPlanDetail :data="item" />
                    </div>
                </div>
            </div>
        </li>
    </ul>
</template>