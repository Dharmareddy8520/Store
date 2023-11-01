import { useContext, useState } from "react";
import { CartContext } from "./CartContext";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const Checkout = () => {
  const { cart, setCart } = useContext(CartContext);
  const totalCost = cart.reduce(
    (total, item) => total + item.price * (item.quantity || 1),
    0
  );

  const handleInc = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      )
    );
  };

  const handleDec = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id && (item.quantity || 1) > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
    );
  };

  const handleRemove = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div className="row  ">
        {cart.map((p) => (
          <div
            className="col-sm-6 col-md-4  jack my-3 shadow-lg rounded"
            key={p.id}
          >
            <div className=" px-3 my-3 py-3">
              <img
                src={p.image}
                alt=""
                width={100}
                height={170}
                className="rounded mx-auto d-block"
              />
              <div className="cat">{p.category}</div>
              <div className="title">{p.title}</div>
              <div className="desc text-wrap">{p.description}</div>
              <div className="row pt-3">
                <div className="col-md-6 ">Price:${p.price}</div>
                <div className="col-md-6 btn btn-danger">
                  <Link
                    to="/checkout/purchase"
                    className="text-light"
                    style={{ textDecoration: "none" }}
                  >
                    Buy Now
                  </Link>
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-sm-2">
                  {" "}
                  <div
                    className="btn btn-primary "
                    onClick={() => {
                      handleInc(p.id);
                    }}
                  >
                    +
                  </div>
                </div>
                <div className="col-sm-2">
                  {" "}
                  <div
                    className="btn btn-primary "
                    onClick={() => {
                      handleDec(p.id);
                    }}
                  >
                    -
                  </div>
                </div>

                <div className="col-sm-2">
                  <div
                    className="btn btn-warning"
                    onClick={() => handleRemove(p.id)}
                  >
                    <FontAwesomeIcon icon={faClose} className="fa-2x" />
                  </div>
                </div>
              </div>
            </div>
            <div>Total cost: {p.price * (p.quantity || 1)}</div>
          </div>
        ))}
      </div>
      <div className="h1">Total cost of all items: {totalCost}</div>
    </div>
  );
};

export default Checkout;
