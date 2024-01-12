<script setup>
import { VueBottomSheet } from "@webzlodimir/vue-bottom-sheet";
import "@webzlodimir/vue-bottom-sheet/dist/style.css";
import { ref } from "vue";

const props = defineProps({
    data: {
        type: Object,
        default: {}
    }
})

const bottomSheet = ref(null)

const open = () => {
    bottomSheet.value.open();
}

const close = () => {
    bottomSheet.value.close();
}

defineExpose({
    open
})
</script>

<template>
    <vue-bottom-sheet ref="bottomSheet">
        <div class="m-[30px] p-[30px] mt-0 border border-[#5B5353] rounded-[19px] font-serif">
            <p class="font-extrabold text-[15px] text-[#3D622F]">Di tahun 2022 lalu, IT's Buah telah mendonasikan Cold
                Pressed Juice sebanyak</p>
            <h3 class="font-extrabold text-[32px] text-[#FD8709]">{{ props.data.bottles_donated }} botol</h3>
            <p class="font-bold text-[12px] text-[#3D622F]">ke mitra dan yayasan yang sudah bekerjasama dengan IT's Buah</p>
            <hr class="border-[#375A2A] mt-[10px] mb-[20px]" />
            <p class="font-extrabold text-[15px] text-[#3D622F]">Dari total botol yang sudah didonasikan, Anda telah
                berkontribusi sebanyak</p>
            <h3 class="font-extrabold text-[32px] text-[#FD8709]">{{ props.data.your_contribution }} botol</h3>
            <p class="font-bold text-[12px] text-[#3D622F]">Terima kasih #PahlawanSehat telah membantu untuk meningkatkan
                kualitas kesehatan masyarakat Indonesia dengan mengikuti Program Sehat IT’s Buah!</p>
        </div>
    </vue-bottom-sheet>
</template>