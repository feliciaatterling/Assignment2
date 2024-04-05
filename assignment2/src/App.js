import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import items from "./products.json";

const App = () => {
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const listItems = items.map((el) => (
    // PRODUCT
    <div class="col mb-4" key={el.id}>
      <div class="card shadow-sm" style={{ width: 300, height: 300 }}>
        <div class="col-2">
          <img class="card-img-top" src={el.image} />
        </div>

        <div class="card-body">
          <p class="card-text" style={{ textAlign: "center" }}>
            <strong>{el.title}</strong> <br />
            {el.category} <br />${el.price} <br />
            <span>Items selected: {howManyofThis(el.id)} </span>
          </p>

          <div class="buttons">
            <button
              type="button"
              variant="light"
              style={{ margin: 20, width: 25 }}
              onClick={() => removeFromCart(el)}
            >
              -
            </button>
            <button
              type="button"
              variant="light"
              style={{ margin: 20, width: 25 }}
              onClick={() => addToCart(el)}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
  const addToCart = (el) => {
    setCart([...cart, el]);
  };
  const removeFromCart = (el) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== el.id);
    setCart(hardCopy);
  };
  const total = () => {
    let totalValue = 0;
    for (let i = 0; i < cart.length; i++) {
      totalValue += cart[i].price;
    }
    setCartTotal(totalValue);
  };

  function howManyofThis(id) {
    let hmot = cart.filter((cartItem) => cartItem.id === id);
    return hmot.length;
  }

  useEffect(() => {
    total();
  }, [cart]);

  return (
    <div class="shoppingcart">
      <h1>Computer Science Student Starterkit</h1>
      <div>Add searchbar here</div>
      <div class="col" style={{ width: 1000 }}>
        <div class="row">
          {/* HERE, IT IS THE SHOPING CART */}
          <div class="row">
            <div class="title">
              <div class="row">
                <div class="col">
                  <h4>
                    <b>Shopping Cart</b>
                  </h4>
                </div>
                <div class="col align-self-center text-right text-muted">
                  Products selected {cart.length}
                </div>
              </div>
            </div>
            <div>{listItems}</div>
          </div>
          <div class="float-end">
            <p class="mb-0 me-5 d-flex align-items-center">
              <span class="small text-muted me-2">Order total:</span>
              <span class="lead fw-normal">${cartTotal}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
