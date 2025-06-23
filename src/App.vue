<script setup>
import ChangeVariantHelper from "@/views/ChangeVariantHelper.vue";
</script>

<template>
  <ChangeVariantHelper />
  <RouterView v-slot="{ Component, route }">
    <Transition mode="out-in">
      <div :key="route.name">
        <Component :is="Component" />
      </div>
    </Transition>
  </RouterView>
</template>

<style scoped>
</style>
