const { Driver } = require("../db");

const deleteDriverController = async (driverId) => {
    try {
      const deletedDriver = await Driver.findByPk(driverId);
  
      if (!deletedDriver) {
        throw new Error("Driver not found");
      }
  
      await deletedDriver.destroy();
  
      return { message: "Driver deleted successfully" };
    } catch (error) {
      console.error("Error deleting driver:", error);
      throw error;
    }
  };

module.exports = {deleteDriverController};