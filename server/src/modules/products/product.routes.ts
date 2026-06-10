import { Router } from 'express';
import { productService } from './product.service.js';
import { parseProductIdParam, parseProductRequest } from './product.request.js';

export const productRouter = Router();

productRouter.get('/products', (_req, res, next) => {
  try {
    const product = productService.getProducts();
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});
productRouter.post('/products', (req, res, next) => {
  try {
    const productRequest = parseProductRequest(req.body ?? {});
    const product = productService.addProduct(productRequest);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

productRouter.delete('/products/:productId', (req, res, next) => {
  try {
    const productId = parseProductIdParam(req.params.productId);

    productService.deleteProduct(productId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
