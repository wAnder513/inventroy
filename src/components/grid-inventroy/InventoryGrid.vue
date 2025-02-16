<template>
  <div class="inventory_grid">
    <div v-for="(row, rowIndex) in grid" :key="rowIndex" class="inventory_row">
      <div
        v-for="(cell, colIndex) in row"
        :key="colIndex"
        class="inventory_cell"
        @mousedown="
          (event) =>
            event.button === 2 // клик ПКМ
              ? openDeleteModal(cell)
              : onDragStart(rowIndex, colIndex, event)
        "
        @mouseup="onDrop(rowIndex, colIndex)"
      >
        <template
          v-if="
            cell &&
            !(
              dragging.isDragging &&
              dragging.startRow === rowIndex &&
              dragging.startCol === colIndex
            )
          "
        >
          <div class="inventory_item">
            <img :src="cell.image" alt="item inventory" />
          </div>

          <button
            class="inventory_quantity"
            @click.stop="openQuantityModal(cell)"
          >
            {{ cell.quantity }}
          </button>
        </template>
      </div>
    </div>

    <img
      v-if="dragging.isDragging"
      class="inventory_item dragging_item"
      :src="dragging.item.image"
      alt="item inventory"
      :style="draggingItemStyle"
    />
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const emit = defineEmits(["openModalQuantity", "openDeleteModal"]);

const grid = ref(
  Array.from({ length: 5 }, () => Array.from({ length: 5 }, () => null))
);

grid.value[0][0] = {
  id: 0,
  image: "/src/assets/green-item.jpg",
  quantity: 1,
  info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum magni consequuntur placeat excepturi. Fugit dicta officiis tenetur maxime quia. Soluta ad praesentium voluptate autem, corrupti obcaecati officia vero aliquid dolor.",
};
grid.value[1][1] = {
  id: 1,
  image: "/src/assets/brown-item.jpg",
  quantity: 2,
  info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum magni consequuntur placeat excepturi. Fugit dicta officiis tenetur maxime quia. Soluta ad praesentium voluptate autem, corrupti obcaecati officia vero aliquid dolor.",
};
grid.value[2][2] = {
  id: 2,
  image: "/src/assets/purple-item.jpg",
  quantity: 2,
  info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum magni consequuntur placeat excepturi. Fugit dicta officiis tenetur maxime quia. Soluta ad praesentium voluptate autem, corrupti obcaecati officia vero aliquid dolor.",
};

const dragging = ref({
  isDragging: false,
  item: null,
  startRow: null,
  startCol: null,
  currentX: 0,
  currentY: 0,
});

const draggingItemStyle = computed(() => ({
  position: "fixed",
  left: `${dragging.value.currentX}px`,
  top: `${dragging.value.currentY}px`,
  pointerEvents: "none",
}));

function onDragStart(row, col, event) {
  if (event.target.closest(".inventory_quantity")) {
    return;
  }

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

  window.addEventListener("mousemove", onDrag);
  window.addEventListener("mouseup", onDragEnd);
}

function onDrag(event) {
  if (!dragging.value.isDragging) return;

  // Центрируем элемент относительно курсора
  dragging.value.currentX = event.clientX - 25;
  dragging.value.currentY = event.clientY - 25;
}

function onDragEnd(event) {
  if (!dragging.value.isDragging) return;

  window.removeEventListener("mousemove", onDrag);
  window.removeEventListener("mouseup", onDragEnd);

  dragging.value.isDragging = false;

  // Если элемент был "брошен" за пределы сетки, возвращаем его на исходное место
  const targetCell = event.target.closest(".inventory_cell");
  if (!targetCell) {
    grid.value[dragging.value.startRow][dragging.value.startCol] =
      dragging.value.item;
  }
}

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

function openQuantityModal(inventoryItem) {
  emit("openModalQuantity", inventoryItem);
}

function openDeleteModal(inventoryItem) {
  emit("openDeleteModal", inventoryItem);
}
</script>

<style scoped>
.inventory_grid {
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid var(--gray-color);
}

.inventory_row {
  display: flex;
}

.inventory_cell {
  width: 105px;
  height: 100px;
  border: 1px solid var(--gray-color);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.inventory_item {
  padding: 4px;
  border-radius: 4px;
  cursor: grab;
  user-select: none;
}

.inventory_item:active {
  cursor: grabbing;
}

.inventory_quantity {
  position: absolute;
  bottom: -1px;
  right: -1px;
  border: 1px solid var(--gray-color);
  border-radius: 4px 0 0;
  padding: 2px 8px;
  font-size: 12px;
  background: none;
}

.dragging_item {
  z-index: 10; /* Перетаскиваемый элемент должен быть поверх других элементов */
}
</style>
