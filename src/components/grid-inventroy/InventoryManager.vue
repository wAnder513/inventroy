<script setup>
import { ref } from "vue";
import useModal from "../../composible/useModal";

import InventoryGrid from "../grid-inventroy/InventoryGrid.vue";
import { MODAL_CONTENT } from "../../constants/content";
import { useInventory } from "../../store/inventory";
</script>

<template>
  <div>
    <InventoryGrid></InventoryGrid>
  </div>
</template>

<style scoped></style>
