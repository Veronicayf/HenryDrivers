const{getTeamsController} = require ('../controllers/getTeamsControllers')
const{getNameTeamController}= require('../controllers/getTeamNameControllers')

const getTeamsHandler = async (req,res)=>{

    try {
    const {name} = req.query
    console.log(name, 'soy el name')
    if(name){
        const equipofiltrado = await getNameTeamController(name)
        res.status(200).json(equipofiltrado)
    } else {
    const allTeams = await getTeamsController()
    res.status(200).json(allTeams)
    }
    } catch (error) {
    res.status(500).json({error:error.message})
    }
}

module.exports={getTeamsHandler}