import React, { useEffect, useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => setItems(items));
  }, []);

  function handleItem(updatedItems) {
    const updatedItem = items.map((item) => {
      if (item.id === updatedItems.id) {
        return updatedItems;
      } else {
        return item;
      }
    });
    setItems(updatedItem);
  }

  function handleDelete(deleteItems) {
    const updatedItem = items.filter((item) => item.id !== deleteItems.id);
    setItems(updatedItem);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm handleItem={handleItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleItem}
            onDeleteItem={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
