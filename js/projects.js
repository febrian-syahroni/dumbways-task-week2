let projects = [];

const getData = (event) => {
  event.preventDefault();

  const projectName = document.getElementById("projectName").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value;
  //   Technologies
  const checklist = document.querySelectorAll("input[id='checklist']:checked");
  const technologies = Array.from(checklist).map((event) => event.value);

  // Condition
  if (projectName == "") {
    alert("The Project Name cannot be empty");
  } else if (startDate == "") {
    alert("The Start Date cannot be empty");
  } else if (endDate == "") {
    alert("The End Date cannot be empty");
  } else if (description == "") {
    alert("The Description cannot be empty");
  } else if (technologies == "") {
    alert("The Technologies cannot be empty");
  } else {
    // Show to console browser
    console.log(`Project Name : ${projectName}`);
    console.log(`Start Date : ${startDate}`);
    console.log(`End Date : ${endDate}`);
    console.log(`Description : ${description}`);
    console.log(`Technologies : ${technologies.join()}`);

    // Inject to variable
    const myProject = {
      projectName,
      startDate,
      endDate,
      description,
      technologies,
    };

    // Send project to variable named projects
    projects.push(myProject);
    // Reset form after submit
    document.getElementById("projectForm").reset();
    // Add project
    render();
  }
};

// function add project
const render = () => {
  // initialization
  document.getElementById("addProject").innerHTML = "";
  for (let i = 0; i < projects.length; i++) {
    document.getElementById("addProject").innerHTML += `
    <!-- Cards -->
    <div class="card">
      <!-- Thumbnail -->
      <div
        style="background-image: url(/assets/bird.jpg)"
        class="thumbnail"></div>
      <!-- Title -->
      <div style="line-height: 0">
        <h4>${projects[i].projectName}</h4>
        <p style="color: gray; font-size: small">
          ${projects[i].startDate} - ${projects[i].endDate}
        </p>
      </div>
      <!-- Detail Blog -->
      <p style="font-size: small">
        ${projects[i].description}
      </p>
      <!-- Icons -->
      <div class="Technologies">                        
        ${projects[i].technologies
          .map((e) => `<checklist>${e}</checklist>`)
          .join("")}
      </div>
      <!-- Custom Button -->
      <div class="custom-btn">
        <button style="display: block">Edit</button>
        <button style="display: block">Delete</button>
      </div>
    </div>
  `;
  }
};

// Function display message
const checkIfEmpty = () => {
  const container = document.getElementById("addProject");
  if (projects.length === 0) {
    container.innerHTML =
      "<p style='margin: auto; color: gray'>No projects available</p>";
  } else {
    const message = container.querySelector("p");
    message.remove();
  }
};

// Initial check if project is empty
checkIfEmpty();
