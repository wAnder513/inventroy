<script setup>
import SkeletonLoader from "../common/SkeletonLoader.vue";
</script>

<template>
  <div class="param-inventory">
    <SkeletonLoader></SkeletonLoader>
  </div>
</template>

<style scoped>
.param-inventory {
  max-height: 20px;
  overflow: hidden;
}
</style>
