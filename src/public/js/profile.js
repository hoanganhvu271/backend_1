document.addEventListener("DOMContentLoaded", function () {
  const editBtn = document.getElementById("editBtn");
  const saveBtn = document.getElementById("saveBtn");
  const inputs = document.querySelectorAll(".form-control");

  editBtn.addEventListener("click", function () {
    inputs.forEach((input) => {
      input.removeAttribute("readonly");
    });
    saveBtn.classList.remove("hide");
  });

  saveBtn.addEventListener("click", function () {
    let formData = new FormData();
    inputs.forEach((input) => {
      formData.append(input.id, input.value);
    });
    fetch("/save-profile", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log("Profile updated:", data);
        saveBtn.classList.add("hide");
        inputs.forEach((input) => {
          input.setAttribute("readonly", true);
        });
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
      });
  });
});
