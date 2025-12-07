// For simple form validation

export function isEmail(email) {
  return /^\S+@\S+\.\S+$/.test(email);
}

export function isRequired(value) {
  return value !== undefined && value !== null && value !== "";
}

export function minLength(text, length = 6) {
  return text.length >= length;
}

// Example: validate products before submit
export function validateProductForm(form) {
  const errors = {};

  if (!form.title) errors.title = "Title is required";
  if (!form.price) errors.price = "Price is required";
  if (!form.stock) errors.stock = "Stock is required";

  return errors;
}
