// Attache les événements 'click' aux boutons 'Add' et 'Delete'
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

// Fonction pour gérer les clics sur les boutons 'Add'
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

// Fonction pour gérer les clics sur les boutons 'Delete'
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

// Attache l'événement 'click' aux boutons d'ordre pour ajouter ou mettre à jour les produits
document.querySelectorAll('.order-btn').forEach(button => {
  button.addEventListener('click', function (event) {
    event.preventDefault(); // Pour empêcher le comportement par défaut des liens.
    const productName = this.getAttribute('data-product');
    const productPrice = parseFloat(this.getAttribute('data-price'));
    addOrUpdateOrder(productName, productPrice);
  });
});

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
  // Affiche ou cache le message 'noOrdersMessage' en fonction du nombre de lignes
  updateOrdersVisibility();

  // Réattache les événements pour les nouveaux boutons ajoutés
  attachActionButtons();
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