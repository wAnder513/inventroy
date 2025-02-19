import { readonly, ref } from "vue";
import { defineStore } from "pinia";
import { LOCAL_STORAGE_KEY_INVENTORY } from "../constants/local-storage";

const inventoryItems = ref([
  {
    id: 0,
    image: "../src/assets/green-item.jpg",
    quantity: 1,
    info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum magni consequuntur placeat excepturi. Fugit dicta officiis tenetur maxime quia. Soluta ad praesentium voluptate autem, corrupti obcaecati officia vero aliquid dolor.",
    gridPosition: [0, 0],
  },
  {
    id: 1,
    image: "../src/assets/brown-item.jpg",
    quantity: 2,
    info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum magni consequuntur placeat excepturi. Fugit dicta officiis tenetur maxime quia. Soluta ad praesentium voluptate autem, corrupti obcaecati officia vero aliquid dolor.",
    gridPosition: [1, 1],
  },
  {
    id: 2,
    image: "../src/assets/purple-item.jpg",
    quantity: 2,
    info: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Cum magni consequuntur placeat excepturi. Fugit dicta officiis tenetur maxime quia. Soluta ad praesentium voluptate autem, corrupti obcaecati officia vero aliquid dolor.",
    gridPosition: [2, 2],
  },
]);

export const useInventory = defineStore("inventory", () => {
  function changeQuantity(id, newQuantity) {
    inventoryItems.value = inventoryItems.value.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );

    setItemsInvetoryLocalStorage(inventoryItems.value);
  }

  function deleteItemInventory(id) {
    inventoryItems.value = inventoryItems.value.filter(
      (item) => item.id !== id
    );

    setItemsInvetoryLocalStorage(inventoryItems.value);
  }

  function setItemsInvetoryLocalStorage(inventory) {
    localStorage.setItem(
      LOCAL_STORAGE_KEY_INVENTORY,
      JSON.stringify(inventory)
    );
  }

  function initInventory() {
    const savedInventory = localStorage.getItem(LOCAL_STORAGE_KEY_INVENTORY);

    if (savedInventory && JSON.parse(savedInventory).length > 0) {
      inventoryItems.value = JSON.parse(savedInventory);
    } else {
      JSON.parse(JSON.stringify(inventoryItems.value));
    }
  }

  function changeGridPosition(id, newPosition) {
    inventoryItems.value = inventoryItems.value.map((item) =>
      item.id === id ? { ...item, gridPosition: newPosition } : item
    );
    setItemsInvetoryLocalStorage(inventoryItems.value);
  }

  return {
    inventoryItems: readonly(inventoryItems),
    changeQuantity,
    deleteItemInventory,
    initInventory,
    changeGridPosition,
  };
});
