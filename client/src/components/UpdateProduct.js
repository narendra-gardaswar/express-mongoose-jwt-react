import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
const UpdateProduct = () => {
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [category, setCategory] = React.useState("");
  const [company, setCompany] = React.useState("");
  const params = useParams();
  const navigate = useNavigate();
  const [err, setErr] = React.useState(false);

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = async () => {
    let result = await fetch(`http://localhost:3001/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company);
  };
  const updateProduct = async () => {
    if (!name || !price || !category || !company) {
      setErr(true);
      return false;
    }
    const userId = JSON.parse(localStorage.getItem("user"))._id;

    const result = await fetch(`http://localhost:3001/product/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ name, price, category, company, userId }),
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    navigate("/");
  };
  return (
    <div className="addProduct">
      <h1>Update Product</h1>
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
        value={name}
      />
      {err && !name && <span className="invalid">Enter Valid Name</span>}
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Price"
        onChange={(e) => {
          setPrice(e.target.value);
        }}
        value={price}
      />
      {err && !price && <span className="invalid">Enter Valid Price</span>}
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Category"
        onChange={(e) => {
          setCategory(e.target.value);
        }}
        value={category}
      />
      {err && !category && (
        <span className="invalid">Enter Valid Category</span>
      )}
      <input
        type="text"
        className="inputBox"
        placeholder="Enter Company"
        onChange={(e) => {
          setCompany(e.target.value);
        }}
        value={company}
      />
      {err && !company && <span className="invalid">Enter Valid company</span>}

      <button className="appButton" type="button" onClick={updateProduct}>
        Update Product
      </button>
    </div>
  );
};

export default UpdateProduct;
