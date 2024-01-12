
<script setup>
import BottomNavbar from '@/components/BottomNavbar.vue';
import Api from '@/utils/Api';
import { ref, onBeforeMount, reactive } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

const route = useRoute()
const router = useRouter()
const toast = useToast()
const store = useStore()
const item = ref()
const isOpen = ref(false)
const otp = ref()
const isSubsFee = ref(true)
const isCouponValid = ref(false)
const form = reactive({
    customer_name: route.query.nama ?? null,
    telp: route.query.telp ?? null,
    product_id: null
})

const couponForm = reactive({
    coupon: route.query.kupon ?? null
})

const coupon = reactive({
    discount: 0,
    isCicilan: false,
    status: false
})

onBeforeMount(() => {
    fetch()
})

const fetch = async () => {
    try {
        store.commit('isLoading', true);

        const api = await Api.get(`/show-detail-product/${route.params.id}`)

        item.value = api.data

        form.product_id = api.data.id_product

        const verify = await Api.get(`/verify-free-fee/${form.telp}`)

        isSubsFee.value = verify.data.is_pay

        onSubmitCoupon(true)

        store.commit('isLoading', false);
    } catch (err) {
        store.commit('isLoading', false)
        toast.error('Ooppss.. ada kesalahan')
    }
}

const onSubmit = async () => {
    try {
        const token = JSON.parse(localStorage.getItem('token'))

        if (!token) {
            store.commit('isLoading', true);
            const data = await Api.post('/login', {
                telp: form.telp,
                nama: form.customer_name
            })

            localStorage.setItem('user', JSON.stringify(data.data.customer))
            store.commit('isLoading', false);
            isOpen.value = true
        } else {
            store.commit('isLoading', true)

            const params = {
                customer_name: form.customer_name,
                telp: form.telp,
                product_id: form.product_id,
                coupon: couponForm.coupon,
            }

            const api = await Api.post('/create-single-order', params)

            store.commit('isLoading', false)
            router.push('/order')
            window.open(api.data.payment_url, '_blank');
        }

    } catch (err) {
        store.commit('isLoading', false)
        toast.error('Ooppss.. ada kesalahan')
    }
}

const onSubmitCoupon = async (skip = false) => {
    if (!skip && !form.telp) {
        toast.error('Ooppss.. Kamu harus mengisi nomer telepon dulu')
        return
    }

    try {
        store.commit('isLoading', true)

        const params = {
            product_id: form.product_id,
            coupon: couponForm.coupon,
            telp: form.telp
        }

        const api = await Api.post('/order/verify-coupon', params)

        coupon.discount = api.data.discount

        coupon.status = api.data.status

        coupon.isCicilan = api.data.is_cicilan

        store.commit('isLoading', false)

        toast.success('Kupon Berhasil Terpasang')

        isCouponValid.value = true
    } catch (err) {
        store.commit('isLoading', false)
        isCouponValid.value = false

        coupon.discount = err.response.data.discount

        coupon.status = err.response.data.status

        coupon.isCicilan = err.response.data.is_cicilan

        if (!skip) {
            toast.error('Ooppss.. Kupon Tidak Valid')
        }
    }
}

async function onSubmitOtp() {
    try {
        store.commit('isLoading', true);

        const data = await Api.post('/verify-otp', {
            telp: form.telp,
            password: otp.value
        })

        localStorage.setItem('token', JSON.stringify(data.data.data))

        localStorage.setItem('user', JSON.stringify(data.data.customer));

        store.commit('isLoading', false);

        store.commit('isLoading', true);

        const verify = await Api.get(`/verify-free-fee/${form.telp}`)

        console.log(verify)

        isSubsFee.value = verify.data.is_pay

        store.commit('isLoading', false);

        toast.success('No Telp Kamu Valid, Silahkan Melanjutkan Pembayaran')

        isOpen.value = false
    } catch (err) {
        store.commit('isLoading', false)
        toast.error('Ooppss.. OTP Tidak Valid')
    }
}

const resendOTP = async (e) => {
    try {
        store.commit('isLoading', true);

        window.open(`https://wa.me/6281399748293?text=%23otp`, '_blank', 'noreferrer')

        store.commit('isLoading', false);

    }
    catch (error) {
        console.log(error)
        store.commit('isLoading', false);

        toast.error(error?.response?.data?.message, {
            position: 'top-center',
            timeout: 2000
        });
    }
}
</script>

