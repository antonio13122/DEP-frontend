<template>
  <section id="appointment" class="appointment">
    /* nije clear frontend, to do later kad se spoji s backendom */
    <h2>Make an Appointment</h2>
    <form>
      <label>
        Name:
        <input type="text" name="name" />
      </label>
      <label>
        Email:
        <input type="email" name="email" />
      </label>
      <label>
        Date:
        <input type="date" name="date" />
      </label>
      <button type="submit">Book Now</button>
    </form>
  </section>
</template>

<script>
export default {
  name: "AppointmentForm",
};
</script>
<style scoped>
.appointment {
  padding: 2rem;
  background-color: #f5f5f5;
  text-align: center;
}
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
form input {
  padding: 0.5rem;
  border: 1px solid #ccc;
}
button {
  background-color: #1b263b;
  color: white;
  padding: 0.5rem;
  border: none;
  cursor: pointer;
}
</style>
