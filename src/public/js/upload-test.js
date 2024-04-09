
var currentNumber = 1;
document.getElementById('examType').addEventListener('change', function () {
    var examType = this.value;
    var specificTime = document.getElementById('specificTime');

    if (examType === 'time-count') {
        specificTime.style.display = 'block';
    } else {
        specificTime.style.display = 'none';
    }
});

document.getElementById('fileOption').addEventListener('change', function () {
    var fileOption = this.value;
    var fileUpload = document.getElementById('fileUpload');

    if (fileOption === 'upload') {
        fileUpload.style.display = 'block';
    } else {
        fileUpload.style.display = 'none';
    }
});

document.getElementById('option-form').addEventListener('submit', function (event) {
    event.preventDefault();

    // Lấy thông tin từ form


    var numQuestions = parseInt(document.getElementById('numQuestions').value);
    var questionsContainer = document.getElementById('questionsContainer');

    // Xóa các câu hỏi cũ trước khi tạo mới
    questionsContainer.innerHTML = '';
    currentNumber = numQuestions + 1;


    // Tạo các ô input cho câu hỏi và đáp án
    for (var i = 1; i <= numQuestions; i++) {

        var questionContent = document.createElement('div');
        questionContent.className = 'question-content';
        questionContent.id = i;

        var questionDiv = document.createElement('div');
        questionDiv.className = 'question-container';

        // new
        var deleteQuestionButton = document.createElement('div');
        deleteQuestionButton.className = 'delete-question';

        var iconDelete = document.createElement('i');
        iconDelete.className = 'ti-close';
        deleteQuestionButton.appendChild(iconDelete);
        deleteQuestionButton.onclick = function () {
            DeleteQuestion(this.parentNode.parentNode.id);
        }

        questionDiv.appendChild(deleteQuestionButton);

        //old
        var questionLabel = document.createElement('label');
        questionLabel.textContent = 'Câu hỏi ' + i + ':';

        var questionInput = document.createElement('textarea');
        questionInput.cols = 70;
        questionInput.rows = 4;
        questionInput.id = 'question' + i;


        questionDiv.appendChild(questionLabel);
        questionDiv.appendChild(questionInput);
        questionContent.appendChild(questionDiv);
        // Tạo 4 ô input cho 4 đáp án và checkbox cho đáp án đúng


        for (var j = 1; j <= 4; j++) {
            var answerDiv = document.createElement('div');
            answerDiv.className = 'answer-container';

            var answerCheckbox = document.createElement('div');
            answerCheckbox.className = 'checkbox';
            answerCheckbox.id = i + 'checkbox' + j;
            answerCheckbox.onclick = function () {
                toggleCheckbox(this.id);
            };
            answerCheckbox.textContent = String.fromCharCode('A'.charCodeAt(0) + j - 1);

            var answerInput = document.createElement('textarea');
            answerInput.cols = "70";
            answerInput.rows = "1";
            answerInput.id = 'question' + i + 'answer' + j;

            answerDiv.appendChild(answerCheckbox);
            answerDiv.appendChild(answerInput);

            questionContent.appendChild(answerDiv);
            questionsContainer.appendChild(questionContent);
        }



    }


});


document.getElementById('excel-file').addEventListener('change', function (event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    var questionsContainer = document.getElementById('questionsContainer');

    // Xóa các câu hỏi cũ trước khi tạo mới
    questionsContainer.innerHTML = '';


    reader.onload = function (e) {
        var data = new Uint8Array(e.target.result);
        var workbook = XLSX.read(data, { type: 'array' });
        var firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        var excelData = XLSX.utils.sheet_to_json(firstSheet);

        // questionInput.value = row.question;
        // answerInput.value = row['answer' + j];
        currentNumber = excelData.length + 1;

        // Xử lý dữ liệu từ tệp Excel và tạo các trường input câu hỏi và đáp án
        excelData.forEach(function (row, index) {
            var questionContent = document.createElement('div');
            questionContent.className = 'question-content';
            questionContent.id = parseInt(index + 1);
            var questionDiv = document.createElement('div');
            questionDiv.className = 'question-container';

            // new
            var deleteQuestionButton = document.createElement('div');
            deleteQuestionButton.className = 'delete-question';

            var iconDelete = document.createElement('i');
            iconDelete.className = 'ti-close';
            deleteQuestionButton.appendChild(iconDelete);
            deleteQuestionButton.onclick = function () {
                DeleteQuestion(this.parentNode.parentNode.id);
            }

            questionDiv.appendChild(deleteQuestionButton);

            var questionLabel = document.createElement('label');
            questionLabel.textContent = 'Câu hỏi ' + (parseInt(index) + parseInt(1)) + ':';

            var questionInput = document.createElement('textarea');
            questionInput.cols = 70;
            questionInput.rows = 4;
            questionInput.value = row.question;
            questionInput.id = 'question' + index;


            questionDiv.appendChild(questionLabel);
            questionDiv.appendChild(questionInput);
            questionContent.appendChild(questionDiv);

            // Tạo 4 ô input cho 4 đáp án và checkbox cho đáp án đúng
            for (var j = 1; j <= 4; j++) {
                var answerDiv = document.createElement('div');
                answerDiv.className = 'answer-container';

                var answerCheckbox = document.createElement('div');
                answerCheckbox.className = 'checkbox';
                answerCheckbox.id = index + 'checkbox' + j;
                answerCheckbox.onclick = function () {
                    toggleCheckbox(this.id);
                };
                answerCheckbox.textContent = String.fromCharCode('A'.charCodeAt(0) + j - 1);

                var answerInput = document.createElement('textarea');
                answerInput.cols = "70";
                answerInput.rows = "1";
                answerInput.value = row['answer' + j];
                answerInput.id = 'question' + index + 'answer' + j;

                answerDiv.appendChild(answerCheckbox);
                answerDiv.appendChild(answerInput);

                questionContent.appendChild(answerDiv);
                // questionsContainer.appendChild(questionContent);


            }


            questionsContainer.appendChild(questionContent);
        });

        excelData.forEach(function (row, index) {
            for (var i = 1; i <= 4; i++) {
                if (row['correct'] == i) {
                    console.log(i);
                    toggleCheckbox(index + 'checkbox' + i);
                }
            }
        });


    };

    reader.readAsArrayBuffer(file); //đọc xong mới xử lý onload()
});

