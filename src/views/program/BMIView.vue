<script setup>
import BottomNavbar from '@/components/BottomNavbar.vue';
import Api from '@/utils/Api';
import Convert from '@/utils/ConvertDate'
import { onBeforeMount, ref } from 'vue';
import { useStore } from 'vuex';
import { useToast } from "vue-toastification";
import { getCurrentInstance } from 'vue';

const store = useStore()
const toast = useToast()

const data = ref({})
const message = ref({})
const weight = ref()
const height = ref()

onBeforeMount(() => {
    fetch()
})

const fetch = async () => {
store.commit('isLoading', true)
// store.commit('token', 'isiTokennya')
// store.getters.token
// console.log(store.getters.token)
const token = JSON.parse(localStorage.getItem('token'))
// Set authorization for api
Api.defaults.headers.common.Authorization = `Bearer ${token}`;
const api = await Api.get('/assessment/show-last-bmi')
store.commit('isLoading', false)

data.value = api?.data
// const message = api?.data?.message
console.log(data.value.message)
}

const submitBMI = async () => {
store.commit('isLoading', true)
try {
    const numbers = /^[0-9]+$/;

    if(height.value.match(numbers) && weight.value.match(numbers)) {
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`
        const api = await Api.post('/assessment/store-bmi', {
            height: height.value,
            weight: weight.value
        })
        store.commit('isLoading', false)
        toast.success('BMI berhasil ditambahkan')
        fetch()
    } else {
        toast.error('Silahkan masukkan angka untuk mengukur BMI anda')
    }
} 

catch (error) {
    store.commit('isLoading', false)
    toast.error(`BMI gagal ditambahkan ${error}`)
}

}

</script>

<template>

<div class="min-h-[100vh] px-[7%]">

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

    <div v-if="data.message !== `Last BMI not found!`" class=" pb-[44px]">
        <h1 class="mt-[24px] text-[36px] text-[#23690A] font-black leading-[49px]">Cek BMI</h1>
        <h1 class="mt-[30px] mb-[10px] text-[24px] text-[#23690A] font-medium">BMI Sebelumnya</h1>

        <div class="flex gap-[5px] items-center">
            <h1 class="text-[50px] text-[#23690A] font-extrabold">{{ data?.data?.result_bmi > 10 ? data?.data?.result_bmi.slice(0,2) : data?.data?.result_bmi.slice(0,1)}}</h1>
            <div>
                <h1 class="text-[#23690A] text-[24px]">{{ data?.data?.category_bmi }}</h1>
                <h1 class="text-[#23690A] text-[15px]">Last update {{ Convert(data?.data?.created_at.slice(0,10)) }}</h1>
            </div>
        </div>

        <div class="flex gap mt-[35px]">
        </div>


        <form @submit.prevent="submitBMI">
            <div class="flex gap-[20px] items-center">
                <label 
                for="weight" 
                class="font-medium text-[#23690A] text-[24px]"
                >
                Berat Badan
                </label>
                <input 
                type="text" 
                class="bg-[#23690A] text-[#FFFFFF] opacity-80 rounded-[19px] h-[54px] pl-[10px]"
                v-model="weight"
                required
                >
            </div>
            <div class="flex gap-[10px] items-center mt-[40px]">
                <label 
                for="height" 
                class="font-medium text-[#23690A] text-[24px]"
                >
                Tinggi Badan
                </label>
                <input 
                type="text"
                class="bg-[#23690A] text-[#FFFFFF] opacity-80 rounded-[19px] h-[54px] pl-[10px]"
                v-model="height"
                required
                >
            </div>
            <div class="flex justify-center">
                <button 
                class="mx-auto mt-[32px] px-[40px] py-[7px] bg-[#E99F49] text-white justify-center rounded-[19px]"
                type="submit"
                >
                    Hitung BMI
                </button>
            </div>
        </form>

    </div>

    <div v-else>

        <div class="my-[10vh] font-bold text-[#23690a]">
            <p>BMI Kamu belum ada nih</p>
            <p>Yuk Ukur BMI Kamu</p>
        </div>

        <form @submit.prevent="submitBMI()" class="mt-[25px]">
            <div class="flex gap-[20px] items-center">
                <label 
                for="weight" 
                class="font-medium text-[#23690A] text-[24px]"
                >
                Berat Badan
                </label>
                <input 
                type="text" 
                class="bg-[#23690A] text-[#FFFFFF] opacity-80 rounded-[19px] h-[45px] flex-1 mr-[10px]"
                v-model="weight"
                required
                >
            </div>
            <div class="flex gap-[20px] items-center mt-[40px]">
                <label 
                for="height" 
                class="font-medium text-[#23690A] text-[24px]"
                >
                Tinggi Badan
                </label>
                <input 
                type="text"
                class="bg-[#23690A] text-[#FFFFFF] opacity-80 rounded-[19px] h-[45px] flex-1 mr-[10px]"
                v-model="height"
                required
                >
            </div>
            <div class="flex justify-center">
                <button 
                class="mx-auto mt-[32px] px-[40px] py-[7px] bg-[#E99F49] text-white justify-center rounded-[19px]"
                type="submit"
                >
                    Hitung BMI
                </button>
            </div>
        </form>
    </div>

</div>

<BottomNavbar />
</template>