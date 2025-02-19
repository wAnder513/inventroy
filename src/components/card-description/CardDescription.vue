<script setup>
import SkeletonLoader from "../common/SkeletonLoader.vue";
import descriptionImage from "/src/static/description-img.jpg";

const image = descriptionImage;
</script>

<template>
  <div class="card-description">
    <img class="card-description_picutre" :src="image" alt="description" />

    <SkeletonLoader></SkeletonLoader>
  </div>
</template>

<style scoped>
.card-description {
  display: flex;
  flex-direction: column;
  gap: 32px;
  border: 1px solid var(--gray-color);
  border-radius: 10px;
  padding: 16px;
  overflow: hidden;
  min-width: 235px;
}

.card-description_picutre {
  border-radius: 10px;
}
</style>
