const toggleBtn = document.getElementById("light-toggle");
const darkIcon = document.getElementById("light-toggle-dark");
const lightIcon = document.getElementById("light-toggle-light");

// Load saved theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode");
  darkIcon.style.display = "none";
  lightIcon.style.display = "inline";
} else {
  document.body.classList.remove("dark-mode");
  darkIcon.style.display = "inline";
  lightIcon.style.display = "none";
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  if (isDark) {
    localStorage.setItem("theme", "dark");
    darkIcon.style.display = "none";
    lightIcon.style.display = "inline";
  } else {
    localStorage.setItem("theme", "light");
    darkIcon.style.display = "inline";
    lightIcon.style.display = "none";
  }
});