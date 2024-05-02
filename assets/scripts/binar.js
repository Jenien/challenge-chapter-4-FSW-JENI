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
      const response = await fetch(
        "https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.min.json"
      );
      const body = await response.json();
      cars = this.populateCars(body);

      localStorage.setItem("CARS", JSON.stringify(cars));
      console.log("All Cars:", cars);
    }
    console.log("Input Filterer:", filterer);
 if (Object.values(filterer).some(value => value !== '')) {
      cars = cars.filter((car) => {
        const isAvailable = car.available;
        const isPassengerValid = !filterer.passenger || car.capacity >= parseInt(filterer.passenger);
        const isYearValid = !filterer.year || car.year >= parseInt(filterer.year);
        console.log("Car:", car);
        console.log("Available:", isAvailable);
        console.log("Passenger Valid:", isPassengerValid);
        console.log("Year Valid:", isYearValid);
        return isAvailable && isPassengerValid && isYearValid;
      });
    }
    console.log("Filtered Cars:", cars);
    return cars;
  }
}
