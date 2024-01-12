<script setup>
import { ref } from 'vue';
import router from '@/router';
import { useToast } from "vue-toastification";
import { useStore } from 'vuex'
import Api from '@/utils/Api';

const whatsappPC = [6281380875421, 628111737567, 6282123976400]

async function directToPC(url) {
    window.open(url, '_blank', 'noreferrer')
}

const store = useStore()
const telp = ref('')

const submit = async () => {
    try {
        store.commit('isLoading', true);
        const data = await Api.post('/login', {
            telp: telp.value
        })

        localStorage.setItem('user', JSON.stringify(data.data.customer))
        store.commit('isLoading', false);
        router.push('/verify-otp');

    } catch (error) {
        console.log(error)
        if (error?.response?.status === 400) {
            router.push('/registration')
        }
        else {
            store.commit('isLoading', false);
            const toast = useToast();

            toast.error(error?.response?.data?.message, {
                position: 'top-center',
                timeout: 2000
            });
        }
    }

}
</script>

<template>
    <div class="mx-[30px]">
        <div class="mt-[20px]">
            <h1 class="text-[30px] font-black text-[#23690a]">
                Halo,
            </h1>
            <h1 class="text-[30px] font-black text-[#23690a]">
                Selamat Datang di
            </h1>
            <img width="130" height="110" class="m-auto mt-[33px]" src="@/assets/logo-itsbuah.svg" alt="">
            <p class="mt-[20px] text-[13px]">
                Nikmati berbagai keuntungan dengan mendaftar di aplikasi IT’s Buah. Mulai dari pengecekan transaksi yang
                lebih mudah, hingga meal plan yang lebih terstruktur.
            </p>
        </div>
        <div class="mt-[23px] px-3 py-4 bg-[#23690A] rounded-lg flex">
            <input v-model="telp"
                class="w-2/3 border-b border-white bg-[#23690A] outline-none text-white placeholder:text-white text-[15px]"
                type="tel" name="" id="" placeholder="Masukkan No. Ponsel">
            <div class="flex-1"></div>
            <button type="button" @click="submit"
                class="ml-2 inline-flex py-1 px-5 items-center bg-[#23690A] border border-white rounded-lg text-white hover:bg-green-700 active:bg-green-900 focus:outline-none focus:border-gray-300 focus:ring focus:ring-gray-100 disabled:opacity-25 transition text-[15px]">
                Masuk</button>
        </div>

        <p class="m-auto mt-[20px] text-[12px]">
            Bagi Anda yang pernah melakukan transaksi di IT’s Buah, harap masukkan nomor ponsel yang Anda gunakan untuk
            bertransaksi
        </p>

        <div class="text-right mt-[15px]">
            <p class="text-[12px]">Lupa nomor yang terdaftar di IT's Buah?</p>
            <div class="flex mt-[8px] justify-end">
                <button @click="directToPC(`https://wa.me/${whatsappPC[Math.floor(Math.random() * 3)]}`)">
                    <div class="bg-[#23690a] rounded-[8px] flex items-center gap-[7px] text-white px-[8px] py-[11px]">
                        <img src="@/assets/whatsapp.svg" alt="whatsapp image" width="22" height="22">
                        <p class="text-[10px]">Hubungi Personal Coach IT's Buah</p>
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>