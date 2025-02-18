<script setup>
import { ref } from "vue";
import SkeletonLoader from "../common/SkeletonLoader.vue";

const isVisible = ref(true);

function closeParametrsInventory() {
  isVisible.value = false;
}
</script>

<template>
  <div class="param-inventory" v-if="isVisible">
    <div class="param-inventory_container">
      <SkeletonLoader></SkeletonLoader>
    </div>
    <button class="param-inventory_close" @click="closeParametrsInventory">
      &#x2715;
    </button>
  </div>
</template>

<style scoped>
.param-inventory {
  position: relative;
  max-height: 60px;
  overflow: hidden;
  border: 1px solid var(--gray-color);
  border-radius: 8px;
}

.param-inventory_container {
  margin-right: 40px;
  padding: 20px;
}

.param-inventory_close {
  position: absolute;
  width: max-content;
  top: 4px;
  right: 4px;
  background-color: unset;
  border: none;
  font-size: 18px;
  cursor: pointer;
}
</style>
