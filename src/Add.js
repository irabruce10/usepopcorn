import React, { useState } from "react";

const data = [
  { text: "Learn html", id: 11 },
  { text: "javascript", id: 22 },
];

export default function Add() {
  const [item, setItem] = useState(data);
  const [newItem, setNewItem] = useState("");
  const [selected, setSelected] = useState([]);
  const [cart, setCart] = useState([]);

  function handleAdd() {
    console.log("item");
    setItem([...item, { text: newItem }]);
  }

  function handleSelect(items) {
    const itemEx = item.find((it) => it.id === items.id);

    if (itemEx) {
      setCart(
        item.map((ite) =>
          ite.id === items.id ? { ...itemEx, text: itemEx.text } : ite
        )
      );
    }

    console.log(itemEx);
    console.log(cart);
  }

  return (
    <div>
      <ItemList
        item={item}
        newItem={newItem}
        setNewItem={setNewItem}
        handleAdd={handleAdd}
        handleSelect={handleSelect}
      />

      <CartItm cart={cart} />
    </div>
  );
}

function ItemList({ handleAdd, item, newItem, setNewItem, handleSelect }) {
  return (
    <div>
      <div>
        <input onChange={(e) => setNewItem(e.target.value)} value={newItem} />
        <button onClick={handleAdd}>Add</button>
      </div>
      <ul>
        {item.map((itm) => (
          <Item key={itm.text} item={itm} handleSelect={handleSelect} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, handleSelect }) {
  return (
    <li>
      <div>
        <p>{item.text}</p>
        <button onClick={() => handleSelect(item)}>Add</button>
      </div>
    </li>
  );
}

function CartItm({ cart }) {
  return (
    <li>
      {cart.map((c) => (
        <li key={c.id}>
          <p>{c.text}</p>
        </li>
      ))}
    </li>
  );
}
