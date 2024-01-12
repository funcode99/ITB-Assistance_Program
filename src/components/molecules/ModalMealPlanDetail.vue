<script setup>
import { ref } from 'vue'
import {
    TransitionRoot,
    TransitionChild,
    Dialog,
    DialogPanel,
    DialogTitle,
} from '@headlessui/vue'

const props = defineProps({
    data: Object
})

const isOpen = ref(false)

function closeModal() {
    isOpen.value = false
}
function openModal() {
    isOpen.value = true
}
</script>

<template>
    <button type="button" @click="openModal" class="italic text-[20px]">Lihat Detail</button>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="closeModal" class="relative z-10 font-serif">
            <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0" enter-to="opacity-100"
                leave="duration-200 ease-in" leave-from="opacity-100" leave-to="opacity-0">
                <div class="fixed inset-0 bg-black bg-opacity-25" />
            </TransitionChild>

            <div class="fixed inset-0 overflow-y-auto">
                <div class="flex min-h-full items-center justify-center p-4 text-center">
                    <TransitionChild as="template" enter="duration-300 ease-out" enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100" leave="duration-200 ease-in" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95">
                        <DialogPanel
                            class="w-full max-w-[430px] transform overflow-hidden rounded-2xl bg-white px-[29px] pt-[44px] pb-[22px] text-left align-middle shadow-xl transition-all border-[3px] border-[#23690A]">
                            <DialogTitle as="h3" class="text-[24px] font-black text-[#23690A]">
                                {{ props.data.name }}
                            </DialogTitle>
                            <div class="mt-[44px] space-y-1">
                                <div class="text-[17px] grid grid-cols-2 justify-between gap-2 font-medium"
                                    v-for="item in props.data.meal_plan_detail" :key="item.id">
                                    <span>{{ item.name }}</span>
                                    <span>{{ item.serving }} {{ item.unit }}</span>
                                </div>
                            </div>

                            <div class="mt-[35px] grid grid-cols-2 gap-2">
                                <div class="flex flex-col items-center">
                                    <h3 class="text-[#E99F49] text-[24px] font-black">Energi</h3>
                                    <p class="text-[#23690A] text-[24px] font-black">375 kkal</p>
                                </div>
                                <div class="flex flex-col items-center">
                                    <h3 class="text-[#E99F49] text-[24px] font-black">Lemak Total</h3>
                                    <p class="text-[#23690A] text-[24px] font-black">{{ props.data.fat }}g</p>
                                </div>
                            </div>

                            <div class="mt-[27px] flex justify-center">
                                <button type="button"
                                    class="inline-flex justify-center rounded-full border border-transparent bg-[#23690A] px-[10px] py-0.5 font-medium text-white text-[24px] hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                                    @click="closeModal">
                                    Selesai
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>