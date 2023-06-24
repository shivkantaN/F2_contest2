let data = [];

// Fetch data using .then
fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')


  .then(response => response.json())
  .then(responseData => {
    data = responseData;
    renderTable(data);
    setupSearchAndSort();
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Render data in a table
function renderTable(data) {
  const table = document.getElementById('coin-table');
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  data.forEach(item => {
    const { name, id, image, symbol, current_price, total_volume } = item;

    const row = document.createElement('tr');
    row.innerHTML = `
      <td><img src="${image}" alt="${name}" width="20" height="20"></td>
      <td>${name}</td>
      <td>${id}</td>
      <td>${symbol}</td>
      <td>${current_price}</td>
      <td>${total_volume}</td>
    `;

    tbody.appendChild(row);
  });
}

// Setup search and sort functionality
function setupSearchAndSort() {
  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const sortMarketCapButton = document.getElementById('sort-marketcap-button');
  const sortPercentageChangeButton = document.getElementById('sort-percentagechange-button');

  searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredData = data.filter(item =>
      item.name.toLowerCase().includes(searchTerm) ||
      item.symbol.toLowerCase().includes(searchTerm) ||
      item.id.toLowerCase().includes(searchTerm)
    );

    renderTable(filteredData);
  });

  sortMarketCapButton.addEventListener('click', () => {
    const sortedData = [...data].sort((a, b) => a.market_cap - b.market_cap);
    renderTable(sortedData);
  });

  sortPercentageChangeButton.addEventListener('click', () => {
    const sortedData = [...data].sort((a, b) => a.price_change_percentage - b.price_change_percentage);
    renderTable(sortedData);
  });
}