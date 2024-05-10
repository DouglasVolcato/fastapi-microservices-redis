import { ServiceLinks } from "../services/ServiceLinks";
import { useEffect, useState } from "react";
import { Wrapper } from "./Wrapper.tsx";
import { Link } from "react-router-dom";

export const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`${ServiceLinks.payment}/order`);
      const content = await response.json();
      setOrders(content);
    })();
  }, []);

  return (
    <Wrapper title="Orders">
      <div className="pt-3 pb-2 mb-3 border-bottom">
        <Link to={`/create-order`} className="btn btn-sm btn-outline-secondary">
          Add
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Product ID</th>
              <th scope="col">Price</th>
              <th scope="col">Fee</th>
              <th scope="col">Total</th>
              <th scope="col">Quantity</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => {
              return (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.product_id}</td>
                  <td>{order.price}</td>
                  <td>{order.fee}</td>
                  <td>{order.total}</td>
                  <td>{order.quantity}</td>
                  <td>{order.status}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Wrapper>
  );
};
