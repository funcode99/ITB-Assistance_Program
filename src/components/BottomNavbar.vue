<template>
    <div class="sticky bottom-0 left-0 right-0 bg-[#23690A] px-6 py-4 rounded-t-[19px] grid grid-cols-4 gap-[10px] w-[100%]">
        <router-link to="/home" tag="button">
            
            <div v-if="$route.path == '/home'" class="flex flex-col items-center text-white">
                
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                </svg>

                <span class="whitespace-nowrap mt-1 size">Beranda</span>
            
            </div>

            <div v-else class="flex flex-col items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>

                <span class="whitespace-nowrap mt-1 size">Beranda</span>
            </div>
        </router-link>

        <router-link to="/berdampak">
            <div v-if="$route.path == '/berdampak'" class="flex flex-col items-center text-white">
                <img src="@/assets/heart-white-bold.svg" alt="">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M10.5 3A1.501 1.501 0 009 4.5h6A1.5 1.5 0 0013.5 3h-3zm-2.693.178A3 3 0 0110.5 1.5h3a3 3 0 012.694 1.678c.497.042.992.092 1.486.15 1.497.173 2.57 1.46 2.57 2.929V19.5a3 3 0 01-3 3H6.75a3 3 0 01-3-3V6.257c0-1.47 1.073-2.756 2.57-2.93.493-.057.989-.107 1.487-.15z" clip-rule="evenodd" />
                </svg> -->
                <span class="whitespace-nowrap mt-1 size">Berdampak</span>
            </div>

            <div v-else class="flex flex-col items-center text-white">
                <img src="@/assets/heart-white-outline.svg" alt="">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
                </svg> -->
                <span class="whitespace-nowrap mt-1 size">Berdampak</span>
            </div>
        </router-link>

        <router-link to="/home/runningdelivery">
            <div v-if="$route.path == '/home/runningdelivery'" class="flex flex-col items-center text-white">
                <img src="@/assets/truck-bold.svg" alt="">
                <span class="whitespace-nowrap mt-1 size">Pengiriman</span>
            </div>

            <div v-else class="flex flex-col items-center text-white">
                <img src="@/assets/truck-outline.svg" alt="">
                <span class="whitespace-nowrap mt-1 size">Pengiriman</span>
            </div>
        </router-link>

        <router-link to="/profile" tag="button">

            <div v-if="$route.path == '/profile'" class="flex flex-col items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
                </svg>
                <span class="whitespace-nowrap mt-1 size">Profil Kamu</span>
            </div>

            <div v-else class="flex flex-col items-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                <span class="whitespace-nowrap mt-1 size">Profil Kamu</span>
            </div>
            
        </router-link>

</div>
</template>

<style>
    .size {
        font-size: clamp(10px, 3vw, 15px)
    }
</style>