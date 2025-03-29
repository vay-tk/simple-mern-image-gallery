import ImageGallaryModel from "../Models/ImageModel.js";

const uploadImages = async (req, res) => {
    try {
        const images = req.files.map((file) => ({
            mimeType: file.mimetype,
            originalName: file.originalname,
            imageURL: file.path,
            size: file.size
        }));

        await ImageGallaryModel.insertMany(images);
        res.status(200).json({
            message: "Files uploaded successfully",
            success: true,
            files: req.files,
        });
    } catch (err) {
        res.status(500).json({
            message: 'Image: Internal server error',
            success: false,
            error: err
        });
    }
};

const getAllImages = async (req, res) => {
    try {
        const data = await ImageGallaryModel.find().sort({ createdAt: -1 });

        res.status(200).json({
            message: "Images",
            success: true,
            data: data
        });
    } catch (err) {
        res.status(500).json({
            message: 'Internal server error',
            success: false,
            error: err
        });
    }
};



// Exporting functions using ES module syntax
export { uploadImages, getAllImages };
