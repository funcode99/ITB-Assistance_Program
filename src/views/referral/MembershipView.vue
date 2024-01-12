<script setup>
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import { useToast } from "vue-toastification";
import TabItem from '@/components/molecules/TabItem.vue';
import TabWrapper from '@/components/atomics/TabWrapper.vue';
import Api from '@/utils/Api';
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import BottomNavbar from '@/components/BottomNavbar.vue';

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

function directToEHC(url) {
    window.open(url, '_blank', 'noreferrer')
}

function directToWAGroup(url) {
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

    <div class="min-h-[100vh]">

        <div class="pb-[8px]" v-if="data?.member?.member_status !== undefined">
    
            <div class="flex justify-between items-center mt-[10px]">
                <router-link to="/membership">
                    <img class="" 
                    src="@/assets/SehatiClubLogoSmall.svg"
                    alt=""
                    >
                </router-link>
            </div>
    
            <h1 class="text-[24px] font-black text-[#23690a] px-[6%]">Your Sehati Membership</h1>
    
            <!-- card section -->
            <div class="px-[6%]">
    
                <div :class="
                [
                    data?.member?.member_status === 'Green Member' ?
                `bg-[url('/src/assets/ITsBuahGreen.svg')]` 
                : 
                    data?.member?.member_status === 'Elite Member' ? 
                `bg-[url('/src/assets/ITsBuahElite.svg')]` 
                : 
                ''
                ]"
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
    
    
            <tab-wrapper class="mt-[20px]">
    
                <tab-item class="font-black text-[22px] leading-[30px] text-[#23690a]" title="Riwayat Transaksi">
    
                    <section class="text-[#23690a] flex flex-col gap-[27px] px-[6%] leading-[20px]">
    
                        <div class="px-[6%] text-[16px] mb-[15px]" v-if="data?.transaction_history?.length === 0">
                            Tidak ada catatan transaksi
                        </div>
    
                        <section class="text-[#23690a] min-h-[140px]" v-else>
                            <h1 class="italic font-medium text-[13px]">7 Transaksi Terakhir</h1>
                            <ul class="my-[32px]">
                                <li v-for="isi in data?.transaction_history" :key="isi">
                                    <div class="text-[15px] mb-[27px]">
                                        <h1 class="font-medium text-[#fd8709]">Poin Referral</h1>
                                        <div class="flex justify-between font-black">
                                            <h1>{{ isi?.source }}</h1>
                                            <h1>+{{ isi?.point }} Points</h1>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </section>
    
                    </section>
    
                    <div class="bg-[#23690a] w-[80%] h-[5px] m-auto"></div>
    
                    <section class="text-[#23690a] mt-[16px] max-[320px]:px-[2%] min-[321px]:px-[4%]">
                        <h1 class="font-black text-[22px]">Program Referral</h1>
                        <h1 class="text-[13px] leading-[18px] font-medium">Dapatkan poin di setiap transaksi menggunakan
                            kode Anda!</h1>
    
                        <div class="flex justify-between mt-[5px]">
    
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
    
                        <h1 class="mt-[16px] text-[13px] leading-[17px] font-medium italic">
                            Masukkan nama, nomor, dan kota teman Anda agar kami dapat menghubungi mereka secara langsung.
                            Setiap pengisian 1 data Anda berhak mendapatkan 1 poin!
                        </h1>
    
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
    
                    </section>
    
    
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
    
                </tab-item>
    
                <tab-item class="font-black text-[22px] leading-[30px] text-[#23690a]" title="Riwayat Penukaran">
    
                    <section class="text-[#23690a] flex flex-col gap-[27px] px-[6%] leading-[20px]">
    
                        <div class="px-[6%] text-[16px] mb-[15px]" v-if="data.redemption_history?.length === 0">
                            Tidak ada catatan penukaran
                        </div>
    
                        <section class="text-[#23690a] min-h-[140px]" v-else>
                            <h1 class="italic font-medium text-[13px]">7 Transaksi Terakhir</h1>
                            <ul class="my-[32px]">
                                <li v-for="isi in data?.redemption_history" :key="isi">
                                    <div class="text-[15px] mb-[27px]">
                                        <h1 class="font-medium text-[#fd8709]">Poin Referral</h1>
                                        <div class="flex justify-between font-black">
                                            <h1>{{ isi?.source }}</h1>
                                            <h1>{{ isi?.point }} Points</h1>
                                        </div>
                                    </div>
                                </li>
                            </ul>
                        </section>
    
                    </section>
    
                    <div class="bg-[#23690a] w-[80%] h-[5px] m-auto"></div>
    
                    <section class="text-[#23690a] mt-[16px] px-[4%]">
    
                        <h1 class="font-black text-[22px] leading-[30px]">Program Referral</h1>
                        <h1 class="text-[13px] leading-[18px] font-medium">
                            Dapatkan poin di setiap transaksi menggunakan kode Anda!
                        </h1>
    
                        <div class="flex justify-between mt-[5px]">
                            <div class="flex flex-col justify-evenly text-[15px] leading-[20px]">
                                <h1 class="font-medium">
                                    Tautan referral Anda
                                </h1>
                                <input class="font-black min-[375px]:w-[240px]" :value="referral" type="text" disabled>
                            </div>
                            <div>
                                <button @click="showDialog"
                                    class="px-[16px] py-[11px] text-white text-[11px] bg-[#23690a] rounded-[8px]">
                                    Bagikan
                                </button>
                            </div>
                        </div>
    
                        <h1 class="mt-[16px] text-[13px] leading-[17px] font-medium italic">
                            Masukkan nama, nomor, dan kota teman Anda agar kami dapat menghubungi mereka secara langsung.
                            Setiap pengisian 1 data Anda berhak mendapatkan 1 poin!
                        </h1>
    
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
    
                </tab-item>
            </tab-wrapper>
    
            <div class="grid grid-cols-2 gap-[23px] px-[8%] text-[#23690a] mt-[16px]">
    
                <button @click="directToWAGroup(data?.link_wa_group)"
                    class="w-[100%] border-[#23690a] border-[3px] rounded-[17px] pr-[13px] pb-[13px] text-right">
                    <img class="pt-[14px] pl-[14px]" src="@/assets/whatsapp-2.svg" alt="">
                    <p class="mt-[6px] text-[19px] font-black">
                        Bergabung Sehati Club
                    </p>
                    <p class="text-[14px]">
                        Join WhatsApp Group
                    </p>
                </button>
    
                <router-link to="/faq" tag="button"
                    class="w-[100%] border-[#23690a] border-[3px] rounded-[17px] text-right pr-[15px] pb-[14px]">
                    <img class="pt-[14px] pl-[14px]" src="@/assets/faq.svg" alt="">
                    <p class="mt-[22px] text-[19px] font-black">
                        FAQ
                    </p>
                    <p class="text-[14px]">
                        Frequently Asked Question
                    </p>
                </router-link>
    
            </div>
    
            <div class="px-[8%] mt-[27px]">
                <router-link to="/read" tag="button" class="block">
                    <div class="flex items-center gap-[4%] pl-[3%] pr-[5%] border-[#23690a] border-[3px] rounded-[17px]">
                        <img src="@/assets/SehatiClubLogoSmall.svg" alt="">
                        <p class="text-[16px] font-black text-[#23690a]">
                            Baca lebih lanjut mengenai Referral Program Sehati Club
                        </p>
                    </div>
                </router-link>
            </div>
            <!-- <BottomNavbar class="px-[8%]" /> -->
        </div>
    
        <div v-else>
            <h1>Memuat Data</h1>
        </div>
    </div>

    <BottomNavbar />
</template>

<style scoped>
.stroke {
    text-shadow:
        -1px -1px 0 white,
        1px -1px 0 white,
        -1px 1px 0 white,
        1px 1px 0 white;
}

html {
    box-sizing: border-box;
}

*,
*::before,
*::after {
    box-sizing: inherit;
    padding: 0;
    margin: 0;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, San Francisco, Helvetica Neue, Helvetica, Ubuntu, Roboto, Noto, Segoe UI, Arial, sans-serif;
}

.hidden {
    display: none;
}

.copy-link {
    padding-left: 30px;
    padding-right: 30px;
}

.share-dialog {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.share-dialog {
    display: none;
    width: 95%;
    max-width: 500px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, .15);
    z-index: -1;
    border: 1px solid #ddd;
    padding: 20px;
    border-radius: 4px;
    background-color: #fff;
}

.share-dialog.is-open {
    display: block;
    z-index: 2;
}

.close-button {
    background-color: transparent;
    border: none;
    padding: 0;
}

.close-button svg {
    margin-right: 0;
}

.link {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    border-radius: 4px;
    background-color: #eee;
}

.pen-url {
    margin-right: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>