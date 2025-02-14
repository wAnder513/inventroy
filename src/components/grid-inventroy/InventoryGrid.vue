<template>
  <div class="inventory-grid">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="inventory-row">
      <div
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        class="inventory-cell"
        @mousedown="(event) => onDragStart(rowIndex, colIndex, event)"
        @mouseup="onDrop(rowIndex, colIndex)"
      >
        <div
          v-if="
            cell &&
            !(
              dragging.isDragging &&
              dragging.startRow === rowIndex &&
              dragging.startCol === colIndex
            )
          "
          class="inventory-item"
        >
          {{ cell }}
        </div>
      </div>
    </div>

    <!-- Перетаскиваемый элемент -->
    <div
      v-if="dragging.isDragging"
      class="inventory-item dragging-item"
      :style="draggingItemStyle"
    >
      {{ dragging.item }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

// Инициализация сетки 5x5
const grid = ref(
  Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => null))
);

// Добавляем начальные элементы в инвентарь
grid.value[0][0] = "Меч";
grid.value[1][1] = "Щит";
grid.value[2][2] = "Зелье";

// Состояние для перетаскивания
const dragging = ref({
  isDragging: false,
  item: null,
  startRow: null,
  startCol: null,
  currentX: 0,
  currentY: 0,
});

// Начало перетаскивания
function onDragStart(row, col, event) {
  if (!grid.value[row][col]) return;

  dragging.value = {
    isDragging: true,
    item: grid.value[row][col],
    startRow: row,
    startCol: col,
    currentX: event.clientX - event.offsetX,
    currentY: event.clientY - event.offsetY,
  };

  // Очищаем клетку, откуда начали перетаскивание
  grid.value[row][col] = null;

  // Добавляем обработчики событий для перемещения и завершения перетаскивания
  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", onDragEnd);
}

// Перемещение элемента
function onDrag(event) {
  if (!dragging.value.isDragging) return;

  // Обновляем позицию элемента
  dragging.value.currentX = event.clientX - 25; // Центрируем элемент относительно курсора
  dragging.value.currentY = event.clientY - 25;
}

// Завершение перетаскивания
function onDragEnd(event) {
  if (!dragging.value.isDragging) return;

  // Убираем обработчики событий
  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", onDragEnd);

  // Сбрасываем состояние перетаскивания
  dragging.value.isDragging = false;

  // Если элемент был "брошен" за пределы сетки, возвращаем его на исходное место
  const targetCell = event.target.closest(".inventory-cell");
  if (!targetCell) {
    grid.value[dragging.value.startRow][dragging.value.startCol] =
      dragging.value.item;
  }
}

// Обработка "броска" элемента в клетку
function onDrop(row, col) {
  if (dragging.value.isDragging) {
    // Если клетка пустая, перемещаем элемент
    if (!grid.value[row][col]) {
      grid.value[row][col] = dragging.value.item;
    } else {
      // Если клетка занята, возвращаем элемент на исходное место
      grid.value[dragging.value.startRow][dragging.value.startCol] =
        dragging.value.item;
    }
  }
}

// Стиль для перетаскиваемого элемента
const draggingItemStyle = computed(() => ({
  position: "fixed",
  left: `${dragging.value.currentX}px`,
  top: `${dragging.value.currentY}px`,
  pointerEvents: "none", // Отключаем взаимодействие с элементом во время перетаскивания
}));
</script>

<style>
.inventory-grid {
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid var(--gray-color);
}

.inventory-row {
  display: flex;
}

.inventory-cell {
  width: 105px;
  height: 100px;
  border: 1px solid var(--gray-color);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.inventory-item {
  background-color: #dd1818;
  padding: 5px;
  border-radius: 4px;
  cursor: grab;
  user-select: none;
}

.inventory-item:active {
  cursor: grabbing;
}

.dragging-item {
  z-index: 10; /* Перетаскиваемый элемент должен быть поверх других элементов */
  background-color: #e0e0e0; /* Визуальное выделение перетаскиваемого элемента */
}
</style>
