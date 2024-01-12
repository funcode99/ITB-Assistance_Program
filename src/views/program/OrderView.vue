<script setup>

    import { onBeforeMount, ref } from 'vue';
    import { useStore } from 'vuex';

    import BottomNavbar from '@/components/BottomNavbar.vue';

    import Api from '@/utils/Api';
    import Convert from '@/utils/ConvertDate'

    let data = ref({})
    const store = useStore()

    onBeforeMount(() => {
        fetch()
    })

    const fetch = async () => {
        store.commit('isLoading', true)
        const token = JSON.parse(localStorage.getItem('token'))
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;
        const api = await Api.get('/show-orders')
        data.value = api?.data?.data
        store.commit('isLoading', false)
    }

</script>

<template>

<div class="min-h-[100vh]">
    
    <!-- <div class="flex justify-between items-center px-[30px] mt-[10px]">
                <router-link to="/home">
                    <img src='@/assets/logo.png' alt="logo">
                </router-link>
                <router-link to="/membership">
                    <img class="" 
                    src=""
                    alt=""
                    >
                </router-link>
    </div> -->

    <div class="flex justify-between items-center px-[30px] mt-[10px]">
        <router-link to="/membership">
            <img 
            class=""
            src=""
            alt=""
            >
        </router-link>
        <router-link to="/home">
            <img src='@/assets/logo.png' alt="logo">
        </router-link>
    </div>
    
    <h1 class="font-black text-[32px] text-[#23690a] text-center mt-[30px] leading-[43px]">Riwayat Order</h1>
    
    <section v-if="data" class="flex flex-col items-center">
            <!-- order item -->
            <ul>
                <li v-for="isi in data" :key="isi">
                    
                    <router-link 
                :to="`/deliverydetail/${isi?.id_order}/${isi?.status_order}/${isi?.nama_produk}/${isi?.total_bottle}`"
      
                >
                    
                    <div class="my-[23px]">
    
                        <div class="relative px-[8%] rounded-[19px]">
                            <img :src="isi?.slug" alt="Order Picture" class="rounded-[19px] w-[100%]">
                            <div class="absolute top-[10%] right-[12%] rounded-[12px] bg-[#23690a] text-center px-[9px] h-[27px]">
                                <span class="text-[20px] font-black text-white">{{ isi?.status_order }}</span>
                            </div>
                        </div>
            
                        <div class="flex justify-between text-[#23690a] px-[8%]">

                            <div class="font-black w-[70%] text-[20px]">
                                <h1>{{ isi?.nama_produk }}</h1>
                                <h1>{{ isi?.total_bottle }} Botol</h1>
                                <p class="italic font-medium">Detail Paket</p>
                            </div>

                            <div class="w-[0%]"></div>

                            <div class="text-[16px] font-medium">
                                <h1 class="text-right">Tanggal Order</h1>
                                <h1 class="text-right">{{ Convert(isi?.tanggal_order_closing.slice(0,10)) }}</h1>
                            </div>

                        </div>
    
                    </div>
                </router-link>
    
                </li>
            </ul>
    
            <!-- <BottomNavbar /> -->
    </section>

    <section v-else class="flex flex-col items-center mt-[20px] gap-[20px]">
        <h1>Riwayat order tidak ditemukan</h1>

        <router-link to="/profile" class="cursor-pointer">
            <button class="p-3 bg-[#23690a] text-white rounded-[10px]">Kembali</button>
        </router-link>

    </section>

</div>
    <BottomNavbar />
</template>