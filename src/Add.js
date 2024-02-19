import React, { useState } from "react";

const data = [{ text: "Learn html" }, { text: "javascript" }];

export default function Add() {
  const [item, setItem] = useState(data);
  const [newItem, setNewItem] = useState("");

  function handleAdd() {
    console.log("ke");
  }

  return (
    <div>
      <ItemList item={item} handleAdd={handleAdd} />
    </div>
  );
}

function ItemList({ item, handleAdd }) {
  return (
    <div>
      <div>
        <input />
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
