<script setup>
import moment from 'moment';

import { onBeforeMount, ref, reactive } from "vue";
import { useModal, Modal } from "usemodal-vue3";
import { useStore } from 'vuex';

import MealPlanCard from '@/components/molecules/MealPlanCard.vue'
import HorizontalCalendar from '@/components/molecules/HorizontalCalendar.vue';
import SelectTime from '@/components/molecules/SelectTime.vue';
import BottomNavbar from '@/components/BottomNavbar.vue';

import Api from '@/utils/Api';
import directToEHC from '@/utils/DirectToEHC';
import setTrial from '@/utils/SetTrial'

let modalVisible = reactive({});

let setModal = useModal({
    freeTrial: 1
});

modalVisible = setModal("freeTrial", false)

const info = ref({})
const date = ref(moment().format('YYYY-MM-DD'))
const time = ref('PAGI')
const store = useStore()

defineProps({
    data: Object
})

async function fetch() {
    store.commit('isLoading', true)
    const token = JSON.parse(localStorage.getItem('token'))
    // Set authorization for api
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const api = await Api
        .post(`/show-meal-plan`, {
            date: date.value,
            session: time.value
        })

    // console.log(api.data?.data)
    info.value = api.data?.data
    store.commit('isLoading', false)
}

// init fetch
onBeforeMount(() => {
    const runningProgram = localStorage.getItem('running_program')
    fetch()
   let trialstatus = localStorage.getItem('trial_status')
   const subscriptionStatus = localStorage.getItem('subscription_status')
//    console.log(runningProgram)
    if(trialstatus == 0 && subscriptionStatus == 0 && runningProgram === 'undefined') {
        modalVisible = setModal("freeTrial", true)
    }
})

const onTimeChange = (newTime) => {
    time.value = newTime
    fetch(undefined, newTime)
}

const onDateChange = (newDate) => {
    date.value = newDate.format('YYYY-MM-DD')
    fetch(newDate.format('YYYY-MM-DD'))
}

</script>

<template>
    <div class="w-full px-[15px] text-[#23690a] min-h-[100vh]">

        <div class="flex justify-between items-center mt-[10px]">
            <router-link to="/membership">
                <img class="" 
                src=""
                alt=""
                >
            </router-link>
            <router-link to="/home">
                <img src='@/assets/logo.png' alt="logo">
            </router-link>
        </div>

        <div v-if="info?.program_name">
            <h1 class="text-[36px] font-black">Meal Plan</h1>
            <span class="text-[24px] foMealPlanCardnt-black">Day </span>
            <span class="text-[24px] font-bold">{{ info?.day }}</span>
            <h1 class="text-[20px] font-black">{{ info?.program_name }}</h1>
            <HorizontalCalendar class="my-[16px]" @response="onDateChange" />
            <SelectTime @response="onTimeChange" />
            <div class="mt-[28px] text-[#23690a]">
                <div>
                    <MealPlanCard :data="info" />
                </div>
            </div>
        </div>

        <div v-else class="px-[35px] mt-[28px] font-bold text-[#23690a] text-center">
            <h1>Tidak ada program mealplan yang berjalan</h1>
        </div>

        
    </div>
    <BottomNavbar />
    <Modal class="flex justify-center fixed" type="clean" name="freeTrial" v-model:visible="modalVisible">
        <div class="max-w-[86%] h-[260px] bg-white rounded-[35px] px-[29px] pt-[44px]">

            <h1 class="text-[22px] font-bold">Kamu belum memiliki paket yang berjalan!</h1>

            <div class="flex flex-col items-center justify-center mt-[28px]">
                <button @click="setTrial" class="bg-[#e99f49] flex items-center justify-center w-[197px] h-[41px] rounded-[19px]">
                    Claim free trial
                </button>
                <button @click="directToEHC" class="bg-[#e99f49] flex items-center justify-center w-[197px] h-[41px] rounded-[19px] mt-[12px]">
                    Belanja sekarang
                </button>
            </div>
        </div>
    </Modal>
</template>