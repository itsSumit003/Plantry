// Format price (₹1000 → ₹1,000)
export function formatPrice(price) {
  return `₹${price?.toLocaleString("en-IN")}`;
}

// Convert string to slug
export function slugify(str) {
  return str.toLowerCase().trim().replace(/ /g, "-").replace(/[^\w-]+/g, "");
}

// Capitalize first letter
export function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
