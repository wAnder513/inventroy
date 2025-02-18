<script setup>
import useGridModalContent from "../../composible/useGridModalContent";
import useModal from "../../composible/useModal";
import { MODAL_CONTENT } from "../../constants/content";
import RightSideModal from "../common/RightSideModal.vue";
import SkeletonLoader from "../common/SkeletonLoader.vue";

const { closeModal } = useModal();
const { currentItem, content, changeQuantityItem, deleteItem } =
  useGridModalContent();
</script>

<template>
  <div>
    <RightSideModal>
      <template #description>
        <SkeletonLoader></SkeletonLoader>
      </template>

      <template #footer>
        <template v-if="content === MODAL_CONTENT.QUANTITY">
          <form @submit.prevent="changeQuantityItem">
            <input
              class="inventory-modal_input"
              type="number"
              min="0"
              max="999"
              placeholder="Введите количество"
              v-model="currentItem.quantity"
            />

            <div class="inventory-modal_button-container">
              <button
                type="button"
                class="inventory-modal_button cancel"
                @click="closeModal"
              >
                Отмена
              </button>

              <button type="submit" class="inventory-modal_button complite">
                Подтвердить
              </button>
            </div>
          </form>
        </template>

        <template v-if="content === MODAL_CONTENT.DELETE">
          <form @submit.prevent="deleteItem">
            <div class="inventory-modal_button-container">
              <button type="submit" class="inventory-modal_button complite">
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
.inventory-modal_input {
  width: 100%;
  margin-bottom: 20px;
  font-size: 16px;
  padding: 8px 4px;
}

.inventory-modal_button-container {
  display: flex;
  gap: 8px;
}

.inventory-modal_button {
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
