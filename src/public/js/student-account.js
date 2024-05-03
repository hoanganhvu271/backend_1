function openPopUp(id) {

    var details = document.getElementById(id);
    details.style.display = 'block';
}

function closePopUp(id) {
    var details = document.getElementById(id);

    document.getElementById('msv').value = ""
    document.getElementById('name').value = ""
    document.getElementById('class').value = ""
    document.getElementById('email').value = ""
    document.getElementById('password').value = ""

    document.getElementById('edit-msv').value = ""
    document.getElementById('edit-name').value = ""
    document.getElementById('edit-class').value = ""
    document.getElementById('edit-email').value = ""
    document.getElementById('edit-password').value = ""

    details.style.display = 'none';
}

function submitForm(id) {
    // console.log("hello")
    var details = document.getElementById(id);
    details.style.display = 'none';

    var formData = {
        msv: document.getElementById('msv').value,
        name: document.getElementById('name').value,
        class: document.getElementById('class').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
    };

    fetch('/api/new-student', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Xử lý phản hồi từ backend nếu cần
            console.log(data);
        })
        .catch(error => {
            console.error('There was an error with the fetch operation:', error);
        });

    // Ngăn chặn form submit mặc định
    return false;
}


async function deleteAccount(id) {

    try {

        const response = await fetch(`/api/delete-student/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json();
        if (data.status === 200) {
            console.log(data.message)
            var testTr = document.getElementById(id)
            testTr.remove();
        } else {
            alert('Xóa không thành công!');
        }
    } catch (error) {
        console.error('Lỗi khi gửi yêu cầu xóa:', error);
        alert('Đã xảy ra lỗi khi xóa bài thi!');
    }
}

function confirmDeleteAccount(itemId) {
    var confirmed = confirm("Bạn có chắc chắn muốn xóa tài khoản này không?");
    if (confirmed) {
        deleteAccount(itemId);
    }
}


function getStudentData(id, msv) {
    // console.log("hello")
    var details = document.getElementById(id);
    details.style.display = 'block';
    var url = '/api/get-student/' + msv;
    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {

            var student = data.data[0];

            document.getElementById('edit-msv').value = student.MSV
            document.getElementById('edit-name').value = student.Ten
            document.getElementById('edit-class').value = student.Lop
            document.getElementById('edit-email').value = student.Email
            document.getElementById('edit-password').value = "123456789"

            // console.log(data.data[0]);
        })
        .catch(error => {
            console.error('There was an error with the fetch operation:', error);
        });
}


function finishEdit(id) {
    var details = document.getElementById(id);
    details.style.display = 'none';

    var formData = {
        name: document.getElementById('edit-name').value,
        class: document.getElementById('edit-class').value,
        email: document.getElementById('edit-email').value,
        password: document.getElementById('edit-password').value
    };


    var url = '/api/update-student/' + document.getElementById('edit-msv').value
    console.log(url);
    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Xử lý phản hồi từ backend nếu cần
            console.log(data);
        })
        .catch(error => {
            console.error('There was an error with the fetch operation:', error);
        });


}


