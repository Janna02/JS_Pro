// Создайте интерактивную веб-страницу для оставления и просмотра отзывов о продуктах. Пользователи могут добавлять отзывы о различных продуктах и просматривать добавленные отзывы.

// Страница добавления отзыва:

// Поле для ввода названия продукта.
// Текстовое поле для самого отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в LocalStorage.

function addReview() {
  const productNameInput = document.getElementById("productName");
  const reviewTextInput = document.getElementById("reviewText");

  const productName = productNameInput.value.trim();
  const reviewText = reviewTextInput.value.trim();

  if (!productName || !reviewText) {
    alert("Название продукта и текст отзыва должны быть заполнены.");
    return;
  }

  const newReview = { id: Date.now(), productName, reviewText };

  const existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];
  const existingProductIndex = existingReviews.findIndex(
    (product) => product.productName === productName
  );

  if (existingProductIndex !== -1) {
    // Добавить отзыв к существующему продукту
    existingReviews[existingProductIndex].reviews.push(newReview);
  } else {
    // Создать новый продукт с отзывом
    const newProduct = { id: Date.now(), productName, reviews: [newReview] };
    existingReviews.push(newProduct);
  }

  localStorage.setItem("reviews", JSON.stringify(existingReviews));

  productNameInput.value = "";
  reviewTextInput.value = "";

  alert("Отзыв успешно добавлен!");
}
