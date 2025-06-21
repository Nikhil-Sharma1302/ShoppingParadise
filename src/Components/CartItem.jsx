import React, { useState, useEffect } from "react";
import {
  Box, Button, Card, CardContent, CardMedia,
  Container, Divider, Grid, Typography, IconButton
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useLogin } from "../LoginContext";

function CartItem() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();
  const user = useLogin();
  const userEmail = user?.user?.email;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!userEmail) return;

        const response = await axios.post(`http://localhost:5000/getCart`, { userEmail });
        if (response.data.status) {
          setCartItems(response.data.cart.products);
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, [userEmail]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.productId.productPrice * item.quantity,
    0
  );

  const checkout = () => {
    navigate("/checkout", { state: total });
  };

  const handleQuantityChange = async (productId, delta) => {
    const updatedCart = cartItems.map((item) =>
      item.productId._id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );

    const newQuantity = updatedCart.find((item) => item.productId._id === productId).quantity;

    await axios.post("https://shoppingparadisebackend.onrender.com/updateCart", {
      userEmail,
      productId,
      quantity: newQuantity,
    });

    setCartItems(updatedCart);
  };

  const handleDelete = async (productId) => {
    await axios.post("https://shoppingparadisebackend.onrender.com/deleteCart", {
      userEmail,
      productId,
    });

    setCartItems((prev) => prev.filter((item) => item.productId._id !== productId));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Shopping Cart ({cartItems.length})
          </Typography>
          <Divider sx={{ mb: 2 }} />

          {cartItems.map((item) => (
            <Card key={item._id} sx={{ mb: 2 }}>
              <Grid container alignItems="center">
                <Grid item xs={3}>
                  <CardMedia
                    component="img"
                    image={item.productId.productImage}
                    alt={item.productId.productName}
                    sx={{ width: 80, height: 80, objectFit: "contain", m: 1 }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <CardContent sx={{ p: 1 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      {item.productId.productCategory}
                    </Typography>
                    <Typography variant="h6">{item.productId.productName}</Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleQuantityChange(item.productId._id, -1)}
                      >
                        -
                      </Button>
                      <Typography variant="body1" sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => handleQuantityChange(item.productId._id, 1)}
                      >
                        +
                      </Button>
                      <Typography sx={{ ml: 3 }}>
                        ₹ {item.productId.productPrice * item.quantity}
                      </Typography>
                      <IconButton
                        onClick={() => handleDelete(item.productId._id)}
                        sx={{ ml: 2 }}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          ))}

          <Box sx={{ mt: 2 }}>
            <Link to="/home">
              <Typography variant="body2" color="primary">
                ← Back to Shop
              </Typography>
            </Link>
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, bgcolor: "grey.100", borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Summary</Typography>
            <Divider sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
              <Typography>TOTAL ITEMS</Typography>
              <Typography>{cartItems.length}</Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
              <Typography>TOTAL PRICE</Typography>
              <Typography>₹ {total}</Typography>
            </Box>
            <Button fullWidth variant="contained" color="primary" onClick={checkout}>
              CHECKOUT
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CartItem;
