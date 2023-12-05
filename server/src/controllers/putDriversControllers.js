const { Driver } = require("../db");

const updateDriverController = async (driverId, updatedDriver) => {
    
    try {
      const driverToUpdate = await Driver.findByPk(driverId);
      if (!driverToUpdate) {
        throw new Error("Driver not found");
      }

      driverToUpdate.forename = updatedDriver.forename;
      driverToUpdate.surname = updatedDriver.surname;
      driverToUpdate.description = updatedDriver.description;
      driverToUpdate.nationality = updatedDriver.nationality;
      driverToUpdate.birthday = updatedDriver.birthday;
      driverToUpdate.teamName = updatedDriver.teamName;

      await driverToUpdate.save();

      return driverToUpdate;
    } catch (error) {
      console.error("Error updating driver:", error);
      throw error;
    }
  };

  module.exports={
    updateDriverController
  }