<script setup>
import { ref, onMounted } from "vue";

const lines = ref([]);

// Функция для генерации случайной ширины в процентах
const generateRandomWidth = () => {
  return Math.floor(Math.random() * (100 - 40 + 1)) + 40; // Ширина от 40% до 100%
};

onMounted(() => {
  const numberOfLines = 5;
  lines.value = Array.from({ length: numberOfLines }, () => ({
    width: generateRandomWidth(),
  }));
});
</script>

<template>
  <div class="skeleton-loader">
    <div class="skeleton-line skeleton-header"></div>
    <div
      class="skeleton-line"
      v-for="(line, index) in lines"
      :key="index"
      :style="{ width: line.width + '%' }"
    ></div>
    <div class="skeleton-line skeleton-footer"></div>
  </div>
</template>

<style scoped>
.skeleton-loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.skeleton-line {
  background-color: var(--gray-color);
  height: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
  width: 100%;
}

.skeleton-line:last-child {
  margin-bottom: 0;
}

.skeleton-header {
  height: 20px;
  width: 100%;
  margin-bottom: 15px;
}

.skeleton-footer {
  width: 30%;
  margin-top: 15px;
}

@keyframes pulse {
  0% {
    background-color: var(--dark-gray);
  }
  50% {
    background-color: var(--gray-color);
  }
  100% {
    background-color: var(--dark-gray);
  }
}
</style>
