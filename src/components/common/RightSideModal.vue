<template>
  <div class="modal_overlay" v-if="isOpen" @click="closeModal">
    <div class="modal_content" @click.stop>
      <button class="modal_close" @click="closeModal">&#x2715;</button>
      <!-- Секция с картинкой -->
      <div class="modal_image">
        <img :src="image" alt="Modal Image" />
      </div>

      <hr class="modal_line" />

      <!-- Секция с описанием (slot) -->
      <div class="modal_description">
        <slot name="description"></slot>
      </div>

      <hr class="modal_line" />

      <!-- Секция с футером (slot) -->
      <div class="modal_footer">
        <slot name="footer"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import useModal from "../../composible/useModal";

const { isOpen, image, closeModal } = useModal();
</script>

<style scoped>
.modal_overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  z-index: 1000;
}

.modal_content {
  width: 400px;
  height: 100%;
  background-color: var(--black-color);
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid var(--gray-color);
}

.modal_image {
  width: 100%;
  height: 200px;
  overflow: hidden;
  margin-bottom: 20px;
}

.modal_image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  padding: 32px 20px;
}

.modal_close {
  position: absolute;
  width: max-content;
  top: 10px;
  right: 10px;
  background-color: unset;
  border: none;
  font-size: 22px;
}

.modal_line {
  width: 100%;
  height: 1px;
  background-color: var(--gray-color);
  border: none;
  margin-bottom: 20px;
}

.modal_description {
  margin-bottom: 20px;
  flex: 1;
  overflow: auto;
}
</style>
