const express = require("express");
const router = express.Router();

router.use(express.json());

router.use(express.urlencoded({ extended: false }));

const db = require("../models");

router.get("/new", (req, res) => {
    res.render("new.ejs");
  });
