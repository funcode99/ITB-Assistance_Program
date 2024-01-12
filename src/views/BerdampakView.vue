<script setup>
import BottomNavbar from '@/components/BottomNavbar.vue'
import Button from '@/components/atoms/Button.vue'
import Api from '@/utils/Api'
import { onBeforeMount, ref } from 'vue'
import RecapDonationBottomSheet from '@/components/molecules/RecapDonationBottomSheet.vue'
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { rupiah } from '@/utils/Helpers'

const recapDonationBottomSheet = ref()
const isOpenWhatIsBerdampakPoint = ref(false)
const data = ref({})

onBeforeMount(() => {
    fetch()
})

const fetch = async () => {
    try {
        const api = await Api.get('/berdampak-point')
        data.value = api.data

    } catch (err) {

    }
}
</script>

<template>
    <div class="relative min-h-screen">
        <img class="absolute top-0 -z-10" src="@/assets/banner-berdampak.png" alt="banner-berdampak">
        <div class="pb-4 px-[8%] pt-[54px]">
            <div class="bg-white p-7 rounded-[19px] shadow-2xl">
                <h2 class="text-[#3D622F] font-black text-[24px]">Poin Saya</h2>
                <div class="mt-2">
                    <div
                        class="min-w-[205px] w-max p-2 rounded-[15px] leading-none text-[48px] text-center text-[#FD8709] font-black border border-[#FD8709]">
                        {{ data.my_points?.points }}
                    </div>
                    <p class="text-[#FD8709] text-[12px] mt-[4px] font-bold">Telah berdonasi sebanyak {{
                        data.my_points?.bottles_donated }} botol di Tahun 2023
                    </p>
                </div>
                <div class="mt-[14px]">
                    <p class="text-[14px] font-bold text-[#3D622F]">Total botol terkumpul: <span
                            class="font-black text-[#FD8709]">{{ data.berbagi_sehat?.bottles_collected }} botol</span></p>
                    <p class="text-[10px] font-semibold text-[#3D622F]">Terhitung dari Januari, 2023</p>
                </div>
                <hr class="border-[#375A2A] my-[11px]" />
                <div>
                    <p class="text-[14px] font-bold text-[#3D622F]">Total botol tersalurkan: <span
                            class="font-black text-[#FD8709]">{{ data?.last_year_recap?.bottles_donated }}
                            botol</span></p>
                    <Button @click="() => recapDonationBottomSheet.open()"
                        class="text-[12px] font-bold !p-1 mt-[5px] !rounded-full" type="button" variant="success">Rekap
                        Jumlah Donasi
                        Cold
                        Pressed
                        Juice 2022</Button>
                </div>
            </div>
            <div class="mt-[14px] py-[14px] px-7 bg-white rounded-[19px] border border-[#5B5353] shadow-2xl">
                <div @click="isOpenWhatIsBerdampakPoint = !isOpenWhatIsBerdampakPoint"
                    class="flex items-center justify-between">
                    <p class="text-[15px] font-bold text-[#5B5353]">Apa itu Berdampak Poin?</p>
                    <svg v-if="!isOpenWhatIsBerdampakPoint" xmlns="http://www.w3.org/2000/svg" fill="none"
                        viewBox="0 0 24 24" stroke-width="1.5" stroke="#5B5353" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                        stroke="#5B5353" class="w-5 h-5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                    </svg>

                </div>
                <CollapseTransition>
                    <div class="mt-[14px]" v-show="isOpenWhatIsBerdampakPoint">
                        <ul class="flex flex-col gap-[15px]">
                            <li class="flex text-[#625B55] text-[12px] font-bold gap-[11px]">
                                <img src="@/assets/bp-1.svg" alt="berdampak-point-1">
                                <span>Poin akan didapatkan setiap Anda mengikuti Program Sehat.</span>
                            </li>
                            <li class="flex text-[#625B55] text-[12px] font-bold gap-[11px]">
                                <img src="@/assets/bp-2.svg" alt="berdampak-point-2">
                                <span>Total poin yang terkumpul akan dikonversikan ke dalam Cold Pressed Juice dan
                                    didonasikan kepada mitra dan yayasan untuk menuntaskan Triple Burden of Malnutrition
                                    melalui #GerakanSeratusRibuBotol</span>
                            </li>
                            <li class="flex text-[#625B55] text-[12px] font-bold gap-[11px]">
                                <img src="@/assets/bp-3.svg" alt="berdampak-point-3">
                                <span>1 Poin setara dengan donasi 1 Botol Cold Pressed Juice.</span>
                            </li>
                            <li class="flex text-[#625B55] text-[12px] font-bold gap-[11px]">
                                <img src="@/assets/bp-4.svg" alt="berdampak-point-4">
                                <span>Semakin banyak Berdampak Poin maka Masyarakat akan semakin Sehat!</span>
                            </li>
                        </ul>
                    </div>
                </CollapseTransition>
            </div>
            <div class="mt-[22px]">
                <img :src="data.event?.event_data?.thumbnail" alt="banner">
                <h2 class="text-[#23690A] text-[16px] font-extrabold mt-[14px] px-7">{{ data.event?.event_data?.headline }}
                </h2>
                <p class="font-bold text-[12px] text-[#5B5353] mt-[8px] px-7">{{ data.event?.event_data?.description }}</p>
            </div>
            <div class="mt-[35px]">
                <h2 class="text-[#23690A] font-black text-[22px] px-7">Riwayat Transaksi</h2>
                <p class="italic text-[#23690A] font-medium text-[12px] px-7">7 Transaksi Terakhir</p>
                <div class="mt-[11px] py-[18px] px-7 rounded-[19px] border border-[#5B5353]">
                    <ul class="flex flex-col gap-4">
                        <li class="flex justify-between" v-for="item in data.my_points?.transaction_histories">
                            <p class="text-[15px] font-black text-[#23690A]">{{ item.product }}</p>
                            <div class="flex flex-col text-end">
                                <span class="text-[15px] font-black text-[#FD8709]">+ {{ item.points }}
                                    Poin</span>
                                <span class="text-[10px] font-black text-[#949494]">{{ item.payment_method }} {{
                                    rupiah(item.total_payment) }}</span>
                            </div>
                        </li>
                        <li v-if="data.my_points?.transaction_histories.length === 0" class="flex justify-between">
                            <p class="text-[15px] font-black text-[#FD8709]">Transaksi Kosong</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <RecapDonationBottomSheet ref="recapDonationBottomSheet" :data="data.last_year_recap" />
    <BottomNavbar />
</template>