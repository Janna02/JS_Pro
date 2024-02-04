// Страница просмотра отзывов:

// Показывает список всех продуктов, о которых были оставлены отзывы.
// При клике на название продукта отображается список всех отзывов по этому продукту.
// Возможность удаления отзыва (при нажатии на кнопку "Удалить" рядом с отзывом, данный отзыв удаляется из LocalStorage).

function deleteReview(productId, reviewIndex) {
  let existingReviews = JSON.parse(localStorage.getItem("reviews")) || [];

  // Найти продукт по productId
  const productIndex = existingReviews.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    // Удалить отзыв
    existingReviews[productIndex].reviews.splice(reviewIndex, 1);

    // Удалить продукт без отзывов
    if (existingReviews[productIndex].reviews.length === 0) {
      existingReviews.splice(productIndex, 1);
    }

    // Сохранить обновление в localStorage
    localStorage.setItem("reviews", JSON.stringify(existingReviews));

    // Обновить
    renderReviews(existingReviews);
  }
}

function toggleReviews(productId) {
  const reviewsContainer = document.getElementById(`reviews-${productId}`);
  const button = document.getElementById(`toggleButton-${productId}`);

  if (getComputedStyle(reviewsContainer).display === "none") {
    reviewsContainer.style.display = "block";
    button.textContent = "Скрыть отзывы";
  } else {
    reviewsContainer.style.display = "none";
    button.textContent = "Показать отзывы";
  }
}

function renderReviews(reviews) {
  const productsList = document.getElementById("productsList");
  productsList.innerHTML = "";

  reviews.forEach((product) => {
    const productContainer = document.createElement("div");
    productContainer.classList.add("reviews-container");

    const productName = document.createElement("h2");
    productName.textContent = product.productName;

    const toggleButton = document.createElement("button");
    toggleButton.classList.add("toggle-reviews-button");
    toggleButton.textContent = "Показать отзывы";
    toggleButton.onclick = () => toggleReviews(product.id);
    toggleButton.id = `toggleButton-${product.id}`;

    const reviewsContainer = document.createElement("ul");
    reviewsContainer.classList.add("reviews");
    reviewsContainer.id = `reviews-${product.id}`;

    if (product.reviews) {
      product.reviews.forEach((review, index) => {
        const li = document.createElement("li");
        li.textContent = review.reviewText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Удалить";
        deleteButton.onclick = () => deleteReview(product.id, index);

        li.appendChild(deleteButton);
        reviewsContainer.appendChild(li);
      });
    }

    productContainer.appendChild(productName);
    productContainer.appendChild(reviewsContainer);
    productsList.appendChild(productContainer);
    productContainer.appendChild(toggleButton);
  });
}

const storedReviews = JSON.parse(localStorage.getItem("reviews")) || [];
renderReviews(storedReviews);
