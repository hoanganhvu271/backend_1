const express = require('express')
const { getAllTest } = require('../services/test.service')
const getHomePage = async (req, res) => {

    res.render('index.ejs')
}
const testapi = async (req, res) => {
    res.render('index.ejs')
}

module.exports = { getHomePage }