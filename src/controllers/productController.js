let products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 999.99, stock: 15, minStock: 5, lastRestocked: "2025-11-10" },
  { id: 2, name: "Wireless Mouse", category: "Accessories", price: 29.99, stock: 150, minStock: 20, lastRestocked: "2025-11-05" },
  { id: 3, name: "USB-C Cable", category: "Cables", price: 9.99, stock: 500, minStock: 100, lastRestocked: "2025-10-20" },
];

export const getAllProducts = (req, res) => {
  res.json({ data: products });
};

export const getProductById = (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);
  if (!product) return res.status(404).json({ error: "Product not found" });
  res.json(product);
};

export const createProduct = (req, res) => {
  const { name, category, price, stock, minStock, lastRestocked } = req.body;
  if (!name || !category || price === undefined || stock === undefined || minStock === undefined) {
    return res.status(400).json({ error: "Missing required fields: name, category, price, stock, minStock" });
  }
  const newProduct = { 
    id: Math.max(...products.map(p => p.id), 0) + 1, 
    name, 
    category, 
    price, 
    stock, 
    minStock, 
    lastRestocked: lastRestocked || new Date().toISOString().split('T')[0]
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req, res) => {
  const id = Number(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) return res.status(404).json({ error: "Product not found" });
  
  const { name, category, price, stock, minStock, lastRestocked } = req.body;
  products[productIndex] = { 
    id, 
    name: name || products[productIndex].name, 
    category: category || products[productIndex].category, 
    price: price !== undefined ? price : products[productIndex].price,
    stock: stock !== undefined ? stock : products[productIndex].stock,
    minStock: minStock !== undefined ? minStock : products[productIndex].minStock,
    lastRestocked: lastRestocked || products[productIndex].lastRestocked
  };
  res.json(products[productIndex]);
};

export const deleteProduct = (req, res) => {
  const id = Number(req.params.id);
  const productIndex = products.findIndex((p) => p.id === id);
  if (productIndex === -1) return res.status(404).json({ error: "Product not found" });
  
  const deletedProduct = products.splice(productIndex, 1);
  res.json({ message: "Product deleted", product: deletedProduct[0] });
};

export const getLowStockProducts = (req, res) => {
  const lowStock = products.filter((p) => p.stock <= p.minStock);
  res.json({ data: lowStock });
};