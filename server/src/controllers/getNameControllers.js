const { Sequelize } = require("sequelize");
const Op = Sequelize.Op;
const { Driver } = require("../db");
const axios = require('axios');
const addImage = require('../helpers/addImage')
const URL = "http://localhost:5000/drivers";

const getNameControllers = async (name) => {
    const { data } = await axios.get(`${URL}`);
    const nameToLower = name.toLowerCase();

    const filteredDrivers = data.filter((driver) =>
        driver.name.forename.toLowerCase() === nameToLower
    ).map((driver) => ({
        id: driver.id,
        forename: driver.name.forename,
        surname: driver.name.surname,
        description: driver.description,
        image: driver.image,
        nationality: driver.nationality,
        birthday: driver.dob, 
        teamName: driver.teams 
    }))

    const filteredDB = await Driver.findAll({
        where: { forename: { [Op.iLike]: `%${nameToLower}%` } },
       });

    if (filteredDrivers.length === 0 && filteredDB.length === 0) {
        throw Error('Driver not found.')
    }

    const challengedFilters = addImage(filteredDrivers)
    return [...challengedFilters.slice(0, 15), ...filteredDB.slice(0, 15)];
};

module.exports = { getNameControllers }