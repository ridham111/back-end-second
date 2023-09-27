document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const uploadButton = document.getElementById('uploadButton');
    const fileSelect = document.getElementById('fileSelect');
    const dataTable = document.getElementById('dataTable');
  
    // Event listener for file upload
    uploadButton.addEventListener('click', () => {
 //     fileInput.appendChild(fileInput.files[0])
      const file = fileInput.files[0];
      if (file) {
        const formData = new FormData();
        formData.append('csvFile', file);
  
        fetch('/upload', {
          method: 'POST',
          body: formData,
        })
        .then(response => response.json())
        .then(() => {
          loadCSVFiles();
        })
        .catch(error => console.error('Error uploading file:', error));
      }
    });
  
    // Load uploaded CSV files
    var lastFile ='';
    async function loadCSVFiles() {
      fetch('/files')
        .then(response => response.json())
        .then(async files => {
          fileSelect.innerHTML = '';
          lastFile =  files.csvFiles[0] 
          fetch(`/data/${lastFile}`)
          .then(response => response.json())
          .then(data => {
            // Create table headers
            dataTable.innerHTML='';
            const headers = Object.keys(data[0]);
            const headerRow = dataTable.insertRow(0);
            headers.forEach(headerText => {
              const th = document.createElement('th');
              th.textContent = headerText;
              headerRow.appendChild(th);
            });
  
            // Populate table with data
            data.forEach(rowData => {
              const row = dataTable.insertRow();
              headers.forEach(headerText => {
                const cell = row.insertCell();
                cell.textContent = rowData[headerText];
              });
            });
          })
          .catch(error => console.error('Error fetching CSV data:', error));
          files.csvFiles.forEach(file => {
            const option = document.createElement('option');
            option.value = file;
              option.textContent = file;
            fileSelect.appendChild(option);
          });
        })
        .catch(error => console.error('Error fetching CSV files:', error));
    }
  
    // Event listener for file selection
    fileSelect.addEventListener('change', () => {
      const selectedFile = fileSelect.value;
      console.log('hiiiiiiiiiiiiiiiiii');
      if (selectedFile) {
        fetch(`/data/${selectedFile}`)
          .then(response => response.json())
          .then(data => {
            // Create table headers
            dataTable.innerHTML='';
            const headers = Object.keys(data[0]);
            console.log(dataTable.children);
            const headerRow = dataTable.insertRow(0);
            headers.forEach(headerText => {
              const th = document.createElement('th');
              th.textContent = headerText;
              headerRow.appendChild(th);
            });
  
            // Populate table with data
            data.forEach(rowData => {
              const row = dataTable.insertRow();
              headers.forEach(headerText => {
                const cell = row.insertCell();
                cell.textContent = rowData[headerText];
              });
            });
          })
          .catch(error => console.error('Error fetching CSV data:', error));
      }
    });
    // ...

// Event listener for file selection
fileSelect.addEventListener('change', () => {
    // ...
  });
  
  // Add an event listener for search input
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', () => {
    filterTable();
  });
  
  // Function to filter the table based on search input
  function filterTable() {
    const selectedFile = fileSelect.value;
    if (selectedFile) {
      // Fetch data from the selected CSV file
      fetch(`/data/${selectedFile}`)
        .then(response => response.json())
        .then(data => {
          // Filter data based on the search input
          const searchTerm = searchInput.value.toLowerCase();
          const filteredData = data.filter(rowData => {
            return Object.values(rowData).some(value =>
              value.toLowerCase().includes(searchTerm)
            );
          });
  
          // Update the table with filtered data
          updateTable(filteredData);
        })
        .catch(error => console.error('Error fetching CSV data:', error));
    }
  }
  
  // Function to update the table with data
  function updateTable(data) {
    // Clear the table
    while (dataTable.firstChild) {
      dataTable.removeChild(dataTable.firstChild);
    }
  
    // Create table headers
    const headers = Object.keys(data[0]);
    const headerRow = dataTable.insertRow(0);
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      headerRow.appendChild(th);
    });
  
    // Populate table with data
    data.forEach(rowData => {
      const row = dataTable.insertRow();
      headers.forEach(headerText => {
        const cell = row.insertCell();
        cell.textContent = rowData[headerText];
      });
    });
  }
  
  
    // Initial load of CSV files
    loadCSVFiles();
  });
  
