import multer from 'multer'
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'
import crypto from 'crypto'


aws.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const s3 = new aws.S3()

export const multerUploadS3 = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_S3_BUCKET || '',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            // cb(null, Date.now().toString())
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                // const key = hash.toString("hex");
                cb(null, hash.toString("hex"));
            });
        }

    })
})
