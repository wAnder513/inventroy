<script setup>
import { ref, onMounted } from "vue";

const lines = ref([]);

const props = defineProps({
  numberOfLines: { type: Number, default: 5 },
});

onMounted(() => {
  lines.value = Array.from({ length: props.numberOfLines }, () => ({
    width: generateRandomWidth(),
  }));
});

// Генерация случайной ширины в процентах
function generateRandomWidth() {
  return Math.floor(Math.random() * (100 - 40 + 1)) + 40;
}
</script>

<template>
  <div class="skeleton_loader">
    <div class="skeleton_line skeleton_header"></div>
    <div
      class="skeleton_line"
      v-for="(line, index) in lines"
      :key="index"
      :style="{ width: line.width + '%' }"
    ></div>
    <div class="skeleton_line skeleton_footer"></div>
  </div>
</template>

<style scoped>
.skeleton_loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.skeleton_line {
  background-color: var(--gray-color);
  height: 8px;
  margin-bottom: 16px;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
  width: 100%;
}

.skeleton_line:last-child {
  margin-bottom: 0;
}

.skeleton_header {
  height: 20px;
  width: 100%;
  margin-bottom: 15px;
}

.skeleton_footer {
  width: 30%;
  margin-top: 15px;
}

@keyframes pulse {
  0% {
    background-color: var(--dark-gray-color);
  }
  50% {
    background-color: var(--gray-color);
  }
  100% {
    background-color: var(--dark-gray-color);
  }
}
</style>
