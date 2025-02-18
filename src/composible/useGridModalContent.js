import { ref } from "vue";
import useModal from "./useModal";
import { useInventory } from "../store/inventory";
import { MODAL_CONTENT } from "../constants/content";

let currentItem = ref({});
const content = ref(MODAL_CONTENT.QUANTITY);

const inventoryStore = useInventory();

const { setImage, openModal, closeModal } = useModal();

export default function useGridModalContent() {
  function changeQuantityItem() {
    if (currentItem.value.quantity === "") {
      closeModal();
      return;
    }

    currentItem.value.quantity <= 0
      ? deleteItem()
      : inventoryStore.changeQuantity(
          currentItem.value.id,
          currentItem.value.quantity
        );

    closeModal();
  }

  function openQuantityModal(inventoryItem) {
    content.value = MODAL_CONTENT.QUANTITY;
    currentItem.value = { ...inventoryItem };

    setImage(inventoryItem.image);
    openModal();
  }

  function deleteItem() {
    inventoryStore.deleteItemInventory(currentItem.value.id);

    closeModal();
  }

  function openDeleteModal(inventoryItem) {
    content.value = MODAL_CONTENT.DELETE;
    currentItem.value = { ...inventoryItem };

    setImage(inventoryItem.image);
    openModal();
  }

  return {
    currentItem,
    content,
    changeQuantityItem,
    openQuantityModal,
    deleteItem,
    openDeleteModal,
  };
}
