document.addEventListener('DOMContentLoaded', function() {

  // Données du catalogue organisées par catégorie
  const catalogueData = {
    "White Chocolate": [
      { imgSrc: './img/heather-barnes-xatIo9Ksfb0-unsplash.jpg', title: 'White Chocolate', text: 'Discover our creamy white chocolate, perfect for those who love subtle sweetness.', price: '5.00' }
    ],
    "Dark Chocolate": [
      { imgSrc: './img/irene-kredenets-wRY_4FGnDIM-unsplash.jpg', title: 'Dark Chocolate', text: 'Rich and intense dark chocolate for the true connoisseur.', price: '6.00' },
      { imgSrc: './img/kyaw-tun-ssG41C6mwrQ-unsplash.jpg', title: 'Spicy Chocolates', text: 'Exciting chocolates with a hint of spice.', price: '7.00' }
    ],
    "Other": [
      { imgSrc: './img/american-heritage-chocolate-vdx5hPQhXFk-unsplash.jpg', title: 'Milk Chocolate', text: 'Smooth milk chocolate with a delightful creamy flavor.', price: '4.50' },
      { imgSrc: './img/ilinca-roman-GXlA4yPzFxk-unsplash.jpg', title: 'Chocolate Truffles', text: 'Decadent truffles with a rich, velvety filling.', price: '8.00' },
      { imgSrc: './img/kyaw-tun-ssG41C6mwrQ-unsplash.jpg', title: 'Artisanal Chocolate', text: 'Handcrafted chocolate with unique and bold flavors.', price: '10.00' },
      { imgSrc: './img/maddi-bazzocco-MjZq7A2RJxQ-unsplash.jpg', title: 'Chocolate Bars', text: 'Classic chocolate bars in a variety of flavors.', price: '7.00' },
      { imgSrc: './img/monika-grabkowska-0rf3k5tms_0-unsplash.jpg', title: 'White Chocolate Bark', text: 'Crispy white chocolate bark with nuts and dried fruits.', price: '6.50' },
      { imgSrc: './img/amirali-mirhashemian-RCVIlSXhYI0-unsplash.jpg', title: 'Caramel Chocolates', text: 'Luxurious chocolate with a gooey caramel center.', price: '7.50' },
      { imgSrc: './img/maddi-bazzocco-MjZq7A2RJxQ-unsplash.jpg', title: 'Peppermint Chocolate', text: 'Refreshing peppermint infused chocolate for a unique taste experience.', price: '5.50' },
      { imgSrc: './img/alina-parache-BypPgofw-1w-unsplash.jpg', title: 'Fruit Chocolates', text: 'Delightful chocolates with an assortment of dried fruits.', price: '8.50' },
      { imgSrc: './img/ilinca-roman-GXlA4yPzFxk-unsplash.jpg', title: 'Nut Chocolates', text: 'Crunchy nuts enrobed in rich chocolate.', price: '6.00' }
    ]
  };

  // Fonction pour créer une carte produit
  function createProductCard(imgSrc, title, text, price, btnText) {
    return `
      <div class="col-md-4 mb-4">
        <div class="card">
          <img src="${imgSrc}" class="card-img-top" alt="${title}">
          <div class="card-body">
            <h5 class="card-title">${title}</h5>
            <p class="card-text">${text}</p>
            <div class="d-grid gap-2 d-md-flex justify-content-md-end">
              <span class="text-muted">Price: $${price}</span>
              <button class="btn btn-dark order-btn" data-product="${title}" data-price="${price}">${btnText}</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Fonction pour créer une section de catégorie
  function createCategorySection(categoryName, products) {
    const productCards = products.map(product => createProductCard(product.imgSrc, product.title, product.text, product.price, 'Order')).join('');
    return `
      <h2 class="text-center mb-4">${categoryName}</h2>
      <div class="container">
        <div class="row">
          ${productCards}
        </div>
      </div>
    `;
  }

  // Fonction pour afficher le catalogue complet
  function displayCatalogue() {
    const catalogueContainer = document.querySelector('#catalogue');
    catalogueContainer.innerHTML = Object.keys(catalogueData)
      .map(category => createCategorySection(category, catalogueData[category]))
      .join('');
    attachOrderButtonEvents(); // Attacher les événements après avoir inséré le contenu
  }

  // Fonction pour afficher le catalogue par catégorie
  function displayCatalogueByCategory(category) {
    const catalogueContainer = document.querySelector('#catalogue');
    if (category === 'all') {
      displayCatalogue();
    } else {
      catalogueContainer.innerHTML = createCategorySection(category, catalogueData[category]);
      attachOrderButtonEvents(); // Attacher les événements après avoir inséré le contenu
    }
  }

  // Affichage des promotions
  document.querySelector('#promotion').innerHTML = `
    <h1 class="text-center mb-4">Promotion</h1>
    <div class="container">
      <div class="row">
        ${createProductCard('./img/carosselle2.jpg', 'CLASS ROOM!', 'Discover our class of learning how to make cakes.', '50.00', 'try it ')}
        ${createProductCard('./img/emy-Rx3QSrG1coc-unsplash.jpg', 'Dark Chocolate', '%30 promotion of tablette for prime member.', '5.10', 'try it')}
      </div>
    </div>
  `;

  // Affichage du catalogue par défaut
  displayCatalogue();

  // Gestion des clics sur les boutons de filtre
  document.querySelectorAll('.filter-category').forEach(button => {
    button.addEventListener('click', function() {
      const category = this.getAttribute('data-category');
      displayCatalogueByCategory(category);
    });
  });

  // Attacher les événements aux boutons de commande
  function attachOrderButtonEvents() {
    document.querySelectorAll('.order-btn').forEach(button => {
      button.addEventListener('click', function (event) {
        event.preventDefault(); // Empêcher le comportement par défaut
        const productName = this.getAttribute('data-product');
        const productPrice = parseFloat(this.getAttribute('data-price'));
        addOrUpdateOrder(productName, productPrice);
      });
    });
  }

  // Ajouter ou mettre à jour une commande
  function addOrUpdateOrder(product, price) {
    const ordersBody = document.getElementById('ordersBody');
    let existingRow = Array.from(ordersBody.querySelectorAll('tr')).find(row => row.cells[0].textContent === product);
    if (existingRow) {
      // Le produit existe déjà, augmenter la quantité
      const quantityCell = existingRow.cells[2].querySelector('input');
      const totalCell = existingRow.cells[3];
      let quantity = parseInt(quantityCell.value) + 1;
      quantityCell.value = quantity;
      totalCell.textContent = `$${(price * quantity).toFixed(2)}`;
    } else {
      // Le produit n'existe pas, ajouter une nouvelle ligne
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${product}</td>
        <td>$${price.toFixed(2)}</td>
        <td><input type="number" class="form-control quantity" value="1" min="1"></td>
        <td>$${price.toFixed(2)}</td>
        <td><button class="btn btn-danger btn-sm delete-btn">Delete</button></td>
      `;
      ordersBody.appendChild(row);
      row.querySelector('.delete-btn').addEventListener('click', handleDeleteClick);
      row.querySelector('.quantity').addEventListener('change', handleQuantityChange); // Ajouter l'événement de changement de quantité
    }
    calculateTotalPrice();
    updateOrdersVisibility();
  }

  // Gestion du changement de quantité du produit
  function handleQuantityChange() {
    const row = this.closest('tr');
    const price = parseFloat(row.cells[1].textContent.replace('$', ''));
    const quantity = parseInt(this.value);
    row.cells[3].textContent = `$${(price * quantity).toFixed(2)}`;
    calculateTotalPrice();
  }

  // Gestion du clic sur le bouton 'Delete'
  function handleDeleteClick() {
    const row = this.closest('tr');
    row.remove();
    calculateTotalPrice();
    updateOrdersVisibility();
  }

  // Calculer le prix total
  function calculateTotalPrice() {
    const totalPriceElement = document.getElementById('totalPriceDisplay');
    const total = Array.from(document.querySelectorAll('#ordersBody tr'))
      .reduce((acc, row) => acc + parseFloat(row.cells[3].textContent.replace('$', '')), 0);
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
  }

  // Mettre à jour l'affichage des commandes
  function updateOrdersVisibility() {
    const ordersContainer = document.getElementById('ordersTable');
    const hasOrders = document.querySelectorAll('#ordersBody tr').length > 0;
    ordersContainer.style.display = hasOrders ? 'block' : 'none';
    document.getElementById('noOrdersMessage').style.display = hasOrders ? 'none' : 'block';
  }

  // Gestion du clic sur le bouton de paiement
  document.getElementById('payButton').addEventListener('click', function () {
    let totalPrice = document.getElementById('totalPriceDisplay').textContent;
    totalPrice = totalPrice.replace('$', '');
    const confirmation = confirm(`The total price is $${totalPrice}. Are you sure?`);
    if (confirmation) {
      alert('Thank you for your order. We will send an email for delivery options.');
    }
  });

  // Gestion de l'envoi du formulaire de recherche
  document.getElementById('searchForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Empêcher l'envoi du formulaire par défaut
    const query = document.getElementById('searchInput').value.toLowerCase();
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const title = card.querySelector('.card-title').textContent.toLowerCase();
      card.style.display = title.includes(query) ? 'block' : 'none';
    });
  });

});
