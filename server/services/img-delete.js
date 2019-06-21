require('dotenv').config();
const aws = require('aws-sdk');

const {AWS_ACCESSKEYID, AWS_SECRETACCESSKEY, AWS_REGION, AWS_BUCKET} = process.env;

aws.config.update({
   secretAccessKey: AWS_SECRETACCESSKEY,
   accessKeyId: AWS_ACCESSKEYID,
   region: AWS_REGION
})

const s3 = new aws.S3();

const deleteImg = function(req, res) {
   
   console.log(req.body)
   let deleteItems = [];

	req.body.forEach(function(image) {
		deleteItems.push({ Key: image.key });
   });
   
   console.log(deleteItems)

   var params = {
      Bucket: AWS_BUCKET, 
      Delete: {
         Objects: deleteItems, 
         Quiet: false
      }
   };

   s3.deleteObjects(params, function(err, data) {
      if (err) console.log(err)     
      else console.log("Successfully deleted myBucket/myKey");   
   });

   res.json({
      message: 'Images deleted',
      items: deleteItems
   });

};

module.exports = deleteImg;