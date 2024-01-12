<script setup>
import BottomNavbar from '@/components/BottomNavbar.vue';
import Api from '@/utils/Api';
import { onBeforeMount, ref } from 'vue';

const items = ref()

onBeforeMount(() => {
    fetch()
})

const fetch = async () => {
    try {
        const api = await Api.get('/show-products')

        items.value = api.data

        console.log(api)
    } catch (err) {

    }
}

const EHCNumber = [628111957666, 6281387612828, 6281387612837, 6281387612842]

async function directToEHC(url) {
    window.open(url, '_blank', 'noreferrer')
}

</script>

<template>
    <div class="mx-[30px] min-h-[100vh]">

        <div class="flex justify-between items-center mt-[10px]">
            <router-link to="/membership">
                <img class="" src="" alt="">
            </router-link>
            <router-link to="/home">
                <img src='@/assets/logo.png' alt="logo">
            </router-link>
        </div>

        <h1 class="font-black text-[36px] leading-[49px] text-[#23690a] mt-[24px]">Katalog Produk</h1>

        <img src="" alt="">

        <div class="grid grid-cols-2 gap-x-4 my-[12px] text-[#23690a]">
            <router-link :to="`/product/${item.id_product}`" v-for="item in items" :key="item.id_product">
                <div class="mb-[19px] cursor-pointer">
                    <img class="rounded-[17px]" :src="item.thumbnail" alt="thumbnail">
                    <div class="flex items-center relative">
                        <div class="mt-[4px]">
                            <h1 class="font-black text-[15px] leading-[20px]">{{ item.nama_produk }}</h1>
                            <p class="font-black text-[15px] leading-[20px]">Rp{{
                                item.harga?.toString()?.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") }}</p>
                            <div class="flex items-center gap-[3px] mt-[4px]">
                                <img src="@/assets/heart-wishlist.svg" alt="">
                                <span class="text-[#fd8709] font-bold text-[10px]">{{ item.point_berdampak }} Poin
                                    Berdampak</span>
                            </div>
                        </div>
                        <div class="mr-[15px] absolute right-0 top-[50%]">
                            <img class="w-[23px] h-[23px]" src="@/assets/shopping-cart-4x.png" alt="">
                        </div>
                    </div>

                </div>
            </router-link>
        </div>

    </div>

    <BottomNavbar />
</template>

<style></style>
<!-- img {
    border-radius: 17px;
}

div h1, div p {
    font-weight: 900;
    font-size: 15px;
    line-height: 20px;
}

.grid div {
    margin-top: 20px;
} -->