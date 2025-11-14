let restaurants = [
  { id: 1, name: "Le Bernardin", cuisine: "French Seafood", location: "New York, NY", rating: 9.1, priceRange: "$$$$" },
  { id: 2, name: "The Eleven Madison Park", cuisine: "Contemporary American", location: "New York, NY", rating: 8.9, priceRange: "$$$$" },
  { id: 3, name: "Ramen Yokocho", cuisine: "Japanese", location: "Tokyo, Japan", rating: 8.7, priceRange: "$$" },
];

export const getAllRestaurants = (req, res) => {
  res.json({ data: restaurants });
};

export const getRestaurantById = (req, res) => {
  const id = Number(req.params.id);
  const restaurant = restaurants.find((r) => r.id === id);
  if (!restaurant) return res.status(404).json({ error: "Restaurant not found" });
  res.json(restaurant);
};

export const createRestaurant = (req, res) => {
  const { name, cuisine, location, rating, priceRange } = req.body;
  if (!name || !cuisine || !location || rating === undefined || !priceRange) {
    return res.status(400).json({ error: "Missing required fields: name, cuisine, location, rating, priceRange" });
  }
  const newRestaurant = { id: Math.max(...restaurants.map(r => r.id), 0) + 1, name, cuisine, location, rating, priceRange };
  restaurants.push(newRestaurant);
  res.status(201).json(newRestaurant);
};

export const updateRestaurant = (req, res) => {
  const id = Number(req.params.id);
  const restaurantIndex = restaurants.findIndex((r) => r.id === id);
  if (restaurantIndex === -1) return res.status(404).json({ error: "Restaurant not found" });
  
  const { name, cuisine, location, rating, priceRange } = req.body;
  restaurants[restaurantIndex] = { 
    id, 
    name: name || restaurants[restaurantIndex].name, 
    cuisine: cuisine || restaurants[restaurantIndex].cuisine, 
    location: location || restaurants[restaurantIndex].location, 
    rating: rating !== undefined ? rating : restaurants[restaurantIndex].rating,
    priceRange: priceRange || restaurants[restaurantIndex].priceRange
  };
  res.json(restaurants[restaurantIndex]);
};

export const deleteRestaurant = (req, res) => {
  const id = Number(req.params.id);
  const restaurantIndex = restaurants.findIndex((r) => r.id === id);
  if (restaurantIndex === -1) return res.status(404).json({ error: "Restaurant not found" });
  
  const deletedRestaurant = restaurants.splice(restaurantIndex, 1);
  res.json({ message: "Restaurant deleted", restaurant: deletedRestaurant[0] });
};