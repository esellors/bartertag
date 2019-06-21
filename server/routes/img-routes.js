const express = require('express');
const router = express.Router();
const uploadImg = require('../services/img-upload');
const deleteImg = require('../services/img-delete');

const singleUpload = uploadImg.single('image');

router.post('/upload', function(req, res) {

   singleUpload(req, res, function(err) { 

      if (err) {
         console.log(`FileUploadError: ${err.message}`);
         return res.status(422).json({FileUploadError: err.message});
      } else {
         console.log(`imageUrl: ${req.file.location}`);
         console.log(`imageKey: ${req.file.key}`);
         return res.json({
            'imageUrl': req.file.location,
            'imageKey': req.file.key
         });
      };
   });
});

router.delete('/delete', deleteImg);

module.exports = router;