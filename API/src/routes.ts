import { Router } from 'express';
import UseController from './controllers/userController';
import ProductController from './controllers/productController';

const router = Router();

router.post('/createUser', UseController.creatUser);
router.post('/login', UseController.login);
router.get('/allUsers', UseController.findAllUsers);
router.get('/user/:id', UseController.findUser);
router.put('/user/:id', UseController.updateUser);
router.delete('/user/:id', UseController.deleteUser);

router.post('/product/user/:id', ProductController.creatProduct);
router.get('/products', ProductController.findAllProducts);
router.put('/product/:id', ProductController.updateProduct);
router.delete('/product/:id', ProductController.deleteProduct);
router.delete('/products', ProductController.deleteAllProducts);

export { router };
