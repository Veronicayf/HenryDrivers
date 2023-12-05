const {Router} = require ('express');
const {getDriverHandler,
    getDetailHandler,
    postDriverHandler,
    deleteDriverHandler,
    handleUpdateDriver
} = require('../handlers/driverHandlers')

const driverRouters = Router()
//RUTAS DRIVER
driverRouters.get('/',getDriverHandler)
driverRouters.get('/:id',getDetailHandler)
driverRouters.post('/',postDriverHandler)
driverRouters.put('/:id', handleUpdateDriver)
driverRouters.delete('/:id', deleteDriverHandler)


module.exports = driverRouters