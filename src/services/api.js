export async function getCategories() {
  try {
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/categories';
    const result = await fetch(endpoint);
    const response = result.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  try {
    const end = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`;
    const result = await fetch(end);
    const response = result.json();
    return response;
  } catch (err) {
    console.log(err);
  }
}

// export async function catedoriaId(CATEGORY_ID) {
//   try {
//     const end = `https://api.mercadolibre.com/sites/MLB/search?category=${CATEGORY_ID}`;
//     const result = await fetch(end);
//     const response = result.json();
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// }
