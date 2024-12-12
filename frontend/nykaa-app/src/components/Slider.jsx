import React, { useEffect, useState } from 'react';
import './Slider.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

function SliderComponent() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('https://bewakoof-clone-1.onrender.com/slider/category/slider-1');
        const data = await response.json();
        console.log("hello")
        console.log(data)
        setImages(data.slider);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };
    fetchImages();
  }, []);

  const NextArrow = ({ onClick }) => (
    <div className="arrow next" onClick={onClick}>
      <SlArrowRight />
    </div>
  );

  const PrevArrow = ({ onClick }) => (
    <div className="arrow prev" onClick={onClick}>
      <SlArrowLeft />
    </div>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="slider-container">
      <Slider {...settings}>
        {images && images.length > 0 ? (
          images.map((image) => (
            <div className="slider-item" key={image._id}>
              <img
                src={image.imgURL}
                alt={image.alternateName || 'Slider Image'}
                className="slider-image"
              />
            </div>
          ))
        ) : (
          <div className="slider-item">
            <p>No images available</p>
          </div>
        )}
      </Slider>
    </div>
  );
}

export default SliderComponent;
