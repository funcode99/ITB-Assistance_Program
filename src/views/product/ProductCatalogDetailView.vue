
<script setup>
import BottomNavbar from '@/components/BottomNavbar.vue';
import Api from '@/utils/Api';
import { ref, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const item = ref()

onBeforeMount(() => {
    fetch()
})

const fetch = async () => {
    try {

        const api = await Api.get(`/show-detail-product/${route.params.id}`)

        item.value = api.data

        console.log(api)
    } catch (err) {

    }
}


</script>

<template>
    <div class="mx-[30px] min-h-[100vh] pb-[120px]">

        <div class="flex justify-between items-center mt-[10px]">
            <router-link to="/membership">
                <img class="" src="" alt="">
            </router-link>
            <router-link to="/home">
                <img src='@/assets/logo.png' alt="logo">
            </router-link>
        </div>

        <h1 class="font-black text-[36px] leading-[49px] text-[#23690a] mt-[24px]">Detail Produk</h1>

        <img class="rounded-[17px] h-[198px] w-full object-cover" :src="item?.thumbnail" alt="">

        <h2 class="font-black text-[32px] leading-[49px] text-[#23690a] mt-[24px]">{{ item?.nama_produk }}</h2>
        <p class="text-[32px] leading-[49px] text-[#23690a]">Rp{{
            item?.harga?.toString()?.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") }}</p>
        <div class="flex items-center gap-[9px]">
            <img src="@/assets/heart-wishlist.svg" alt="heart">
            <p class="text-[#FD8709] text-[16px] font-bold mt-[2px]">{{ item?.point_berdampak }} Poin Berdampak</p>
        </div>
        <div class="text-[#23690a] mt-[22px] leading-tight" v-html="item?.description">
        </div>
    </div>
    <router-link :to="`/product/${item?.id_product}/checkout`">
        <div class="fixed bottom-[110px] inset-x-0 w-full mx-auto max-w-[430px]">
            <button class="flex justify-between px-[14px] py-[11px] w-full bg-[#FD8709] text-white font-bold rounded-full">
                <span>1 Item</span>
                <div class="flex gap-[11px]">
                    <span>{{ item?.harga }}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="currentColor" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round"
                            d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                </div>
            </button>
        </div>
    </router-link>
    <BottomNavbar />
</template>