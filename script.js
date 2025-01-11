// პროდუქტების მასივი
let products = [];

// JSON ფაილის ჩატვირთვა
fetch('products.json')
  .then(response => response.json())
  .then(data => {
    products = data;
    renderProducts(products); // თავდაპირველად ყველა პროდუქტის ნახვა
  })
  .catch(error => console.error('მონაცემების ჩატვირთვის შეცდომა:', error));

// პროდუქტის რენდერის ფუნქცია
function renderProducts(productsList) {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = ''; // არსებული პროდუქციის წაშლა

  productsList.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');
    productCard.innerHTML = `
      <iframe src="${product.image}" frameborder="0" width="100%" height="200"></iframe>
      <h3>${product.name}</h3>
      <p class="product-price">${product.price.toFixed(2)} ლარი</p>
    `;
    productCard.onclick = () => openModal(product);
    grid.appendChild(productCard);
  });
}

// მოდალის გახსნა
function openModal(product) {
  document.getElementById('modalProductName').innerText = product.name;
  document.getElementById('modalProductPrice').innerText = `${product.price.toFixed(2)} ლარი`;
  document.getElementById('modalProductDescription').innerText = product.description;

  if (product.sellerPhone) {
    document.getElementById('modalSellerPhone').innerHTML = `
      <a href="tel:${product.sellerPhone}" style="color: #F6363F; text-decoration: none;">
        ${product.sellerPhone}
      </a>`;
  } else {
    document.getElementById('modalSellerPhone').innerText = 'ტელეფონის ნომერი არ არის ხელმისაწვდომი';
  }

  document.getElementById('productModal').style.display = 'flex';
}

// მოდალის დახურვა
function closeModal() {
  document.getElementById('productModal').style.display = 'none';
}

// პროდუქციის ავტომატური ძიება
function autoSearchProducts() {
  const query = document.getElementById('searchInput').value.toLowerCase();

  if (query.length === 0) {
    renderProducts(products);
    return;
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );

  renderProducts(filteredProducts);
}

// კატეგორიის მიხედვით ფილტრაცია
function filterProducts() {
  const category = document.getElementById('categories').value;

  const filteredProducts =
    category === 'all'
      ? products
      : products.filter(product => product.category === category);

  renderProducts(filteredProducts);
}

// პროდუქციის სორტირება ფასის მიხედვით
function sortProducts(order) {
  const sortedProducts = [...products].sort((a, b) =>
    order === 'price-asc' ? a.price - b.price : b.price - a.price
  );

  renderProducts(sortedProducts);
}

// თავდაპირველად ყველა პროდუქტის ნახვა
renderProducts(products);
