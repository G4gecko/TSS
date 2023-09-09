document.addEventListener('DOMContentLoaded', function () {
  const selectFolderButton = document.getElementById('select-folder-button');
  const fileList = document.getElementById('file-list');
  const fileInput = document.getElementById('file-input');

  selectFolderButton.addEventListener('click', () => {
      fileInput.click();
  });

  fileInput.addEventListener('change', () => {
      fileList.innerHTML = '';
      const files = fileInput.files;

      for (let i = 0; i < files.length; i++) {
          fileList.innerHTML += `<li>${files[i].name}</li>`;
      }
  });

  const searchInput = document.getElementById('search-input');
  const searchButton = document.getElementById('search-button');
  const searchResults = document.getElementById('search-results');

  searchButton.addEventListener('click', () => {
      searchResults.innerHTML = ''; // Clear previous search results
      const searchTerm = searchInput.value.toLowerCase();
      const files = fileInput.files;

      for (let i = 0; i < files.length; i++) {
          const file = files[i];
          if (file.type === 'text/plain') {
              const reader = new FileReader();

              reader.onload = function (event) {
                  const fileContent = event.target.result.toLowerCase();

                  if (fileContent.includes(searchTerm)) {
                      searchResults.innerHTML += `<li>${file.name}</li>`;
                  }
              };

              reader.readAsText(file);
          }
      }
  });
});