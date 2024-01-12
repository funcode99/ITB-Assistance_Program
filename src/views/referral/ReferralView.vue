<script setup>
import { onBeforeMount, ref } from 'vue'
import Api from '@/utils/Api';
import { useToast } from "vue-toastification";
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import BottomNavbar from '@/components/BottomNavbar.vue';

let name = ref()
let telephone = ref()
let city = ref()
let tinggibadan = ref()
let beratbadan = ref()
let data = ref({})
let status = ref({})
const route = useRoute()
const store = useStore()
const toast = useToast()

async function submitNewMember() {

    store.commit('isLoading', true)
    try {
        const token = JSON.parse(localStorage.getItem('token'))
        // Set authorization for api
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const data = await Api.post(`/referre-manual/${route.params.id}`, {
            name: name.value,
            telp: telephone.value,
            city: city.value,
            weight: tinggibadan.value,
            height: beratbadan.value
        })
        
        store.commit('isLoading', false)
        toast.success('Member berhasil ditambahkan')
    } catch (error) {
        store.commit('isLoading', false)
        toast.error('Member gagal ditambahkan, nomor telephone tidak ada atau sudah pernah digunakan')
      
    }
}

onBeforeMount(
    async () => { 
        store.commit('isLoading', true)
        try {
        
        const token = JSON.parse(localStorage.getItem('token'))
        // Set authorization for api
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get(`/referre-manual/${route.params.id}`)
        data.value = api?.data?.customer?.nama_customer
        status.value = api?.status

        store.commit('isLoading', false)
        } catch (error) {

        store.commit('isLoading', false)
            console.log(error)
        }
    }
)

</script>

<template>

    <div v-if="status === 200">

        <div class="px-[32px]">

            <h1 class="font-black text-[36px] leading-[49px] text-[#23690a]">
                Halo,
            </h1>

            <h1 class="font-black text-[36px] leading-[49px] text-[#23690a]">
                Kamu diundang {{ data }} untuk ikutan pola hidup sehat
            </h1>

            <div class="mt-[26px] flex justify-center">
                <img src="@/assets/bubble.svg" alt="">
            </div>

            <div class="mt-[26px] flex justify-center">
                <img src="@/assets/referral.svg" alt="">
            </div>
    
            <br />

            <p class="text-center">
                Mau menurunkan Berat Badan menuju Ideal tapi gak kunjung turun? 
            </p>

            <br />

            <p class="text-center">
                Mau diet tapi yang aman, alami atau tanpa kelaparan? 
            </p>

            <br />

            <p class="text-center">
                Belum lagi penyakit kronik yang gak kunjung sembuh ? 
            </p>

            <br />

            <p class="text-center">
                Inilah waktunya, cabut masalah dari AKARNYA dengan Detoks bersama IT’s Buah dengan Cold Pressed Juice!
            </p>

            <br />

            <!-- <img src="@/assets/whatisCPJ.svg" alt=""> -->
            <img src="@/assets/whatiscpj2.svg" alt="">

            <p class="text-center text-[20px] leading-[27px] mt-[27px] font-extrabold">
                Punya Pertanyaan? 
                <br/>
                Yuk Konsultasikan Dengan 
                <br />
                Elite Health Consultant IT's Buah!
            </p>
            
            <p class="text-center text-[20px] font-normal mt-[27px] leading-[27px]">
                Silahkan ISI FORM dibawah ini untuk 
                <br />
                melakukan KONSULTASI PEMESANAN 
                <br />
                dan PEMBELIAN PROGRAM 
                <br />
                IT's Buah:
            </p>
    
            <form class="flex flex-col gap-y-[9px] mt-[18px] text-[#23690a]" @submit.prevent="submitNewMember">
    
                <div class="flex gap-x-[4px] max-w-[100%]">
                    <label for="name">Nama:</label>
                    <input
                     v-model="name" 
                     class="bg-[#E4E4E4] rounded-[8px] w-[100%] h-[25px] text-[17px] pl-[2%]" 
                     type="text" 
                     required
                     >
                </div>
    
                <div class="flex gap-x-[4px] max-w-[100%]">
                    <label for="telephone">Telepon:</label>
                    <input v-model="telephone" class="bg-[#E4E4E4] rounded-[8px] w-[100%] h-[25px] text-[17px] pl-[2%]" type="tel" maxlength="13" oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');" required>
                </div>
    
                <div class="flex gap-x-[4px] max-w-[100%]">
                   <label for="city">Kota:</label>
                   <input v-model="city" class="bg-[#E4E4E4] rounded-[8px] w-[100%] h-[25px] text-[17px] pl-[2%]" type="text" required>
                </div>
    
                <div class="flex items-center gap-x-[4px] max-w-[100%]">
                    <label for="tinggibadan">Tinggi Badan:</label>
                    <input 
                    v-model="tinggibadan" class="bg-[#E4E4E4] rounded-[8px] flex-1 h-[25px] text-[17px] pl-[2%]" 
                    type="text" 
                    maxlength="3"
                    oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                    max="200"
                    required
                    >
                </div>
    
                <div class="flex items-center gap-x-[4px] max-w-[100%]">
                   <label for="beratbadan">Berat Badan:</label>
                   <input 
                   v-model="beratbadan" 
                   class="bg-[#E4E4E4] rounded-[8px] flex-1 h-[25px] text-[17px] pl-[2%]" 
                   type="text"
                   maxlength="3"
                   oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');"
                   max="200"
                   required
                   >
                </div>
    
                <div class="flex gap-x-[4px] max-w-[100%]">
                    <div class="flex flex-1"></div>
                   <button type="submit" class="bg-[#23690a] text-white py-[2px] px-[23px] rounded-[8px]">Kirim</button>
                </div>
    
            </form>
        </div>
        <BottomNavbar />
    </div>

    <div v-else>
        Halaman tidak ditemukan!
    </div>

    

</template>
