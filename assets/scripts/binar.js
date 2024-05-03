function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

class Binar {
  static populateCars = (cars) => {
    return cars.map((car) => {
      const isPositive = getRandomInt(0, 1) === 1;
      const timeAt = new Date();
      const mutator = getRandomInt(1000000, 100000000);
      const availableAt = new Date(timeAt.getTime() + (isPositive ? mutator : -1 * mutator));

      return {
        ...car,
        availableAt,
      };
    })
  }

  static async listCars(filterer) {
    let cars;
    let cachedCarsString = localStorage.getItem("CARS");

    if (!!cachedCarsString) {
        const cacheCars = JSON.parse(cachedCarsString);
        cars = this.populateCars(cacheCars);
    } else {
      const response = await fetch('http://localhost:' + port + '/cars');
        const body = await response.json();
        cars = this.populateCars(body);

        localStorage.setItem("CARS", JSON.stringify(cars));
        console.log("All Cars:", cars);
    }

    if (Object.values(filterer).some(value => value !== '')) {
      const filterDate = new Date(filterer.date);
      cars = cars.filter((car) => {
          const isDriverValid = filterer.driver === "dengan-supir" ? car.available : true;
          const availableAtDate = car.availableAt; 
          const isAvailableAtValid = new Date(availableAtDate) > filterDate; 
          const isPassengerValid = !filterer.passenger || car.capacity >= parseInt(filterer.passenger);
  
          console.log("Car:", car);
          console.log("Driver Valid:", isDriverValid);
          console.log("AvailableAt Valid:", isAvailableAtValid);
          console.log("Passenger Valid:", isPassengerValid);
          console.log("Filter Date:", filterer.date);
  
          return isDriverValid && isAvailableAtValid && isPassengerValid;
      });
  }
  
    console.log("Filtered Cars:", cars);
    return cars;
}

}
