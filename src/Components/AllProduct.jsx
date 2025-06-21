import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import axios from 'axios';
import ProductCard from './ProductCard';
import { useLogin } from '../LoginContext';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const context = useLogin();

  useEffect(() => {
    axios
      .get('https://shoppingparadisebackend.onrender.com/product')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleCart = (product) => {
   context.handleAddToCart(product);
  };

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        All Products
      </Typography>
      <Grid container spacing={4}>
        {products.length > 0 ? (
          products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={4} key={product._id}>
              <ProductCard product={product} onAddToCart={handleCart} />
            </Grid>
          ))
        ) : (
          <Typography variant="h6">No products found</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default AllProducts;
