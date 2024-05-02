class Car {
  static list = [];

  static init(cars) {
    this.list = cars.map((i) => new this(i));
  }

  constructor({
    id,
    plate,
    manufacture,
    model,
    image,
    rentPerDay,
    capacity,
    description,
    transmission,
    available,
    type,
    year,
    options,
    specs,
    availableAt,
  }) {
    this.id = id;
    this.plate = plate;
    this.manufacture = manufacture;
    this.model = model;
    this.image = image;
    this.rentPerDay = rentPerDay;
    this.capacity = capacity;
    this.description = description;
    this.transmission = transmission;
    this.available = available;
    this.type = type;
    this.year = year;
    this.options = options;
    this.specs = specs;
    this.availableAt = availableAt;
  }

  render() {
   
    return `
      <div class="card mx-3 my-3" style="width: 25rem;">
        <img src="${this.image}" class="img-fluid" alt="${this.manufacture}" style="object-fit:cover; height:250px;">
        <div class="card-body">
          <p class="card-text">${this.manufacture}/${this.model}</p>
          <p class="fw-bold fs-5">${this.rentPerDay} /hari</p>
          <p style="height:80px;">${this.description}</p>
          <div class="d-flex align-items-center my-2">
            <i class="fa-solid fa-user-group"></i>
            <p class="my-0 mx-2">${this.capacity} orang</p>
          </div>
          <div class="d-flex align-items-center my-2">
            <i class="fa-solid fa-gear"></i>
            <p class="my-0 mx-2">${this.transmission}</p>
          </div>
          <div class="d-flex align-items-center my-2">
            <i class="fa-solid fa-calendar"></i>
            <p class="my-0 mx-2">Tahun ${this.year}</p>
          </div>
          <button class="btn btn-success mt-2 w-100">Pilih Mobil</button>
        </div>
      </div>
    `
  }
}


