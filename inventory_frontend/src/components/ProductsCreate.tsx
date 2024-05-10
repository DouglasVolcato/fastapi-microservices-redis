import { ServiceLinks } from "../services/ServiceLinks";
import { useNavigate } from "react-router-dom";
import { Wrapper } from "./Wrapper.tsx";
import { useState } from "react";

export const ProductsCreate = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const navigate = useNavigate();

  const submit = async (e: any) => {
    e.preventDefault();

    await fetch(`${ServiceLinks.inventory}/product`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price,
        quantity,
      }),
    });

    await navigate(-1);
  };

  return (
    <Wrapper title="Add a new product">
      <form className="mt-3 container" onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="price" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="quantity" className="form-label">
            Quantity
          </label>
          <input
            type="number"
            className="form-control"
            id="quantity"
            placeholder="Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-lg btn-primary w-100">
          Submit
        </button>
      </form>
    </Wrapper>
  );

};
