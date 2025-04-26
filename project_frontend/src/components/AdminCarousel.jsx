import React from 'react';
import { Carousel } from 'react-bootstrap';
import { Box, Typography } from '@mui/material';
import img1 from '../images/img2.png'; // Replace with your image path
import img2 from '../images/img1.png';
import img3 from '../images/img3.png';


export default function AdminCarousel() {
  return (
    <Box sx={{ width: '80%', margin: 'auto', mt: 4 }}>
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img1}
          alt="First Slide"
          style={{ height: '390px', objectFit: 'shrink', borderRadius: '10px' }}
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img2}
          alt="Second Slide"
          style={{ height: '390px', objectFit: 'shrink', borderRadius: '10px' }}
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="d-block w-100"
          src={img3}
          alt="Third Slide"
          style={{ height: '390px', objectFit: 'shrink', borderRadius: '10px' }}
        />
      </Carousel.Item>

      
    </Carousel>
  </Box>
  );
}
