import React, { useEffect, useState } from "react";
import "../styles/HeroCarousel.css";


const PRIVATE_API_KEY = "private_jM8qtJZ+GzAwkea1dpucoPMaCC4=";
const BANNER_FOLDER = "Banner";

function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerImages, setBannerImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch images from the ImageKit folder "Home/Banner"
  useEffect(() => {
    fetch(`https://api.imagekit.io/v1/files?path=${encodeURIComponent(BANNER_FOLDER)}`, {
      headers: {
        Authorization: "Basic " + btoa(`${PRIVATE_API_KEY}:`),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Depending on the API response format, it might be an array or an object with a `results` field.
       
        let imagesArray = [];
        if (Array.isArray(data)) {
          imagesArray = data;
        } else if (data.results) {
          imagesArray = data.results;
        }
        // Map the files to the format required by the carousel.
        const formattedImages = imagesArray.map((file) => ({
          url: file.url,
          alt: file.name || "Banner image",
        }));
        setBannerImages(formattedImages);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching banner images:", err);
        setLoading(false);
      });
  }, []);

  // Set up auto slide change when images are loaded
  useEffect(() => {
    if (bannerImages.length > 0) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [bannerImages]);

  if (loading) {
    return <div className="hero-carousel-loading">Loading...</div>;
  }

  if (bannerImages.length === 0) {
    return <div className="hero-carousel-error">No images available</div>;
  }

  return (
    <div className="hero-carousel">
      <div className="carousel-container">
        {bannerImages.map((image, index) => (
          <div
            key={index}
            className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
          >
            <img src={image.url} alt={image.alt} />
            <div className="carousel-overlay">
              <div className="carousel-content">
                <h1>Give Your Child the Best Start at Bachpan & Academic Heights Public School</h1>
                <p>Empowering futures with excellence and care</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeroCarousel;
