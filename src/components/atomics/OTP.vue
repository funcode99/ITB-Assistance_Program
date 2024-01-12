<script setup>
import { ref, reactive } from 'vue'

const props = defineProps({
  default: String,
  digitCount: {
    type: Number,
    required: true
  }
})

const otp = ref(null)

const emit = defineEmits(['update:otp']);

const onInput = (e) => {
  otp.value = e.target.value
  emit('update:otp', otp.value)
}

</script>

<template>
  <div class="my-[12px]">
    <input type="telp" :value="otp" @input="onInput"
      class="py-[12px] bg-[#23690a] h-[80px] w-full rounded-[8px] text-white text-[32px] text-center" />
  </div>
</template>

<style>

</style>