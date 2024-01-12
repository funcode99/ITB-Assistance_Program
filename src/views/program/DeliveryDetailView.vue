<script setup>
    import { onBeforeMount, ref } from 'vue';
    import { useStore } from 'vuex';
    import { useRoute } from 'vue-router';
    import { useToast } from "vue-toastification";

    import BottomNavbar from '@/components/BottomNavbar.vue';
    import OrderViewVue from './OrderView.vue';

    import Api from '@/utils/Api';
    import Convert from '@/utils/ConvertDate'

    const data = ref({})
    const store = useStore()
    const route = useRoute()
    const toast = useToast()

    onBeforeMount(() => {
        fetch()
    })

    const fetch = async () => {
    store.commit('isLoading', true)

    const token = JSON.parse(localStorage.getItem('token'))
    // Set authorization for api
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const api = await Api.get(`/show-delivery/${route.params.idOrder}`)
    data.value = api?.data?.data
    store.commit('isLoading', false)
    }

</script>

<template>

    <div class="min-h-[100vh]">

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
    
        <div class="px-[6.5%]">
            <!-- tracking-tighter buat apaan cok, biar mepet git jarak font nya -->
            <h1 class="font-black text-[#23690a] text-[32px] text-center mt-[30px] leading-[43px]">Riwayat Order</h1>
            
            <div class="flex justify-between items-center text-[#23690a] mt-[48px]">
               <div class="leading-[34px] font-black">
                    <p class="text-[28px]">{{ `${route.params.product}` }}</p>
                    <p class="text-[28px]">{{ `${route.params.bottle}` }} Botol</p>
               </div>
                <div class="bg-[#23690a] px-[12px] py-[2px] rounded-[12px]">
                    <p class="font-black text-white text-[20px]">{{ `${route.params.status}` }}</p>
                </div>
            </div>
    
        </div>
    
        <div class="px-[8%] mt-[35px] pb-2">
            <div class="block relative m-auto">
                <ul class="my-[20px] mx-[0px] p-0 inline-block">
                    <li 
                    v-for="isi in data"
                    class="list-none m-auto min-h-[50px] pt-0 pr-0 pb-[50px] pl-[30px] relative border-l-[1px] border-dashed border-[#86d6ff] before:absolute before:left-[-15px] before:top-[10px] before:content-[''] before:rounded-[100%] before:h-[30px] before:w-[30px] 
                    last:border-l-[0px] last:top-[-10px]"
                    :class="[isi?.is_delivered === 1 ? `before:bg-[url('/src/assets/check.svg')]` : `before:bg-[url('/src/assets/whiteoval.svg')]`]"
                    >
                        <div
                        class="font-bold text-[14px] text-[#1e2022]"
                        >
                            Pengiriman Ke-{{ isi?.pengiriman_ke }}
                        </div>
                        <div
                        class="font-normal text-[14px] text-[#77838f]"
                        >
                            {{ Convert(isi?.jadwal_pengiriman) }}
                        </div>
                    </li>
                </ul>
            </div>
        </div>

    </div>

    <BottomNavbar />

</template>