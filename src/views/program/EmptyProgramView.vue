<script setup>
import BottomNavbar from '@/components/BottomNavbar.vue';
import directToEHC from '@/utils/DirectToEHC'
let trialstatus = localStorage.getItem('trial_status')
let subscriptionStatus = localStorage.getItem('subscription_status')
const user = JSON.parse(localStorage.getItem('user'))
</script>

<template>
    <div class="min-h-[100vh]">
        <div class="">
            
            <!-- sudah ada di home view jadi gaperlu dipasang lagi di home empty -->
            <div class="mx-[30px] pb-2">
                <h1 class="text-[#23690A] text-[36px] leading-[49px] mt-6">
                    Halo,
                    <br />
                    <span class="font-black">{{ user.nama_customer }}</span>
                </h1>
                
                <div v-if="trialstatus == 1 && subscriptionStatus == 0">
                    <p class="text-[24px] text-[#23690a]">
                        Kamu sedang menjalani program <p class="font-bold text-[24px]">TRIAL LIFEWELL</p>
                    </p>
                </div>

                <div v-else>
                    <p class="text-2xl text-[#23690A] mt-[47px]">
                        Kamu belum memiliki paket yang berjalan
                    </p>
                </div>
                <button
                    @click="directToEHC"
                    class="inline-flex items-center mt-6 px-12 py-[7px] bg-[#E99F49] border border-transparent rounded-full text-white hover:bg-yellow-700 active:bg-yellow-900 focus:outline-none focus:border-yellow-900 focus:ring focus:ring-yellow-300 disabled:opacity-25 transition text-xl">
                    Belanja Sekarang
                </button>
                <h2 class="text-[#23690A] font-black text-2xl mt-[109px]">
                    Apa itu IT's Buah?
                </h2>
                <p class="text-[20px] mt-1">
                    IT's Buah menyediakan program detoks untuk membantu menurunkan berat badan, membersihkan racun yang ada
                    di dalam tubuh, dan menyehatkan tubuh. IT's Buah memperkenalkan produk Cold Pressed Juice yang terbuat
                    dari 100% hanya buah dan sayur sehingga aman untuk dikonsumsi.
                </p>
            </div>

        </div>
    </div>
</template>