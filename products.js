const SUPABASE_URL = "https://products.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptcnR0bXRndm9xYXB4ZmtmYm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MjQ3MDEsImV4cCI6MjA2MTQwMDcwMX0.8v9jA7wj3n5D0SD6BE-TdaBJVqsI1NOt4WIlUDqxfjY,";

async function fetchProducts() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    headers: {
      apikey: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptcnR0bXRndm9xYXB4ZmtmYm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MjQ3MDEsImV4cCI6MjA2MTQwMDcwMX0.8v9jA7wj3n5D0SD6BE-TdaBJVqsI1NOt4WIlUDqxfjY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });
  const products = await res.json();

  const productsDiv = document.getElementById('products');
  products.forEach(product => {
    const p = document.createElement('p');
    p.textContent = `${product.name} - ${product.price}`;
    productsDiv.appendChild(p);
  });
}

fetchProducts();








