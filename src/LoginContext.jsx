import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (data) => {
    const response = await axios.get("https://shoppingparadisebackend.onrender.com/check");
    const db = response.data || [];
    const store = db.find((item) => item.email === data.email);
    if (store) {
      if (store.password === data.password) {
        alert("Login Successfully");
        setUser(store)
        localStorage.setItem("user",JSON.stringify(store));
        navigate("/home");
      } else {
        alert("Incorrect Password!");
      }
    } else {
      alert("Email not found!");
    }
  };
 


const handleAddToCart = async (item) => {
  const userEmail = user.email; 

  try {
    const response = await axios.post('https://shoppingparadisebackend.onrender.com/addToCart', {
      userEmail,
      productId: item._id
    });

    if (response.data.status) {
      toast.success(`${item.productName} added to cart!`);
    } else {
      toast.error("Failed to add to cart");
    }
  } catch (error) {
    toast.error("Something went wrong");
    console.error("Add to cart error:", error);
  }
};

  const signUp = async (data) => {
    const response = await axios.get("https://shoppingparadisebackend.onrender.com/check");
    const db = response.data || [];
    const exists = db.find((item) => item.email === data.email);
    if (exists) {
      alert("Email already exists!");
    } else {
      alert("Account created successfully!");
      await axios.post("https://shoppingparadisebackend.onrender.com/sign", data);
      navigate("/");
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/");
  };
  const addProduct = async (product)=>{
    const response = await axios.post("https://shoppingparadisebackend.onrender.com/addProduct", product);
    if (response){
      alert("Product Added Successfully");
      window.location.reload();
    } else{
      alert("Server Error")
    }
  }
 useEffect(()=>{
    let data =JSON.parse(localStorage.getItem("user"));
    if(data){
   setUser(data);
    }
  },[]);

  const contextValue = useMemo(
    () => ({ user, login, signUp, logout ,addProduct,handleAddToCart}),
    [user]
  );
  
  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
