import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  Rating,
  CardActions,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${product._id}`, { state: { product } });
  };

  return (
    <Card
      sx={{
        maxWidth: 300,
        mx: 'auto',
        borderRadius: 3,
        boxShadow: 4,
        cursor: 'pointer',
        transition: '0.3s',
        '&:hover': { boxShadow: 6 },
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="180"
        image={product.productImage}
        alt={product.productName}
      />
      <CardContent>
        <Typography variant="h6">{product.productName.slice(0,10)}...</Typography>
        <Typography variant="body2" color="text.secondary">
          {product.productCategory.toUpperCase()}
        </Typography>
        <Typography variant="subtitle1" color="text.primary" mt={1}>
          ₹{product.productPrice}
        </Typography>
        <Box display="flex" alignItems="center" mt={1}>
          <Rating value={product.rating} readOnly precision={0.5} />
          <Typography variant="body2" ml={1}>
            ({product.rating})
          </Typography>
        </Box>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
