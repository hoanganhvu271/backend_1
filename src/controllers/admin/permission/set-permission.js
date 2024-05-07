
const { Op } = require("sequelize");
const {
    getAllRole,
    getAllPermissions,
    getHasPermission,
    setPermission,
    deletePermission,
    getAllAdminList,
    getAdminWithFindObject,
    getAdminById,
    updateAdminById
} = require("../../../services/permission.service")


const getPermissions = async (req, res) => {
    try {

        const find = {};
        var map = {
            "Admin1": "1",
            "Admin2": "2",
            "Admin3": "3",
            "Admin4": "4"
        }
        const role = req.query.Role;
        if (role) {
            find.Role_id = map[role];
        }
        if (req.query.keyword) {
            const regexExpression = new RegExp(req.query.keyword, "i").source;
            find[Op.or] = [
                { UserName: { [Op.regexp]: regexExpression } },
                { FirstName: { [Op.regexp]: regexExpression } },
            ];
        }
        const adminList = await getAdminWithFindObject(
            find
        );

        const roles = await getAllRole();
        const permissions = await getAllPermissions();

        // console.log(roles.data)
        // console.log(permissions.data)

        var perMatrix = [];
        for (var i = 0; i < roles.data.length; i++) {
            perMatrix[i] = []
            for (var j = 0; j < permissions.data.length; j++) {
                var status = await getHasPermission(roles.data[i].Id, permissions.data[j].Id)
                perMatrix[i][j] = status;

            }
        }

        console.log(adminList.data);

        res.render("admin/pages/permissison/viewPermission.pug", {
            roles: roles.data,
            permissions: permissions.data,
            roleName: role || "Tất cả",
            perMatrix: perMatrix,
            adminList: adminList.data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
}

const addPermissions = async (req, res) => {
    const { role_id, permission_id } = req.body;
    var existingPermissions = await getHasPermission(role_id, permission_id)
    if (existingPermissions) {
        return;
    }
    var status = await setPermission(role_id, permission_id)
    if (status) {
        res.status(200).send("Permission Added Successfully");
    }
    else {
        res.status(500).send("Internal Server Error");
    }
}

const removePermissions = async (req, res) => {
    const { role_id, permission_id } = req.body;
    var existingPermissions = await getHasPermission(role_id, permission_id)
    if (!existingPermissions) {
        return;
    }
    var status = await deletePermission(role_id, permission_id)
    if (status) {
        res.status(200).send("Permission Removed Successfully");
    }
    else {
        res.status(500).send("Internal Server Error");
    }
}

const savePermissions = async (req, res) => {
    const permissionArray = req.body;
    var status = true;
    for (var i = 0; i < permissionArray.length; i++) {
        for (var j = 0; j < permissionArray[i].length; j++) {
            var existingPermissions = await getHasPermission(i + 1, j + 1)
            if (existingPermissions && !permissionArray[i][j]) {
                status = await deletePermission(i + 1, j + 1)
            }
            else if (!existingPermissions && permissionArray[i][j]) {
                status = await setPermission(i + 1, j + 1)
            }
            if (!status) {
                break;
            }
        }
        if (!status) {
            break;
        }
    }
    console.log(status);
    if (status) {
        res.status(200).send("Permissions Saved Successfully");
    }
    else {
        res.status(500).send("Internal Server Error");
    }

}

const updateAdmin = async (req, res) => {
    // var username = req.params.username
    // console.log(username);
    const data = req.body;
    const admin = await updateAdminById(data);
    // console.log(admin)
    if (admin.status == 200) {
        res.status(200).send({ mesage: "Admin Updated Successfully" });
    }
    else {
        res.status(500).send({ mesage: "Internal Server Error" });
    }
}

const getAdminData = async (req, res) => {
    var id = req.params.username;
    const data = await getAdminById(id);
    // console.log("b", data);
    if (data.status === 200) {
        res.status(200).send(data);
    }
    else if (data.status === 404) {
        res.status(404).send("No Admin Found");
    }
    else {
        res.status(500).send("Internal Server Error");
    }

}

module.exports = {
    getPermissions,
    addPermissions,
    removePermissions,
    savePermissions,
    updateAdmin,
    getAdminData
}
