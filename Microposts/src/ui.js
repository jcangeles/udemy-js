class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.titleInput = document.querySelector("#title");
    this.bodyInput = document.querySelector("#body");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.titleInput = document.querySelector("#title");
    this.forState = "add";
  }

  showPosts(posts) {
    let output = "";
    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-text">${post.body}</p>
            <a href="#" class="edit card-link" data-id="${post.id}">
              <i class="fa fa-pencil"></i>
            </a>

            <a href="#" class="delete card-link" data-id="${post.id}">
              <i class="fa fa-remove"></i>
            </a>
          </div>
        </div>
      `;
    });
    this.post.innerHTML = output;
  }

  showAlert(message, className) {
    this.clearAlert();
    // create div
    const div = document.createElement("div");
    // add classes
    div.className = className;
    // add text
    div.appendChild(document.createTextNode(message));
    // get the parent
    const container = document.querySelector(".postsContainer");
    // get posts
    const posts = document.querySelector("#posts");
    // insert alert div
    container.insertBefore(div, posts);

    // timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  clearAlert() {
    const currentAlert = document.querySelector(".alert");
    if (currentAlert) {
      currentAlert.remove();
    }
  }

  clearFields() {
    this.titleInput.value = "";
    this.bodyInput.value = "";
  }

  // fill form to edit
  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  // clear id hidden value
  clearIDInput() {
    this.idInput.value = "";
  }

  // change the form state
  changeFormState(type) {
    if (type === "edit") {
      this.postSubmit.textContent = "Update Post";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      // create cancel button
      const button = document.createElement("button");
      button.className = "post-cancel btn btn-light btn-block";
      button.appendChild(document.createTextNode("Cancel Edit"));

      //inserting into the DOM
      // get parent
      const cardForm = document.querySelector(".card-form");
      // get element to insert before
      const formEnd = document.querySelector(".form-end");
      // insert cancel button
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = "Post It";
      this.postSubmit.className = "post-submit btn btn-primary btn-block";

      // remove cancel btn if it is there
      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }
      // clear ID from hidden field
      this.clearIDInput();
      // clear text
      this.clearFields();
    }
  }
}

export const ui = new UI();
