<template>
  <footer class="footer">
    <div class="footer-content">
      <p class="footer-text">
        DEP <span class="highlight">connects</span> marinas and seafarers,
        making your journey smoother and more sustainable.
      </p>
      <p class="footer-copyright">© 2025 - DEP</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "SiteFooter",
};
</script>

<style scoped>
.footer {
  background: url("@/assets/footer.png") no-repeat center center;
  background-size: cover;
  color: white;
  text-align: center;
  padding: 5rem 2rem;
  position: relative;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.footer-content {
  max-width: 1200px;
  margin: 20 auto;
}

.footer-text {
  font-family: "Montserrat", sans-serif;
  font-size: 96px;
  font-weight: 500;
  line-height: 1.2;
  margin: 0;
}

.highlight {
  background-color: white;
  color: #060b27;
  font-weight: bold;
  padding: 0.1em 0.3em;
  border-radius: 3px;
  display: inline-block;
  transform: rotate(-5deg);
}

.footer-copyright {
  font-size: 0.8rem;
  margin-top: 3rem;
  opacity: 0.8;
  font-family: "Montserrat", sans-serif;
}
</style>
