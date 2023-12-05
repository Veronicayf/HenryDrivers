const axios = require("axios");
const { Driver, Teams } = require("../db");
const apiUrl = "http://localhost:5000/drivers";
 
const getDriversControllers = async () => {
  try {
    const externalDrivers = await axios.get(apiUrl);
    const databaseDrivers = await Driver.findAll(
      {
      include: {
        model: Teams,
        attributes: ["teamName"],
        through: {
          attributes: [],
        },
      },
    }
    );
    const driversWithTeams = databaseDrivers.map((driver)=>{
      const teamString = driver.Teams.map((team)=> team.teamName).join(", ")

      return {
        ...driver.toJSON(), 
        teamName: teamString
      }
    })

    const allDrivers = [
      ...externalDrivers.data.map((driver) => ({
        id: driver.id,
        forename: driver.name?.forename,
        surname: driver.name?.surname,
        description: driver.description,
        image: driver.image?.url || "https://i.pinimg.com/originals/9e/0e/42/9e0e429c0345af13756b0eca558ba539.jpg", //importar y colocar la variable
        nationality: driver.nationality,
        birthday: driver.dob, 
        teamName: driver.teams
      })),
      ...driversWithTeams 
    ];
    return allDrivers;

  } catch (error) {
    console.error('Error getting all drivers:', error);
    throw error;
  }
};

module.exports = { getDriversControllers };
