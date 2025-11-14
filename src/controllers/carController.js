let cars = [
  { id: 1, make: "Tesla", model: "Model S", year: 2023, color: "White", price: 89999, mileage: 5000 },
  { id: 2, make: "BMW", model: "M440i", year: 2022, color: "Black", price: 74999, mileage: 15000 },
  { id: 3, make: "Toyota", model: "Camry", year: 2021, color: "Silver", price: 32999, mileage: 45000 },
];

export const getAllCars = (req, res) => {
  res.json({ data: cars });
};

export const getCarById = (req, res) => {
  const id = Number(req.params.id);
  const car = cars.find((c) => c.id === id);
  if (!car) return res.status(404).json({ error: "Car not found" });
  res.json(car);
};

export const createCar = (req, res) => {
  const { make, model, year, color, price, mileage } = req.body;
  if (!make || !model || !year || !color || price === undefined || mileage === undefined) {
    return res.status(400).json({ error: "Missing required fields: make, model, year, color, price, mileage" });
  }
  const newCar = { id: Math.max(...cars.map(c => c.id), 0) + 1, make, model, year, color, price, mileage };
  cars.push(newCar);
  res.status(201).json(newCar);
};

export const updateCar = (req, res) => {
  const id = Number(req.params.id);
  const carIndex = cars.findIndex((c) => c.id === id);
  if (carIndex === -1) return res.status(404).json({ error: "Car not found" });
  
  const { make, model, year, color, price, mileage } = req.body;
  cars[carIndex] = { 
    id, 
    make: make || cars[carIndex].make, 
    model: model || cars[carIndex].model, 
    year: year || cars[carIndex].year, 
    color: color || cars[carIndex].color, 
    price: price !== undefined ? price : cars[carIndex].price,
    mileage: mileage !== undefined ? mileage : cars[carIndex].mileage
  };
  res.json(cars[carIndex]);
};

export const deleteCar = (req, res) => {
  const id = Number(req.params.id);
  const carIndex = cars.findIndex((c) => c.id === id);
  if (carIndex === -1) return res.status(404).json({ error: "Car not found" });
  
  const deletedCar = cars.splice(carIndex, 1);
  res.json({ message: "Car deleted", car: deletedCar[0] });
};