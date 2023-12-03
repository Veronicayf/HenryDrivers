const {Router} = require('express')
const {getTeamsHandler}=require('../handlers/teamHandlers')
const teamRouters =Router()
//Rutas de teams
teamRouters.get('/',getTeamsHandler)

module.exports=teamRouters