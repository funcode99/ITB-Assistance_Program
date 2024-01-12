<script setup>
import { onBeforeMount, ref, reactive } from 'vue'
import { useModal, Modal } from "usemodal-vue3";
import { useToast } from "vue-toastification";

import router from '@/router';

// dikomentari karena hli nya belum jadi
// import AppDropdownContent from '@/components/atomics/AppDropdownContent.vue';
// import AppDropdownItem from '@/components/atomics/AppDropdownItem.vue';

import AppDropdown from '@/components/molecules/AppDropdown.vue';
import BottomNavbar from '@/components/BottomNavbar.vue';
import SelectCategory from '@/components/molecules/SelectCategory.vue';
import VideoCard from '@/components/molecules/VideoCard.vue';
import SelectBlogCategory from '@/components/molecules/SelectBlogCategory.vue'
import BlogCard from '@/components/molecules/BlogCard.vue'

import Api from '@/utils/Api'
import directToEHC from '@/utils/DirectToEHC';
import setTrial from '@/utils/SetTrial'


let modalVisible = reactive({});
let setModal = useModal({
    poinBerdampak: 1
});
modalVisible = setModal("poinBerdampak", false)

const toast = useToast();
const data = ref()
const info = ref({})
const profile = ref()
const sehat = ref()
let category = ref('Gizi')
let blogCategory = ref('Hot News')
const user = JSON.parse(localStorage.getItem('user'))
const nextDelivery = ref({})
const runningDelivery = ref({})


const onCategoryChange = (newCategory) => {
    category = newCategory
    console.log(category)
    fetch()
}

const onBlogCategoryChange = (newBlog) => {
    blogCategory = newBlog
    fetch()
}

// hanya perlu di define pada children component
// defineProps({
//     dataCategory: Object,
//     videoCategory: String
// })

onBeforeMount(async () => {
    fetch()
})

const fetch = async () => {

    const token = JSON.parse(localStorage.getItem('token'))
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const api = await Api.get('/berdampak-point')
    data.value = api?.data

    const api2 = await Api.get('/lifewell')
    info.value = api2?.data?.data

    const api3 = await Api.get('/show-dashboard-homepage')
    profile.value = api3?.data?.data

    localStorage.setItem('trial_status', profile.value.is_trial)
    localStorage.setItem('subscription_status', profile.value.subscription)

    nextDelivery.value = api3.data?.data?.next_delivery
    runningDelivery.value = api3.data?.data?.running_delivery
    localStorage.removeItem('shipId')
    const shipId = localStorage.setItem('shipId', api3.data?.data?.running_delivery.id_pengiriman)

    const api4 = await Api.get('/blog')
    sehat.value = api4?.data?.data
    console.log(sehat)
}

localStorage.setItem('running_program', profile?.running_program?.program_name)

//digunakan saat sudah menjalankan free trial
// const handleMealPlanDirect = () => {
//     if(profile?.running_program?.program_name) {
//         router.push('/mealplan')
//     }
//     else {
//         toast.error('Tidak ada program mealplan yang berjalan')
//     }
// }

const showPoinBerdampak = () => {
    console.log('masuk show poin berdampak')
    modalVisible = setModal("poinBerdampak", true)
}

const closePoinBerdampak = () => {
    modalVisible = setModal("poinBerdampak", false)
}

</script>

