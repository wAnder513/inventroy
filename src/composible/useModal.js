import { ref } from "vue";

const isOpen = ref(false);
const image = ref("");

export default function useModal() {
  function openModal() {
    isOpen.value = true;
  }

  function closeModal() {
    isOpen.value = false;
  }

  function setImage(img) {
    image.value = img;
  }

  return {
    isOpen,
    image,
    openModal,
    closeModal,
    setImage,
  };
}
