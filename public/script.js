document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('data-container');
        const bookCategory = data.bookCategory || 'No category found';
        // Split the text, wrap each word in a span
        const words = bookCategory.split(/\s+/).map(word =>
            `<span class="word">${word}<span class="tooltip">meaning</span></span>`
        ).join(' ');
        
        // const words = bookCategory.split(/\s+/).map(function(word) {
        //     return `<span>${word}</span>`; // Wrap each word in a span
        // }).join(' '); // Join with a simple space
        container.innerHTML = words;
      })
      .catch(() => {
        document.getElementById('data-container').innerText = 'Failed to load data';
      });
});
