import React, { useEffect, useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';
import axios from 'axios';

const ProductCard = ({ product, onEditClick }) => (
  <Card sx={{ maxWidth: 345, borderRadius: 4, boxShadow: 3 }}>
    <CardMedia component="img" height="200" image={product.productImage} alt={product.productName} />
    <CardContent>
      <Typography variant="h6" gutterBottom>{product.productName}</Typography>
      <Typography variant="subtitle1" color="text.primary" gutterBottom>
        Price: &#8377;{product.productPrice}
      </Typography>
      <Box display="flex" alignItems="center" mb={1}>
        <Rating value={product.rating} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary" ml={1}>
          ({product.rating})
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary" mb={2}>
        {product.productDescription.substring(0,130)}...
      </Typography>
      <Button variant="contained" size="small" onClick={() => onEditClick(product)}>
        Edit
      </Button>
    </CardContent>
  </Card>
);


function EditProduct() {
   const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get('https://shoppingparadisebackend.onrender.com/product')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
      console.log(products);
  }, []);
  
  const handleEditClick = (product) => {
    setSelectedProduct({ ...product });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  const handleSave = () => {
    axios.post("https://shoppingparadisebackend.onrender.com/editproduct",selectedProduct).then((res)=>{
      if(res.data.status){
        alert(res.data.message);
        window.location.reload()
      }
     }).catch((error)=>console.error(error));
    setOpen(false);
  };

  const handleChange = (field, value) => {
    setSelectedProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <Grid container spacing={3}>
        {products.length>0 ? products.map(product => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
            <ProductCard product={product} onEditClick={handleEditClick} />
          </Grid>
        )):<Typography variant='h4'  >No Data Available !</Typography>}
      </Grid>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Product</DialogTitle>
        <DialogContent sx={{ minWidth: 300 }}>
          <TextField
            fullWidth
            margin="dense"
            label="Name"
            value={selectedProduct?.productName || ''}
            onChange={(e) => handleChange('productName', e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Description"
            multiline
            rows={3}
            value={selectedProduct?.productDescription || ''}
            onChange={(e) => handleChange('productDescription', e.target.value)}
          />
          <TextField
            fullWidth
            margin="dense"
            label="price"
            value={selectedProduct?.productPrice || ''}
            onChange={(e) => handleChange('productPrice', e.target.value)}
          />
           <TextField
            fullWidth
            margin="dense"
            label="image"
            value={selectedProduct?.productImage || ''}
            onChange={(e) => handleChange('productImage', e.target.value)}
          />
          <Box mt={2}>
            <Typography>Rating</Typography>
            <Rating
              value={selectedProduct?.rating || 0}
              precision={0.5}
              onChange={(e, newValue) => handleChange('rating', newValue)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditProduct;


