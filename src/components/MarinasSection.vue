<template>
  <div class="section-container">
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
          :src="require('@/assets/card1.jpg')"
          alt="Product 1"
        />
      </div>
      <div class="product-container">
        <img
          class="product-image"
          :src="require('@/assets/card2.jpg')"
          alt="Product 2"
        />
      </div>
      <div class="product-container">
        <img
          class="product-image"
          :src="require('@/assets/card3.jpg')"
          alt="Product 3"
        />
      </div>
      <div class="product-container">
        <img
          class="product-image"
          :src="require('@/assets/card4.jpg')"
          alt="Product 4"
        />
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
