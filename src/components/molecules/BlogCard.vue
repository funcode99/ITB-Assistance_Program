<script setup>
import { ref, reactive } from 'vue'
import { useModal, Modal } from "usemodal-vue3";
const props = defineProps({
    dataCategory: Object,
    blogCategory: String
})

const toFillContent = ref(true)
let content = ref()

const trialStatus = localStorage.getItem('trial_status')
const subscriptionStatus = localStorage.getItem('subscription_status')

let modalVisible = reactive({});
let setModal = useModal({
  contentModal: 1,
})
modalVisible = setModal("contentModal", false);


const showModal = (contentShow) => {
    modalVisible = setModal("contentModal", true);
    content = contentShow
}

const directToGoogleDrive = (url) => {
    // const EHCNumber = [628111957666, 6281387612828, 6281387612837, 6281387612842]
    // const url = `https://wa.me/${EHCNumber[Math.floor(Math.random() * EHCNumber.length)]}`
    window.open(url, '_blank', 'noreferrer')
}

</script>

<template>

    <div class="mt-[20px] flex flex-col gap-[23px]" v-if="props.blogCategory === 'Hot News'">
        <div class="flex gap-[11px] items-center" v-for="(item, index) in props?.dataCategory?.hot_news" :key="index">    
            <div v-if="toFillContent == true ? content = item?.content : '' "></div>
            <img @click="showModal(item?.content)" :src="item?.thumbnail" alt="" width="156" height="87">
            <h1 @click="showModal(item?.content)" class="text-[16px] font-bold leading-[21px]">{{ item.title }}</h1>
        </div>
    </div>

    <div class="mt-[20px] flex-col gap-[23px]" v-else-if="props.blogCategory === 'Artikel'">
        <h1 class="font-black text-[24px] mt-[17px]">COMING SOON</h1>
        <!-- <div class="flex gap-[11px] items-center" v-for="(item, index) in props.dataCategory.artikel" :key="index">    
            <h1>{{ item.title }}</h1>
        </div> -->
    </div>

    <div 
    class="mt-[20px] flex-col gap-[23px]" 
    :class="[trialStatus == 0 && subscriptionStatus == 0 || trialStatus == 2 && subscriptionStatus == 0 ? `pointer-events-none inset-0 bg-black/50` : '']" v-else>
    
        <div class="flex gap-[11px] items-center" v-for="(item, index) in props?.dataCategory?.ebook" :key="index">
            <div v-if="toFillContent == true ? content = item?.content : '' "></div>    
            <img @click="directToGoogleDrive(content)" :src="item?.thumbnail" alt="" width="156" height="87">
            <h1 @click="directToGoogleDrive(content)" class="text-[16px] font-bold leading-[21px]">{{ item.title }}</h1>
        </div>
      
    </div>

    <Modal type="clean" name="contentModal" v-model:visible="modalVisible">

      <div
        class="max-w-[100%] h-[100%] bg-white rounded-[35px] px-[29px] pt-[44px] pb-[28px] overflow-y-hidden"
      >

        <img :src="content" alt="">

        <!-- <div v-for="(item, index) in props?.dataCategory?.hot_news" :key="index">
            <img :src="item?.content" alt="">
            <h1>{{ index }}</h1>
        </div> -->

      </div>
      
  </Modal>

</template>

<style>
.ytp-youtube-button {
    display: none;
}
</style>