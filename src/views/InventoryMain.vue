<script setup>
import CardDescription from "../components/card-description/CardDescription.vue";
import InventoryGrid from "../components/grid-inventroy/InventoryGrid.vue";
import InventoryParameters from "../components/parameters/InventoryParameters.vue";
</script>

<template>
  <div class="main-inventory">
    <div class="main-inventory_wrapper">
      <CardDescription></CardDescription>
      <InventoryGrid></InventoryGrid>
    </div>

    <InventoryParameters></InventoryParameters>
  </div>
</template>

<style scoped>
.main-inventory {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 850px;
  margin: 0 auto;
  border: 1px solid var(--gray-color);
  padding: 32px;
}

.main-inventory_wrapper {
  display: flex;
  gap: 24px;
}
</style>
