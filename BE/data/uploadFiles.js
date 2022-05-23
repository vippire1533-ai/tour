import multer from 'multer';
const memoryStorage = multer.memoryStorage();

const uploadFiles = multer({
  storage: memoryStorage,
});

export default uploadFiles;