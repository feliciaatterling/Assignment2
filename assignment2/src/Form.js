import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [dataF, setDataF] = useState({});
  const [viewer, setViewer] = useState(0);

  function Payment() {
    const onSubmit = (data) => {
      console.log(data); // log all data
      console.log(data.fullName); // log only fullname
      // update hooks
      setDataF(data);
      setViewer(1);
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
              {...register("csv", { required: true })}
              placeholder="CSV"
              className="form-control csv"
            />
            {errors.csv && <p className="text-danger">CSV is required.</p>}
          </div>
          <input
            {...register("creditCard", { required: true })}
            placeholder="Credit Card"
            className="form-control"
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
            {...register("zip", { required: true })}
            placeholder="Zip"
            className="form-control"
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

  function Confirmation() {
    const updateHooks = () => {
      setViewer(0);
      setDataF({});
    };

    return (
      <div class="form">
        <h1>Payment Confirmation </h1>
        <p>//Add cart items</p>
        <h3>{dataF.fullName}</h3>
        <p>{dataF.email}</p>
        <p>Card Details: {dataF.creditCard}</p>
        <p>
          {dataF.city}, {dataF.state}, {dataF.zip}
        </p>
        <button onClick={updateHooks} className="btn btn-primary">
          Confirm
        </button>
      </div>
    );
  }

  return (
    <div>
      {viewer === 0 && <Payment />}
      {viewer === 1 && <Confirmation />}
    </div>
  );
}
export default App;
