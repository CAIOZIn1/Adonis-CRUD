import router from '@adonisjs/core/services/router'
const ProductsController = () => import('#controllers/products_controller')
const ProductsGroupController = () => import('#controllers/product_groups_controller')

router.get('/products', [ProductsController, 'listAll'])
router.get('/products/group/:id', [ProductsController, 'listGroup'])
router.get('/product/:id', [ProductsController, 'show'])
router.post('/product', [ProductsController, 'create'])
router.put('/product/:id', [ProductsController, 'update'])
router.delete('/product/:id', [ProductsController, 'delete'])

router.get('/groups', [ProductsGroupController, 'listAll'])
router.get('/group/:id', [ProductsGroupController, 'show'])
router.post('/createGroup', [ProductsGroupController, 'create'])
router.put('/group/:id', [ProductsGroupController, 'update'])
router.delete('/deleteGroup/:id', [ProductsGroupController, 'delete'])
