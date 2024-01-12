<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import Api from '@/utils/Api';
import { useStore } from 'vuex'
import { useToast } from "vue-toastification";
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import BottomNavbar from '@/components/BottomNavbar.vue'

let name = ref()
let telephone = ref()
let city = ref()
let data = ref({})
let referral = ref()
let referralcode = ref()
let username = JSON.parse(localStorage.getItem('user'))
const store = useStore()
const toast = useToast()
const isOpenStatusReferral = ref(false)
let sapaan = ref()
let referralname = ref()
let gender = ref()

async function submitNewMember() {
    store.commit('isLoading', true)
    try {

        const token = JSON.parse(localStorage.getItem('token'))
        // Set authorization for api
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const data = await Api.post('/referee', {
            name: name.value,
            telp: telephone.value,
            city: city.value
        })

        name.value = ''
        telephone.value = ''
        city.value = ''

        store.commit('isLoading', false)
        toast.info('Member berhasil ditambahkan')
        fetch()

    } catch (error) {
        store.commit('isLoading', false)
        // const toast = useToast();
        toast.error('Member gagal ditambahkan, nomor telephone tidak ada atau sudah pernah digunakan')
        console.log(error, 'submit gagal')
    }
}

async function directToEHC(url) {
    window.open(url, '_blank', 'noreferrer')
}

const referralStatusInit = computed(() => {
    console.log(data.value?.referral_status?.filter((item, index) => index < 2))
    return data.value?.referral_status.filter((item, index) => index < 2)
})

const referralStatusLoadMore = computed(() => {
    console.log(data.value?.referral_status?.filter((item, index) => index >= 2))
    return data.value?.referral_status.filter((item, index) => index >= 2)
})

onBeforeMount(() => {
    fetch()
})

const fetch = async () => {

    const token = JSON.parse(localStorage.getItem('token'))

    // Set authorization for api
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const api = await Api.get('/home-membership')
    data.value = api?.data?.data
    referral.value = 'app.itsbuah.com/invite/' + api.data?.data?.referral_link
    referralcode.value = 'app.itsbuah.com/invite/' + api.data?.data?.referral_link
    gender.value = api.data?.data?.member?.jenis_kelamin
    referralname.value = api.data?.data?.member?.nama_customer

}

async function showDialog() {
    console.log(gender.value)
    console.log(referralcode.value)
    console.log(referralname.value)
    // WebShare API
    if (navigator.share) {
        if ( gender.value === 'L') {
            sapaan = 'Bapak'
        } else {
            sapaan = 'Ibu'
        }
        await navigator.share({
            text: `Halo, Sahabat Sehat! Anda adalah orang yang terpilih oleh ${sapaan} - ${referralname.value} untuk ikut menjalankan pola hidup sehat bersama IT’s Buah! Anda akan langsung dapat poin yang dapat ditukar dengan Cold Press Juice hingga CASH, loh! Yuk, kunjungi tautan ini: ${referralcode.value}`
        })
            .then(() => {
                console.log(`Thanks for sharing!  ${referralcode.value}`);
            })
    }
    else {
        console.log(`masuk ke error showDialog ${gender.value}  ${referralname.value} ${referralcode.value}`)
    }
}
</script>

