import React, { useState } from "react";

const data = [
  { text: "Learn html", id: 11 },
  { text: "javascript", id: 22 },
];

export default function Add() {
  const [item, setItem] = useState(data);
  const [newItem, setNewItem] = useState("");
  const [cart, setCart] = useState([]);

  function handleAdd() {
    console.log("item");
    setItem([
      ...item,
      { text: newItem, id: new Date().getTime().toString(36) },
    ]);
  }

  function handleSelect(items) {
    const exit = cart.find((it) => it.id === items.id);

    if (exit) {
      setCart(
        cart.map((x) =>
          x.id === items.id ? { ...exit, qty: exit.qty + 1 } : x
        )
      );
    } else {
      setCart([...cart, { ...items, qty: 1 }]);
    }
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
          <Item key={itm.id} item={itm} handleSelect={handleSelect} />
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
        <button onClick={() => handleSelect(item)}>Add to cart</button>
      </div>
    </li>
  );
}

function CartItm({ cart }) {
  return (
    <div>
      {cart.map((c) => (
        <div key={c.id}>
          <p>{c.text}</p>
        </div>
      ))}
    </div>
  );
}
