const target = document.getElementById("active");
const components = ["CPU", "RAM", "GPU", "Storage"];

setInterval(() => {
  target.textContent =
    components[Math.floor(Math.random() * components.length)];
}, 1000);
