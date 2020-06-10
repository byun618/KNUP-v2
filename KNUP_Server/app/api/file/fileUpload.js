const express = require('express');
const router = express.Router();
const multer = require('multer');
const mkdirp = require('mkdirp');

var file = require('./file');

var vaildcode = Math.floor(Math.random() * 1000000)+100000;

    if(vaildcode>1000000){
    vaildcode = vaildcode - 100000;
    }

var vaildfolder = 'uploads/' + vaildcode;
  
var storage = multer.diskStorage({
  destination: function (req, file, cb) {

    //인증코드폴더생성
    mkdirp(vaildfolder, function (err) {
      if(err);
      console.error(err);
    });

   

    cb(null, vaildfolder);
  },
  filename: function (req, file, cb) {
    console.log(file.originalname);
    cb(null, file.originalname); }  
})
  
var upload = multer({ storage: storage })

router.post('/', upload.array('userfile'), file.upload);

module.exports = router