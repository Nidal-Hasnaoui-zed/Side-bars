const toggleBtn = document.getElementById("toggle-btn");
const sidebar = document.getElementById("sidebar");
const main = document.querySelector(".main");

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("hide");
  main.classList.toggle("shift");
  toggleBtn.classList.toggle("shift");
});
