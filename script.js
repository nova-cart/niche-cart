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
// Progress Bar Script
window.addEventListener("scroll", () => {
  const progressBar = document.querySelector(".progress-bar");
  const scrollTop = window.scrollY; // Current scroll position
  const scrollHeight = document.body.scrollHeight - window.innerHeight; // Total scrollable height
  const progress = (scrollTop / scrollHeight) * 100; // Calculate progress
  progressBar.style.width = progress + "%";
});


// ფუნქცია, რომელიც მისალმებას ადგენს დროის მიხედვით
const showGreeting = () => {
  const greeting = document.createElement("div");
  greeting.style.position = "fixed";
  greeting.style.bottom = "20px";
  greeting.style.left = "20px";
  greeting.style.backgroundColor = "white";
  greeting.style.color = "black";
  greeting.style.padding = "10px 15px";
  greeting.style.borderRadius = "5px";
  greeting.style.boxShadow = "0 2px 10px white";
  greeting.style.zIndex = "1000";

  const now = new Date(); // მომხმარებლის ადგილობრივი დრო
  const hours = now.getHours(); // საათები

  let message = "";

  if (hours >= 5 && hours < 12) {
    message = "დილამშვიდობისა!";
  } else if (hours >= 12 && hours < 18) {
    message = "დღის მშვიდობისა!";
  } else if (hours >= 18 && hours < 24) {
    message = "საღამომშვიდობისა!";
  } else {
    message = "ღამემშვიდობისა!";
  }

  greeting.textContent = message;
  document.body.appendChild(greeting);

  // შეტყობინება 5 წამში ქრება
  setTimeout(() => greeting.remove(), 5000);
};

// ფუნქციის გამოძახება
showGreeting();

        // fetch the JSON file
        fetch('news.json')
            .then(response => response.json())  // Convert the response to JSON
            .then(newsData => {
                const feed = document.getElementById('newsFeed');
                
                // loop through the news data in reverse order and add them to the feed
                newsData.reverse().forEach(article => {
                    const card = document.createElement('div');
                    card.classList.add('news-card');
                    card.innerHTML = `
                        <h3>${article.title}</h3>
                        <p>${article.content}</p>
                    `;
                    feed.append(card);  // append adds the latest article at the bottom
                });
            })
            .catch(error => {
                console.error('Error loading the JSON file:', error);
            });
