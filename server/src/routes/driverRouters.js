const {Router} = require ('express');
const {getDriverHandler,
    getDetailHandler,
    postDriverHandler
} = require('../handlers/driverHandlers')

const driverRouters = Router()
//RUTAS DRIVER
driverRouters.get('/',getDriverHandler)
driverRouters.get('/:id',getDetailHandler)
driverRouters.post('/',postDriverHandler)

module.exports = driverRouters