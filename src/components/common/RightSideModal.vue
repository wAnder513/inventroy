<script setup>
import useModal from "../../composible/useModal";

const { isOpen, image, closeModal } = useModal();
</script>

<template>
  <transition name="fade" tag="div">
    <div class="modal_overlay" v-if="isOpen" @click="closeModal">
      <div class="modal_content" @click.stop>
        <button class="modal_close" @click="closeModal">&#x2715;</button>

        <div class="modal_image">
          <img :src="image" alt="Modal Image" />
        </div>

        <hr class="modal_line" />

        <div class="modal_description">
          <slot name="description"></slot>
        </div>

        <hr class="modal_line" />

        <div class="modal_footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<style scoped>
.modal_overlay {
  position: absolute;
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
  width: 250px;
  height: 100%;
  background-color: var(--black-color);
  display: flex;
  flex-direction: column;
  padding: 20px;
  border: 1px solid var(--gray-color);
}

.modal_image {
  width: 100%;
  height: 160px;
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
  top: 12px;
  right: 12px;
  background-color: unset;
  border: none;
  font-size: 18px;
  cursor: pointer;
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

.fade-enter-active {
  transition: all 0.4s ease 1s;
}

.fade-leave-active {
  transition: all 0.4s ease 1s;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(100%);
}
</style>
