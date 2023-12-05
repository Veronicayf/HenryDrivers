const axios = require("axios");
const { Sequelize } = require("sequelize");
const { Driver, Teams } = require("../db");
const Op = Sequelize.Op;

const createDriver = async (forename, surname, description, nationality, birthday, teamName) => {
  const apiUrl = "http://localhost:5000/drivers";
  const toLowForname = forename ? forename.toLowerCase() : '';
  const toLowSurname = surname ? surname.toLowerCase() : '';
  const toLowNationality = nationality ? nationality.toLowerCase() : '';
  const toLowDob = birthday ? birthday.toLowerCase() : '';
if(!birthday){
  throw new Error('hay error en la fecha')
}

  const filteredDB = await Driver.findAll({
    where: {
      forename: { [Op.iLike]: `%${toLowForname}%` },
      surname: { [Op.iLike]: `%${toLowSurname}%` },
      nationality: { [Op.iLike]: `%${toLowNationality}%` },
      birthday: { [Op.iLike]: `%${toLowDob}%` }, 
    },
  });

  const resp = await axios.get(`${apiUrl}`);
  const matchingObjects = resp.data.filter((obj) => {
    return (
      obj.name?.surname === forename &&
      obj.name?.lastname === surname && 
      obj.nationality === nationality &&
      obj.birthday === birthday &&
      obj.teamName === teamName

    );
  });

  if (matchingObjects.length === 0 && filteredDB.length === 0) {
    const newDriver = await Driver.create({
      forename: forename,
      surname: surname,
      description: description,
      image:
        "https://i.pinimg.com/originals/9e/0e/42/9e0e429c0345af13756b0eca558ba539.jpg",
      nationality: nationality,
      birthday: birthday,
      teamName: teamName,
    });
    if (teamName) {
      const teamNames = teamName.split(", ");

      const searchTeam = await Teams.findAll({
        where: { teamName: { [Op.in]: teamNames } },
      });
      const response = await newDriver.addTeams(searchTeam);
      return newDriver;
    }
    return newDriver;
  } else{
    throw new Error("Existing driver");
  } 
};
module.exports = { createDriver };