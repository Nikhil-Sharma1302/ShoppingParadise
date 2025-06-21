import React, { useEffect, useState } from 'react'
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Rating,
  Box,
  Grid,
  Button,
} from '@mui/material';
import axios from 'axios';

const ProductCard = ({ product, onDeleteClick }) => (
  <Card sx={{ maxWidth: 345, borderRadius: 4, boxShadow: 3 }}>
    <CardMedia component="img" height="200" image={product.productImage} alt={product.productName} />
    <CardContent>
      <Typography variant="h6" gutterBottom>{product.productName}</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        {product.productCategory.toUpperCase()}
      </Typography>
      <Typography variant="subtitle1" color="text.primary" gutterBottom>
        Price: &#8377;{product.productPrice}
      </Typography>
      <Box display="flex" alignItems="center" mb={1}>
        <Rating value={product.rating} precision={0.5} readOnly />
        <Typography variant="body2" color="text.secondary" ml={1}>
          ({product.rating})
        </Typography>
      </Box>
    
      <Button variant="contained" size="small" onClick={() => onDeleteClick(product)}>
        Delete
      </Button>
    </CardContent>
  </Card>
);

function DeleteProduct() {
    const [products, setProducts] = useState([]);
    
      useEffect(() => {
        axios.get('https://shoppingparadisebackend.onrender.com/product')
          .then(res => setProducts(res.data))
          .catch(err => console.error(err));
      }, []);

      const deleteClick =(product)=>{
     axios.post('https://shoppingparadisebackend.onrender.com/deleteproduct',product).then((res)=>{
      if(res.data.status){
        alert(res.data.message);
        window.location.reload()
      }
     }).catch((error)=>console.error(error));
      }
    
  return (
    <>
      <Grid container spacing={3}>
            {products.length>0?products.map(product => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
                <ProductCard product={product} onDeleteClick={deleteClick} />
              </Grid>
            )):<Typography variant='h4'>No Data Available !</Typography>}
          </Grid>

    </>
  )
}

export default DeleteProduct