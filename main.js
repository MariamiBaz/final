const urlMain = location.href;
const page = urlMain.split("/").pop().split(".")[0];

if (sessionStorage.getItem("user_id")) {
  const id = sessionStorage.getItem("user_id");
  if (id.length === 36) {
    const user = getElementFromFirebase("User", id);
    user
      .then(() => {
        document.querySelectorAll(".auth").forEach((element) => {
          element.remove();
        });
      })
      .catch(() => {
        logOut();
      });

    if (page === "auth") {
      location.href = "index.html";
    }
  } else {
    logOut();
  }
}

if (page === "index") {
  const cardsArray = getRefFromFirebase("Card");

  setTimeout(() => {
    document.querySelector(".loader").remove();
    const afterLoad = document.querySelector(".after-load");
    afterLoad.style.display = "flex";

    cardsArray.forEach((card) => {
      afterLoad.innerHTML += `
        <div class="card" style="width: 18rem;" id="${card.id}">
          <img class="card-img-top" src="${card.data.imgSrc}" alt="image">
          <div class="card-body">
            <h5 class="card-title">${card.data.title}</h5>
            <p class="card-text">${card.data.description} <br> ${card.data.uploadTime}</p>
            <button class="btn btn-danger" onclick="removeCard('${card.id}')">Delete</button>
          </div>
        </div>`;
    });
  }, 1000);
}

function logOut() {
  sessionStorage.clear();
  location.reload();
}

function removeCard(id) {
  removeElementFromFirebase("Card", id);
  displayToast("Deleted", "success", "green");
  setTimeout(() => {
    location.reload();
  }, 1500);
}
