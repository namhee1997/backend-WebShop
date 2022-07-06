const UploadedFile = require("../model/uploadedFile.model");

exports.getById = async (req, res) => {
    try {

        res.status(200).json({
            status: 'success',
            data: await UploadedFile.checkFound(req.params.id),
        });
    } catch (error) {
        console.log('có lỗi', error.message)
        res.status(500).send({ message: error.message });
        return;
    }
}

exports.deleteById = async (req, res) => {
    try {
        await UploadedFile.checkFound(req.params.id)
        await UploadedFile.deleteOne({ _id: req.params.id })

        res.status(200).json({
            status: 'success',
        });
    } catch (error) {
        console.log('có lỗi', error.message)
        res.status(500).send({ message: error.message });
        return;
    }
}



exports.create = async (req, res) => {
    try {
        console.log("🚀 ~ file: uploadFile.controller.js ~ line 59 ~ exports.create= ~ req.file", req.file)

        if (!req.file) {
            next(new Error('No file uploaded!'));
            return;
        }

        const newImage = new UploadedFile({ title: req.file.originalname, fileUrl: req.file.path })
        let data = await newImage.save();

        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        console.log('có lỗi', error.message)
        res.status(500).send({ message: error.message });
        return;
    }
}