const{ showbook, getbook, addbook, updatebook, updateboook, deletebook } = require("./book");
const { urlencoded } = require('body-parser');
const express = require('express');
const router = express.Router();

router.get("/show_book", (req,res)=>{
    showbook(req,res);
});
router.get("/get_book", (req,res)=>{
    getbook(req,res);
});
router.post("/add_book", [urlencoded({extended:true}), express.json()], (req,res)=>{
    addbook(req,res);
});
router.get("/update_book", (req,res)=>{
    updatebook(req,res);
});
router.get("/update_done", (req,res)=>{
    updateboook(req,res);
})
router.post("/delete_book", [urlencoded({extended:true}), express.json()], (req,res)=>{
    deletebook(req,res);
});

module.exports = router;