<script setup>
import { ref } from 'vue';
import router from '@/router';
import { useToast } from "vue-toastification";
import { useStore } from 'vuex'
import Api from '@/utils/Api';

const user = JSON.parse(localStorage.getItem('user'))
const toast = useToast();
const store = useStore()
const telp = ref(user.telp)
const name = ref(user.nama_customer)
const birthdate = ref(user.tanggal_lahir)
const gender = ref(user.jenis_kelamin)

async function onSubmit() {
    try {
        store.commit('isLoading', true);
        const token = JSON.parse(localStorage.getItem('token'))
        // Set authorization for api
        Api.defaults.headers.common.Authorization = `Bearer ${token}`;

        const data = await Api.post('/register', {
            telp: telp.value,
            name: name.value,
            birth: birthdate.value,
            gender: gender.value
        })

        // console.log(data)

        localStorage.setItem('user', JSON.stringify(data.data.customer));
        toast.success('Akun berhasil didaftarkan')
        store.commit('isLoading', false);
        router.push('/home');

    } catch (error) {
        toast.error('Oppss ada kesalahan.')
        store.commit('isLoading', false);
        console.log(error)
    }
}
</script>

<template>
    <div class="px-[9%]">

        <div class="text-[36px] text-[#23690a]">
            <h1>Halo,</h1>
            <h1>Nama Anda Siapa?</h1>
        </div>

        <form action="" @submit.prevent="onSubmit">

            <section class="flex flex-col gap-[22px] mt-[17px] ">

                <div class="flex space-x-1 justify-between items-center">
                    <label>Nama Kamu</label>
                    <input v-model="name" class="bg-[#e4e4e4] h-[48px] rounded-[8px] px-[10px] min-w-[200px] w-[200px]"
                        type="text" placeholder="Tulis di sini" required />
                </div>

                <div class="flex space-x-1 justify-between items-center">
                    <label>Nomor Ponsel</label>
                    <input v-model="telp"
                        class="bg-[#23690a] h-[44px] rounded-[8px] px-[10px] min-w-[200px] w-[200px] text-white" type="text"
                        placeholder="Tulis di sini" disabled>
                </div>

                <div class="flex space-x-1 justify-between items-center">
                    <label>Tanggal Lahir</label>
                    <input v-model="birthdate"
                        class="bg-[#23690a] h-[44px] rounded-[8px] px-[10px] min-w-[200px] w-[200px] text-white" type="date"
                        required>
                </div>

                <div class="flex space-x-1 justify-between items-center">
                    <label for="gender">Jenis Kelamin</label>
                    <select v-model="gender" id="gender"
                        class="bg-[#23690a] h-[44px] rounded-[8px] px-[10px] min-w-[200px] w-[200px] text-white" required>
                        <option disabled value="">Pilih Jenis Kelamin</option>
                        <option value="L">Laki-laki</option>
                        <option value="P">Perempuan</option>
                    </select>
                </div>
            </section>

            <div class="mt-[73px] text-white text-[15px] flex flex-col items-center gap-[24px]">
                <button type="submit" class="bg-[#FD8709] py-[12px] px-[29px] text-center rounded-[8px]">Submit</button>
            </div>

        </form>

    </div>
</template>

<style></style>