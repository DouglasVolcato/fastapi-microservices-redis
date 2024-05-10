import { ServiceLinks } from "../services/ServiceLinks";
import { useEffect, useState } from "react";
import { Wrapper } from "./Wrapper.tsx";
import { Link } from "react-router-dom";

export const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${ServiceLinks.inventory}/product`);
      const content = await response.json();
      setProducts(content);
    })();
  }, []);

  const del = async (id: any) => {
    if (window.confirm("Are you sure to delete this record?")) {
      await fetch(`${ServiceLinks.inventory}/product/${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((p: any) => p.id !== id));
    }
  };

  return (
    <Wrapper title="Products">
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to={`/create`} className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th scope="col">Quantity</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: any) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>
                    <a
                      href="#"
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => del(product.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};
