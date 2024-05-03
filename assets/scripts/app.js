class App {
  constructor() {
    this.btnSearchCars = document.getElementById("load-btn");
    this.carContainerElement = document.getElementById("carsList");
    this.alertElement = document.getElementById("notifikasiMobilTidakTersedia");
    this.dateInputElement = document.getElementById("date"); // tambahkan reference ke input tanggal
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
    const date = this.formatDate(this.dateInputElement.value); 
    const filterer = { driver: driver, passenger: passenger, date: date }; 

    const cars = await Binar.listCars(filterer);
    Car.init(cars.filter(car => {
        if (driver === "dengan-supir") {
            return car.available && new Date(date) < new Date(car.availableAt);
        } else if (driver === "lepas-kunci") {
            return new Date(date) < new Date(car.availableAt);
        } else {
            return false; 
        }
    }));
}

  isFilterNotEmpty() {
    const driver = document.getElementById("driver").value;
    const passenger = parseInt(document.getElementById("qty").value);
    const date = this.dateInputElement.value; 
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

  formatDate(dateString) {
    // Ubah format tanggal ke YYYY-MM-DD
    const dateObject = new Date(dateString);
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
    const day = dateObject.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
