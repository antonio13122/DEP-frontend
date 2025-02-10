<template>
  <div id="Marinas" class="section-container">
    <div class="text-container">
      <h1>Our Marinas</h1>
      <h2>
        Discover a network of premier marinas designed to make your docking
        experience seamless.
      </h2>
    </div>

    <div class="product-page">
      <div class="product-container">
        <img
          class="product-image"
          :src="require('@/assets/card1.png')"
          alt="Product 1"
        />
        <div class="text-overlay">
          <h3>Real-Time Updates</h3>
          <p>Reserve spots at scenic and popular marinas worldwide.</p>
        </div>
      </div>
      <div class="product-container">
        <img
          class="product-image"
          :src="require('@/assets/card2.jpg')"
          alt="Product 2"
        />
        <div class="text-overlay">
          <h3>Modern Amenities</h3>
          <p>Access well-maintained docks, fueling stations and facilities.</p>
        </div>
      </div>
      <div class="product-container">
        <img
          class="product-image"
          :src="require('@/assets/card3.png')"
          alt="Product 3"
        />
        <div class="text-overlay">
          <h3>Wide Availability</h3>
          <p>Stay informed and book your dock anytime, anywhere.</p>
        </div>
      </div>
      <div class="product-container">
        <img
          class="product-image"
          :src="require('@/assets/card4.jpg')"
          alt="Product 4"
        />
        <div class="text-overlay button-overlay">
          <router-link to="/GuestView">
            <button>See Availability</button>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MarinasSection",
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.section-container {
  background-color: #060b27;
  padding: 20px;
  color: white;
  margin-bottom: 140px;
}

.text-container {
  text-align: center;
  margin-bottom: 40px;
}

.text-container h1 {
  font-family: "Montserrat", sans-serif;
  font-size: 40px;
  font-weight: bold;
  margin: 0 0 10px;
}

.text-container h2 {
  font-family: "Montserrat", sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}

.product-page {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 0 auto;
  padding: 0 10px;
}

.product-container {
  width: calc(25% - 10px);
  margin-right: 10px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.product-container:last-child {
  margin-right: 0;
}

.product-container:hover {
  transform: translateY(-5px);
}

.product-image {
  width: 100%;
  height: 452px;
  object-fit: cover;
  border-radius: 0;
}

.product-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.1)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-container:hover::after {
  opacity: 1;
}

.text-overlay {
  position: absolute;
  bottom: 20px;
  left: 20px;
  color: white;
  font-family: "Montserrat", sans-serif;
  z-index: 10;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  text-align: left;
}

.text-overlay h3 {
  margin: 0;
  font-size: 14px;
  line-height: 24px;
  letter-spacing: 0.2px;
  font-weight: 600; /* Semi-bold */
}

.text-overlay p {
  margin: 5px 0 0;
  font-size: 20px;
  line-height: 30px;
  letter-spacing: 0.2px;
  font-weight: 500;
}

.button-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
}

.button-overlay button {
  background-color: #008cff;
  color: white;
  border: none;
  border-radius: 20px;
  position: absolute;
  bottom: 20px;
  left: 40%;
  transform: translateX(-40%);
  padding: 10px 20px;
  font-size: 18px;
  font-family: "Montserrat", sans-serif;
  font-weight: 500;
  text-align: center;
  line-height: 1.5;
  cursor: pointer;
  transition: background-color 0.3s ease;
  white-space: normal;
}

.button-overlay button:hover {
  background-color: darkblue;
}

@media (max-width: 768px) {
  .product-page {
    flex-direction: column;
    align-items: center;
  }

  .product-container {
    width: 100%;
    margin-bottom: 10px;
  }

  .product-image {
    height: 350px;
  }
}
</style>
