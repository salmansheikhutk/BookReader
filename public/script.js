document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/data')
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('data-container');
      container.innerHTML = ''; // Clear any existing content

      const bookCategory = data.bookCategory || 'No category found';

      // Split the text, wrap each word in a span
      const words = bookCategory.split(/\s+/).map(word => {
        const span = document.createElement('span');
        span.className = 'arabic-word'; // Use the existing class for styling
        span.innerText = word;

        // Add click event to show definition in a popup
        span.addEventListener('click', () => {
          openDictionaryPopup(word);
        });

        return span;
      });

      // Create a paragraph element for the line and append the words
      const p = document.createElement('p');
      words.forEach(span => p.appendChild(span));
      container.appendChild(p);
    })
    .catch(error => console.error('Error fetching data:', error));
});

function openDictionaryPopup(word) {
  const url = `https://translate.google.com/?sl=ar&tl=en&text=${encodeURIComponent(word)}&op=translate`;
  const width = 400;
  const height = 600;
  const left = (screen.width - width) / 2;
  const top = (screen.height - height) / 2;
  window.open(url, 'DictionaryPopup', `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes`);
}
