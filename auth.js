const signUp = document.querySelector("#signUp");
const singIn = document.querySelector("#signIn");
const register = document.querySelector("#register");
const login = document.querySelector("#login");
const changePasswordVisibility = document.querySelector(
  "#changePasswordVisibility"
);
const actionbutton = document.querySelector("#actionbutton");
const actionToggleArray = document.querySelectorAll(".actionToggle");
const topSide = document.querySelector(".top");

const name = document.querySelector("#name");
const lastname = document.querySelector("#lastName");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

const url = location.href;
const action = url.split("/").pop().split("?").pop() || "register";

const showPasswordIcon = '<i class="fa-solid fa-eye"></i>';
const hidePasswordIcon = '<i class="fa-solid fa-eye-slash"></i>';
let isShownPassword = true;

if (action === "register") {
  toggle("register");
} else {
  toggle("login");
}

changePasswordVisibility.addEventListener("click", () => {
  if (isShownPassword) {
    changePasswordVisibility.innerHTML = hidePasswordIcon;
    password.type = "text";
  } else {
    changePasswordVisibility.innerHTML = showPasswordIcon;
    password.type = "password";
  }
  isShownPassword = !isShownPassword;
});

register.addEventListener("click", () => {
  toggle("register");
});

login.addEventListener("click", () => {
  toggle("login");
});

actionbutton.addEventListener("click", () => {
  const isAction = action === "register";
  if (isAction) {
    actionRegister();
  } else {
    actionLogin();
  }
});

function toggle(action) {
  const isAction = action === "register";

  if (isAction) {
    signUp.classList.add("active");
    singIn.classList.remove("active");
  } else {
    signUp.classList.remove("active");
    singIn.classList.add("active");
  }

  actionToggleArray.forEach((element) => {
    element.style.display = isAction ? "block" : "none";
  });
  actionbutton.classList.add(isAction ? "btn-primary" : "btn-warning");
  actionbutton.classList.remove(isAction ? "btn-warning" : "btn-primary");
  actionbutton.textContent = isAction ? "Sign up" : "Sing in";
  login.style.color = isAction ? "black" : "#ffc107";
  register.style.color = isAction ? "#0d6efd" : "black";
}

function actionRegister() {
  let userName = name.value;
  let userLastName = lastname.value;
  let userEmail = email.value;
  let userPassword = password.value;

  const usersArray = getRefFromFirebase("User");

  setTimeout(() => {
    let isUserUnique = usersArray.some((user) => user.data.email === userEmail);

    if (isUserUnique) {
      displayToast("Failed, Email isn't unique", "error", "red");
      return;
    }

    if (
      userName === "" ||
      userLastName === "" ||
      userEmail === "" ||
      userPassword === ""
    ) {
      displayToast("Failed, Fill every input", "error", "red");
    } else {
      displayToast("Successfully registered", "success", "green");
      addElementInFirebase("User", {
        name: userName,
        lastName: userLastName,
        email: userEmail,
        password: userPassword,
      });
      actionbutton.disabled = true;

      const usersArrayUpdated = getRefFromFirebase("User");

      setTimeout(() => {
        const userIndex = usersArrayUpdated.findIndex(
          (user) =>
            user.data.email === userEmail && user.data.password === userPassword
        );
        if (userIndex === -1) {
          displayToast("Failed, Auth please sing in", "error", "red");
        } else {
          const id = usersArrayUpdated[userIndex].id;
          sessionStorage.setItem("user_id", id);
          location.href = "index.html";
        }
      }, 500);
    }
  }, 500);
}

function actionLogin() {
  let userEmail = email.value;
  let userPassword = password.value;

  const usersArrayUpdated = getRefFromFirebase("User");

  setTimeout(() => {
    const userIndex = usersArrayUpdated.findIndex(
      (user) =>
        user.data.email === userEmail && user.data.password === userPassword
    );
    if (userIndex === -1) {
      displayToast("Failed, Wrong data", "error", "red");
    } else {
      displayToast("Successfully authorized", "success", "green");
      const id = usersArrayUpdated[userIndex].id;
      sessionStorage.setItem("user_id", id);
      location.href = "index.html";
    }
  }, 1000);
}
