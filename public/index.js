document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:3000/books')
        .then(response => {
            // console.log('Response:', response.json());
            return response.json();
        })
        .then(data => {
            console.log("Data received:", data);
            const container = document.getElementById('book-list');
            container.innerHTML = ''; // Clear any existing content 
            data.books.forEach(book => {
                const p = document.createElement('p');
                p.innerText = book;
                container.appendChild(p);

                p.addEventListener('click', () => {
                    const bookName = book; // Assume 'book' holds the book name
                    console.log("Book name:", bookName);
                    window.location.href = './page.html?bookName=' + encodeURIComponent(bookName);
                    // fetch(`/data?bookName=${encodeURIComponent(bookName)}`)
                    //     .then(response => response.json())
                    //     .then(data => {
                    //         console.log("Data received:", data);
                    //         // Navigate to page.html after the fetch request completes successfully
                    //         window.location.href = './page.html';
                    //     })
                    //     .catch(error => {
                    //         console.error('Error fetching data:', error);
                        
                });
                

            });
})})


document.addEventListener('DOMContentLoaded', function() {
  fetch('http://localhost:3000/data')
    .then(response => {
      console.log('Response:', response);
      console.log('Type:', response.type);
      // console.log('Json:', response.json());
      return response.json()})
      .then(data => {
        console.log("Data received:", data);
        const container = document.getElementById('data-container');
        container.innerHTML = ''; // Clear any existing content
  
        // Iterate over each line
        data.lines.forEach(line => {

          // Create a paragraph element for each line
          const p = document.createElement('p');
  
          // Split the line into words and wrap each word in a span
          const words = line.split(/\s+/).map(word => {
            const span = document.createElement('span');
            span.className = 'arabic-word'; // Use the existing class for styling
            span.innerText = word;
  
            // Add click event to show definition in a popup
            span.addEventListener('click', () => {
              openDictionaryPopup(word);
            });
  
            return span;
          });
  
          // Append each span to the paragraph element with a space after each word
          words.forEach((span, index) => {
            p.appendChild(span);
            if (index < words.length - 1) {
              p.appendChild(document.createTextNode(' ')); // Add a space after each word except the last
            }
          });
  
          // Append the paragraph to the container
          container.appendChild(p);
        });
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