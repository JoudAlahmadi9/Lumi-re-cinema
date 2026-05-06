// seats price
const seats = document.querySelectorAll(".seats input");
const totalPrice = document.getElementById("totalPrice");

if (seats.length && totalPrice) {
  seats.forEach(seat => {
    seat.addEventListener("change", () => {
      const selectedSeats = document.querySelectorAll(".seats input:checked").length;
      totalPrice.textContent = "Total: " + (selectedSeats * 25) + " SAR";
    });
  });
}

// enable seats
const dateInput = document.querySelector("input[type='date']");
const timeSelect = document.querySelector("select");

if (dateInput && timeSelect) {
  function enableSeats() {
    if (dateInput.value && timeSelect.value) {
      document.querySelector(".seats").style.pointerEvents = "auto";
      document.querySelector(".seats").style.opacity = "1";
    }
  }

  dateInput.addEventListener("change", enableSeats);
  timeSelect.addEventListener("change", enableSeats);
}