<script>
import BottomNavbar from "@/components/BottomNavbar.vue";
import AppAccordion from "@/components/molecules/Accordion.vue";

export default {
    name: "App",
    components: {
    AppAccordion,
    BottomNavbar
},
};

</script>

<template>
    <div class="px-[34px] min-h-[100vh]">

        <div class="flex justify-between items-center mt-[10px]">
            <router-link to="/membership">
                <img class="" 
                src="@/assets/SehatiClubLogoSmall.svg"
                alt=""
                >
            </router-link>
            <!-- <router-link to="/home">
                    <img src='@/assets/logo.png' alt="logo">
            </router-link> -->
        </div>

        <h1 class="mt-[16px] text-[30px] text-[#23690a] font-black">Frequently Asked Questions</h1>

        <p class="mt-[22px] text-[20px] font-normal">Berikut merupakan beberapa pertanyaan yang sering diajukan terkait program Referral IT's
            Buah</p>


        <section class="mb-[40px] mt-[33px]">
            <app-accordion class="">
                <template v-slot:title>
                    <div class="flex gap-[16px] place-items-center">
                        <div
                            class="rounded-full text-white min-w-[48px] h-[48px] bg-[#23690a] flex justify-center items-center">
                            <p class="text-[22px] text-white leading-[30px]">1</p>
                        </div>
                        <div class="text-[20px] leading-[27px] text-[#fd8709] text-left font-black">
                            Bagaimana cara melakukan referral?
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                        Anda dapat melakukan referral dengan 2 cara, yaitu:
                    </p>
                    <ul class="list-disc list-inside">
                        <li>
                            <span class="font-bold">Membagikan tautan referral</span> Anda kepada teman-teman Anda
                            dengan klik tombol Bagikan.
                            Poin akan didapatkan apabila teman Anda berhasil melakukan transaksi dari tautan tersebut.
                        </li>
                        <li>
                            <b class="font-bold">Mengisi data teman-teman yang ingin direferralkan</b> pada kolom yang
                            telah tersedia.
                            Pada cara ini, Anda akan <span class="font-bold">mendapatkan 1 poin secara langsung</span> baik
                            yang direferralkan melakukan transaksi maupun tidak. Namun, data yang dimasukkan haruslah
                            <span class="font-bold">valid</span> yaitu nomor telepon yang benar serta wilayah yang tercover oleh IT's Buah (Pulau Jawa,
                            Lampung dan Palembang)
                        </li>
                    </ul>
                </template>
            </app-accordion>
        </section>

        <section class="mb-[40px]">
            <app-accordion>
                <template v-slot:title>
                    <div class="flex gap-[16px]">
                        <div
                            class="rounded-full text-white min-w-[48px] h-[48px] bg-[#23690a] flex justify-center items-center">
                            <p class="text-[22px] text-white leading-[30px]">2</p>
                        </div>
                        <div class="text-[20px] leading-[27px] text-[#fd8709] text-left font-black">
                            Bagaimana pembagian poinnya?
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                        Apabila penerima referral berhasil melakukan transaksi, maka pemberi referral maupun penerima
                        referral akan mendapatkan poin engan perbandingan <span class="font-black">4:1</span>, dimana
                        pembeli referral mendapatkan poin yang lebih banyak.
                    </p>
                </template>
            </app-accordion>
        </section>

        <section class="mb-[40px]">
            <app-accordion>
                <template v-slot:title>
                    <div class="flex gap-[16px]">
                        <div
                            class="rounded-full text-white min-w-[48px] h-[48px] bg-[#23690a] flex justify-center items-center">
                            <p class="text-[22px] text-white leading-[30px]">3</p>
                        </div>
                        <div class="text-[20px] leading-[27px] text-[#fd8709] text-left font-black">
                            Kapan poin dapat digunakan?
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                        Poin dapat langsung ditukar dan digunakan dengan memenuhi minimal penukaran:
                    </p>
                    <p class="font-bold">10 poin = 1 bonus botol<sup>*</sup></p>
                    <p class="font-bold">10 poin = 1 botol berbagi sehat<sup>*</sup></p>
                    <p class="font-bold">100 poin = Rp 350.000<sup>*</sup></p>
                    <br />
                    <p><sup>*</sup>Untuk pengiriman bonus botol akan dikoordinasikan kembali oleh Elite Health
                        Consultant</p>
                </template>
            </app-accordion>
        </section>

        <section class="mb-[40px]">
            <app-accordion>
                <template v-slot:title>
                    <div class="flex gap-[16px]">
                        <div
                            class="rounded-full text-white min-w-[48px] h-[48px] bg-[#23690a] flex justify-center items-center">
                            <p class="text-[22px] text-white leading-[30px]">4</p>
                        </div>
                        <div class="text-[20px] leading-[27px] text-[#fd8709] text-left font-black">
                            Bagaimana cara melakukan penukaran poin?
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                        Pada kartu membership, Anda dapat memilih tombol <span class="font-bold">"Tukar"</span> di sebelah kanan Nama dan Status
                        Member.
                        Selanjutnya Anda akan diarahkan untuk melakukan Live Chat dengan Elite Health Consultant kami
                        melalui Whatsapp
                    </p>
                </template>
            </app-accordion>
        </section>

        <section class="mb-[40px]">
            <app-accordion>
                <template v-slot:title>
                    <div class="flex gap-[16px]">
                        <div
                            class="rounded-full text-white min-w-[48px] h-[48px] bg-[#23690a] flex justify-center items-center">
                            <p class="text-[22px] text-white leading-[30px]">5</p>
                        </div>
                        <div class="text-[20px] leading-[27px] text-[#fd8709] text-left font-black">
                            Bagaimana melihat poin dan status penerima referral?
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                        Anda dapat melakukan pemantauan jumlah poin yang sudah anda kumpulkan pada kartu membership
                        <span class="font-bold">"Jumlah Poin"</span>. Selain itu, Anda juga dapat melakukan pemantauan untuk para penerima referral
                        pada <span class="font-bold">"Status Referral"</span>, apakah gagal atau berhasil melakukan transaksi
                    </p>
                </template>
            </app-accordion>
        </section>

        <section class="mb-[40px]">
            <app-accordion>
                <template v-slot:title>
                    <div class="flex gap-[16px]">
                        <div
                            class="rounded-full text-white min-w-[48px] h-[48px] bg-[#23690a] flex justify-center items-center">
                            <p class="text-[22px] text-white leading-[30px]">6</p>
                        </div>
                        <div class="text-[20px] leading-[27px] text-[#fd8709] text-left font-black">
                            Siapa saja yang dapat direferralkan?
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                        Anda dapat melakukan referral kepada siapapun, baik kerabat, rekan kerja, maupun keluarga.
                    </p>
                </template>
            </app-accordion>
        </section>

        <section class="mb-[40px]">
            <app-accordion>
                <template v-slot:title>
                    <div class="flex gap-[16px]">
                        <div
                            class="rounded-full text-white min-w-[48px] h-[48px] bg-[#23690a] flex justify-center items-center">
                            <p class="text-[22px] text-white leading-[30px]">7</p>
                        </div>
                        <div class="text-[20px] leading-[27px] text-[#fd8709] text-left font-black">
                            Apakah ada target atau sistem Multi Level Marketing dalam program referral ini
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                        Program referral bersama IT's Buah bukan merupakan Multi Level Marketing dan tidak ada target
                        yang harus dicapai
                    </p>
                </template>
            </app-accordion>
        </section>

        <section class="mb-[40px]">
            <app-accordion>
                <template v-slot:title>
                    <div class="flex gap-[16px]">
                        <div
                            class="rounded-full text-white min-w-[48px] h-[48px] bg-[#23690a] flex justify-center items-center">
                            <p class="text-[22px] text-white leading-[30px]">8</p>
                        </div>
                        <div class="text-[20px] leading-[27px] text-[#fd8709] text-left font-black">
                            Apabila saya membutuhkan detail mengenai program IT's Buah untuk diberikan kepada penerima
                            referral, bagaimana caranya?
                        </div>
                    </div>
                </template>
                <template v-slot:content>
                    <p class="text-justify text-[15px] leading-[20px] mt-[13px]">
                        Anda dapat menghubungi Elite Health Consultant kami dan akan dibantu diarahkan sampai semua
                        pertanyaan anda terjawab
                    </p>
                </template>
            </app-accordion>
        </section>

    </div>
    <BottomNavbar />
</template>

<style>
.accordion {
    background-color: #eee;
    color: #444;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    border: none;
    text-align: left;
    outline: none;
    font-size: 15px;
    transition: 0.4s;
}

.active,
.accordion:hover {
    background-color: #ccc;
}

.accordion:after {
    content: '\002B';
    color: #777;
    font-weight: bold;
    float: right;
    margin-left: 5px;
}

.active:after {
    content: "\2212";
}

.panel {
    padding: 0 18px;
    background-color: white;
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.2s ease-out;
}
</style>