const { User } = require('../models/user');

const isLoggedIn = (req, res, next) => {
    req.user ? next() : res.sendStatus(401);
};

const isCredentialsProvided = (req, res, next) => {
    const credentials = req.body;

    Object.keys(credentials).length !== 0
        ? next()
        : res.status(401).json({ message: 'No credentials provided.' });
};

const updateUser = async (userID, updateFields) => {
    const user = await User.findByIdAndUpdate(userID, updateFields, {
        returnOriginal: false,
    });

    return user;
};

const uploadPicture = async (picture, bucket) => {
    const pictureName = `${Date.now()}_${picture.originalname}`;
    const file = bucket.file(pictureName);
    const stream = file.createWriteStream({
        metadata: {
            contentType: picture.mimetype,
        },
    });

    return await new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', () => {
            const pictureURL = `https://storage.googleapis.com/${bucket.name}/${pictureName}`;
            resolve(pictureURL);
        });

        stream.end(picture.buffer);
    });
};

const deletePicture = async (picture, bucket) => {
    const [exists] = await bucket.file(picture).exists();

    if (exists) {
        await bucket.file(picture).delete();
    }
};

module.exports = {
    isLoggedIn,
    isCredentialsProvided,
    deletePicture,
    updateUser,
    uploadPicture,
};