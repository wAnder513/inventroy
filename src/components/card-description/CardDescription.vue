<script setup>
import SkeletonLoader from "../common/SkeletonLoader.vue";
</script>

<template>
  <div class="card-description">
    <img
      class="card-description_picutre"
      src="../../assets/description-img.jpg"
      alt="description"
    />

    <SkeletonLoader></SkeletonLoader>
  </div>
</template>

<style scoped>
.card-description {
  display: flex;
  flex-direction: column;
  gap: 24px;
  border: 1px solid var(--gray-color);
  border-radius: 10px;
  padding: 16px;
}

.card-description_picutre {
  border-radius: 10px;
}
</style>
