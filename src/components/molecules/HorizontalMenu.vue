<script setup>
const props = defineProps({
    runningDelivery: {
        type: Object,
        default: {}
    },
    nextDelivery: {
        type: Object,
        default: {}
    }
})
</script>

<template>
    <div class="flex flex-nowrap space-x-[23px] overflow-x-auto -mx-[30px] mt-[23px] [&::-webkit-scrollbar]:h-0">
        <div class="min-w-[211px] ml-[30px]">
            <div class="flex flex-col bg-[#FDA0A0] rounded-[19px] p-[20px] text-[#23690A] relative z-10">
                <span>Pengiriman<br />Berjalan</span>
                <span class="font-bold text-[20px]">CB {{ runningDelivery.cooler_bag }}</span>
                <span class="font-bold text-[20px]">{{ runningDelivery.total_bottle ?? 0 }} Botol</span>
                <div class="absolute right-[11px] bottom-[11px]">
                    <img src="@/assets/logistics.svg" alt="logistic">
                </div>
            </div>
            <router-link to="/home/runningdelivery">
                <div class="bg-[#690A0A] h-[45px] px-[20px] rounded-b-[19px] flex items-end -mt-[19px]">
                    <span class="font-bold text-white">Tracking Pengiriman</span>
                </div>
            </router-link>
        </div>
        <div v-if="(!nextDelivery || Object.keys(nextDelivery).length > 0)" class="min-w-[211px] !mr-[30px]">
            <div class="flex flex-col bg-[#D3E1CE] rounded-[19px] p-[20px] text-[#23690A] relative z-10">
                <span>Pengiriman<br />Selanjutnya</span>
                <span class="font-bold mt-[3px]">{{ nextDelivery.jadwal_pengiriman }}</span>
            </div>
            <div class="bg-[#23690A] h-[45px] px-[20px] rounded-b-[19px] flex items-end -mt-[19px]">
                <span class="font-bold text-white">Lihat Lebih Lengkap</span>
            </div>
        </div>
    </div>
</template>