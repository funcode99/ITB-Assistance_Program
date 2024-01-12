<script setup> 
import BottomNavbar from '@/components/BottomNavbar.vue';
import Api from '@/utils/Api';
import { onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import router from '@/router';
import convertDate from '@/utils/ConvertDate';

let data = ref({})
const user = JSON.parse(localStorage.getItem('user'))
const store = useStore()
const subscriptionStatus = localStorage.getItem('subscription_status')

onBeforeMount(() => {
    fetch()
})

    const fetch = async () => {

        store.commit('isLoading', true)
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const api = await Api.get('/home-membership')
        data.value = api?.data?.data
        console.log(data.value)
        store.commit('isLoading', false)
    }

    const logout = async () => {
        store.commit('isLoading', true)
    const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get('/logout')
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        store.commit('isLoading', false)
        router.push('/login')
    }

</script>

<template>
<div>
        
    <div class="min-h-[100vh]">

        <div class="flex justify-between items-center px-[30px] mt-[10px]">
            <router-link to="/membership">
                <img 
                class=""
                src=""
                alt=""
                >
            </router-link>
            <router-link to="/home">
                <img src='@/assets/logo.png' alt="logo">
            </router-link>
        </div>

        <div class="px-[8%]">

            <h1 class="text-[36px] mt-[24px] font-black text-[#23690A]">Profil Kamu</h1>
            <!-- <h1>{{ data }}</h1> -->

            <div v-if="data?.subscription?.status == 1 && data?.subscription?.package != 'null' ">
                <div class="px-[6%]">
    
                    <div :class="
                    [
                        data?.subscription?.type === 'HEALTHY' ?
                    `bg-[url('/src/assets/HealthyPackage.svg')]` 
                    : 
                        data?.subscription?.type === 'FIT' ? 
                    `bg-[url('/src/assets/FitPackage.svg')]`
                    : 
                        data?.subscription?.type === 'FRESH' ?
                    `bg-[url('/src/assets/FreshPackage.svg')]`  
                    :
                    ''
                    ]"
                        class="gap-1 rounded-[21px] min-w-[88%] h-[140px] flex justify-center mt-[20px] relative">
        
                        <img class="max-[389px]:hidden absolute top-[20px] rounded-full overflow-hidden left-[5%]"
                            :src="data?.member?.member_photo" alt="">
        
                        <div class="mb-[7%] absolute top-[20px] bottom-[17px] max-[389px]:left-[8%] left-[28%] right-[8%]">
        
                            <div class="flex justify-between gap-[40px] text-white">
                                <div class="text-[15px] leading-[20px]">
                                    <h1>{{ data?.member?.nama_customer }}</h1>
                                    <h1 class="font-black">{{ data?.member?.no_member }}</h1>
                                </div>

                            </div>
        
                            <div class="flex justify-between text-white items-center max-[422px]:mt-[10px] mt-[8%] mb-[8%]">
        
                                <div class="flex flex-col text-[15px]">
                                    <div class="flex gap-[2px] items-center">
                                        <h1 class="font-black">{{ data?.subscription?.package }}</h1>
                                    </div>
                                    <h1>Aktif sampai {{ convertDate(data?.subscription?.ended_at) }}</h1>
                                </div>
        
                            </div>
        
                        </div>
        
                    </div>
        
                </div>
            </div>

            <div v-else>
                <div class="mt-[15px]">
    
                    <div class="flex items-center gap-[24px]">
                        <img class="rounded-full w-[100px] h-[100px]" :src="data?.member?.member_photo" alt="">
                        <div class="">
                            <h1 class="text-[20px] leading-[27px] font-semibold text-[#23690A]">Elite Member</h1>
                            <h1 class="font-medium text-[32px] text-[#23690A]">{{ user?.nama_customer }}</h1>
                        </div>
                    </div>
    
                </div>
            </div>

            <div class="mt-[43px] flex flex-col gap-y-[30px]">
                
                <router-link to="/order" class="flex items-center gap-x-8">
                    <img width="45" height="45" src="@/assets/treatment.png" alt="">
                    <h1 class="text-[20px] text-[#23690A] font-medium">Order dan Pengiriman</h1>
                </router-link>

                <router-link to='/membership-comingsoon' class="flex items-center gap-x-8"> 
                    <img width="45" height="45" src="@/assets/badge-check.png" alt="">
                    <h1 class="text-[20px] text-[#23690A] font-medium">Sehati Membership</h1>
                </router-link>

                <div @click="logout" class="flex items-center gap-x-8 cursor-pointer">
                    <img width="45" height="45" src="@/assets/power-off.png" alt="">
                    <h1 class="text-[20px] text-[#23690A] font-medium">Keluar</h1>
                </div>

            </div>
        </div>

    </div>
    <BottomNavbar />

</div>
</template>