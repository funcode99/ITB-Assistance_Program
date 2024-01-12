<script setup>
const props = defineProps({
    dataCategory: Object,
    videoCategory: String
})

const trialStatus = localStorage.getItem('trial_status')
const subscriptionStatus = localStorage.getItem('subscription_status')
</script>

<template>
    <div v-if="props.videoCategory === 'Gizi'">
        <div class="flex gap-[11px] items-center"
            :class="[trialStatus == 0 && subscriptionStatus == 0 || trialStatus == 2 && subscriptionStatus == 0 ? `pointer-events-none inset-0 bg-black/50` : '']"
            v-for="(item, index) in props.dataCategory.GIZI" :key="index">
            <iframe class="mt-[19px]" width="156" height="87" :src="item.source" title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            <h1>{{ item.title }}</h1>
        </div>
    </div>

    <div v-else-if="props.videoCategory === 'Olahraga'">
        <div class=""
            :class="[trialStatus == 0 && subscriptionStatus == 0 || trialStatus == 2 && subscriptionStatus == 0 ? `pointer-events-none inset-0 bg-black/50` : '']"
            v-for="(item, index) in props.dataCategory.OLAHRAGA" :key="index">
            <div v-if="!item?.source || !item?.title">
                Memuat video
            </div>
            <div class="flex gap-[11px] items-center" v-else>
                <iframe class="mt-[19px]" width="156" height="87" :src="item?.source" title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowfullscreen></iframe>
                <h1>{{ item?.title }}</h1>
            </div>
        </div>
    </div>

    <div v-else>
        <div class="flex gap-[11px] items-center"
            :class="[trialStatus == 0 && subscriptionStatus == 0 || trialStatus == 2 && subscriptionStatus == 0 ? `pointer-events-none inset-0 bg-black/50` : '']"
            v-for="(item, index) in props.dataCategory.WEBINAR" :key="index">
            <iframe class="mt-[19px]" width="156" height="87" :src="item.source" title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen></iframe>
            <h1>{{ item.title }}</h1>
        </div>
    </div>
</template>

<style>
.ytp-youtube-button {
    display: none;
}
</style>