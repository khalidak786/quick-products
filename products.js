const SUPABASE_URL = "https://jmrttmtgvoqapxfkfboc.supabase.co";
const SUPABASE_ANON_KEY = "
NEXT_PUBLIC_SUPABASE_URL=https://jmrttmtgvoqapxfkfboc.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImptcnR0bXRndm9xYXB4ZmtmYm9jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4MjQ3MDEsImV4cCI6MjA2MTQwMDcwMX0.8v9jA7wj3n5D0SD6BE-TdaBJVqsI1NOt4WIlUDqxfjY
            "; // keep safe in production

async function fetchProducts() {
  console.log("Fetching products from Supabase...");

  const url = `${SUPABASE_URL}/rest/v1/products?select=*`;
  console.log("Request URL:", url);

  const res = await fetch(url, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Fetch failed:", res.status, errorText);
    alert("Failed to fetch products. Check the browser console.");
    return;
  }

  const products = await res.json();
  console.log("Fetched products:", products);

  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = '';

  if (products.length === 0) {
    productsDiv.textContent = "No products found.";
    return;
  }

  products.forEach(product => {
    const p = document.createElement("p");
    p.textContent = `${product.name} - ${product.price}`;
    productsDiv.appendChild(p);
  });
}

fetchProducts();
