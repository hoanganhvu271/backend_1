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
      url.searchParams.delete("Role");
      url.searchParams.set("page", 1);
      window.location.href = url;
    });
  });

  dropdownMenu.querySelectorAll(".dropdown-item-admin").forEach(function (item) {
    item.addEventListener("click", function (event) {
      dropdownMenu.classList.remove("show");
      // Ngăn chặn hành vi mặc định của thẻ a (chuyển hướng trang)
      event.preventDefault();
      // Lấy URL từ thuộc tính href của thẻ a
      let url = new URL(window.location.href);
      // Chuyển hướng trang đến URL đã lấy được
      var roleValue = item.getAttribute("data-role");


      if (roleValue === "all") {
        url.searchParams.delete("Role");

      } else url.searchParams.set("Role", item.getAttribute("data-role") || "");
      url.searchParams.set("page", 1);
      url.searchParams.delete("class");
      window.location.href = url;
    });
  });
});



//console.log("result.js");

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
    //console.log(testId);
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += `/${testId}`;
    window.location.href = url;
  });
});

const btnDetailResult = document.querySelectorAll(
  "[btn-detail-test-with-idResult]"
);
btnDetailResult.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const idResult = btn.getAttribute("idResult");
    //console.log(idResult);
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += '/'+ idResult;
    window.location.href = url;
  });
});

const btnDetailSubmit = document.querySelectorAll(
  "[btn-detail-submit]"
);
btnDetailSubmit.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const idSubmit = btn.getAttribute("idSubmit");
    //console.log(idSubmit);
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += `/${idSubmit}`;
    window.location.href = url;
  });
});

const btnWidget = document.querySelectorAll(
  "[btn-widget]"
);
btnWidget.forEach(function (btn) {
  btn.addEventListener("click", function () {
    const idProb = btn.getAttribute("idProb");
    //console.log(idProb);
    const url = new URL(window.location.href);
    url.searchParams.delete("keyword");
    url.searchParams.delete("page");
    url.searchParams.delete("class");
    url.href += `/${idProb}`;
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

const btnTime = document.querySelectorAll("[btn-time]");
btnTime.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let timeState = localStorage.getItem('time');
    if (timeState == 0 || timeState === null) {
      localStorage.setItem('time', 1);
      btn.textContent = 'Thi'; // Thay đổi textContent của nút được click
    } else {
      localStorage.setItem('time', 0);
      btn.textContent = 'Luyện tập'; // Thay đổi textContent của nút được click
    }
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
    //console.log(testId)
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
//console.log(btnAdmin);
const dropdownAdminProfile = document.querySelectorAll(
  "[dropdown-admin-profile]"
);
//console.log(dropdownAdminProfile);
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
        //console.log("Test");
        dropdown.classList.remove("show");
      });
    }
  });
});
