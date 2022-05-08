import express from 'express';

const router = express.Router();

router.route('/:id').get().put().delete();
router.route('/products').get().post();

export default router;