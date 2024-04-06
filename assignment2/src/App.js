import logo from "./logo.svg";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import items from "./products.json";

const App = () => {
  const [viewer, setViewer] = useState(0);
  const [cart, setCart] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dataF, setDataF] = useState({});

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
  };

  const removeFromCart = (product) => {
    let hardCopy = [...cart];
    hardCopy = hardCopy.filter((cartItem) => cartItem.id !== product.id);
    setCart(hardCopy);
  };

  useEffect(() => {
    total();
  }, [cart]);

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

  function reset() {
    setViewer(0);
    const newCart = [];
    setCart(newCart);
  }

  function Browse() {
    const [ProductsCategory, setProductsCategory] = useState(items);
    const [query, setQuery] = useState("");

    const render_products = (ProductsCategory) => {
      return (
        <div className="category-section fixed">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
            Products ({ProductsCategory.length})
          </h2>
          <div
            className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-4 lg:grid-cols-4 xl:gap-x-8"
            style={{
              maxHeight: "600px",
              overflowY: "scroll",
            }}
          >
            {/* Loop Products */}
            {ProductsCategory.map((product, index) => (
              <div key={index} className="group relative shadow-lg">
                <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                  <img key={product.id} src={product.image} alt="pic" />
                </div>
                <div className="flex justify-between p-3">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>
                        {product.title}
                      </span>
                      <p>Tag - {product.category}</p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Rating: {product.rating.rate}
                      <br />
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white fond-bold py-2 px-2 rounded"
                        type="button"
                        variant="light"
                        style={{ margin: 20, width: 25 }}
                        onClick={() => removeFromCart(product)}
                      >
                        -
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white fond-bold py-2 px-2 rounded"
                        type="button"
                        variant="light"
                        style={{ margin: 20, width: 25 }}
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>
                      <br />
                    </p>
                    <p className="text-sm font-medium text-green-600">
                      ${product.price} x {howManyofThis(product.id)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    const handleChange = (e) => {
      setQuery(e.target.value);
      console.log(
        "Step 6 : in handleChange, Target Value :",
        e.target.value,
        " Query Value :",
        query
      );
      const results = items.filter((eachProduct) => {
        if (e.target.value === "") return ProductsCategory;
        return eachProduct.title
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      setProductsCategory(results);
    };

    return (
      <div className="flex fixed flex-row">
        <div
          className="h-screen bg-slate-800 p-3 xl:basis-1/5"
          style={{ minWidth: "40%" }}
        >
          <div className="px-6 py-4">
            <h1 className="text-3xl mb-2 font-bold text-white">
              {" "}
              Computer Science Student Starterkit{" "}
            </h1>
            <div className="py-10">
              <p className="text-white">Search:</p>
              <input
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
              focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700
              dark:border-gray-600 dark:placeholder-gray-400 dark:text-white
              dark:focus:ring-blue-500 dark:focus:border-blue-500"
                type="search"
                value={query}
                onChange={handleChange}
              />
            </div>
            <div className="py-10">
              <p className="text-white">
                Cart Total:
                <br />
                {cart.length > 0 ? (
                  <p>${cartTotal}</p>
                ) : (
                  <p>Your cart is empty.</p>
                )}{" "}
                <br />
              </p>

              <button
                className="bg-blue-300 hover:bg-blue-700 text-white fond-bold py-2 px-4 rounded"
                onClick={() => reset()}
              >
                Clear Cart
              </button>
            </div>

            <div className="py-10">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white fond-bold py-2 px-4 rounded"
                onClick={() => setViewer(1)}
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
        <div className="ml-5 p-10 xl:basis-4/5">
          {render_products(ProductsCategory)}
        </div>
      </div>
    );
  }

  function Cart() {
    const render_cart = (cartItems) => {
      const uniqueIDs = cartItems.reduce((want, have) => {
        const x = want.find((item) => item.id === have.id);
        if (!x) {
          return want.concat([have]);
        } else {
          return want;
        }
      }, []);

      return (
        <div className="category-section fixed">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-600 category-title">
            Review Cart ({cartItems.length})
          </h2>
          <div
            className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-4 lg:grid-cols-4 xl:gap-x-8"
            style={{
              maxHeight: "600px",
              overflowY: "scroll",
            }}
          >
            {/* Loop Products */}
            {uniqueIDs.map((product, index) => (
              <div key={index} className="group relative shadow-lg">
                <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none">
                  <img
                    key={product.id}
                    src={product.image}
                    alt="pic"
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="flex justify-between p-3">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <span style={{ fontSize: "16px", fontWeight: "600" }}>
                        {product.title}
                      </span>
                      <p>Tag - {product.category}</p>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Rating: {product.rating.rate}
                      <br />
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white fond-bold py-2 px-2 rounded"
                        type="button"
                        variant="light"
                        style={{ margin: 20, width: 25 }}
                        onClick={() => removeFromCart(product)}
                      >
                        -
                      </button>
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white fond-bold py-2 px-2 rounded"
                        type="button"
                        variant="light"
                        style={{ margin: 20, width: 25 }}
                        onClick={() => addToCart(product)}
                      >
                        +
                      </button>{" "}
                      <br />
                    </p>

                    <p className="text-sm font-medium text-green-600">
                      ${product.price} x {howManyofThis(product.id)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    };

    function renderCart() {
      return (
        <div className="flex fixed flex-row">
          <div
            className="h-screen bg-slate-800 p-3 xl:basis-1/5"
            style={{ minWidth: "60%" }}
          >
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => setViewer(0)}
            >
              Return
            </button>
            <div className="px-6 py-4">
              <h1 className="text-3xl mb-2 font-bold text-white">
                {" "}
                Your Shopping Cart:
              </h1>
              <div className="py-10">
                <p className="text-white">
                  Cart Total Cost:
                  <br />${cartTotal}
                </p>
              </div>
              <div className="py-10">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white fond-bold py-2 px-4 rounded"
                  //onClick={() => reset()}
                  onClick={() => setViewer(2)}
                >
                  To Payment Form
                </button>
              </div>
            </div>
          </div>
          <div className="ml-5 p-10 xl:basis-4/5">{render_cart(cart)}</div>
        </div>
      );
    }

    function renderCartEmpty() {
      return (
        <div className="flex fixed flex-row">
          <div
            className="h-screen bg-slate-800 p-3 xl:basis-1/5"
            style={{ minWidth: "60%" }}
          >
            <button
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
              onClick={() => setViewer(0)}
            >
              Return
            </button>
            <div className="px-6 py-4">
              <h1 className="text-3xl mb-2 font-bold text-white">
                {" "}
                Your Shopping Cart:
              </h1>
              <div className="py-10">
                <p className="text-white">
                  Cart Total Cost:
                  <br />
                  Your cart is empty.
                </p>
              </div>
              <div className="py-10">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white fond-bold py-2 px-4 rounded"
                  onClick={() => reset()}
                >
                  Order
                </button>
              </div>
            </div>
          </div>
          <div className="ml-5 p-10 xl:basis-4/5">
            <p className="text-sm text-gray">Your cart is empty.</p>
          </div>
        </div>
      );
    }

    return <div>{cart.length > 0 ? renderCart() : renderCartEmpty()}</div>;
  }

  function Payment() {
    const onSubmit = (data) => {
      console.log(data); // log all data
      console.log(data.fullName); // log only fullname
      console.log(viewer);
      // update hooks
      setDataF(data);
      setViewer(3);
    };

    return (
      <div class="form">
        <h1>Payment Information </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="container mt-5"
          style={{ width: 500 }}
        >
          <input
            {...register("fullName", { required: true })}
            placeholder="Full Name"
            className="form-control placeholder-red-500"
          />
          {errors.fullName && (
            <p className="text-danger"> Full Name is required.</p>
          )}

          <input
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            placeholder="Email"
            className="form-control"
          />
          {errors.email && <p className="text-danger">Email is required.</p>}
          <div style={{ display: "flex", flexDirection: "row" }}>
            <input
              {...register("bank", { required: true })}
              placeholder="Name of Bank"
              className="form-control bank"
            />
            {errors.bank && <p className="text-danger">Bank is required.</p>}
            <input
              {...register("csv", {
                required: true,
                maxLength: 3,
                minLength: 3,
              })}
              placeholder="CSV"
              className="form-control csv"
              type="number"
            />
            {errors.csv && <p className="text-danger">CSV is required.</p>}
          </div>
          <input
            {...register("creditCard", { required: true, minLength: 5 })}
            placeholder="Credit Card"
            className="form-control"
            type="number"
          />
          {errors.creditCard && (
            <p className="text-danger">Credit Card is required.</p>
          )}
          <input
            {...register("address", { required: true })}
            placeholder="Address"
            className="form-control"
          />
          {errors.address && <p>Address is required.</p>}

          <input
            {...register("city", { required: true })}
            placeholder="City"
            className="form-control"
          />
          {errors.city && <p className="text-danger">City is required.</p>}
          <input
            {...register("state", { required: true })}
            placeholder="State"
            className="form-control"
          />
          {errors.state && <p className="text-danger">State is required.</p>}
          <input
            {...register("zip", { required: true, minLength: 5, maxLength: 5 })}
            placeholder="Zip"
            className="form-control"
            type="number"
          />
          {errors.zip && <p className="text-danger">Zip is required.</p>}

          <button
            type="submit"
            className="btn btn-primary"
            style={{ alignItems: "center" }}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

  const render_summary = (cartItems) => {
    const uniqueIDs = cartItems.reduce((want, have) => {
      const x = want.find((item) => item.id === have.id);
      if (!x) {
        return want.concat([have]);
      } else {
        return want;
      }
    }, []);

    return (
      <div>
        <div
          className="m-6 p-3 mt-10 ml-0 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-2 xl:gap-x-8 place-items-center"
          style={{
            maxHeight: "600px",
            overflowY: "scroll",
          }}
        >
          {/* Loop Products */}
          {uniqueIDs.map((product, index) => (
            <div
              key={index}
              className="group relative border rounded "
              style={{ placeSelf: "center" }}
            >
              <div className=" min-h-80 bg-gray-200 aspect-w-1 aspect-h-1  rounded-md overflow-hidden group-hover:opacity-75 lg:h-60 lg:aspect-none place-items-center">
                <img
                  key={product.id}
                  src={product.image}
                  alt="pic"
                  className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                />
              </div>
              <div className="flex justify-between p-3">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span style={{ fontSize: "16px", fontWeight: "600" }}>
                      {product.title}
                    </span>
                  </h3>

                  <p className="text-sm font-medium text-green-600">
                    ${product.price} x {howManyofThis(product.id)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  function Confirmation() {
    const updateHooks = () => {
      setViewer(0);
      setDataF({});
      setCart([]);
    };

    return (
      <div class="form">
        <h1>Payment Confirmation </h1>
        <h3>Total Price: ${cartTotal}</h3>
        <h3>{dataF.fullName}</h3>
        <p>{dataF.email}</p>
        <p>Card Details: {dataF.creditCard}</p>
        <p>
          {dataF.city}, {dataF.state}, {dataF.zip}
        </p>
        <p>
          <strong>Thank you for your purchase!</strong>
        </p>
        <button onClick={updateHooks} className="btn btn-primary">
          Back to Start
        </button>
        <div class="items">{render_summary(cart)}</div>
      </div>
    );
  }

  return (
    <div>
      {viewer === 0 && <Browse />}
      {viewer === 1 && <Cart />}
      {viewer === 2 && <Payment />}
      {viewer === 3 && <Confirmation />}
    </div>
  );
};

export default App;
