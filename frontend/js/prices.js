const prices = {
  delhi: { petrol: 103.44, diesel: 93.33 },
  mumbai: { petrol: 102.98, diesel: 92.88 },
  kolkata: { petrol: 104.52, diesel: 94.21 }
};

function animateValue(id, start, end, duration) {
  const element = document.getElementById(id);
  const range = end - start;
  let startTime = null;

  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    element.innerText = "₹" + (start + progress * range).toFixed(2);
    if (progress < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

function updatePrices() {
  const city = document.getElementById("city").value;
  animateValue("petrolPrice", 0, prices[city].petrol, 800);
  animateValue("dieselPrice", 0, prices[city].diesel, 800);
}

// Initial load
updatePrices();
