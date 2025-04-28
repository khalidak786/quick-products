const products = [
  { id: 1, name: "Phone", price: "$499" },
  { id: 2, name: "Laptop", price: "$899" },
  { id: 3, name: "Headphones", price: "$199" }
];

const productsDiv = document.getElementById('products');

products.forEach(product => {
  const p = document.createElement('p');
  p.textContent = `${product.name} - ${product.price}`;
  productsDiv.appendChild(p);
});
