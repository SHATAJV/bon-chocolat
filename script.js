
const products = {
    'White Chocolate': 5.00,
    'Dark Chocolate': 7.00,
    'Milk Chocolate': 6.00,
    'Chocolate Truffles': 10.00,
    'Artisanal Chocolate': 12.00
  };

  document.querySelectorAll('.btn-dark').forEach(button => {
    button.addEventListener('click', function () {
      const productName = this.parentElement.querySelector('.card-title').textContent;
      const productPrice = products[productName];
     
      addOrUpdateOrder(productName, productPrice);
    });
  });
  function addOrUpdateOrder(product, price) {
    const ordersBody = document.getElementById('ordersBody');
    let existingRow = Array.from(ordersBody.querySelectorAll('tr')).find(row => row.cells[0].textContent === product);
    
    if (existingRow) {
      
      const quantityCell = existingRow.cells[2];
      const totalCell = existingRow.cells[3];
      
      let quantity = parseInt(quantityCell.textContent) + 1;
      quantityCell.textContent = quantity;
      totalCell.textContent = `$${(price * quantity).toFixed(2)}`;
    } else {
      
      var row = document.createElement('tr');
      row.innerHTML = `
        <td>${product}</td>
        <td>$${price.toFixed(2)}</td>
        <td>1</td>
        <td>$${price.toFixed(2)}</td>
      `;
      ordersBody.appendChild(row);
    }
    
    calculateTotalPrice();
     
    document.getElementById('ordersTable').style.display = 'block';
    document.getElementById('noOrdersMessage').style.display = 'none';
  }
  function calculateTotalPrice() {
    let totalPrice = 0;
    document.querySelectorAll('#ordersBody tr').forEach(row => {
      const totalCell = row.cells[3];
      totalPrice += parseFloat(totalCell.textContent.replace('$', ''));
    });
    
    let totalRow = document.getElementById('totalRow');
    if (!totalRow) {
      totalRow = document.createElement('tr');
      totalRow.id = 'totalRow';
      totalRow.innerHTML = `
        <td colspan="3">Total</td>
        <td id="totalPrice">$${totalPrice.toFixed(2)}</td>
      `;
      document.getElementById('ordersBody').appendChild(totalRow);
    } else {
      document.getElementById('totalPrice').textContent = `$${totalPrice.toFixed(2)}`;
    }
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
  