<template>
    <div class="min-h-[100vh]">

        <!-- <div class="flex justify-between items-center mt-[10px] mx-[30px]">
                        <router-link to="/home">
                <img src='@/assets/logo.png' alt="logo">
            </router-link>
            <router-link to="/membership">
                <img class="" src="" alt="">
            </router-link>
        </div> -->

    <div class="flex justify-between items-center px-[30px] mt-[10px]">
            <router-link to="/membership">
                <img class="" src="" alt="">
            </router-link>
            <router-link to="/home">
                <img src='@/assets/logo.png' alt="logo">
            </router-link>
        </div>

        <div class="pb-4 px-[8%]">

            <div class="flex justify-between mt-[25px]">
                <div class="text-[32px] leading-[33px] text-[#23690a]">
                    <h1 class="font-medium">Selamat Pagi,</h1>
                    <h1 class="font-black">{{ user.nama_customer }}</h1>

                <!-- <h1>
                            {{ profile?.is_trial }}
                        </h1>
                        <h1>
                            {{ profile?.subscription }}
                        </h1> -->

            </div>

        </div>

        <div class="border-2 border-[#23690a] flex justify-evenly mt-[22px] rounded-[20px] px-[5%] py-[19px]">

            <div class="flex gap-[20px]">
                <img src="@/assets/red-bottle.svg" alt="">
                <div v-if="Object.keys(profile?.running_program).length" class="">
                    <h1 class="text-[15px] font-black leading-[20px] text-[#23690a]">Paket Kamu</h1>
                    <h1 class="title font-black text-[#e99f49]">{{ profile?.running_program?.program_name }}</h1>
                    <h1 class="text-[15px] text-[#23690a]">Saldo Botol <b class="font-black">{{
                        profile?.running_orders?.jumlah_botol - profile?.running_orders?.jumlah_botol_terkirim
                    }}</b></h1>
                </div>
                <div v-else-if="profile?.is_trial == 1 && profile?.subscription == 0">
                    <h1 class="text-[15px] font-black leading-[20px] text-[#23690a]">Paket Kamu</h1>
                        <h1 class="title font-black text-[#e99f49]">TRIAL LIFEWELL</h1>
                        <h1 class="text-[15px] text-[#23690a]">Saldo Botol <b class="font-black">{{
                            profile?.running_orders?.total_bottle_remaining }}</b></h1>
                    </div>
                    <div class="flex flex-col justify-center" v-else>
                        <h1 class="text-[12px] text-[#23690a] leading-[20px] font-black">Kamu belum punya program</h1>
                        <h4 class="text-[8px] text-[#e99f49] leading-[11px] font-black cursor-pointer">Pesan program kamu
                            sekarang</h4>
                    </div>
                </div>

                <div class="border-2 border-right mx-[2%]">

                </div>
                <div class="flex flex-col mt-[10px]">
                    <!-- <div>
                                                    <u class="text-[12px] font-light text-[#23690a] mt-[4px]">Lihat rincian</u>
                                                </div> -->
                    <div class="cursor-pointer">
                        <h1 @click="showPoinBerdampak"
                            class="text-[10px] text-left font-black text-[#23690a] leading-[20px]">
                            Poin Berdampak
                        </h1>
                        <!-- <img src="@/assets/infocircle.png" /> -->
                    </div>

                    <h1 class="text-[32px] leading-[43px] text-[#e99f49] font-black">{{ data?.my_points?.points }}
                    </h1>
                </div>
            </div>

            <!-- Icon -->
            <div class="grid grid-cols-4 mt-[28px] text-[12px] font-bold leading-[16px] text-center">

                <router-link to="/Program">
                    <div class="flex flex-col items-center justify-center">
                        <img src="@/assets/ProgramIcon.svg" alt="Program">
                        <span class="mt-[8px]">Program Kamu</span>
                    </div>
                </router-link>

                <!-- <div class="cursor-pointer" @click="handleMealPlanDirect" >
                                                    <div class="flex flex-col items-center justify-center">
                                <img src="@/assets/MealplanIcon.svg" alt="Mealplan">
                                <span class="mt-[8px]">Mealplan</span>
                            </div>
                        </div> -->

            <router-link to="/mealplan">
                <div class="flex flex-col items-center justify-center">
                    <img src="@/assets/MealplanIcon.svg" alt="Mealplan">
                    <span class="mt-[8px]">Mealplan</span>
                </div>
            </router-link>

            <div slot="toggler">
                <AppDropdown class="z-20">

                    <router-link to="/bmi" class="flex flex-col items-center justify-center">
                        <img src="@/assets/BMIIcon.svg" alt="BMI">
                            <span class="mt-[8px]">Indeks Kesehatan</span>
                        </router-link>

                        <!-- <AppDropdownContent>
                                                                <router-link to="/bmi">
                                                                    <AppDropdownItem class="text-left">
                                                                        <h1 class="font-black text-[15px] text-[#23690a]">Body Mass Index</h1>
                                                                    </AppDropdownItem>
                                                                </router-link>
                                                                <AppDropdownItem class="text-left">
                                                                    <h1 class="font-black text-[15px] text-[#23690a]">Health Lifestyle Index</h1>
                                                                </AppDropdownItem>
                                                            </AppDropdownContent> -->

                    </AppDropdown>
                </div>

                <router-link to="/product">
                    <div class="flex flex-col items-center justify-center">
                        <img src="@/assets/ProductIcon.svg" alt="Product">
                        <span class="mt-[8px]">Produk</span>
                    </div>
                </router-link>
            </div>

            <!-- Berdampak Card -->
            <!-- <div class="border-2 rounded-[19px] border-solid border-[#23690a] flex px-[4%] py-[21px] gap-[14px] mt-[30px] relative">

                                            <img src="@/assets/clipboard.svg" alt="clipboard">

                                            <div class="absolute left-[22%] right-[5%] bottom-[10%] flex flex-col justify-between items-end text-[#227900]">

                                                <div class="flex justify-between min-w-[100%]">
                                                    <h1 class="font-black text-[16px] leading-[22px] text-[#23690a]">Laporan Berdampak</h1>
                                                    <u class="text-[12px] font-light">Lihat rincian</u>
                                                </div>

                                                <div class="flex gap-[10%] min-w-[100%]">
                                                    <div class="">
                                                        <h3 class="text-[12px] font-medium">Total botol terkumpul</h3>
                                                        <p class="text-[14px] font-black">{{ data?.laporan_berdampak?.total_terkumpul }}</p>
                                                    </div>
                                                    <div class="border-2 border-[#d1d1d1]"></div>
                                                    <div>
                                                        <h3 class="text-[12px] font-medium">Total botol tersalurkan</h3>
                                                        <p class="text-[14px] font-black">{{ data?.laporan_berdampak?.total_tersalurkan }}</p>
                                                    </div>
                                                </div>

                                            </div>

                                        </div> -->

            <h1 class="text-[16px] font-black leading-[22px] text-[#23690a] my-[10px]">#SehatBerdampak</h1>

            <!-- Sehat Berdampak video -->
            <div class="scrolling-wrapper-flexbox">

                <div v-for="(item, index) in sehat?.sehat_berdampak" :key="index">
                    <div class="cards">
                        <iframe class="mt-[19px]" width="156" height="87" :src="item?.video" title="YouTube video player"
                            frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowfullscreen></iframe>
                    </div>
                    <h1 class="text-[16px] font-bold">{{ item?.title }}</h1>
                </div>

            </div>

            <!-- Lifewell video -->
            <div class="">
                <h1 class="mt-[28px] text-[16px] font-black leading-[21px] text-[#23690a]">Lifewell Video</h1>
                <SelectCategory @response="onCategoryChange" />
                <div class="mt-[10px] h-[280px] overflow-y-auto scrollbar-hide">
                    <div class="">
                        <VideoCard
                            :class="[profile?.is_trial == 0 && profile?.subscription == 0 || profile?.is_trial == 2 && profile?.subscription == 0 ? `pointer-events-none inset-0 bg-black/50` : '']"
                            :dataCategory="info" :videoCategory="category" />
                    </div>
                </div>
            </div>

            <!-- Blog Content -->
            <div class="">
                <h1 class="mt-[28px] text-[16px] font-black leading-[21px] text-[#23690a]">Blog IT's Buah</h1>
                <SelectBlogCategory @response="onBlogCategoryChange" />
                <div class="mt-[10px] h-[280px] overflow-y-auto scrollbar-hide">
                    <BlogCard :dataCategory="sehat?.blog" :blogCategory="blogCategory" />
                </div>
            </div>

        </div>

        <!-- <Modal class="flex justify-center" type="clean" name="freeTrial" v-model:visible="modalVisible">
                                    <div class="max-w-[86%] h-[260px] bg-white rounded-[35px] px-[29px] pt-[44px]">

                                        <h1 class="text-[22px] font-bold">Kamu belum memiliki paket yang berjalan!</h1>

                                        <div class="flex flex-col items-center justify-center mt-[28px]">
                                            <button @click="setTrial"
                                                class="bg-[#e99f49] flex items-center justify-center w-[197px] h-[41px] rounded-[19px]">
                                                Claim free trial
                                            </button>
                                            <button @click="directToEHC"
                                                class="bg-[#e99f49] flex items-center justify-center w-[197px] h-[41px] rounded-[19px] mt-[12px]">
                                                Belanja sekarang
                                            </button>
                                        </div>

                                    </div>
                                </Modal> -->

        <Modal class="flex justify-center" type="clean" name="poinBerdampak" v-model:visible="modalVisible">
            <div class="max-w-[86%] h-[400px] bg-white rounded-[35px] px-[29px] pt-[44px]">
                <h1 class="text-[22px] font-bold text-[#23690a]">Berdampak Poin adalah poin yang akan Anda dapatkan saat
                    membeli Program. Jika poin yang didapatkan semakin banyak, maka semakin banyak juga botol Donasi yang
                    akan Anda berikan. Setiap 1 poin yang Anda punya, sama juga dengan berdonasi 1 botol Cold Pressed Juice.
                </h1>
                <div @click="closePoinBerdampak" class="flex justify-center text-white bg-[#23690a] p-[5px] cursor-pointer">
                    <button>Tutup</button>
                </div>
            </div>
        </Modal>

    </div>

    <BottomNavbar />
</template>

<style lang="scss">
.title {
    font-size: clamp(11px, 3vw, 15px);
}

.scrolling-wrapper-flexbox {

    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;

    .cards {
        flex: 0 0 auto;
        margin-right: 17px;
    }
}

.cards {
    width: 156px;
    height: 87px;
}

.scrolling-wrapper-flexbox {

    margin-bottom: 20px;
    width: 100%;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
        display: none;
    }

}
</style>