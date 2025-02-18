<script setup>
import { ref, onMounted, watch } from "vue";

const lines = ref([]);
const containerRef = ref(null);

const props = defineProps({
  lineHeight: { type: Number, default: 8 },
  gap: { type: Number, default: 16 },
});

// Расчет количества линий
function calculateLines() {
  if (containerRef.value) {
    const headerHeight = 20;
    const footerHeight = 8;
    const containerHeight = containerRef.value.clientHeight;
    const availableHeight =
      containerHeight - headerHeight - footerHeight - props.gap * 2; // Доступная высота для линий
    const numberOfLines = Math.floor(
      availableHeight / (props.lineHeight + props.gap)
    );
    lines.value = Array.from({ length: numberOfLines }, () => ({
      width: generateRandomWidth(),
    }));
  }
}

// Генерация случайной ширины в процентах
function generateRandomWidth() {
  return Math.floor(Math.random() * (100 - 40 + 1)) + 40;
}

onMounted(() => {
  calculateLines();
});

watch(containerRef, () => {
  calculateLines();
});
</script>

<template>
  <div class="skeleton_loader" ref="containerRef">
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
  height: 100%;
}

.skeleton_line {
  background-color: var(--gray-color);
  height: v-bind('props.lineHeight + "px"');
  margin-bottom: v-bind('props.gap + "px"');
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
  height: 8px;
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
