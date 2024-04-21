const express = require('express')
const { getAllTest } = require('../services/test.service')
const getHomePage = async (req, res) => {
    res.render('upload-test.ejs')
}
const testapi = async (req, res) => {
    res.render('upload-test')
}

module.exports = { getHomePage }