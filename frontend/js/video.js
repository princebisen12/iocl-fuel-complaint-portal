function openVideo() {
  document.getElementById("videoModal").style.display = "flex";
}

function closeVideo() {
  const modal = document.getElementById("videoModal");
  modal.style.display = "none";

  // Stop video on close
  const iframe = modal.querySelector("iframe");
  iframe.src = iframe.src;
}
