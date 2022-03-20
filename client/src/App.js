import "./App.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";
import ProductList from "./components/ProductList";
import PrivateComponent from "./components/PrivateComponent";

import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<ProductList />} />
            <Route path="/add" element={<AddProduct />} />
            <Route path="/profile" element={<h1> profile Component </h1>} />
            <Route path="/update/:id" element={<UpdateProduct />} />
          </Route>

          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
