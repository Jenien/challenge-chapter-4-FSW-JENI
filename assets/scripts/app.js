class App {
  constructor() {
    this.btnSearchCars = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("carsList");
    this.alertElement = document.getElementById("notifikasiMobilTidakTersedia");
  }

  async init() {
    this.btnSearchCars.addEventListener('click', this.run.bind(this));
    this.hideAlert(); 
  }

  async run() {
    this.clearCarList();

    try {
      if (this.isFilterNotEmpty()) {
        await this.load();
        if (Car.list.length === 0) {
          this.showAlert(); 
        } else {
          this.hideAlert(); 
          Car.list.forEach((car) => {
            const node = document.createElement("div");
            node.innerHTML = car.render(); 
            this.carContainerElement.appendChild(node);
          });
        }
      } else {
        this.showAlert(); 
      }
    } catch (error) {
      console.error("Error:", error);
      this.showAlert(); 
    }
  }

  async load() {
    const driver = document.getElementById("driver").value;
    const passenger = parseInt(document.getElementById("qty").value);
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const dateTime = `${date} ${time}`;
    const year = date.substring(0, 4);

    const filterer = { driver: driver, passenger: passenger, year: year };

    const cars = await Binar.listCars(filterer);
    Car.init(cars);
  }

  isFilterNotEmpty() {
    const driver = document.getElementById("driver").value;
    const passenger = parseInt(document.getElementById("qty").value);
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    return driver !== '' || !isNaN(passenger) || date !== '' || time !== '';
  }

  clearCarList() {
    while (this.carContainerElement.firstChild) {
      this.carContainerElement.removeChild(this.carContainerElement.firstChild);
    }
  }

  showAlert() {
    this.alertElement.removeAttribute("hidden"); 
  }

  hideAlert() {
    this.alertElement.setAttribute("hidden", true); 
  }
}
