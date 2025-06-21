import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import hero1 from '../Images/hero-1.webp';
import hero2 from '../Images/hero-2.jpg';


const images = [
  {
    url: hero1,
    caption: '',
  },
  {
    url: hero2,
    caption: '',
  }
];

const ProductCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <Box sx={{ maxWidth: '1200px', mx: 'auto', my: 4 }}>
      <Slider {...settings}>
        {images.map((item, index) => (
          <Box key={index} sx={{ position: 'relative' }}>
            <img
              src={item.url}
              alt={item.caption}
              style={{ width: '100%', borderRadius: '10px' }}
            />
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                color: '#fff',
                px: 2,
                py: 1,
                borderRadius: 1,
              }}
            >
              {item.caption}
            </Typography>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductCarousel;
