<script setup>
import { ref, computed } from "vue";
import { useInventory } from "../../store/inventory";
import RightSideModal from "../common/RightSideModal.vue";
import SkeletonLoader from "../common/SkeletonLoader.vue";
import { MODAL_CONTENT } from "../../constants/content";
import useModal from "../../composible/useModal";

const inventoryStore = useInventory();
const { setImage, openModal, closeModal } = useModal();

const dragging = ref({
  isDragging: false,
  item: null,
  startRow: null,
  startCol: null,
  currentX: 0,
  currentY: 0,
});

let currentItem = ref({});
const content = ref(MODAL_CONTENT.QUANTITY);

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

function changeQuantityItem() {
  if (currentItem.quantity === "") {
    closeModal();
    return;
  }

  currentItem.quantity <= 0
    ? deleteItem()
    : inventoryStore.changeQuantity(currentItem.id, currentItem.quantity);

  closeModal();
}

function openQuantityModal(inventoryItem) {
  content.value = MODAL_CONTENT.QUANTITY;
  currentItem = { ...inventoryItem };

  setImage(inventoryItem.image);
  openModal();
}

function openDeleteModal(inventoryItem) {
  content.value = MODAL_CONTENT.DELETE;
  currentItem = { ...inventoryItem };

  setImage(inventoryItem.image);
  openModal();
}

function deleteItem() {
  inventoryStore.deleteItemInventory(currentItem.id);

  closeModal();
}
</script>

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

    <RightSideModal>
      <template #description>
        <SkeletonLoader></SkeletonLoader>
      </template>

      <template #footer>
        <template v-if="content === MODAL_CONTENT.QUANTITY">
          <form @submit.prevent="changeQuantityItem">
            <input
              class="inventory-manager_input"
              type="number"
              min="0"
              max="999"
              placeholder="Введите количество"
              v-model="currentItem.quantity"
            />

            <div class="inventory-manager_button-container">
              <button
                type="button"
                class="inventory-manager_button cancel"
                @click="closeModal"
              >
                Отмена
              </button>

              <button type="submit" class="inventory-manager_button complite">
                {{
                  content === MODAL_CONTENT.QUANTITY
                    ? "Подтвердить"
                    : "Удалить предмет"
                }}
              </button>
            </div>
          </form>
        </template>

        <template v-if="content === MODAL_CONTENT.DELETE">
          <form @submit.prevent="deleteItem">
            <div class="inventory-manager_button-container">
              <button type="submit" class="inventory-manager_button complite">
                Удалить предмет
              </button>
            </div>
          </form>
        </template>
      </template>
    </RightSideModal>
  </div>
</template>

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

.inventory-manager_input {
  width: 100%;
  margin-bottom: 20px;
  font-size: 16px;
  padding: 8px 4px;
}

.inventory-manager_button-container {
  display: flex;
  gap: 8px;
}

.inventory-manager_button {
  width: 100%;
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
}

.cancel {
  background-color: var(--white-color);
  color: var(--black-color);
}

.complite {
  background-color: var(--red-color);
  color: var(--white-color);
}
</style>
