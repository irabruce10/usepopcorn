import React, { useState } from "react";

const data = [{ text: "Learn html" }, { text: "javascript" }];

export default function Add() {
  const [item, setItem] = useState(data);
  const [newItem, setNewItem] = useState("");

  function handleAdd() {
    console.log("item");
    setItem([...item, { text: newItem }]);
  }

  return (
    <div>
      <ItemList
        item={item}
        newItem={newItem}
        setNewItem={setNewItem}
        handleAdd={handleAdd}
      />
    </div>
  );
}

function ItemList({ handleAdd, item, newItem, setNewItem }) {
  return (
    <div>
      <div>
        <input onChange={(e) => setNewItem(e.target.value)} value={newItem} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {item.map((itm) => (
          <Item key={itm.text} item={itm} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <p>{item.text}</p>
    </li>
  );
}
