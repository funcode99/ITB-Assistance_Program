<script setup>
import { inject } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const props = defineProps({
    title: String,
    // report: Boolean
})

// console.log(props.title)
// console.log(props.report)
// store.commit('switchReport', props.report)

const selectedTitle = inject('selectedTitle')
</script>

<template>
    <div class="tabs__content" v-show="selectedTitle === title">
        <slot />
    </div>
</template>