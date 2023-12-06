const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const axios = require("axios");
const { Driver, Teams } = require("../db");
const apiUrl = "http://localhost:5000/drivers";

const getNameControllers = async (name) => {
  try {
    const externalDrivers = await axios.get(apiUrl);
    const databaseDrivers = await Driver.findAll({
      where: {
        forename: { [Op.iLike]: `%${name}%` }, 
      },
      include: {
        model: Teams,
        attributes: ["teamName"],
        through: {
          attributes: [],
        },
      },
    });

    const driversWithTeams = databaseDrivers.map((driver) => {
      const teamString = driver.Teams.map((team) => team.teamName).join(", ");

      return {
        ...driver.toJSON(),
        teamName: teamString,
      };
    });

    const filteredExternalDrivers = externalDrivers.data
      .filter((driver) => driver.name?.forename?.toLowerCase().includes(name.toLowerCase()))
      .map((driver) => ({
        id: driver.id,
        forename: driver.name?.forename,
        surname: driver.name?.surname,
        description: driver.description,
        image: driver.image?.url || "https://i.pinimg.com/originals/9e/0e/42/9e0e429c0345af13756b0eca558ba539.jpg",
        nationality: driver.nationality,
        birthday: driver.dob,
        teamName: driver.teams,
      }));

    const allDrivers = [...filteredExternalDrivers, ...driversWithTeams];
    return allDrivers;

  } catch (error) {
    console.error('Error getting drivers by name:', error);
    throw error;
  }
};

module.exports = { getNameControllers };


