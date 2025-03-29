import { Router } from 'express';
import { getAllImages, uploadImages } from '../Controllers/ImageController.js';
import { uploadMultiple } from '../Middlewares/FileUploader.js';

const routes = Router();

routes.get('/', getAllImages);
routes.post('/upload-images', uploadMultiple, uploadImages);

export default routes;
