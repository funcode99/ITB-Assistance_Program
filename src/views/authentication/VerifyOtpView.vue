<script setup>
import router from '@/router';
import Api from '@/utils/Api';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { useStore } from 'vuex';
import OTP from '@/components/atomics/OTP.vue';

const user = JSON.parse(localStorage.getItem('user'))
const toast = useToast();
const store = useStore()

const otp = ref('')
const otpValue = ref('')

const onSubmit = async (e) => {
    try {
        store.commit('isLoading', true);

        const data = await Api.post('/verify-otp', {
            telp: user.telp,
            password: otpValue.value
        })

        localStorage.setItem('token', JSON.stringify(data.data.data))

        localStorage.setItem('user', JSON.stringify(data.data.customer));

        const hasInitialPoint = data.data.customer.has_initial_point

        store.commit('isLoading', false);

        if (hasInitialPoint) {
            router.push('/home')
        } else {
            router.push('/registration')
        }

    } catch (error) {
        console.log(error)
        store.commit('isLoading', false);

        toast.error(error?.response?.data?.message, {
            position: 'top-center',
            timeout: 2000
        });
    }
}

const resendOTP = async (e) => {
    try {
        store.commit('isLoading', true);
        const data = await Api.post('/login', {
            telp: telp.value
        })

        localStorage.setItem('user', JSON.stringify(data.data.customer))
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
    <div class="px-[13%]">
        <img width="234" height="198" class="m-auto mt-[69px]" src="@/assets/logo-itsbuah.svg" alt="">
        <p class="text-center mt-[64px]">
            Masukkan kode OTP yang telah kami kirimkan ke nomor Whatsapp Anda
        </p>
        <OTP @update:otp="otpValue = $event"></OTP>
        <div class="flex justify-center">
            <button @click="onSubmit"
                class="mt-[23px] text-white text-[15px] bg-[#23690a] py-[9px] px-[21px] rounded-[8px]">
                Masuk
            </button>
        </div>
        <!-- <p class="mt-[19px] text-center">00:00</p> -->
        <div class="text-center mt-[23px]">
            <span class="text-[15px]">Belum menerima OTP? </span>
            <span @click="resendOTP" class="text-[#fd8709] text-[15px]">Klik Disini</span>
        </div>
    </div>
</template>