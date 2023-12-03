const axios = require("axios");
const { Driver } = require("../db");
const apiUrl = "http://localhost:5000/drivers";

const getDriversControllers = async () => {
  try {
    const externalDrivers = await axios.get(apiUrl);
    const databaseDrivers = await Driver.findAll();

    const allDrivers = [
      ...externalDrivers.data.map((driver) => ({
        id: driver.id,
        forename: driver.name?.forename,
        surname: driver.name?.surname,
        description: driver.description,
        image: driver.image?.url || "https://i.pinimg.com/originals/9e/0e/42/9e0e429c0345af13756b0eca558ba539.jpg", //importar y colocar la variable
        nationality: driver.nationality,
        birthday: driver.dob, // birthday: driver.dob
        teamName: driver.teams
      })),
      ...databaseDrivers.map((driver) => ({
        id: driver.id,
        forename: driver.forename,
        surname: driver.surname,
        description: driver.description,
        image: driver.image,
        nationality: driver.nationality,
        birthday: driver.birthday,
        teamName: driver.teams
      })),
    ];
    return allDrivers;
  } catch (error) {
    console.error('Error getting all drivers:', error);
    throw error;
  }
};

module.exports = { getDriversControllers };
