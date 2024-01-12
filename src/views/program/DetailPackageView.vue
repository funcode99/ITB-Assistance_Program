<script setup>
/* eslint-disable */
import { Splide, SplideSlide } from "@splidejs/vue-splide";
// Default theme
import { reactive } from "vue";
import { onBeforeMount, ref } from "vue";
import { useModal, Modal } from "usemodal-vue3";
import { useStore } from 'vuex'
import { useToast } from "vue-toastification"

import Api from "@/utils/Api";
import convertDate from "@/utils/ConvertDate"
import "@splidejs/vue-splide/css";
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import BottomNavbar from "@/components/BottomNavbar.vue";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogPanel,
  DialogTitle,
} from '@headlessui/vue'
import AppAccordion from "@/components/molecules/Accordion.vue";

defineProps({
    currentStatusProgram: Number
})

  const store = useStore()
  const toast = useToast()
  const subscriptionStatus = localStorage.getItem('subscription_status')
  const isOpen = ref(false)
  const pickupModal = ref(true)

  function setIsOpen(value) {
      isOpen.value = value
  }
  function closeModal() {
    isOpen.value = false
  }
  function openModal() {
    isOpen.value = true
  }

  let isOpenAddress = ref(false)
  let deliveryId = ref()

  const data = ref();
  const datahome = ref()
  // const subscriptionData = ref()
  const addressdata = ref()
  const orderId= ref()
  const toFillOrderId= ref(true)
  const toFillDeliverId = ref(true)

  const pickupBottle = ref()
  const pickupDate = ref()

  const addressId = ref(null)
  let deliverId = ref()
  let deliverIdPickupBottle = ref()
  let timelineLength = ref()

  const addressIdBottlePickup = ref()
  function directToPC(url) {
    window.open(url, '_blank', 'noreferrer')
}

  onBeforeMount(() => {
  fetch();
  });

  const fetch = async () => {

    const token = JSON.parse(localStorage.getItem("token"));
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;

    const api = await Api.get("/deliveries");
    data.value = api?.data;
    timelineLength = api?.data?.program?.program_data?.progress.length
    console.log(timelineLength)
    orderId.value = api?.data?.order?.id_order
    addressdata.value = api?.data?.list_alamat

    // console.log(data.value)

    // const api2 = await Api.get('/show-dashboard-homepage')
    // datahome.value = api2?.data?.data

    // const api3 = await Api.get('/home-membership')
    // subscriptionData.value = api3?.data?.data

  };

const day = new Date().getDate() + 3;
const month = new Date().getMonth() + 1;
const year = new Date().getFullYear();

const date = ref(`${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`);
let confirmDate = ref()
let placeOldDate = ref()

let setModal = useModal({
  deliveryaddress: 1,
  addnewaddress: 2,
  newaddressconfirmation: 3,
});

let showModal = useModal({
  calendar: 1,
  newdateconfirmation: 2,
});

let modalVisible = reactive({});
let calendarVisible = reactive({});

modalVisible = setModal("addnewaddress", false);
calendarVisible = showModal("calendar", false);


function myCancel() {
  modalVisible = setModal("deliveryaddress", false);
}

function myModal(clickeddeliverId) {
  deliverId = clickeddeliverId
  modalVisible = setModal("deliveryaddress", true);
}

function addNewAddress() {
  modalVisible = setModal("addnewaddress", true);
  myCancel();
}

function newAddressConfirmation() {
  modalVisible = setModal("addnewaddress", false);
  modalVisible = setModal("newaddressconfirmation", true);
}

