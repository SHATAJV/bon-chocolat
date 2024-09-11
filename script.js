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
  calculateTotalPrice(); // Recalculez le total à chaque ajout
}

// Fonction pour gérer les clics sur les boutons 'Delete'
function handleDeleteClick() {
  const row = this.parentElement.parentElement;
  const quantityCell = row.cells[2];
  let quantity = parseInt(quantityCell.textContent);
  if (quantity > 1) {
    quantity -= 1;
    quantityCell.textContent = quantity;
    const price = parseFloat(row.cells[1].textContent.replace('$', ''));
    row.cells[3].textContent = `$${(price * quantity).toFixed(2)}`;
  } else {
    if (confirm('Are you sure you want to delete this item?')) {
      row.remove();
    }
  }
  calculateTotalPrice(); // Recalculez le total après suppression
  if (document.querySelectorAll('#ordersBody tr').length === 0) { // Vérifiez s'il n'y a plus de produits
    document.getElementById('ordersTable').style.display = 'none';
    document.getElementById('noOrdersMessage').style.display = 'block';
  }
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
  document.getElementById('ordersTable').style.display = 'block';
  document.getElementById('noOrdersMessage').style.display = 'none';

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

document.getElementById('toggleOrders').addEventListener('click', function() {
  var ordersTable = document.getElementById('ordersTable');
  var noOrdersMessage = document.getElementById('noOrdersMessage');

  if (ordersTable.style.display === 'none') {
    ordersTable.style.display = 'block';
    noOrdersMessage.style.display = 'none';
    this.textContent = 'Hide Orders';
  } else {
    ordersTable.style.display = 'none';
    noOrdersMessage.style.display = 'block';
    this.textContent = 'Show Orders';
  }
});
