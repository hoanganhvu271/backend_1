const express = require("express");
const router = express.Router();
const db = require("../../models/index");
const profileController = require("../../controllers/admin/profile/profile.controller");

router.get("/", profileController.index);
router.patch("/save-profile", async (req, res) => {
  try {
    const adminId = req.user.id; 
    const updatedData = req.body; 

    // Tìm admin cần cập nhật
    const admin = await db.Admin.findByPk(adminId);
    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    // Cập nhật thông tin của admin
    await admin.update(updatedData);

    // Trả về phản hồi thành công
    return res
      .status(200)
      .json({ message: "Admin updated successfully", admin });
  } catch (error) {
    // Xử lý lỗi
    console.error("Error updating admin:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