function changeDate(delivery_id, oldDate) {

  const confirmyear = oldDate.slice(0,4)
  const confirmmonth = oldDate.slice(5,7)
  const confirmdate = oldDate.slice(8,10)
  let alphabetMonth = ref('')

if(confirmmonth == '01') {
  alphabetMonth = 'Jan'
}
else if(confirmmonth == '02') {
  alphabetMonth = 'Feb'
} 
else if(confirmmonth == '03') {
  alphabetMonth = 'Mar'
}
else if(confirmmonth == '04') {
  alphabetMonth = 'Apr'
}
else if(confirmmonth == '05') {
  alphabetMonth = 'May'
}
else if(confirmmonth == '06') {
  alphabetMonth = 'Jun'
}
else if(confirmmonth == '07') {
  alphabetMonth = 'Jul'
}
else if(confirmmonth == '08') {
  alphabetMonth = 'Aug'
}
else if(confirmmonth == '09') {
  alphabetMonth = 'Sep'
}
else if(confirmmonth == '10') {
  alphabetMonth = 'Oct'
}
else if(confirmmonth == '11') {
  alphabetMonth = 'Nov'
}
else if(confirmmonth == '12') {
  alphabetMonth = 'Dec'
}

  placeOldDate = `${confirmdate} ${alphabetMonth} ${confirmyear}`
  deliveryId = delivery_id
  calendarVisible = showModal("calendar", true);
}

function toConfirmDialog(receivedDate) {

  const confirmyear = receivedDate.slice(0,4)
  const confirmmonth = receivedDate.slice(5,7)
  const confirmdate = receivedDate.slice(8,10)
  let alphabetMonth = ref('')

if(confirmmonth == '01') {
  alphabetMonth = 'Jan'
}
else if(confirmmonth == '02') {
  alphabetMonth = 'Feb'
} 
else if(confirmmonth == '03') {
  alphabetMonth = 'Mar'
}
else if(confirmmonth == '04') {
  alphabetMonth = 'Apr'
}
else if(confirmmonth == '05') {
  alphabetMonth = 'May'
}
else if(confirmmonth == '06') {
  alphabetMonth = 'Jun'
}
else if(confirmmonth == '07') {
  alphabetMonth = 'Jul'
}
else if(confirmmonth == '08') {
  alphabetMonth = 'Aug'
}
else if(confirmmonth == '09') {
  alphabetMonth = 'Sep'
}
else if(confirmmonth == '10') {
  alphabetMonth = 'Oct'
}
else if(confirmmonth == '11') {
  alphabetMonth = 'Nov'
}
else if(confirmmonth == '12') {
  alphabetMonth = 'Dec'
}

confirmDate = ref(`${confirmdate} ${alphabetMonth} ${confirmyear}`)

  calendarVisible = showModal("calendar", false);
  calendarVisible = showModal("newdateconfirmation", true);
}

const updateDeliveryDate = async (delivery_id, newDate) => {

try {
    const token = JSON.parse(localStorage.getItem("token"))
    // Set authorization for api
    Api.defaults.headers.common.Authorization = `Bearer ${token}`
    const api = await Api.put("/delivery-date", {
      id_pengiriman: delivery_id,
      tanggal_pengiriman: newDate
    })
    store.commit('isLoading', true);
  } catch (error) {
      if (error?.response?.status === 422) {
            store.commit('isLoading', false);
            toast.error(error?.response?.data?.message, {
                position: 'top-center',
                timeout: 2000
            });
      }
      else {
            store.commit('isLoading', false);
            const toast = useToast();

            toast.error(error?.response?.data?.message, {
                position: 'top-center',
                timeout: 2000
            });
      }
  }

}

const changeDeliveryAddress = async (addressId, deliverId) => {

  try {
      const token = JSON.parse(localStorage.getItem("token"))
      // Set authorization for api
      Api.defaults.headers.common.Authorization = `Bearer ${token}`
      const api = await Api.put("/delivery-address", {
        id_pengiriman: deliverId,
        id_alamat: addressId
      })
      setModal("deliveryaddress", false)
      toast.success('Alamat berhasil diubah')
  } 
  
  catch (error) {
      if(error?.response?.status === 400) {
          toast.error('Terjadi kesalahan')
      }
  }

}


const requestBottlePickup = async () => {

  try {
    const token = JSON.parse(localStorage.getItem("token"));
    // Set authorization for api
    Api.defaults.headers.common.Authorization = `Bearer ${token}`;
    const api = await Api.post("/request-pickup-botol", {
      id_alamat: addressIdBottlePickup.value,
      // id_pengiriman: deliverIdPickupBottle,
      jumlah_botol: pickupBottle.value,
      id_order: orderId.value,
      date: pickupDate.value
    });
    isOpen.value = false
    toast.success('Request berhasil dikirim')
  } catch (error) {
    if (error?.response?.status === 422) {
      toast.error(error?.response?.data?.message)
    }
    if (error?.response?.status === 400) {
      toast.error(error?.response?.data?.message)
    }
    
  }


}
</script>

