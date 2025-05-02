const SUPABASE_URL = "https://jmrttmtgvoqapxfkfboc.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1Ni..."; // truncated for clarity

async function fetchProducts() {
  console.log("Fetching products...");
  const productsDiv = document.getElementById("products");
  productsDiv.innerHTML = "Loading...";

  const res = await fetch(`${SUPABASE_URL}/rest/v1/products?select=*`, {
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
  });

  if (!res.ok) {
    console.error("Failed to fetch products:", await res.text());
    productsDiv.textContent = "Error fetching products.";
    return;
  }

  const products = await res.json();
  productsDiv.innerHTML = '';

  if (products.length === 0) {
    productsDiv.textContent = "No products found.";
    return;
  }

  products.forEach(product => {
    const p = document.createElement("p");
    p.textContent = `${product.name} - $${product.price}`;
    productsDiv.appendChild(p);
  });
}

async function addProduct(name, price) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/products`, {
    method: "POST",
    headers: {
      apikey: SUPABASE_ANON_KEY,
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify([{ name, price }]),
  });

  if (!res.ok) {
    const error = await res.text();
    throw new Error(error);
  }

  return await res.json();
}

document.getElementById("productForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const price = parseFloat(document.getElementById("price").value);
  const message = document.getElementById("formMessage");

  message.textContent = "Adding product...";
  try {
    await addProduct(name, price);
    message.textContent = "Product added successfully!";
    fetchProducts();
  } catch (err) {
    console.error(err);
    message.textContent = "Failed to add product.";
  }

  e.target.reset();
});

fetchProducts();
