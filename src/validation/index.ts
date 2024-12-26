/**
 * Validates a product object and returns an object containing error messages for invalid fields.
 * 
 * @param {Object} product - The product object to validate.
 * @param {string} product.title - The title of the product (must be between 10 and 80 characters).
 * @param {string} product.description - The description of the product (must be between 10 and 900 characters).
 * @param {string} product.imageURL - The URL of the product's image (must be a valid URL).
 * @param {string} product.price - The price of the product (must be a numeric value).
 * 
 * @returns {Object} - An object containing error messages for each field. If a field is valid, its error message will be an empty string.
 * @property {string} title - Error message for the title field.
 * @property {string} description - Error message for the description field.
 * @property {string} imageURL - Error message for the imageURL field.
 * @property {string} price - Error message for the price field.
 * 
 */
export const productValidation = (product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
  colors: string[];
}) => {
  const errors: {
    title: string;
    description: string;
    imageURL: string;
    price: string;
    colors: string;
  } = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: "",
  };

  const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 80
  ) {
    errors.title = "Product title must be between 10 and 80 characters!";
  }

  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 900
  ) {
    errors.description = "Product description must be between 10 and 900 characters!";
  }

  if (!product.imageURL.trim() || !validUrl) {
    errors.imageURL = "Valid image URL is required!";
  }

  const priceRegex = /^\d+(\.\d{1,2})?$/; 
  if (!product.price.trim() || !priceRegex.test(product.price)) {
    errors.price = "Valid Price is required!";
  }

  if (product.colors.length === 0) {
    errors.colors = "Please select at least one color!";
  }
  return errors;
};
