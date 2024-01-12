<script setup>
import { onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';

import HomeView from '@/views/HomeView.vue'
import HorizontalMenu from '@/components/molecules/HorizontalMenu.vue';
import BottomNavbar from '@/components/BottomNavbar.vue';
import HomeEmptyView from './EmptyProgramView.vue';
import DetailPackageView from './DetailPackageView.vue';
import Api from '@/utils/Api';
// const runningProgram = JSON.parse(localStorage.getItem('running_program'))


const store = useStore()
const data = ref({})
const nextDelivery = ref({})
const runningDelivery = ref({})
const statusProgram = ref(0)

const fetch = async () => {

    store.commit('isLoading', true)
    const token = JSON.parse(localStorage.getItem('token'))

    // Set authorization for api
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const api = await Api.get('/show-dashboard-homepage')

    nextDelivery.value = api.data?.data?.next_delivery
    runningDelivery.value = api.data?.data?.running_delivery
    localStorage.removeItem('shipId')
    const shipId = localStorage.setItem('shipId', api.data?.data?.running_delivery.id_pengiriman)

    data.value = api.data?.data

    // console.log(data?.value)
    // console.log(data?.value?.running_program)
    // console.log(data?.value?.running_program?.program_name)

    if(data.value?.running_program?.program_name == 'TRIAL') {
        store.commit('isLoading', false)
    } else {
        data.value?.running_program?.progress?.filter(item => {
            return item.program_stage != 'BOOSTER'
        }).forEach((item, index) => {
            if (item.is_running_program) {
                statusProgram.value = index + 1
                // console.log(statusProgram.value)
            }
        })
        store.commit('isLoading', false)
    }

}

onBeforeMount(() => {
    fetch()
})

</script>

<template>
    <div class="min-h-[100vh]">

        <div class="flex justify-between items-center mx-[30px] mt-[10px]">
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

        <div v-if="data?.running_program?.program_name">
            <DetailPackageView :currentStatusProgram="statusProgram" />
        </div>
        <div v-else>
            <HomeEmptyView />
        </div>


    </div>
        <BottomNavbar />
</template>