function Add() {

    var questionsContainer = document.getElementById('questionsContainer');

    var questionContent = document.createElement('div');
    questionContent.className = 'question-content';
    questionContent.id = currentNumber;

    var questionDiv = document.createElement('div');
    questionDiv.className = 'question-container';

    // new
    var deleteQuestionButton = document.createElement('div');
    deleteQuestionButton.className = 'delete-question';

    var iconDelete = document.createElement('i');
    iconDelete.className = 'ti-close';
    deleteQuestionButton.appendChild(iconDelete);
    deleteQuestionButton.onclick = function () {
        DeleteQuestion(this.parentNode.parentNode.id);
    }

    questionDiv.appendChild(deleteQuestionButton);

    var questionLabel = document.createElement('label');
    questionLabel.textContent = 'Câu hỏi ' + currentNumber + ':';

    var questionInput = document.createElement('textarea');
    questionInput.cols = 70;
    questionInput.rows = 4;


    questionDiv.appendChild(questionLabel);
    questionDiv.appendChild(questionInput);
    questionContent.appendChild(questionDiv);
    // Tạo 4 ô input cho 4 đáp án và checkbox cho đáp án đúng

    for (var j = 1; j <= 4; j++) {
        var answerDiv = document.createElement('div');
        answerDiv.className = 'answer-container';

        var answerCheckbox = document.createElement('div');
        answerCheckbox.className = 'checkbox';
        answerCheckbox.id = currentNumber + 'checkbox' + j;
        answerCheckbox.onclick = function () {
            toggleCheckbox(this.id);
        };
        answerCheckbox.textContent = String.fromCharCode('A'.charCodeAt(0) + j - 1);

        var answerInput = document.createElement('textarea');
        answerInput.cols = "70";
        answerInput.rows = "1";
        answerInput.name = 'question' + currentNumber + 'answer' + j;

        answerDiv.appendChild(answerCheckbox);
        answerDiv.appendChild(answerInput);

        questionContent.appendChild(answerDiv);

    }

    questionsContainer.appendChild(questionContent);
    currentNumber++;

}

function toggleCheckbox(idElement) {
    var element = document.getElementById(idElement);
    if (!element.classList.contains('checked')) {
        element.classList.add('checked')
    }
    else {
        element.classList.remove('checked')
    }

    if (element.style.backgroundColor === 'green') {
        element.style.backgroundColor = 'transparent';
    } else {
        element.style.backgroundColor = 'green';
    }
}

function Save() {

    var examDate = document.getElementById('examDate').value;
    var examTime = document.getElementById('timeStart').value;

    var examDateTime = examDate + 'T' + examTime;

    var formData = {
        examName: document.getElementById('examName').value,
        examDateTime: examDateTime,
        examTime: document.getElementById('examTime').value,
        numQuestions: document.getElementById('numQuestions').value,
    };


    var questions = [];

    var questionNum = formData.numQuestions

    for (var i = 1; i <= questionNum; i++) {

        var answer = [];
        var check = "";
        var questionContent = document.getElementById('question' + i).value
        for (var j = 1; j <= 4; j++) {
            if (document.getElementById(i + 'checkbox' + j).classList.contains('checked')) {
                check = j;
            }
            answer.push(document.getElementById('question' + i + 'answer' + j).value)
        }

        questions.push({
            questionContent: questionContent,
            answer1: answer[0],
            answer2: answer[1],
            answer3: answer[2],
            answer4: answer[3],
            check: check
        })
    }

    const backendURL = 'http://localhost:8080/api/new-test';

    // console.log(questions)
    // console.log(formData);

    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ metadata: formData, data: questions })
    };

    fetch(backendURL, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Có lỗi xảy ra khi gửi yêu cầu: ' + response.status);
            }
            return response.json(); // Trả về phản hồi dưới dạng JSON
        })
        .then(data => {
            console.log('Dữ liệu đã được gửi thành công đến backend:', data);
            // Xử lý dữ liệu phản hồi từ backend nếu cần
        })
        .catch(error => {
            console.error('Đã xảy ra lỗi khi gửi dữ liệu đến backend:', error);
            // Xử lý lỗi nếu có
        });
}

function DeleteQuestion(id) {
    var element = document.getElementById(id);
    console.log(element);
    UpDateIdForQuestion(id);
    element.remove();
}

function UpDateIdForQuestion(id) {
    for (var i = parseInt(id) + 1; i < currentNumber; i++) {
        var element = document.getElementById(i);

        if (element) {
            var oldId = i.toString();
            element.id = i - 1;
            var questionLabels = element.querySelectorAll('label');
            questionLabels[0].textContent = 'Câu hỏi ' + element.id + ':';
            for (var j = 1; j <= 4; j++) {
                var oldCheckBoxId = oldId + 'checkbox' + j;
                var checkbox = document.getElementById(oldCheckBoxId);
                if (checkbox) {
                    checkbox.id = element.id + 'checkbox' + j;
                }
            }
        }
    }
    currentNumber--;
}
