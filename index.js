const express = require('express');
const multer = require('multer');
const path = require('path');

// file upload folder
const UPLOADS_FOLDER = './uploads/';

// define the storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_FOLDER);
    },
    filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname);
        const fileName = `${file.originalname
            .replace(fileExt, '')
            .toLowerCase()
            .split(' ')
            .join('-')}-${Date.now()}`;
        cb(null, fileName + fileExt);
    },
});

// prepare final multer upload object
const upload = multer({
    storage,
    limits: {
        fileSize: 10000000,
    },
    fileFilter: (req, file, cb) => {
        if (file.fieldname === 'avatar') {
            if (
                file.mimetype === 'image/jpg' ||
                file.mimetype === 'image/jpeg' ||
                file.mimetype === 'image/png' ||
                file.mimetype === 'image/gif'
            ) {
                cb(null, true);
            } else {
                cb(new Error('Only .jpg .jpeg .png or gif file is allowed.'));
            }
        } else if (file.fieldname === 'doc') {
            if (file.mimetype === 'application/pdf') {
                cb(null, true);
            } else {
                cb(new Error('Only .pdf file is allowed.'));
            }
        } else {
            cb(new Error('There was an unknown error'));
        }
    },
});

const app = express();

app.post(
    '/',
    upload.fields([
        { name: 'avatar', maxCount: 3 },
        { name: 'doc', maxCount: 3 },
    ]),
    (req, res) => {
        console.log(req.files);
        res.send('Hello World');
    }
);

app.get('/', (req, res) => {
    res.send('Hello World');
});

// default error handler
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        res.status(500).send('There was an upload error.');
    } else if (err) {
        res.status(500).send(err.message);
    } else {
        res.send('success');
    }
});

app.listen(3000, () => {
    console.log('listining on port 3000');
});
