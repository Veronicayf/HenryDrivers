const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Teams } = require("../db");

const getNameTeamController = async (name) => {

  const filteredDB = await Teams.findAll({
    where: { teamName: { [Op.iLike]: `%${name}%`} },
  });
  if (filteredDB.length === 0) {
    throw Error("Team not found.");
  }
  return [filteredDB]; 
};
module.exports = { getNameTeamController };