require('dotenv').config();
const aws = require('aws-sdk');

const {AWS_ACCESSKEYID, AWS_SECRETACCESSKEY, AWS_REGION, AWS_BUCKET} = process.env;

aws.config.update({
   secretAccessKey: AWS_SECRETACCESSKEY,
   accessKeyId: AWS_ACCESSKEYID,
   region: AWS_REGION
});

const s3 = new aws.S3();

const imgDelete = function(req, res, next) {
   let deleteItems = [];

	req.body.key.forEach(function(image) { 
      deleteItems.push({ Key: image.key });
   });

   var params = {
      Bucket: AWS_BUCKET, 
      Delete: {
         Objects: deleteItems, 
         Quiet: false
      }
   };

   s3.deleteObjects(params, function(err, data) {
      if (err) {
         console.log(err)
         return res.status(400).json(err)
      } else {
         console.log('Successfully Deleted Image'); 
         
         return res.status(200).json({
            message: 'Successfully Deleted',
            items: deleteItems
         });
      };
   });
}

module.exports = imgDelete;