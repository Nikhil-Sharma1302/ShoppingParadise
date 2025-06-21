import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useLogin } from '../LoginContext';

export default function AddProduct() {
  let context = useLogin();
  const [product, setProduct] = useState({
    productName: '',
    productDescription: '',
    rating: '',
    productCategory: '',
    productImage: '',
    productPrice: ''
  });

  const handleChange = e => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    context.addProduct(product);
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom>Add New Product</Typography>
      <form onSubmit={handleSubmit}>
        <TextField label="Product Name" fullWidth margin="normal" name="productName" value={product.productName} onChange={handleChange} />
        <TextField label="Description" fullWidth margin="normal" name="productDescription" value={product.productDescription} onChange={handleChange} />
        <TextField label="Rating" fullWidth margin="normal" name="rating" value={product.rating} onChange={handleChange} />
        <TextField label="Category" fullWidth margin="normal" name="productCategory" value={product.productCategory} onChange={handleChange} />
        <TextField label="Image URL" fullWidth margin="normal" name="productImage" value={product.productImage} onChange={handleChange} />
        <TextField label="Price" fullWidth margin="normal" name="productPrice" value={product.productPrice} onChange={handleChange} />
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>Add Product</Button>
      </form>
    </Box>
  );
}
