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
    item.addEventListener("click", function (event) {
      dropdownMenu.classList.remove("show");
      // Ngăn chặn hành vi mặc định của thẻ a (chuyển hướng trang)
      event.preventDefault();
      // Lấy URL từ thuộc tính href của thẻ a
      let url = new URL(window.location.href);
      // Chuyển hướng trang đến URL đã lấy được
      var classValue = item.getAttribute("data-class");
      if (classValue === "all") {
        url.searchParams.delete("class");
      } else url.searchParams.set("class", item.getAttribute("data-class") || "");
      url.searchParams.set("page", 1);
      window.location.href = url;
    });
  });
});
console.log("result.js");

const btnloc = document.querySelectorAll("[btn-loc]");

btnloc.forEach(function (btn) {
<<<<<<< HEAD
  btn.addEventListener("click", function () {
    const inputElement = document.querySelector("[tim-kiem]");
    const inputValue = inputElement.value;
    const url = new URL(window.location.href);
    url.searchParams.set("keyword", inputValue);
    url.searchParams.set("page", 1);
    window.location.href = url;
  });
=======
  btn.addEventListener("click", function () {
    const inputElement = document.querySelector("[tim-kiem]");
    const inputValue = inputElement.value;
    const url = new URL(window.location.href);
    url.searchParams.set("keyword", inputValue);
    url.searchParams.set("page", 1);
    window.location.href = url;
  });
>>>>>>> cc0e4a888a0021d248065e392b40eb8d56d388f9
});

const btnDetailList = document.querySelectorAll("[btn-detail]");
btnDetailList.forEach(function (btn) {
<<<<<<< HEAD
  btn.addEventListener("click", function () {
    const studentId = btn.getAttribute("idStu");
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.pathname = `/admin/result/student/${studentId}`;
    window.location.href = url;
  });
});

const btnDetailTestList = document.querySelectorAll(
  "[btn-detail-test-with-idStu]"
);
btnDetailTestList.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const testId = btn.getAttribute("idTest");
    console.log(testId);
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += `/${testId}`;
    window.location.href = url;
  });
=======
  btn.addEventListener("click", function () {
    const studentId = btn.getAttribute("idStu");
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.pathname = `/admin/result/student/${studentId}`;
    window.location.href = url;
  });
});

const btnDetailTestList = document.querySelectorAll(
  "[btn-detail-test-with-idStu]"
);
btnDetailTestList.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const testId = btn.getAttribute("idTest");
    console.log(testId);
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += `/${testId}`;
    window.location.href = url;
  });
>>>>>>> cc0e4a888a0021d248065e392b40eb8d56d388f9
});

const btnLocTest = document.querySelectorAll("[btn-loc-test]");
btnLocTest.forEach(function (btn) {
<<<<<<< HEAD
  btn.addEventListener("click", function () {
    const inputElement = document.querySelector("[tim-kiem-test]");
    const inputValue = inputElement.value;
    const url = new URL(window.location.href);
    url.searchParams.set("keyword", inputValue);
    url.searchParams.set("page", 1);
    window.location.href = url;
  });
=======
  btn.addEventListener("click", function () {
    const inputElement = document.querySelector("[tim-kiem-test]");
    const inputValue = inputElement.value;
    const url = new URL(window.location.href);
    url.searchParams.set("keyword", inputValue);
    url.searchParams.set("page", 1);
    window.location.href = url;
  });
>>>>>>> cc0e4a888a0021d248065e392b40eb8d56d388f9
});

const btnDetailTest = document.querySelectorAll("[btn-detail-test]");
btnDetailTest.forEach(function (btn) {
<<<<<<< HEAD
  btn.addEventListener("click", function () {
    const testId = btn.getAttribute("idTest");
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.pathname = `/admin/result/test/${testId}`;
    window.location.href = url;
  });
});

const btnDetailStudentAndTest = document.querySelectorAll(
  "[btn-detail-test-and-student]"
);
btnDetailStudentAndTest.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const studentId = btn.getAttribute("idStudent");
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += `/${studentId}`;
    window.location.href = url;
  });
=======
  btn.addEventListener("click", function () {
    const testId = btn.getAttribute("idTest");
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.pathname = `/admin/result/test/${testId}`;
    window.location.href = url;
  });
});

const btnDetailStudentAndTest = document.querySelectorAll(
  "[btn-detail-test-and-student]"
);
btnDetailStudentAndTest.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const studentId = btn.getAttribute("idStudent");
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += `/${studentId}`;
    window.location.href = url;
  });
>>>>>>> cc0e4a888a0021d248065e392b40eb8d56d388f9
});

const btnLocStu = document.querySelectorAll("[btn-loc-stu]");
btnLocStu.forEach(function (btn) {
<<<<<<< HEAD
  btn.addEventListener("click", function () {
    const inputElement = document.querySelector("[tim-kiem-stu]");
    const inputValue = inputElement.value;
    const url = new URL(window.location.href);
    url.searchParams.set("keyword", inputValue);
    url.searchParams.set("page", 1);
    window.location.href = url;
  });
});
=======
  btn.addEventListener("click", function () {
    const inputElement = document.querySelector("[tim-kiem-stu]");
    const inputValue = inputElement.value;
    const url = new URL(window.location.href);
    url.searchParams.set("keyword", inputValue);
    url.searchParams.set("page", 1);
    window.location.href = url;
  });
});

const sidebar_toggle = document.getElementById("sidebar-toggle");
const body = document.querySelector("body");

sidebar_toggle.addEventListener("click", function () {
  if (body.classList.contains("is-collapsed")) {
    body.classList.remove("is-collapsed");
    localStorage.setItem("sidebarState", "expanded"); // Lưu trạng thái là expanded
  } else {
    body.classList.add("is-collapsed");
    localStorage.setItem("sidebarState", "collapsed"); // Lưu trạng thái là collapsed
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const storedState = localStorage.getItem("sidebarState");
  if (storedState === "collapsed") {
    body.classList.add("is-collapsed");
  } else {
    body.classList.remove("is-collapsed");
  }
});

const btnAdmin = document.querySelectorAll("[admin-btn]");
console.log(btnAdmin);
const dropdownAdminProfile = document.querySelectorAll(
  "[dropdown-admin-profile]"
);
console.log(dropdownAdminProfile);
btnAdmin.forEach(function (btn) {
  btn.addEventListener("click", function () {
    dropdownAdminProfile.forEach(function (dropdown) {
      dropdown.classList.toggle("show");
    });
  });
  //bam ra ngoai thi dong
  document.addEventListener("click", function (event) {
    if (
      !btn.contains(event.target) &&
      !dropdownAdminProfile[0].contains(event.target)
    ) {
      dropdownAdminProfile.forEach(function (dropdown) {
        console.log("Test");
        dropdown.classList.remove("show");
      });
    }
  });
});
>>>>>>> cc0e4a888a0021d248065e392b40eb8d56d388f9
