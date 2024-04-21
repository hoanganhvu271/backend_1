const list_button_dropdown = document.querySelectorAll(
  "[button-dropdown-item]"
);
list_button_dropdown.forEach((button) => {
  button.addEventListener("click", (e) => {
    const dropdown = button.nextElementSibling;
    dropdown.classList.toggle("show");

    //ddoi arrow down
    const arrow = button.querySelector("[arrow]");
    const icon = arrow.querySelector("i");
    if (icon.classList.contains("ti-angle-right")) {
      icon.classList.remove("ti-angle-right");
      icon.classList.add("ti-angle-down");
    } else {
      icon.classList.remove("ti-angle-down");
      icon.classList.add("ti-angle-right");
    }
  });
});
