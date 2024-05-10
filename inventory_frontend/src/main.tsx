import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProductsCreate } from "./components/ProductsCreate.tsx";
import { CreateOrder } from "./components/CreateOrder.tsx";
import { Products } from "./components/Products.tsx";
import { Orders } from "./components/Orders.tsx";
import ReactDOM from "react-dom/client";
import React from "react";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/create" element={<ProductsCreate />} />
        <Route path="/create-order" element={<CreateOrder />} />
        <Route path="/orders" element={<Orders />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