<template>
    <div class="mx-[30px] min-h-[100vh] pb-[120px]">

        <div class="flex justify-between items-center mt-[10px]">
            <router-link to="/membership">
                <img class="" src="" alt="">
            </router-link>
            <router-link to="/home">
                <img src='@/assets/logo.png' alt="logo">
            </router-link>
        </div>

        <h1 class="font-black text-[36px] leading-[49px] text-[#23690a] mt-[24px]">Checkout Produk</h1>

        <div class="flex items-center gap-[9px] mt-[24px]">
            <img class="rounded-[17px] h-[80px] w-[80px] object-cover" :src="item?.thumbnail" alt="">
            <div>
                <p class="font-black text-[16px] text-[#23690a]">{{ item?.nama_produk }}</p>
                <p class="text-[14px] text-[#23690a]">Rp{{ item?.harga?.toString()?.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g,
                    "$1\.") }}</p>
            </div>
        </div>

        <form @submit.prevent="() => onSubmitCoupon(false)">
            <div class="flex items-center mt-[14px] gap-[14px]">
                <input v-model="couponForm.coupon" type="text"
                    class="py-1 px-4 bg-[#E4E4E4] max-w-[116px] rounded-[10px] placeholder:text-[13px] text-[13px]"
                    placeholder="Kode Promo">
                <button type="submit" class="bg-[#23690A] py-1 px-4 rounded-[10px] text-white">Pakai</button>
                <p v-if="coupon.status" class="italic text-[#FD8709] text-[14px]">Terpasang</p>
            </div>
        </form>

        <span class="text-gray-600 text-[10px] italic">Masukkan kode promo yang didapat melalui WhatsApp </span>

        <div class="mt-[11px] mb-[30px] border border-[#23690A] px-[30px] py-[12px] rounded-[10px]">
            <h2 class="text-[#23690A] font-black text-[16px]">Ringkasan Pembayaran</h2>
            <div class="flex flex-col gap-[2px] mt-[9px]">
                <div class="flex justify-between">
                    <span class="text-[#23690A] text-[14px]">Harga produk</span>
                    <span class="text-[#23690A] text-[14px]">{{
                        item?.harga?.toString()?.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") }}</span>
                </div>
                <div v-if="false" class="flex justify-between">
                    <span class="text-[#23690A] text-[14px]">Diskon/Bonus</span>
                    <span class="text-[#23690A] text-[14px]">0</span>
                </div>
                <div v-if="false" class="flex justify-between">
                    <span class="text-[#23690A] text-[14px]">Biaya pengiriman</span>
                    <span class="text-[#23690A] text-[14px]">0</span>
                </div>
                <div class="flex justify-between">
                    <span class="text-[#23690A] text-[14px]">Deposit (apabila subscription)</span>
                    <span class="text-[#23690A] text-[14px]">{{ isSubsFee ?
                        item?.subs_fee?.toString()?.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") : 0 }}</span>
                </div>
                <div v-if="coupon.status && coupon.discount != 0" class="flex justify-between">
                    <span class="text-[#23690A] text-[14px]">Diskon ({{ couponForm.coupon }})</span>
                    <span class="text-[#23690A] text-[14px]">{{
                        coupon?.discount?.toString()?.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") }}</span>
                </div>

                <div v-if="coupon.isCicilan" class="flex justify-between">
                    <span class="text-[#23690A] text-[14px]">Cicilan Selanjutnya</span>
                    <span class="text-[#23690A] text-[14px]">{{ coupon.isCicilan ?
                        ((item?.harga + (isSubsFee ? item?.subs_fee :
                            0) - coupon.discount) * 50 / 100)?.toString()?.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.") : 0
                    }}</span>
                </div>
            </div>
            <div class="flex justify-between mt-[20px]">
                <span class="text-[#23690A] font-black text-[16px]">Total Pembayaran</span>
                <span class="text-[#23690A] font-black text-[16px]">{{ ((item?.harga + (isSubsFee ? item?.subs_fee :
                    0) - coupon.discount) - (coupon.isCicilan ? ((item?.harga + (isSubsFee ? item?.subs_fee :
                        0) - coupon.discount) * 50 / 100) : 0))?.toString()?.replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1\.")
                }}</span>
            </div>
        </div>

        <h2 class="font-black text-[32px] leading-[49px] text-[#23690a] text-center mt-[24px]">Data Sahabat Sehat</h2>
        <form @submit.prevent="onSubmit">
            <div class="mt-[14px] space-y-[13px]">
                <div class="flex items-center gap-[8px]">
                    <label class="text-[#23690a]" for="nama">Nama&nbsp;:</label>
                    <input v-model="form.customer_name" id="nama" type="text"
                        class="py-1 px-4 bg-[#E4E4E4] rounded-full w-full" required>
                </div>
                <div class="flex items-center gap-[8px]">
                    <label class="text-[#23690a]" for="telepon">Telepon&nbsp;:</label>
                    <input v-model="form.telp" id="telepon" type="text" class="py-1 px-4 bg-[#E4E4E4] rounded-full w-full"
                        required>
                </div>
            </div>

            <button type="submit" class="bg-[#23690A] py-1 px-4 rounded-full mt-4 text-white">Lanjut Ke Pembayaran</button>

            <TransitionRoot appear :show="isOpen" as="template">
                <Dialog as="div" @close="closeModal" class="relative z-10">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0"
                        enter-to="opacity-100" leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                        <div class="fixed inset-0 bg-black bg-opacity-25" />
                    </TransitionChild>

                    <div class="fixed inset-0 overflow-y-auto">
                        <div class="flex min-h-full items-center justify-center p-4 text-center">
                            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                                enter-to="opacity-100 scale-100" leave="duration-200 ease-in"
                                leave-from="opacity-100 scale-100" leave-to="opacity-0 scale-95">
                                <DialogPanel
                                    class="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <DialogTitle as="h3" class="text-lg font-medium leading-6 text-gray-900">
                                        Masukkan Kode OTP yang dikirmkan ke Whatsapp kamu
                                    </DialogTitle>
                                    <form @submit.prevent="onSubmitOtp">
                                        <div class="mt-2">
                                            <input v-model="otp" type="text"
                                                class="py-1 px-4 bg-[#E4E4E4] w-full rounded-[10px]" placeholder="Kode OTP">


                                            <div class="text-center mt-[23px]">
                                                <span class="text-[15px]">Belum menerima OTP? </span>
                                                <button type="button" @click="resendOTP"
                                                    class="text-[#fd8709] text-[15px]">Klik
                                                    Disini</button>
                                            </div>
                                        </div>

                                        <div class="mt-4">
                                            <button type="submit"
                                                class="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </div>
                </Dialog>
            </TransitionRoot>
        </form>
    </div>
    <BottomNavbar />
</template>