import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:3001/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProducts(result);
  };
  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:3001/product/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();

    if (result.acknowledged === true && result.deletedCount === 1) {
      alert("Record is Deleted");
      getProducts();
    } else {
      alert("Failed, Record not Found");
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    const key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:3001/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };
  return (
    <div className="product-list">
      <h3>Product list</h3>
      <input
        type="text"
        className="search-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Category</li>
        <li>Company</li>
        <li>Price</li>
        <li>Operation</li>
      </ul>
      {products.length > 0 ? (
        products.map((item, index) => (
          <ul key={item._id}>
            <li>{++index}</li>
            <li>{item.name}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li>${item.price}</li>
            <li>
              <button
                className="btn-delete"
                onClick={() => deleteProduct(item._id)}
              >
                Delete
              </button>

              <Link to={`/update/${item._id}`}>
                <button> Update </button>
              </Link>
            </li>
          </ul>
        ))
      ) : (
        <h1>NO data Found</h1>
      )}
    </div>
  );
};

export default ProductList;
