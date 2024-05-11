
const getMessage = async (req, res) => {
    var room = req.params.room
    res.render("admin/pages/message/message.pug", {
        room: room
    });
}

module.exports = {
    getMessage
}