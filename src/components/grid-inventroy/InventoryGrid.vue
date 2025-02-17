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
import { useInventory } from "../../store/inventory";

const inventoryStore = useInventory();

const emit = defineEmits(["openQuantityModal", "openDeleteModal"]);

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

const grid = computed(() => {
  const newGrid = Array.from({ length: 5 }, () =>
    Array.from({ length: 5 }, () => null)
  );
  inventoryStore.inventoryItems.forEach((item) => {
    const [row, col] = item.gridPosition;
    if (row >= 0 && row < 5 && col >= 0 && col < 5) {
      newGrid[row][col] = item;
    }
  });
  return newGrid;
});

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
  if (!dragging.value.isDragging) return;

  // Если клетка пустая, перемещаем элемент
  if (!grid.value[row][col]) {
    grid.value[row][col] = dragging.value.item;

    inventoryStore.changeGridPosition(dragging.value.item.id, [row, col]);
  } else {
    // Если клетка занята, возвращаем элемент на исходное место
    grid.value[dragging.value.startRow][dragging.value.startCol] =
      dragging.value.item;
  }
}

function openQuantityModal(inventoryItem) {
  emit("openQuantityModal", { ...inventoryItem });
}

function openDeleteModal(inventoryItem) {
  emit("openDeleteModal", { ...inventoryItem });
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
  z-index: 10;
}
</style>
