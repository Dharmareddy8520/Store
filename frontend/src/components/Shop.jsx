import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "./shop.css";
import { CartContext } from "./CartContext";
const Shop = () => {
  const [products, setproducts] = useState([]);
  const [men, setmen] = useState([]);
  const [women, setwomen] = useState([]);
  const [jewelery, setjewelery] = useState([]);
  const [electronics, setelectronics] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("https://fakestoreapi.com/products");
      setproducts(res.data);
      setmen(res.data.filter((p) => p.category === "men's clothing"));
      setwomen(res.data.filter((p) => p.category === "women's clothing"));
      setjewelery(res.data.filter((p) => p.category === "jewelery"));
      setelectronics(res.data.filter((p) => p.category === "electronics"));
    };
    fetch();
  }, []);
  const { cart, setCart } = useContext(CartContext);
  const addtocart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };
  return (
    <div className="king ">
      <div className="align-items-center ">
        <div className="my-5"></div>
        <div className="row  ">
          {men.map((p) => (
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
                  <div className="col-md-6">
                    <div
                      className="btn btn btn-outline-danger"
                      onClick={() => {
                        addtocart(p);
                      }}
                    >
                      Add
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>

      <div className="align-items-center ">
        <div className="h3 my-5 mx-5">Women's Clothing</div>
        <div className="row  ">
          {women.map((p) => (
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
                  <div className="col-md-6">
                    <div
                      className="btn btn btn-outline-danger"
                      onClick={() => {
                        addtocart(p);
                      }}
                    >
                      Add
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="align-items-center ">
        <div className="h3 mx-5">Jewelery</div>
        <div className="row  ">
          {jewelery.map((p) => (
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
                  <div className="col-md-6">
                    <div
                      className="btn btn btn-outline-danger"
                      onClick={() => {
                        addtocart(p);
                      }}
                    >
                      Add
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
      <div className="align-items-center ">
        <div className="h3 mx-5">Electronics</div>
        <div className="row  ">
          {electronics.map((p) => (
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
                  <div className="col-md-6">
                    <div
                      className="btn btn btn-outline-danger"
                      onClick={() => {
                        addtocart(p);
                      }}
                    >
                      Add
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          ))}
        </div>
      </div>
      {/* footer */}
    </div>
  );
};

export default Shop;
