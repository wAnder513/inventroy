<script setup>
import { reactive, ref } from "vue";
import useModal from "../../composible/useModal";
import RightSideModal from "../common/RightSideModal.vue";
import SkeletonLoader from "../common/SkeletonLoader.vue";
import InventoryGrid from "../grid-inventroy/InventoryGrid.vue";
import { MODAL_CONTENT } from "../../constants/content";
import { useInventory } from "../../store/inventory";

let currentItem = ref({});
const content = ref(MODAL_CONTENT.QUANTITY);

const { setImage, openModal, closeModal } = useModal();
const { changeQuantity, deleteItemInventory } = useInventory();

function openQuantityModal(inventoryItem) {
  content.value = MODAL_CONTENT.QUANTITY;
  currentItem = inventoryItem;

  setImage(inventoryItem.image);
  openModal();
}

function openDeleteModal(inventoryItem) {
  content.value = MODAL_CONTENT.DELETE;
  currentItem = inventoryItem;

  setImage(inventoryItem.image);
  openModal();
}

function changeQuantityItem() {
  if (currentItem.quantity === "") {
    closeModal();
    return;
  }

  currentItem.quantity <= 0
    ? deleteItem()
    : changeQuantity(currentItem.id, currentItem.quantity);

  closeModal();
}

function deleteItem() {
  deleteItemInventory(currentItem.id);

  closeModal();
}
</script>

<template>
  <div>
    <InventoryGrid
      @open-quantity-modal="openQuantityModal"
      @open-delete-modal="openDeleteModal"
    ></InventoryGrid>

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