<template>
  <div class="px-[30px] pb-[20px] text-[#23690a]">

    <div class="mt-[30px]">

      <div class="">
        <div class="flex justify-between items-center">

          <div>
            <h1 class="font-medium text-[24px]">Paket Kamu,</h1>

            <div v-if="data?.subscription">
              {{ data?.subscription?.subscription_data?.package_name }}
            </div>

            <div v-else>
              <h1>
                {{ data?.program?.program_data?.program_name }}
              </h1>
            </div>

          </div>
          <div class="flex-1"></div>

            <div v-if="data?.subscription">
                <div class="flex items-center border-2 border-[#23690a] bg-white text-[#23690a] font-black px-[7px] py-[7px] text-[13px] rounded-[14px]">
                  {{ data?.subscription?.subscription_data?.remaining_days }} hari tersisa
                </div>              
            </div>

            <div v-else>

            </div>

        </div>
      </div>

    </div>

    <div v-if="data?.subscription">
      
      <div class="mt-[17px]">

        <div class="flex justify-between items-center">
          
          <div>
            <h1 class="font-extrabold">Kuota Konsultasi Anda</h1>
            <p><b class="font-black">{{ data?.subscription?.subscription_data?.consultations?.used }}</b> dari {{ data?.subscription?.subscription_data?.consultations?.quota }} kuota konsultasi terpakai</p>
          </div>

          <button @click="directToPC(`https://wa.me/${data?.personal_coach?.wa}`)" class="flex items-center gap-[10px] bg-[#23690a] text-white px-[11px] py-[5px] rounded-[14px]">
            <img src="@/assets/whatsapp.svg" alt="">
            <h3 class="text-[12px]">Buat Janji</h3>
          </button>

        </div>

        <div class="mt-[10px] text-[#fd8709]">
          <h1 class="font-extrabold">Kuota botol anda</h1>
          <p><b class="font-black">{{ data?.subscription?.subscription_data?.bottle?.sent }}</b> Botol dari {{ data?.subscription?.subscription_data?.bottle?.total }} botol terkirim</p>
        </div>
        
        <div class="mt-[10px]">
          <h1 class="font-extrabold">Kuota free ongkir</h1>
          <p><b class="font-black">{{ data?.subscription?.subscription_data?.free_ongkir?.used }}</b> dari {{ data?.subscription?.subscription_data?.free_ongkir?.quota }} kuota free ongkir terpakai</p>
        </div>


      </div>

    </div>

    <div v-else>

      <h1 class="font-extrabold">Progress Kamu</h1>

    <ol class="grid items-center mt-[14px]" :class="[`grid-cols-${timelineLength}`]">

      <li class="relative mb-0 h-full group" v-for="(item, index) in data?.program?.program_data?.progress" :key="index">
          
        <div class="flex items-center">

            <!-- titik -->
            <div class="pt-2">
              <div
                class="w-[13px] h-[13px] rounded-full ml-0 mr-0 -mt-[9px] relative"
                :class="[item?.active === true ? 'bg-[#23690A]' : 'bg-[#D9D9D9]']"
                    >
                  <h3 class="text-[8px] absolute top-[20px] font-semibold text-gray-900"> {{ item?.program_stage }} </h3>
              </div>
            </div>

            <!-- garis -->
            <div :class="[item?.active === true ? 'bg-[#23690A]' : 'bg-[#D9D9D9]']" 
                  class="flex w-full h-1 group-last:hidden"
            ></div>

        </div>

      </li>

    </ol>

    </div>

    <div v-show="data?.pengiriman?.pengiriman_data">
      <h1 class="mt-[43px] mb-[5px] text-center text-[24px] font-black leading-[32px] text-[#23690a]">Jadwal Pengiriman</h1>
      <section>
        <Splide class="" :options="{ rewind: true }" aria-label="My Favorite Images">
  
          <SplideSlide v-for="(item, index) in data?.pengiriman?.pengiriman_data" :key="index">
  
            <h1 class="text-center font-black text-[20px] leading-[27px]">Week {{ item.week }}</h1>
            <!-- <div class="mt-[18px]"></div> -->
  
            <!-- <div class="mt-[18px]" v-for="(item, index) in data[index]" :key="index"> -->
  
              <!-- <div class="mt-[18px]" v-for="(item, index) in data" :key="index"> -->
              <!-- <h1>{{ item }}</h1> -->
  
  
              <div class="mt-[18px]" v-for="(item, index) in data?.pengiriman?.pengiriman_data[index]?.week_data" :key="index">
  
                <!-- <h1>{{ item }}</h1> -->
  
                <!-- <div v-if="!isOpenAddress">
                  <h1 @click="isOpenAddress = !isOpenAddress" class="text-right cursor-pointer">Lihat Detail</h1>
                </div>
    
                <div v-else-if="isOpenAddress" class="mb-[17px]">
                  <collapse-transition dimension="height">
                    
                      <div class="font-medium">
                        <h1>Pengiriman Ke - {{ item?.pengiriman_ke }}</h1>
                        <div class="flex justify-between">
                          <h1>Tanggal: {{ convertDate(item?.jadwal_pengiriman) }}</h1>
                          <h1
                            @click="changeDate(item?.id_pengiriman, item?.jadwal_pengiriman)"
                            class="cursor-pointer font-medium text-[#fd8709]"
                          >
                            Ubah Tanggal
                          </h1>
                        </div>
                        <h1>Alamat Pengiriman</h1>
        
                        <div class="flex justify-between">
                          <h1 class="font-bold text-[16px]">Rumah</h1>
                          <h1
                            @click="myModal()"
                            class="font-medium text-[#fd8709] cursor-pointer"
                          >
                            Ubah Alamat
                          </h1>
                        </div>
        
                        <h1 class="text-[14px] text-black font-normal leading-[19px]">
                          {{ item?.alamat?.alamat_lengkap }}
                        </h1>
                      </div>
    
                  </collapse-transition>
                </div> -->
    
                <app-accordion>
                  <template class="flex justify-betweeen" v-slot:title>
                    
                      <!-- <h1 class="text-[20px] font-bold text-[#23690a]">{{ item }}</h1> -->
  
                      <h1 class="text-[20px] font-bold">{{ convertDate(item?.jadwal_pengiriman) }}</h1>
                  
                      <!-- <div
                        class="flex items-center rounded-[12px] text-white font-extrabold text-[15px] leading-[21px] px-[8px]" :class="[item?.status_pengiriman == 'Delivered' ? 'bg-[#23690a]' : 'bg-[#fd8709]']"
                      >
                        {{ item?.status_pengiriman }}
                      </div> -->
  
                      <div class="text-[20px] font-bold">
                        {{ item?.total_bottle }} Botol
                      </div>
                  
                    
                  </template>
                  <template v-slot:content>
                    <div class="font-medium">
                      <h1>Pengiriman Ke - {{ item?.pengiriman_ke }}</h1>
                      <div class="flex justify-between">
                        <h1>Tanggal: {{ convertDate(item?.jadwal_pengiriman) }}</h1>
                        <h1
                          @click="changeDate(item?.id_pengiriman, item?.jadwal_pengiriman)"
                          class="cursor-pointer font-medium text-[#fd8709]"
                        >
                          Ubah Tanggal
                        </h1>
                      </div>
                      <h1>Alamat Pengiriman</h1>
        
                      <div class="flex justify-between">
                        <h1 class="font-bold text-[16px]">{{ item?.alamat?.nama_penerima }}</h1>
                        <h1
                          @click="myModal(item?.id_pengiriman)"
                          class="font-medium text-[#fd8709] cursor-pointer"
                        >
                          Ubah Alamat
                        </h1>
                      </div>
        
                      <h1 class="text-[14px] text-black font-normal leading-[19px]">
                        {{ item?.alamat?.alamat_lengkap }}
                      </h1>
    

    
                      <div v-if="toFillDeliverId == true ? deliverIdPickupBottle = item?.id_pengiriman : ''">
                      </div>
    
                    </div>
                  </template>
                </app-accordion>
    
                <div class="border-2 border-[#000000] mb-1"></div>
              </div>
  
  
          </SplideSlide>
        </Splide>
      </section>
      <button
            @click="openModal()"
            class="border-2 flex flex-row-reverse justify-around items-center rounded-[19px] py-[25px] mt-[45px] w-[100%] font-extrabold text-[24px]"
            :class="data?.subscription ? 'text-white border-white bg-[#23690a]' : 'text-[#23690a] border-[#23690a] bg-white'"
            >
            <div class="flex items-center">
              <div v-if="data?.subscription">
                <img src="@/assets/bottle_reversed.svg" alt="">
              </div>
              <div v-else>
                <img src="@/assets/pickup-bottle.svg" alt="">
              </div>
              <span class="text-right">Request Pick Up Botol</span>
            </div>
      </button>  
    </div>
    
    

    <!-- // this order is 1, will go first -->
    <Modal type="clean" name="deliveryaddress" v-model:visible="modalVisible">
      <div class="max-w-[86%] h-[417px] bg-white rounded-[35px] px-[29px] pt-[44px]">
        <h1 class="mb-[17px] text-[24px] text-[#23690a] font-black">Alamat Pengiriman</h1>

        <!-- <form> -->

            <div v-for="(item, index) in addressdata" :key="index" class="flex gap-[18px] mb-[10px]">
              <input type="radio" id="address" v-model="addressId" :value="item?.id_alamat" />
              <label for="address">
                <div>
                  <h1 class="text-[16px] text-[#23690a] font-bold leading-[21px]">{{ item?.save_as }}</h1>
                  <p class="text-[14px] leading-[19px]">{{ item?.alamat_lengkap }}</p>
                </div>
              </label>
            </div>

            <!-- <div @click="addNewAddress()" class="flex items-center gap-[18px] mb-[10px]">
              <button class="text-[32px] font-semibold leading-[43px]">+</button>
              <p class="text-[16px] text-[#23690a] font-bold leading-[21px]">
                Tambah alamat baru
              </p>
            </div> -->


            <div class="flex justify-center mt-[25px]">
              
              <label for="">
                <div class="">
                  <h1 class="font-black text-[16px] leading-[21px] text-[#23690a]">Ingin tambah alamat baru ?</h1>
                  <p class="text-[14px] leading-[19px]">
                    Hubungi Personal Coach kamu
                  </p>
                </div>
              </label>
            </div>
            
            <div class="flex justify-evenly text-white mt-[30px]">
                <button @click="directToPC" class="bg-[#23690a] text-[15px] leading-[20px] px-[10px] py-[7px] rounded-[16px]">
                  Personal Coach
                </button>
                <button @click="changeDeliveryAddress(addressId, deliverId)"
                  class="bg-[#23690a] font-medium text-white text-[15px] leading-[20px] px-[10px] py-[7px] rounded-[16px]"
                >
                  Selesai
                </button>
            </div>
            
        <!-- </form> -->
    </div>

    </Modal>

    <Modal type="clean" name="addnewaddress" v-model:visible="modalVisible">
      <div
        class="max-w-[86%] h-[417px] bg-white rounded-[35px] px-[29px] pt-[44px] pb-[28px] overflow-y-hidden"
      >
        <h1 class="text-[24px] text-[#23690a] font-black">Tambah alamat baru</h1>

        <div class="flex flex-col gap-[11px] mt-[25px]">
          <div class="flex justify-between">
            <label class="text-[14px]" for="">Nama Tempat</label>
            <input class="border-2" type="text" />
          </div>
          <div class="flex justify-between">
            <label class="text-[14px] h-[57px]" for="">Alamat Lengkap</label>
            <input class="border-2 h-[57px]" type="text" />
          </div>
          <div class="flex justify-between">
            <label class="text-[14px] h-[57px]" for="">Catatan</label>
            <input class="border-2 h-[57px]" type="text" />
          </div>
        </div>

        <div class="flex flex-col gap-[18px] items-center mt-[14px]">
          <button
            @click="newAddressConfirmation()"
            class="text-[24px] font-medium text-white bg-[#23690a] px-[10px] py-[10px] rounded-[16px]"
          >
            Tambah
          </button>
          <button
            class="text-[16px] font-medium text-white bg-[#fd8709] px-[11px] py-[5px] rounded-[11px] p-[28px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>

    <Modal type="clean" name="newaddressconfirmation" v-model:visible="modalVisible">
      <div
        class="w-[86%] h-[417px] bg-white rounded-[35px] px-[29px] pt-[16px] pb-[28px] overflow-y-hidden"
      >
        <h1 class="text-[24px] text-[#23690a] font-black">
          Yakin Mengubah Alamat Pengiriman Baru?
        </h1>

        <h1 class="text-[16px] font-bold leading-[21px] mt-[15px]">Rumah</h1>
        <p class="text-[14px] font-normal leading-[19px]">
          Jl. H.Mursid No.45A, RT.4/RW.3, Jagakarsa, Kec. Jagakarsa, Kota Jakarta Selatan,
          Daerah Khusus Ibukota Jakarta 12550
        </p>

        <h1 class="font-bold leading-[21px] text-[16px] mt-[24px]">
          Jadikan alamat ini menjadi alamat utama?
        </h1>
        <p class="font-light text-[13px] leading-[17px]">
          Jika Ya, alamat untuk semua pengiriman akan berubah menjadi alamat ini
        </p>

        <div class="m-auto flex justify-evenly text-white">
          <button class="bg-[#23690a] rounded-[8px] py-[4px] px-[8px]">Ya</button>
          <button class="bg-[#fd8709] rounded-[8px] py-[4px] px-[8px]">Tidak</button>
        </div>

        <div class="flex flex-col gap-[18px] items-center mt-[10px]">
          <button
            class="text-[24px] leading-[32px] font-medium text-white bg-[#23690a] px-[5px] py-[5px] rounded-[16px]"
          >
            Selesai
          </button>
          <button
            class="text-[16px] leading-[22px] font-medium text-white bg-[#fd8709] px-[6px] py-[3px] rounded-[11px] p-[28px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>

    <Modal type="clean" name="calendar" v-model:visible="calendarVisible">
      <!-- <div class="z-20 bg-black/50 fixed inset-0 flex justify-center items-center">
            </div> -->
      <div class="w-[86%] m-auto h-[417px] bg-white rounded-[35px] px-[29px] pt-[14px]">
        <Datepicker
          class=""
          :min-date="new Date(new Date().setDate(new Date().getDate() + 2))"
          v-model="date"
          model-type="yyyy-MM-dd"
          teleport-center          
        />
        <div class="flex justify-center mt-[100px]">
          <button
            @click="toConfirmDialog(date)"
            class="rounded-[16px] bg-[#23690a] text-white font-medium text-[24px] px-[9px] py-[11px]"
          >
            Selanjutnya
          </button>
        </div>
      </div>
    </Modal>

    <Modal type="clean" name="newdateconfirmation" v-model:visible="calendarVisible">

      <div class="w-[86%] h-[417px] bg-white rounded-[35px] px-[29px] pt-[44px]">

        <h1 class="text-[24px] text-[#23690a] font-black">
          Yakin Mengubah Tanggal Pengiriman Baru?
        </h1>

        <div class="flex justify-between mt-[19px] font-bold text-[20px] text-[#23690a]">
          <h1>Tanggal Lama</h1>
          <h1>{{ placeOldDate }}</h1>
        </div>

        <div
          class="flex justify-between mt-[6px] mb-[9px] font-bold text-[20px] text-[#fd8709]"
        >
          <h1>Tanggal Baru</h1>
          <h1>{{ confirmDate }}</h1>
        </div>

        <p class="text-[13px] text-[#23690a] font-light">
          Tanggal pengiriman setelah tanggal ini akan mengikuti tanggal yang baru
        </p>

        <div class="m-auto mt-[17px] flex justify-evenly text-white">
          <button
            @click="updateDeliveryDate(deliveryId, date)"
            class="bg-[#23690a] px-[11px] py-[6px] rounded-[11px]"
          >
            Ya
          </button>
          <button
            @click="showModal('newdateconfirmation', false)"
            class="bg-[#fd8709] px-[11px] py-[6px] rounded-[11px]"
          >
            Tidak
          </button>
        </div>
      </div>
    </Modal>

    <TransitionRoot appear :show="isOpen" as="template">
      <Dialog as="div" @close="setIsOpen" class="relative z-10">

        <TransitionChild
          as="template"
          enter="duration-300 ease-out"
          enter-from="opacity-0"
          enter-to="opacity-100"
          leave="duration-200 ease-in"
          leave-from="opacity-100"
          leave-to="opacity-0"
        >
          <div class="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>
  
        <div class="fixed inset-0 overflow-y-auto">
          <div
            class="flex min-h-full items-center justify-center p-4 text-center"
          >
            <TransitionChild
              as="template"
              enter="duration-300 ease-out"
              enter-from="opacity-0 scale-95"
              enter-to="opacity-100 scale-100"
              leave="duration-200 ease-in"
              leave-from="opacity-100 scale-100"
              leave-to="opacity-0 scale-95"
            >

              <DialogPanel
                class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all"
              >
              
              <div v-if="pickupModal">

                <h1 class="font-black text-[24px] leading-[32px] text-[#23690a]">
                  Request Pick Up Botol
                </h1>

                <form class="mt-[22px]" @submit.prevent="requestBottlePickup">
                  
                  <div class="flex flex-col gap-[12px]">
                    <label for="bottle_pickup" class="font-bold text-[14px]">Masukkan jumlah botol yang akan di pick up</label>
                    <input v-model="pickupBottle" class="w-[100px] h-[50px] bg-[#23690a] rounded-[10px] text-white text-center" type="number" >
                  </div>

                  <div class="mt-[25px]"></div>

                  <div class="flex flex-col gap-[12px]">
                    <label for="date_pickup" class="font-bold text-[14px]">Atur jadwal pick up botol</label>
                    <input v-model="pickupDate" class="w-[140px] h-[50px] bg-[#23690a] rounded-[10px] text-white text-center" type="date" >
                  </div>

                  <div class="mt-[25px]"></div>

                  <div class="flex flex-col gap-[12px]">

                    <h1 class="font-bold text-[14px]">Pilih alamat</h1>

                    <select class="bg-[#23690a] h-[50px] rounded-[10px] text-white" id="" v-model="addressIdBottlePickup">
                      <option class="text-white" v-for="(item, index) in addressdata" :key="index" :value="item?.id_alamat">
                        {{ item?.alamat_lengkap }}
                      </option>
                    </select>

                    <!-- <h1>{{ addressIdBottlePickup }}</h1> -->

                  </div>
  
                  <div class="flex flex-col gap-[10px] items-center mt-[57px] text-white">
                    <!-- <button @click="pickupModal = false">Selesai</button> -->
                    <button type="submit" class="bg-[#23690a] px-[9px] py-[6px] rounded-[16px]">Selesai</button>
                    <button @click="closeModal" class="bg-[#fd8709] px-[9px] py-[6px] rounded-[16px]">Cancel</button>
                  </div>
  
                </form>

              </div>

              <!-- <div v-else>
                <h1 class="font-black text-[24px] leading-[32px]">
                  Request Pick Up Botol
                </h1>
                <p class="mt-[22px]">
                  Kamu telah terjadwal pick up botol pada tanggal --/--/2023. Botol akan di pick up oleh kurir pukul 10.00 - 11.00 WIB. Jangan lupa persiapkan 10 botol kosongnya ya!
                </p>
              </div> -->

              </DialogPanel>

            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </TransitionRoot>

  </div>
</template>

<style>
.splide__arrow {
  position: absolute;
  top: 16px;
}
.splide__pagination {
  display: none;
}
.modal-vue3-header {
  display: none;
}
.modal-vue3-body {
  display: flex;
  justify-content: center;
}

</style>
