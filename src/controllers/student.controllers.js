const {
  getAllStudent,
  getStudentById,
  createNewStudent,
  deleteStudentById,
  updateStudentById,
  getStudentCondition,
} = require("../services/student.service");

const getStudentHandler = async (req, res) => {
  var students = await getAllStudent();
  // console.log(questions)
  if (students.status === 200) {
    var hiddenStudents = students.data.map((student) => {
      const { TaiKhoan, MatKhau, ...rest } = student;
      return rest;
    });
    const response = {
      code: 1,
      status: 200,
      message: "successfully",
      data: hiddenStudents,
    };

    res.status(200).json(response);
  } else if (students.status === 404) {
    const response = {
      code: 0,
      status: 404,
      message: "Không tìm thấy sinh viên",
    };
    res.status(404).json(response);
  } else {
    const response = {
      code: 0,
      status: 500,
      message: "Internal Server Error",
    };
    res.status(500).json(response);
  }
};

const getStudentByIdHandler = async (req, res) => {
  const id = req.params.id;
  var student = await getStudentById(id);
  if (student.status === 200) {
    const response = {
      code: 1,
      status: 200,
      message: "successfully",
      data: student.data,
    };

    res.status(200).json(response);
  } else if (student.status === 404) {
    const response = {
      code: 0,
      status: 404,
      message: "Không tìm thấy sinh viên này",
    };
    res.status(404).json(response);
  } else {
    const response = {
      code: 0,
      status: 500,
      message: "Internal Server Error",
    };
    res.status(500).json(response);
  }
};

const postStudentHandler = (req, res) => {
  student = req.body
  var status = createNewStudent(student)
  if (status == 1) {
    res.status(200).json({
      code: 1,
      status: 200,
      message: "Tạo sinh viên thành công!",

    });

  }
  else if (status == 0) {
    res.status(500).json({
      code: 0,
      status: 500,
      message: "Tạo sinh viên thất bại!"

    });
  }
  else {
    //409 : conflict 
    res.status(409).json({
      code: -1,
      status: 409,
      message: "Mã sinh viên đã tồn tại"
    });
  }
}


const deleteStudentHandler = async (req, res) => {
  studentId = req.params
  var status = deleteStudentById(studentId)
  if (status) {
    res.status(200).json({
      code: 1,
      status: 200,
      message: "Xóa sinh viên thành công!"
    });
  }
  else {
    res.status(500).json({
      code: 0,
      status: 500,
      message: "Xóa sinh viên thất bại!"

    });
  }
}

const updateStudentHandler = async (req, res) => {
  const studentId = req.params.id;
  const updatedData = req.body;

  const status = await updateStudentById(studentId, updatedData);

  if (status == 1) {
    res.status(200).json({
      code: 1,
      status: 200,
      message: "Cập nhật sinh viên thành công"

    });
  }
  else if (status == 0) {
    res.status(500).json({
      code: 0,
      status: 500,
      message: "Cập nhật sinh viên thất bại"
    });
  }
  else {
    res.status(409).json({
      code: -1,
      status: 409,
      message: "Mã sinh viên đã tồn tại"
    })
  }
}



const getStudentInresultHandler = async (req, res) => {
  var value = req.query.value;
  var keyword = req.query.keyword;
  console.log(value + " " + keyword);
  var students = await getAllStudent();
  if (value && keyword) students = await getStudentCondition(value, keyword);
  // console.log(questions)

  if (students.status === 200) {
    var hiddenStudents = students.data.map((student) => {
      const { TaiKhoan, MatKhau, ...rest } = student;
      return rest;
    });
    const response = {
      code: 1,
      status: 200,
      message: "successfully",
      data: hiddenStudents,
    };

    res.status(200).json(response);
  } else if (students.status === 404) {
    const response = {
      code: 0,
      status: 404,
      message: "Không tìm thấy sinh viên",
    };
    res.status(404).json(response);
  } else {
    const response = {
      code: 0,
      status: 500,
      message: "Internal Server Error",
    };
    res.status(500).json(response);
  }
};

module.exports = {
  getStudentHandler,
  getStudentByIdHandler,
  postStudentHandler,
  deleteStudentHandler,
  updateStudentHandler,
  getStudentInresultHandler,
};