<template>
    <div class="px-[6%] pb-[8px]">

        <div class="flex justify-between items-center mt-[10px]">
            <router-link to="/membership">
                <img class="" 
                src="@/assets/SehatiClubLogoSmall.svg"
                alt=""
                >
            </router-link>
            <!-- <router-link to="/home">
                <img src='@/assets/logo.png' alt="logo">
            </router-link> -->
        </div>

        <h1 class="text-[#23690a] text-[36px] font-bold leading-[49px] mt-[16px]">Referral Program IT's Buah</h1>
        <p class="text-[20px] leading-[27px] text-justify font-normal mt-[10px]">Selamat datang di Program Referral IT's
            Buah. Mari bergabung dengan mengajak teman Anda dan dapatkan rewardnya secara langsung</p>
        <h1 class="text-[#23690a] text-[22px] leading-[30px] font-black mt-[47px] mb-[19px]">Bagaimana caranya?</h1>

        <section class="mb-[40px]">
            <div class="flex gap-[16px]">
                <div
                    class="rounded-full text-white min-w-[48px] h-[48px] bg-[#23690a] flex justify-center items-center">
                    <p class="text-[22px] text-white leading-[30px]">1</p>
                </div>
                <div class="text-[20px] leading-[27px] text-[#fd8709] font-black">
                    Isi kontak teman atau bagikan tautan referral
                </div>
            </div>
            <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                Isi data berupa nama, nomor dan kota teman yang akan anda ajak pada kolom berikut.
            </p>

            <!-- <img class="mt-[22px]" src="@/assets/InputGroup.svg" alt=""> -->
            <!-- input group -->
            <form class="flex flex-col gap-y-[9px] mt-[18px]" @submit.prevent="submitNewMember">

                <!-- gak perlu id="name" -->
                <div class="flex gap-x-[4px] items-center">
                    <label class="text-[15px] max-[320px]:max-w-[180px] font-medium" for="name">Nama :</label>
                    <input v-model="name"
                        class="bg-[#E4E4E4] max-[320px]:flex-1 min-[321px]:flex-1 rounded-[8px] h-[25px] text-[17px] pl-[2%]"
                        type="text">
                </div>

                <div class="flex gap-x-[4px] items-center">
                    <label class="text-[15px] max-[320px]:max-w-[180px] font-medium" for="telephone">Telepon
                        :</label>
                    <input v-model="telephone"
                        class="bg-[#E4E4E4] max-[320px]:flex-1 min-[321px]:flex-1 rounded-[8px] h-[25px] text-[17px] pl-[2%]"
                        type="tel"
                        oninput="this.value = this.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');">
                </div>

                <div class="flex gap-x-[4px] items-center">
                    <label class="text-[15px] max-[320px]:max-w-[180px] font-medium" for="city">
                        Kota :
                    </label>
                    <input v-model="city"
                        class="bg-[#E4E4E4] max-[320px]:flex-1 min-[321px]:flex-1 rounded-[8px] h-[25px] text-[17px] pl-[2%]"
                        type="text">
                </div>

                <div class="flex justify-end">
                    <button type="submit"
                        class="bg-[#23690a] text-white py-[7px] px-[16px] text-[11px] rounded-[8px]">
                        Kirim
                    </button>
                </div>

            </form>


            <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                Setiap 1 data valid (nomor yang benar dan kota yang tercover (Pulau Jawa, Lampung, Palembang)) Anda akan
                mendapatkan 1 poin!
            </p>
            <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                Atau, copy tautan referral Anda dengan dan bagikan kepada teman-teman Anda!
            </p>
            <!-- <img class="mt-[13px]" src="@/assets/ReferralGroup.svg" alt=""> -->
            <!-- referral group -->
            <section class="text-[#23690a] mt-[12px] ">
                <div class="flex text-[#23690a] justify-between items-center">
    
                    <div class="flex flex-col min-[321px]:justify-evenly text-[15px] leading-[20px]">
                        <h1 class="font-medium">Tautan referral Anda</h1>
                        <input class="font-black min-[375px]:w-[240px]" :value="referral" type="text" id="myInput" disabled>
                    </div>
    
                    <div>
                        <button type="button" title="Share this referral"
                            class="share-button py-[7px] text-white px-[16px] text-[11px] bg-[#23690a] rounded-[10px]"
                            @click="showDialog">
                            Bagikan
                        </button>
                    </div>
                    
                </div>
            </section>

        </section>

        <section class="mb-[40px]">
            <div class="flex gap-[16px]">
                <div
                    class="rounded-full text-white min-w-[48px] h-[48px] bg-[#23690a] flex justify-center items-center">
                    <p class="text-[22px] text-white leading-[30px]">2</p>
                </div>
                <div class="text-[20px] leading-[27px] text-[#fd8709] font-black">
                    Kumpulkan poin sebanyak-banyaknya
                </div>
            </div>
            <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                Apabila teman Anda berhasil bertransaksi, poin akan dibagikan untuk pemberi referral maupun penerima
                referral dimana pemberi referral akan mendapatkan poin yang lebih banyak (4:1)
            </p>
            <div class="flex justify-center">
                <img class="mt-[15px]" src="@/assets/number2svg.svg" alt="">
            </div>
            <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                Perhitungan poin berdasarkan membership:
            </p>
            <p class="text-justify text-[15px] leading-[20px]">
                Green Member: 5% x nominal transaksi
            </p>
            <p class="text-justify text-[15px] leading-[20px]">
                Elite Member: 8% x nominal transaksi
            </p>
        </section>

        <section class="mb-[40px]">
            <div class="flex gap-[16px]">
                <div
                    class="rounded-full text-white min-w-[48px] h-[48px] bg-[#23690a] flex justify-center items-center">
                    <p class="text-[22px] text-white leading-[30px]">3</p>
                </div>
                <div class="text-[20px] leading-[27px] text-[#fd8709] font-black">
                    Tukarkan poin dengan reward
                </div>
            </div>
            <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                Kumpulkan poin Anda dengan terus melakukan referral dan tukarkan dengan Cold Press Juice (dapat ditukar
                sebagai bonus botol atau didonasikan untuk berbagi sehat) atau uang tunai (penukaran uang tunai dapat
                dilakukan dengan nilai poin minimal sebesar 100 poin yang bernilai Rp.350.000)
            </p>
            <img class="mt-[5px]" src="@/assets/thepowerofsvg.svg" alt="">
        </section>

        <section class="mb-[0px]">

            <div class="flex gap-[16px]">
                <div
                    class="rounded-full text-white min-w-[48px] h-[48px] bg-[#23690a] flex justify-center items-center">
                    <p class="text-[22px] text-white leading-[30px]">4</p>
                </div>
                <div class="text-[20px] leading-[27px] text-[#fd8709]">
                    Isi kontak teman atau bagikan tautan referral
                </div>
            </div>

            <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                Anda dapat melihat jumlah poin yang telah terkumpul:
            </p>

            <!-- <img class="mt-[5px]" src="@/assets/Card.svg" alt=""> -->
            <div class="px-[0%]">

                <div :class="[data?.member?.member_status === 'Green Member' ?
                `bg-[url('/src/assets/ITsBuahGreen.svg')]` : data?.member?.member_status === 'Elite Member' ? `bg-[url('/src/assets/ITsBuahElite.svg')]` : '']"
                    class="gap-1 rounded-[21px] min-w-[88%] h-[140px] flex justify-center mt-[20px] relative">
    
                    <img class="max-[389px]:hidden absolute top-[20px] rounded-full overflow-hidden left-[5%]"
                        :src="data?.member?.member_photo" alt="">
    
                    <div class="mb-[7%] absolute top-[20px] bottom-[17px] max-[389px]:left-[8%] left-[28%] right-[8%]">
    
                        <div class="flex justify-between gap-[40px] text-white">
                            <div class="text-[15px] leading-[20px]">
                                <h1>No member</h1>
                                <h1 class="font-black">{{ data?.member?.no_member }}</h1>
                            </div>
                            <div class="text-[15px] leading-[20px]">
                                <h1>Jumlah Poin</h1>
                                <h1 class="font-black">{{ data?.member?.member_point }}</h1>
                            </div>
                        </div>
    
                        <div class="flex justify-between text-white items-center max-[422px]:mt-[10px] mt-[8%] mb-[8%]">
    
                            <div class="flex flex-col text-[15px]">
                                <h1 class="max-w-[200px] flex flex-wrap">{{ data?.member?.nama_customer.split(' ').length > 1 ? data?.member?.nama_customer.split(' ').slice(0, -1).join('') : data?.member?.nama_customer
                                }}</h1>
                                <div class="flex gap-[2px] items-center">
                                    <h1 class="font-black">{{ data?.member?.member_status }}</h1>
                                    <div class="bg-[#D9D9D9] h-[11px] w-[11px] px-[4px] py-[2px] relative rounded-full">
                                        <p
                                            class="absolute text-[#23690a] font-black left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] text-[10px]">
                                            i</p>
                                    </div>
                                </div>
                            </div>
    
                            <div>
                                <Button
                                    @click="directToEHC(`https://wa.me/${data?.member?.handle_by_telp}?text=Halo! Saya memiliki poin sehat yang ingin ditukarkan dengan reward.`)"
                                    class=" bg-[#fd8709] text-[15px] py-[9px] px-[11px] rounded-[8px]">
                                    Tukar Poin
                                </Button>
                            </div>
    
                        </div>
    
                    </div>
    
                </div>
    
            </div>

            <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                Selain itu, Anda pula dapat memantau status teman yang sudah Anda referralkan:
            </p>

            <!-- <img class="mt-[11px]" src="@/assets/number4s.svg" /> -->
            <!-- status referral -->
            <section class="px-[6%] text-[#23690a]">

                <div class="mt-[20px] flex justify-between items-center">
                    <h1 class="text-[22px] font-black">Status Referral</h1>
                    <h1 class="text-[13px] font-medium">7 Transaksi Terakhir</h1>
                </div>

                <div class="text-[15px] font-medium flex justify-between mt-[7px] mb-[15px]"
                    v-if="data?.referral_status?.length === 0">
                    <h1>Tidak ada catatan transaksi</h1>
                </div>

                <div v-else>
                    <div class="text-[15px] font-medium flex justify-between mt-[7px] mb-[15px]">
                        <h1>Nama</h1>
                        <h1>Status</h1>
                    </div>

                    <ul>
                        <li v-for="isi in referralStatusInit" :key="isi">
                            <div class="flex justify-between text-[15px] font-black">
                                <h1 class="">{{ isi?.referre?.name }}</h1>
                                <h1
                                    :class="[data?.referral_status?.status === 'Pending' ? 'text-[#ff0000] first-letter:uppercase' : '  first-letter:uppercase text-[#23690a]']">
                                    {{ isi?.status.toLowerCase() }}</h1>
                            </div>
                        </li>
                    </ul>
                    <collapse-transition dimension="height">
                        <ul v-show="isOpenStatusReferral">
                            <li v-for="isi in referralStatusLoadMore" :key="isi">
                                <div class="flex justify-between text-[15px] font-black">
                                    <h1 class="">{{ isi?.referre?.name }}</h1>
                                    <h1
                                        :class="[data?.referral_status?.status === 'Pending' ? 'text-[#ff0000] first-letter:uppercase' : '  first-letter:uppercase text-[#23690a]']">
                                        {{ isi?.status.toLowerCase() }}</h1>
                                </div>
                            </li>
                        </ul>
                    </collapse-transition>
                    <ul class="cursor-pointer">
                        <li @click="isOpenStatusReferral = !isOpenStatusReferral">
                            <div class="flex justify-between text-[15px] font-black">
                                {{ isOpenStatusReferral ? 'Lebih Sedikit' : 'Lebih Banyak' }}
                            </div>
                        </li>
                    </ul>
                </div>
            </section>

        </section>

        <img src="@/assets/comeonread.svg" alt="">

    </div>

    <BottomNavbar />
    <!-- <bottom-navbar /> -->

</template>

<style>

</style>