<script setup>
    import BottomNavbar from '@/components/BottomNavbar.vue';
    function directToWAGroup() {
    const url = `https://chat.whatsapp.com/FwG7TEZzP5PBOKktCFMl2q`
    window.open(url, '_blank', 'noreferrer')
}
</script>

<template>

<div class="min-h-[100vh] px-[9%]">

    <div class="">
        <h1 class="mt-[40px] text-[24px] font-black text-[#23690a] leading=[32px]">Your Sehati Membership</h1>
        <h1 class="my-[27px] text-[24px] font-bold leading-[32px]">COMING SOON</h1>
    </div>

    <div @click="directToWAGroup" class="flex justify-center cursor-pointer">
        <div class="flex relative w-[350px] h-[164px] bg-[url('/src/assets/membership-card.png')] bg-cover">
            <img class="absolute top-[17px] left-[15px]" src="@/assets/whatsapp.svg" width="50" height="50" alt="">
    
            <div class="text-white absolute right-[26px] bottom-[5px]">
                <h1>
                    Bergabung Sehati Club
                </h1>
                
                <h1>
                    Join WhatsApp Group
                </h1>
            </div>
    
        </div>
    </div>
</div>
<BottomNavbar />

</template>