document.querySelector("html").addEventListener("mousedown", function (e) {});

document.querySelector("i").addEventListener("transitionend", function () {
  document.querySelector("i").classList.remove("active");
});
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

const studentResult = document.querySelectorAll("[result-student]");
const testResult = document.querySelectorAll("[result-test]");

studentResult.forEach((student) => {
  student.addEventListener("click", (e) => {
    const url = new URL(window.location.href);
    url.pathname = `/admin/result/student`;
    window.location.href = url;
  });
});

testResult.forEach((test) => {
  test.addEventListener("click", (e) => {
    const url = new URL(window.location.href);
    url.pathname = `/admin/result/test`;
    window.location.href = url;
  });
});




