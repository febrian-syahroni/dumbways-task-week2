// Object-Oriented-Programming by Class function
class App {
  constructor(url) {
    // Create variable
    this.url = url;
    this.container = document.getElementById("container");
    this.testimonials = [];
    this.card = "";
  }

  // Adding data to HTML
  displayData(data) {
    this.card = "";
    // Iteration with forEach()
    data.forEach((event) => {
      this.card += `
              <div class="card">
                  <div style="background-image: url(${event.image})" class="image"></div>
                  <div class="comments">
                      <p>"${event.content}"</p>
                      <h5>- ${event.author}</h5>
                      <h4>${event.rating}⭐</h4>
                  </div>
              </div>
          `;
    });
    this.container.innerHTML = this.card;
  }

  // GET data with AJAX
  getData() {
    // Implement Asynchronous with Promise
    return new Promise((resolve, reject) => {
      const ajax = new XMLHttpRequest();
      // The AJAX property for readyState if changes occur
      ajax.onreadystatechange = () => {
        // If AJAX operation is done || 4
        if (ajax.readyState === XMLHttpRequest.DONE) {
          // If status Request is success(200)
          if (ajax.status === 200) {
            // Data is available if Promise is fulfilled
            resolve(this.testimonials);
            // Parsing JSON to Object JavaScript
            this.testimonials = JSON.parse(ajax.responseText);
            // Adding data to HTML
            this.displayData(this.testimonials);
          } else {
            // If Promise is rejected
            reject(new Error(`Request failed with status: ${ajax.status}`));
          }
        }
      };

      // Initial HTTP Request
      ajax.open("GET", this.url, true);
      // Send HTTP Request
      ajax.send();
    });
  }

  // Fetching data with async await
  async fetchDataWithDelay() {
    // Display the message before display data
    this.container.innerHTML = "<h1>Loading...</h1>";
    // Simulate delay with setTimeout()
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      const data = await this.getData();
      console.log("Data received:", data);
    } catch (error) {
      console.log(error.message);
    }
  }

  // Filtering by rating
  filterByRating(minRating) {
    const filteredData = this.testimonials.filter(
      (event) => event.rating == minRating
    );

    // Simulate delay
    setTimeout(() => {
      this.displayData(filteredData);
    }, 2000);
    this.container.innerHTML = "<h1>Loading...</h1>";
  }
}

const app = new App("https://api.npoint.io/cae4fe5ecc5c8ba6a62c", "container");
app.fetchDataWithDelay();
