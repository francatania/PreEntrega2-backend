import { Router } from 'express';
import { fileURLToPath } from 'url';
import productsModel from '../../models/products.model.js';
import mongoose from 'mongoose';
import { error } from 'console';




const router = Router();


router.get('/products', async (req, res)=>{
    try {
        const limit = parseInt(req.query.limit) || 10;
        const page = parseInt(req.query.page) || 1;
        const sort = req.query.sort;
        const category = req.query.category;
        const status = req.query.status;
        let options = {
            page: page,
            limit: limit,
            sort: sort,
        };

        if(sort === 'desc'){
            options.sort = {price : -1}
        }
        if(sort === 'asc'){
            options.sort = {price : 1}
        }

        let filters = {};

        if(category){
            filters.category = category;
        }
        if(status){
            filters.status = status;
        }


        const products = await productsModel.paginate(filters, options);

        const buildResponse = (data) => {
            return {
              status: 'success',
              payload: data.docs.map(student => student.toJSON()),
              totalPages: data.totalPages,
              prevPage: data.prevPage,
              nextPage: data.nextPage,
              page: data.page,
              hasPrevPage: data.hasPrevPage,
              hasNextPage: data.hasNextPage,
              prevLink: data.hasPrevPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.prevPage}` : '',
              nextLink: data.hasNextPage ? `http://localhost:8080/products?limit=${data.limit}&page=${data.nextPage}` : '',
            };
          };
        res.render('index',buildResponse(products));

    } catch (error) {
        res.status(400).json({message:"Ha ocurrido un error", error: error.message});
    }
})

router.get('/products/:id', async (req, res)=>{
    try {
        const pid = req.params.id;
        const product = await productsModel.findById(pid);
        console.log(product)
        if(!product){
            console.log('producto no encontrado')
            return res.status(404).json({message: 'Producto no encontrado'});
        }else{
            console.log('producto encontrado')
        }
        res.render('product', {product});
    } catch (error) {
        return res.status(404).json({message: error.message});
    }

    
})


export default router;