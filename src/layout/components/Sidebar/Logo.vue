<script lang="ts" setup>
defineProps({
  collapse: {
    type: Boolean,
    required: true,
  },
})

const logo = ref(new URL(`../../../assets/images/dzics-1.png`, import.meta.url).href)
const logo1 = ref(new URL(`../../../assets/images/dzics-2.png`, import.meta.url).href)
</script>

<template>
  <div class="w-full h-[50px] bg-gray-800 dark:bg-[var(--el-bg-color-overlay)]">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="h-full w-full flex items-center justify-center" to="/">
        <img :src="logo1" class="w-8 h-8" />
      </router-link>

      <router-link v-else key="expand" class="h-full w-full flex items-center justify-center" to="/">
        <img :src="logo" class="h-5" />
      </router-link>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
// https://cn.vuejs.org/guide/built-ins/transition.html#the-transition-component
.sidebarLogoFade-enter-active {
  transition: opacity 2s;
}

.sidebarLogoFade-leave-active,
.sidebarLogoFade-enter-from,
.sidebarLogoFade-leave-to {
  opacity: 0;
}
</style>
