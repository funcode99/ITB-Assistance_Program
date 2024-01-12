<script setup>
 import BottomNavbar from '@/components/BottomNavbar.vue';
 import Convert from '@/utils/ConvertDate'
 import Api from '@/utils/Api';
import { onBeforeMount, ref, reactive } from 'vue';
import { useModal, Modal } from "usemodal-vue3";
import directToEHC from '@/utils/DirectToEHC';
import setTrial from '@/utils/SetTrial'

const trialStatus = localStorage.getItem('trial_status')
const subscriptionStatus = localStorage.getItem('subscription_status')

let modalVisible = reactive({});
let setModal = useModal({
    freeTrial: 1
});

modalVisible = setModal("freeTrial", false)

let data = ref({})
const user = JSON.parse(localStorage.getItem('user'))

async function directToPC(url) {
    window.open(url, '_blank', 'noreferrer')
}

function directToCourier(url) {
    window.open(url, '_blank', 'noreferrer')
}

onBeforeMount(() => {

   const runningProgram = localStorage.getItem('running_program')
    fetch()
    if(trialStatus == 0 && subscriptionStatus == 0 && runningProgram === 'undefined') {
        modalVisible = setModal("freeTrial", true)
    }
})

const fetch = async () => {

    const token = JSON.parse(localStorage.getItem('token'))

    // Set authorization for api
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const shipId = localStorage.getItem('shipId')
    const api = await Api.get(`/show-detail-delivery/${shipId}`)
    data.value = api?.data?.data

}
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

        <div v-if="subscriptionStatus == 1 && data?.detail_delivery" class="px-[35px] pb-2 mt-[25px]">
        <!-- <div class="px-[35px] pb-2 mt-[25px]"> -->
            <h1 class="font-black text-[#23690a] text-[36px]">Pengiriman Berjalan</h1>

            <div class="font-bold text-[#23690a] text-[24px] mt-[44px]">
                <h2 class="text-[#e99f49]">{{ Convert(data?.detail_delivery?.jadwal_pengiriman) }}</h2>
                <h2>Nama Kurir: {{ data?.detail_delivery?.driver_name }}</h2>

                <!-- 1 -->
                <h2>No Telp: {{ data?.detail_delivery?.driver_phone }}</h2>
            </div>

            <div class="flex justify-between mt-[43px]">
                <h1 class="text-[24px] text-[#e99f49] font-bold">Lokasi Pengiriman</h1>
                <!-- 2 -->
                <p class="text-[16px] text-[#ff0000] font-extrabold">Titik ke {{ data?.detail_delivery?.sequence_stop }}</p>
            </div>

            <div v-if="data?.detail_delivery?.share_link">
                <div class="max-w-[430px] py-[11px]">
                    <iframe :src="data?.detail_delivery?.share_link" frameborder="0" class="w-[100%] h-[400px]"></iframe>
                </div>
            </div>
            
            <div v-else class="text-center my-[30px]">
                <h1>Data Maps Tidak Ditemukan</h1>
            </div>

            <h1 class="text-[24px] text-[#e99f49] font-bold">Detail Pengiriman</h1>
            <div class="text-[24px] text-[#23690a] font-bold">
                <!-- 3 -->
                <h2>No CB   : CB {{ data?.detail_delivery?.cooler_bag }}</h2>
                <!-- 4 -->
                <h2>Jumlah  : {{ data?.detail_delivery?.total_bottle ?? 0 }} Botol</h2>
            </div>

            <div>
                <h1 class="text-[24px] mt-[24px] text-[#e99f49] font-bold">Varian Dikirim</h1>
                <ul>
                    <li v-for="isi in data.detail_varian">
                        <div class="flex">
                            <p>{{ isi?.jumlah }}</p>
                            <p>{{ isi?.kode_produk_satuan }}</p>
                        </div>
                    </li>
                </ul>

                <!-- <div 
                    class="grid grid-cols-3 text-[24px] text-[#23690a] font-bold"
                >
                </div> -->

            </div>

            <div class="flex justify-between mt-[27px]">
                <button @click="directToCourier(`https://wa.me/${data?.detail_delivery?.driver_phone}`)" class="bg-[#23690a] py-[10px] px-[17px] text-white rounded-[19px]">Hubungi Kurir</button>
                <button @click="directToPC(`https://wa.me/${data?.personal_coach?.wa}`)" class="bg-[#23690a] py-[10px] px-[17px] text-white rounded-[19px]">Chat kami</button>
            </div>
        
        </div>

        <div v-else class="px-[35px] mt-[10px] font-bold text-[#23690a] text-center">
            <h1>Tidak ada pengiriman yang sedang berjalan</h1>
        </div>
        
        <Modal class="flex justify-center" type="clean" name="freeTrial" v-model:visible="modalVisible">
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


    </div>

    <BottomNavbar />
</template>