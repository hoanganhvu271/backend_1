const express = require('express')
const { getAllTest } = require('../services/test.service')
const getHomePage = async (req, res) => {

    res.render('upload-test.ejs')
}
module.exports = { getHomePage }