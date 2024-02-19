import React, { useState } from "react";

export default function Add() {
  const [item, setItem] = useState([]);
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
          <Item key={itm.text} />
        ))}
      </ul>
    </div>
  );
}

function Item() {
  return (
    <li>
      <p>text</p>
    </li>
  );
}
