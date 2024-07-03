/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import CustomersController from '#controllers/customers_controller'
import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// User
router.post('/signup', [UsersController, 'store'])
router.post('/login', [UsersController, 'login'])

// Customer
router.get('/customers', [CustomersController, 'index']).use(middleware.auth())
router.get('/customer/:id/:date?', [CustomersController, 'show']).use(middleware.auth())
router.put('/customer/:id/', [CustomersController, 'update']).use(middleware.auth())
router.post('/customers', [CustomersController, 'store']).use(middleware.auth())
router.delete('/customer/:id', [CustomersController, 'destroy'])