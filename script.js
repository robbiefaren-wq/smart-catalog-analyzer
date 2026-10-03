const products = [
  {
    id: 101,
    title: "Беспроводные наушники",
    category: "electronics",
    price: 12000,
    rating: 4.8,
    inStock: true,
    stockQuantity: 15,
    tags: ["sale", "audio", "popular"],
  },
  {
    id: 102,
    title: "Смартфон 5G",
    category: "electronics",
    price: 65000,
    rating: 4.5,
    inStock: true,
    stockQuantity: 8,
    tags: ["flagship", "popular"],
  },
  {
    id: 103,
    title: "Механическая клавиатура",
    category: "electronics",
    price: 8500,
    rating: 4.9,
    inStock: false,
    stockQuantity: 0,
    tags: ["sale", "gaming"],
  },
  {
    id: 104,
    title: "Худи Oversize",
    category: "clothing",
    price: 4500,
    rating: 4.2,
    inStock: true,
    stockQuantity: 30,
    tags: ["sale", "new"],
  },
  {
    id: 105,
    title: "Джинсы Slim",
    category: "clothing",
    price: 5200,
    rating: 3.9,
    inStock: true,
    stockQuantity: 12,
    tags: ["casual"],
  },
  {
    id: 106,
    title: "Чистый код (Р. Мартин)",
    category: "books",
    price: 1800,
    rating: 5.0,
    inStock: true,
    stockQuantity: 50,
    tags: ["bestseller", "education"],
  },
  {
    id: 107,
    title: "Выразительный JavaScript",
    category: "books",
    price: 2100,
    rating: 4.7,
    inStock: false,
    stockQuantity: 0,
    tags: ["education", "popular"],
  },
  {
    id: 108,
    title: "Умная лампа",
    category: "home",
    price: 2900,
    rating: 4.1,
    inStock: true,
    stockQuantity: 22,
    tags: ["sale", "smart"],
  },
  {
    id: 109,
    title: "Кофемашина",
    category: "home",
    price: 42000,
    rating: 4.6,
    inStock: true,
    stockQuantity: 5,
    tags: ["kitchen", "flagship"],
  },
];

function getAvailableCategoryProducts(products, category, minRating) {
  const categoryProducts = products
    .filter((product) => {
      return (
        category === product.category &&
        product.inStock === true &&
        minRating <= product.rating
      );
    })
    .map((product) => {
      return `${product.title} - ${product.price} руб. (Рейтинг: ${product.rating})`;
    });

  return categoryProducts;
}

function getSortedCatalog(products, sortBy) {
  const catalog = products
    .filter((product) => {
      return product.inStock === true;
    })
    .sort((a, b) => {
      if (sortBy === "price_asc") {
        return a.price - b.price;
      } else if (sortBy === "price_desc") {
        return b.price - a.price;
      } else if (sortBy === "rating") {
        return b.rating - a.rating;
      }
    });

  return catalog;
}

function getWarehouseAnalytics(products) {
  const warehouseAnalytics = products.reduce(
    (total, product) => {
      total.totalWarehouseValue += product.price * product.stockQuantity;
      total.totalInStockCount += product.stockQuantity;
      total.ratingsSum += product.rating;
      return total;
    },
    { totalWarehouseValue: 0, totalInStockCount: 0, ratingsSum: 0 },
  );

  const averageRating = Number(
    (warehouseAnalytics.ratingsSum / products.length).toFixed(2),
  );

  return {
    totalWarehouseValue: warehouseAnalytics.totalWarehouseValue,
    totalInStockCount: warehouseAnalytics.totalInStockCount,
    averageRating: averageRating,
  };
}

function groupProductsByCategory(products) {
  const groupProducts = products.reduce((acc, product) => {
    const category = product.category;
    if (!acc[category]) {
      acc[category] = [];
    }

    acc[category].push(product.title);

    return acc;
  }, {});

  return groupProducts;
}
