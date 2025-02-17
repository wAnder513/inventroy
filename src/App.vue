<script setup>
import { useInventory } from "./store/inventory";

const { initInventory } = useInventory();

initInventory();
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>

<style scoped></style>
