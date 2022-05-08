import productRoutes from './productRoutes';

const configRoutes = (app) => {
  app.use('/products', productRoutes);
};

export default configRoutes;