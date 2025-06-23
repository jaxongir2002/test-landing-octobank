<script setup>
import TheHeader from "@/components/layout/header/TheHeader.vue";
import Toast from "primevue/toast";
import TheFooterMain from "@/components/layout/footer/TheFooterMain.vue";
</script>

<template>
  <Toast/>
  <div class="app-wrapper flex flex-column">
    <div class="app-container">
      <TheHeader/>
    </div>
    <div class="flex-1 flex flex-column relative z-0">
      <RouterView v-slot="{ Component, route }">
        <Transition mode="out-in">
          <Component :is="Component" :key="route.name"/>
        </Transition>
      </RouterView>
    </div>
    <div class="app-container">
      <the-footer-main/>
    </div>
  </div>
</template>
