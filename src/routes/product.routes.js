const controller = require('../controllers/product.controller')
const schema = require('../schemas/products.schema')

const productRoutes = [
    {
        method: 'GET',
        path: '/product/{idUser}',
        config:{
            description: 'Search products',
            handler: controller.searchProuct,
            validate: schema.product
        }
    },
    {
        method: 'PUT',
        path: '/product/{idUser}',
        config:{
            description: 'Search products',
            handler: controller.updateProduct,
            validate: schema.productUpdate
        }
    }
]

module.exports = productRoutes