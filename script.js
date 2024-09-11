document.addEventListener('DOMContentLoaded', function() {
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
              <a href="#order" class="btn btn-dark order-btn" data-product="${title}" data-price="${price}">${btnText}</a>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Contenu pour la section Promotions
  const promotionsContent = `
    <h1 class="text-center mb-4">Promotion</h1>
    <div class="container">
      <div class="row">
        ${createProductCard('./img/carosselle2.jpg', 'CLASS ROOM!', 'Discover our class of learning how to make cakes.', '0.00', 'More information')}
        ${createProductCard('./img/emy-Rx3QSrG1coc-unsplash.jpg', 'Dark Chocolate', '%30 promotion of second tablette.', '0.00', 'More information')}
      </div>
    </div>
  `;

  // Contenu pour la section Catalogue
  const catalogueContent = `
    <h1 class="text-center mb-4">Catalogue</h1>
    <div class="container">
      <div class="row">
        ${createProductCard('./img/heather-barnes-xatIo9Ksfb0-unsplash.jpg', 'White Chocolate', 'Discover our creamy white chocolate, perfect for those who love subtle sweetness.', '5.00', 'Order')}
        ${createProductCard('./img/irene-kredenets-wRY_4FGnDIM-unsplash.jpg', 'Dark Chocolate', 'Rich and intense dark chocolate for the true connoisseur.', '6.00', 'Order')}
        ${createProductCard('./img/american-heritage-chocolate-vdx5hPQhXFk-unsplash.jpg', 'Milk Chocolate', 'Smooth milk chocolate with a delightful creamy flavor.', '4.50', 'Order')}
        ${createProductCard('./img/ilinca-roman-GXlA4yPzFxk-unsplash.jpg', 'Chocolate Truffles', 'Decadent truffles with a rich, velvety filling.', '8.00', 'Order')}
        ${createProductCard('./img/kyaw-tun-ssG41C6mwrQ-unsplash.jpg', 'Artisanal Chocolate', 'Handcrafted chocolate with unique and bold flavors.', '10.00', 'Order')}
        ${createProductCard('./img/maddi-bazzocco-MjZq7A2RJxQ-unsplash.jpg', 'Chocolate Bars', 'Classic chocolate bars in a variety of flavors.', '7.00', 'Order')}
        ${createProductCard('./img/monika-grabkowska-0rf3k5tms_0-unsplash.jpg', 'White Chocolate Bark', 'Crispy white chocolate bark with nuts and dried fruits.', '6.50', 'Order')}
        ${createProductCard('./img/amirali-mirhashemian-RCVIlSXhYI0-unsplash.jpg', 'Caramel Chocolates', 'Luxurious chocolate with a gooey caramel center.', '7.50', 'Order')}
        ${createProductCard('./img/maddi-bazzocco-MjZq7A2RJxQ-unsplash.jpg', 'Peppermint Chocolate', 'Refreshing peppermint infused chocolate for a unique taste experience.', '5.50', 'Order')}
        ${createProductCard('./img/alina-parache-BypPgofw-1w-unsplash.jpg', 'Fruit Chocolates', 'Delightful chocolates with an assortment of dried fruits.', '8.50', 'Order')}
        ${createProductCard('./img/ilinca-roman-GXlA4yPzFxk-unsplash.jpg', 'Nut Chocolates', 'Crunchy nuts enrobed in rich chocolate.', '6.00', 'Order')}
        ${createProductCard('./img/kyaw-tun-ssG41C6mwrQ-unsplash.jpg', 'Spicy Chocolates', 'Exciting chocolates with a hint of spice.', '7.00', 'Order')}
      </div>
    </div>
  `;

  // Insérer le contenu dans les sections
  document.querySelector('#promotion').innerHTML = promotionsContent;
  document.querySelector('#catalogue').innerHTML = catalogueContent;

  // Attacher les événements de clic après avoir ajouté le contenu
  attachOrderButtonEvents();
});

function attachOrderButtonEvents() {
  document.querySelectorAll('.order-btn').forEach(button => {
    button.addEventListener('click', function (event) {
      event.preventDefault(); // Pour empêcher le comportement par défaut des liens.
      const productName = this.getAttribute('data-product');
      const productPrice = parseFloat(this.getAttribute('data-price'));
      addOrUpdateOrder(productName, productPrice);
    });
  });
}

