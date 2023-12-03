const { Teams } = require("../db");
const axios = require("axios");

const getTeamsController = async () => {
  const cleanTeams = new Set();
  const dbTeams = await Teams.findAll();

  if (dbTeams.length === 0) {
    const allDrivers = (await axios.get("http://localhost:5000/drivers")).data;
    
    allDrivers.forEach((driver) => {
      if (driver.teams) {
        const teamsArr = driver.teams.split(",").map((elem) => elem.trim());
        teamsArr.forEach((teamName) => {
          cleanTeams.add(teamName);
        });
      }
    });
  }

  const teamsReady = Array.from(cleanTeams).map((nombre) => ({
    teamName: nombre,
  }));

  await Teams.bulkCreate(teamsReady);

  return dbTeams;
};
module.exports = { getTeamsController };
