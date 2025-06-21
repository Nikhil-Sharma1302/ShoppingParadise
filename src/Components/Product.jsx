import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  IconButton,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Breadcrumbs,
  Link,
  Rating,
  Divider,
  Container
} from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import Navbar from './Navbar';
import Footer from './Footer';
import { useLogin } from '../LoginContext';

function Product() {
  const location = useLocation();
  const state = location.state;
  const [productState, setProductState] = useState(state?.product);
  const [products, setProducts] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const navigate = useNavigate();
  const user = useLogin();

  useEffect(() => {
    setProductState(state?.product);
  }, [state]);

  useEffect(() => {
    axios.get('https://shoppingparadisebackend.onrender.com/product')
      .then((res) => setProducts(res.data))
      .catch((err) => console.error(err));
  }, []);

  const similarProducts = productState
    ? products.filter(
        (item) =>
          item.productCategory === productState.productCategory &&
          item._id !== productState._id
      )
    : [];


const handleCart = (item) => {
    user?.handleAddToCart(item)
  };

  const handleNavigate = (product) => {
    navigate('/product', { state: { product } });
  };

  return (
    <>
      <Navbar />
      <Box sx={{ p: 2 }}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ mb: 3 }}>
          <Link
            onClick={() => navigate('/home')}
            sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center', color: 'green', textDecoration: 'none' }}
          >
            <HomeRoundedIcon fontSize="small" sx={{ mr: 0.5, color: 'green' }} />
            Home
          </Link>
          <Typography color="green">{productState?.productCategory?.toUpperCase()}</Typography>
          <Typography color="text.primary">{productState?.productName?.toUpperCase()}</Typography>
        </Breadcrumbs>

        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Card sx={{ borderRadius: 4, boxShadow: 4 }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={productState?.productImage}
                  alt={productState?.productName}
                  sx={{ objectFit: 'contain', p: 2 }}
                />
              </Card>
            </Grid>

            <Grid item xs={12} md={8}>
              <Box>
                <Typography variant="h6" sx={{ color: 'green' }} gutterBottom>
                  {productState?.productCategory?.toUpperCase()}
                </Typography>
                <Typography variant="h4" gutterBottom>
                  {productState?.productName?.toUpperCase()}
                </Typography>
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  ₹ {productState?.productPrice}
                </Typography>

                <Box display="flex" alignItems="center" gap={2}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleCart(productState)}
                  >
                    Add to Cart
                  </Button>
                  <IconButton onClick={() => setFavorite(!favorite)}>
                    <FavoriteIcon color={favorite ? 'error' : 'action'} />
                  </IconButton>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography variant="body2" gutterBottom>
                  <strong>Product Code:</strong> {productState?._id}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  <strong>Availability:</strong> In Stock
                </Typography>
                <Typography variant="h6" gutterBottom>
                  Description:
                </Typography>
                <Typography variant="body1">{productState?.productDescription}</Typography>
              </Box>
            </Grid>
          </Grid>

          <Box mt={6}>
            <Typography variant="h5" gutterBottom>
              Similar Products
            </Typography>
            <Grid container spacing={4}>
              {similarProducts.map((product) => (
                <Grid item xs={12} sm={6} md={3} key={product._id}>
                  <Card
                    sx={{
                      borderRadius: 3,
                      transition: 'transform 0.3s',
                      '&:hover': { transform: 'scale(1.05)', boxShadow: 6 }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.productImage}
                      alt={product.productName}
                      onClick={() => handleNavigate(product)}
                      sx={{ cursor: 'pointer', objectFit: 'cover' }}
                    />
                    <CardContent>
                      <Typography variant="subtitle1" noWrap>
                        {product.productName}
                      </Typography>
                      <Rating name="read-only" value={5} readOnly size="small" />
                      <Typography variant="h6" color="green">
                        ₹ {product.productPrice}
                      </Typography>
                      <Button
                        variant="outlined"
                        fullWidth
                        onClick={() => handleCart(product)}
                      >
                        Add to Cart
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
}

export default Product;
