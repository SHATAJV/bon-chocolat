
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
