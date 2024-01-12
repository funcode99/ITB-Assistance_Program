<script setup>
import { useSlots, ref , provide} from 'vue'
import { useStore } from 'vuex'

const slots = useSlots()
const tabTitles = ref(slots.default().map(tab => tab.props.title))

const selectedTitle = ref(tabTitles.value[0])
provide('selectedTitle', selectedTitle)

const store = useStore()


// if(selectedTitle === 'Riwayat Transaksi') {
//                         store.commit('switchReport', false)
//                     } else {
//                         store.commit('switchReport', true)
//                     }

</script>

<template>
    
    <div class="tabs px-[2%]">
        <!-- px-[2%] -->
        <ul class="tabs__header pl-[4%] flex gap-3 overflow-x-scroll">

            <li 
                v-for="title in tabTitles" 
                :key="title"
                
                class="tabs__item font-black"
                :class="{ selected: selectedTitle === title}"
                @click="event => {
                    selectedTitle = title
                }"
            >
                {{ title }}
            </li>

        </ul>

        <slot />
    </div>

    <!-- text-center -->

<!-- .tabs {
                  max-width: 60vw;
            margin: 0 auto;
} -->

<!-- .tabs__content {
    background-color: #bfbfbf;
    min-height: 300px;
    display: grid;
    place-items: center;
    border-radius: 0 0 5px 5px;
    padding: 10px;
} -->

    <!-- padding: 5px 0; -->

    <!-- .tabs {
        padding: 0 25px;
    } -->
    
<!-- 
    padding: 0;
    margin: 0;
    gap: 5px; -->


</template>

<style>


.tabs__header {
    list-style: none;
    display: flex;
    justify-content: space-between;
    overflow-x: scroll;
}

.tabs__item {
    flex: 1;
    background-color: white;
    color: #23690a;
    opacity: .3;
    font-size: 18px;
    font-weight: 900;

    border-radius: 5px 5px 0 0;
    transition: .4s all ease-out;
    cursor: pointer;
    user-select: none;
}

.tabs__item.selected {
    opacity: 1;
    font-weight: 900;
}


</style>