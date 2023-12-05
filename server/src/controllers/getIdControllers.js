const axios = require("axios");
const { Driver, Teams, driver_team } = require("../db");
const apiUrl = "http://localhost:5000/drivers";
const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;


const getIdController = async (id) => {
  if (!Number.isNaN(Number(id))) {
    const resp = await axios.get(`${apiUrl}`);

    const response = resp.data.filter((driver) => driver.id === +id);

    const driver = {
      id: response[0].id,
      forename: response[0].name?.forename,
      surname: response[0].name?.surname,
      description: response[0].description,
      image: response[0].image?.url
        ? response[0].image?.url
        : "https://i.pinimg.com/originals/9e/0e/42/9e0e429c0345af13756b0eca558ba539.jpg",
      nationality: response[0].nationality,
      birthday: response[0].dob,
      teamName: response[0].teams,
    };
    return driver;
  } else {

    const driverDB = await Driver.findOne({
      where: { id: id },  
    });

    if (driverDB) {
      const driverTeams = await driver_team.findAll({
        where: { DriverId: driverDB.id }
      })

      const teamIds = driverTeams.map((team) => team.TeamId);
      const teamDB = await Teams.findAll({
        where: { id: { [Sequelize.Op.in]: teamIds } },
      });
      const teamString = teamDB.map((team) => team.teamName).join(", ");

      const driverWithTeamName = {
        ...driverDB.toJSON(),
        teamName: teamString,
      };
      return driverWithTeamName;
    }

  }
};

module.exports = { getIdController };
