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
  btn.addEventListener("click", function () {
    const inputElement = document.querySelector("[tim-kiem]");
    const inputValue = inputElement.value;
    const url = new URL(window.location.href);
    if (inputValue && inputValue !== "")
      url.searchParams.set("keyword", inputValue);
    else {
      url.searchParams.delete("keyword");
    }
    url.searchParams.set("page", 1);
    window.location.href = url;
  });
});

const btnDetailList = document.querySelectorAll("[btn-detail]");
btnDetailList.forEach(function (btn) {
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
});

const btnLocTest = document.querySelectorAll("[btn-loc-test]");
btnLocTest.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const inputElement = document.querySelector("[tim-kiem-test]");
    const inputValue = inputElement.value;
    const url = new URL(window.location.href);
    if (inputValue && inputValue !== "")
      url.searchParams.set("keyword", inputValue);
    else {
      url.searchParams.delete("keyword");
    }
    url.searchParams.set("page", 1);
    window.location.href = url;
  });
});

const btnDetailTest = document.querySelectorAll("[btn-detail-test]");
btnDetailTest.forEach(function (btn) {
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

const btnDetailTestUser = document.querySelectorAll("[btn-detail-test-user]");
btnDetailTestUser.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const testId = btn.getAttribute("idTest");
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.pathname = `/user/result/test/${testId}`;
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
});

const btnLocStu = document.querySelectorAll("[btn-loc-stu]");
btnLocStu.forEach(function (btn) {
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
const btn_dark_bg_slide = document.querySelector("[btn-bg-slide-dark]");
const btn_white_bg_slide = document.querySelector("[btn-bg-slide-white]");
const slideBg = document.querySelector("[slide-bar-item]");
console.log(slideBg);
slideBg.classList.add("white-bg");
btn_dark_bg_slide.addEventListener("click", function () {
  console.log("test black");
  if (!slideBg.classList.contains("black-bg")) {
    slideBg.classList.add("black-bg");
  }
  if (slideBg.classList.contains("white-bg")) {
    slideBg.classList.remove("white-bg");
  }
});
btn_white_bg_slide.addEventListener("click", function () {
  console.log("test white");
  if (!slideBg.classList.contains("white-bg")) {
    slideBg.classList.add("white-bg");
  }
  if (slideBg.classList.contains("black-bg")) {
    slideBg.classList.remove("black-bg");
  }
});

const listBtnNav = document.querySelectorAll("[btn-nav-tag]");

console.log(listBtnNav);

listBtnNav.forEach(function (btn) {
  btn.addEventListener("click", function () {
    btn.classList.add("active-item-nav");
    var parent = btn.querySelector(".btn-nav");
    parent.classList.add(localStorage.getItem("sidebarColor"));
    if (btn.classList.contains("active-item-nav")) {
      listBtnNav.forEach(function (btn1) {
        if (btn1 !== btn) {
          if (btn1.classList.contains("active-item-nav")) {
            btn1.classList.remove("active-item-nav");
          }
          //btn -> .btn-nav
          var parent = btn1.querySelector(".btn-nav");
          if (parent.classList.contains("bg-gradient-primary")) {
            parent.classList.remove("bg-gradient-primary");
          }
          if (parent.classList.contains("bg-gradient-dark")) {
            parent.classList.remove("bg-gradient-dark");
          }
          if (parent.classList.contains("bg-gradient-info")) {
            parent.classList.remove("bg-gradient-info");
          }
          if (parent.classList.contains("bg-gradient-success")) {
            parent.classList.remove("bg-gradient-success");
          }
          if (parent.classList.contains("bg-gradient-warning")) {
            parent.classList.remove("bg-gradient-warning");
          }
          if (parent.classList.contains("bg-gradient-danger")) {
            parent.classList.remove("bg-gradient-danger");
          }
        }
      });
    }
  });
});
listBtnNav[0].classList.add("active-item-nav");
var parent = listBtnNav[0].querySelector(".btn-nav");
parent.classList.add(localStorage.getItem("sidebarColor"));
function sidebarColor(a) {
  var parent = document.querySelector(".active-item-nav .btn-nav");

  //lay the a trong parent1
  console.log(parent);
  var color = a.getAttribute("data-color");
  //luu vao local storage
  localStorage.setItem("sidebarColor", "bg-gradient-" + color);
  if (parent.classList.contains("bg-gradient-primary")) {
    parent.classList.remove("bg-gradient-primary");
  }
  if (parent.classList.contains("bg-gradient-dark")) {
    parent.classList.remove("bg-gradient-dark");
  }
  if (parent.classList.contains("bg-gradient-info")) {
    parent.classList.remove("bg-gradient-info");
  }
  if (parent.classList.contains("bg-gradient-success")) {
    parent.classList.remove("bg-gradient-success");
  }
  if (parent.classList.contains("bg-gradient-warning")) {
    parent.classList.remove("bg-gradient-warning");
  }
  if (parent.classList.contains("bg-gradient-danger")) {
    parent.classList.remove("bg-gradient-danger");
  }
  parent.classList.add(localStorage.getItem("sidebarColor"));
}