function addOrUpdateOrder(product, price) {
  const ordersBody = document.getElementById('ordersBody');
  let existingRow = Array.from(ordersBody.querySelectorAll('tr')).find(row => row.cells[0].textContent === product);

  if (existingRow) {
    // Le produit existe déjà, augmenter la quantité
    const quantityCell = existingRow.cells[2];
    const totalCell = existingRow.cells[3];
    let quantity = parseInt(quantityCell.textContent) + 1;
    quantityCell.textContent = quantity;
    totalCell.textContent = `$${(price * quantity).toFixed(2)}`;
  } else {
    // Le produit n'existe pas, ajouter une nouvelle ligne
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${product}</td>
      <td>$${price.toFixed(2)}</td>
      <td>1</td>
      <td>$${price.toFixed(2)}</td>
      <td>
        <button class="btn btn-success btn-sm add-btn">Add</button>
        <button class="btn btn-danger btn-sm delete-btn">Delete</button>
      </td>
    `;
    ordersBody.appendChild(row);
  }

  calculateTotalPrice();
  updateOrdersVisibility();

  // Réattache les événements pour les nouveaux boutons ajoutés
  attachActionButtons();
}

function attachActionButtons() {
  // Détache les anciens gestionnaires d'événements 'Add'
  document.querySelectorAll('.add-btn').forEach(button => {
    button.removeEventListener('click', handleAddClick);
  });
  
  // Attache les nouveaux gestionnaires d'événements 'Add'
  document.querySelectorAll('.add-btn').forEach(button => {
    button.addEventListener('click', handleAddClick);
  });

  // Détache les anciens gestionnaires d'événements 'Delete'
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.removeEventListener('click', handleDeleteClick);
  });

  // Attache les nouveaux gestionnaires d'événements 'Delete'
  document.querySelectorAll('.delete-btn').forEach(button => {
    button.addEventListener('click', handleDeleteClick);
  });
}

function handleAddClick() {
  const row = this.parentElement.parentElement;
  const quantityCell = row.cells[2];
  const totalCell = row.cells[3];
  const price = parseFloat(row.cells[1].textContent.replace('$', ''));
  let quantity = parseInt(quantityCell.textContent) + 1;
  quantityCell.textContent = quantity;
  totalCell.textContent = `$${(price * quantity).toFixed(2)}`;
  calculateTotalPrice(); // Recalcule le total à chaque ajout
}

function handleDeleteClick() {
  const row = this.parentElement.parentElement;
  const quantityCell = row.cells[2];
  let quantity = parseInt(quantityCell.textContent);
  
  if (quantity > 1) {
    // Réduit la quantité au lieu de supprimer la ligne
    quantity -= 1;
    quantityCell.textContent = quantity;
    const price = parseFloat(row.cells[1].textContent.replace('$', ''));
    row.cells[3].textContent = `$${(price * quantity).toFixed(2)}`;
    calculateTotalPrice(); // Recalcule le total à chaque ajout
  } else {
    // Si la quantité est 1, demande confirmation pour supprimer
    if (confirm('Are you sure you want to delete this item?')) {
      row.remove();
      calculateTotalPrice(); // Recalcule le total après suppression
    }
  }

  // Affiche ou cache le message 'noOrdersMessage' en fonction du nombre de lignes
  updateOrdersVisibility();
}

function calculateTotalPrice() {
  let totalPrice = 0;
  document.querySelectorAll('#ordersBody tr').forEach(row => {
    const totalCell = row.cells[3];
    totalPrice += parseFloat(totalCell.textContent.replace('$', ''));
  });

  document.getElementById('totalPriceDisplay').textContent = `$${totalPrice.toFixed(2)}`;
}

function updateOrdersVisibility() {
  const ordersTable = document.getElementById('ordersTable');
  const noOrdersMessage = document.getElementById('noOrdersMessage');

  if (document.querySelectorAll('#ordersBody tr').length === 0) {
    ordersTable.style.display = 'none';
    noOrdersMessage.style.display = 'block';
  } else {
    ordersTable.style.display = 'block';
    noOrdersMessage.style.display = 'none';
  }
}

// Gestion du bouton de paiement
document.getElementById('payButton').addEventListener('click', function () {
  const totalPrice = document.getElementById('totalPriceDisplay').textContent;
  const confirmation = confirm(`Total price is ${totalPrice}. Are you sure?`);
  
  if (confirmation) {
    alert('Thank you for your order! You will receive a confirmation email regarding your delivery method.');
  }
});

// Gestion du formulaire de recherche
document.getElementById('searchForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Empêche le formulaire de se soumettre normalement

  // Récupère la valeur de recherche
  const query = document.getElementById('searchInput').value.toLowerCase();

  // Sélectionne toutes les cartes de produits
  const cards = document.querySelectorAll('.card');

  // Parcourt chaque carte et la cache ou l'affiche en fonction de la recherche
  cards.forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = 'block'; // Affiche la carte si elle correspond à la recherche
    } else {
      card.style.display = 'none'; // Cache la carte si elle ne correspond pas
    }
  });
});
