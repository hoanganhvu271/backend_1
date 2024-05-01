document.addEventListener("DOMContentLoaded", function () {
  var dropdownButton = document.getElementById("dropdownButton");
  var dropdownMenu = dropdownButton.nextElementSibling;

  dropdownButton.addEventListener("click", function () {
    dropdownMenu.classList.toggle("show");
  });

  // Đóng dropdown nếu click bên ngoài
  document.addEventListener("click", function (event) {
    if (
      !dropdownButton.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.remove("show");
    }
  });
  dropdownMenu.querySelectorAll(".dropdown-item").forEach(function (item) {
    console.log("item");
    item.addEventListener("click", function (event) {
      // Ngăn chặn hành vi mặc định của thẻ a (chuyển hướng trang)
      event.preventDefault();
      console.log("click");
      // Lấy URL từ thuộc tính href của thẻ a
      let url = new URL(window.location.href);
      console.log(url);
      // Chuyển hướng trang đến URL đã lấy được
      var classValue = item.getAttribute("data-class");
      if (classValue === "all") {
        url.searchParams.delete("class");
      } else url.searchParams.set("class", item.getAttribute("data-class") || "");
      window.location.href = url;
    });
  });
});
console.log("result.js");
