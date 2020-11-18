// Welcome Box elements
const welcomeBox = document.querySelector("#welcome-box");

// Login Form elements
const loginButton = document.querySelector("#login-button");
const loginFormBox = document.querySelector("#login-form-box");
const loginForm = document.querySelector("#login-form");
const loginToRegister = document.querySelector("#login-register-link");
const loginError = document.querySelector(".myAlert");

// LoginForm Data
const loginUsername = document.querySelector("#login-username");
const loginPassword = document.querySelector("#login-password");
const loginPerson = document.querySelector("#login-type");

// Register Form elements
const registerButton = document.querySelector("#register-button");
const registerFormBox = document.querySelector("#register-form-box");
const registerForm = document.querySelector("#register-form");
const registerToLogin = document.querySelector("#register-login");

// Main
const main = document.querySelector("#main");
const appForms = document.querySelector("#app-forms");

// Header Container
const headerContainer = document.querySelector("#header-container");
const sideBar = document.querySelector("#side-bar");
const mainBar = document.querySelector("#main-bar");

// Register /Login dropdown
const dropDownCaller = document.querySelector("#sign-in-icon");
const closeDropdown = document.querySelector("#close-dropdown");

// Main Drop Down
const mainDropdown = document.querySelector("#main-dropdown");
const dropDownIcon = document.querySelector("#dropdown-icon");
const closeMainDropdown = document.querySelector("#close-main-dropdown");

// Global Funtions
const loadItems = (data) => {
  // Teacher Form Name / Other elements where teacher name appears
  // Name
  document.querySelectorAll(".teacher-name").forEach((element) => {
    element.textContent = data.name;
  });

  document
    .querySelector(".teacher-f-name")
    .setAttribute("placeholder", data.name);

  // feild
  document.querySelectorAll(".teacher-feild").forEach((element) => {
    element.textContent = data.feild;
  });

  document
    .querySelector(".teacher-f-feild")
    .setAttribute("placeholder", data.feild);

  // Age
  document
    .querySelector(".teacher-f-age")
    .setAttribute("placeholder", data.age);

  // phone
  document
    .querySelector(".teacher-f-phone")
    .setAttribute("placeholder", data.phone);

  // Mail
  document
    .querySelector(".teacher-f-mail")
    .setAttribute("placeholder", data.mail);

  // Address
  document
    .querySelector(".teacher-f-address")
    .setAttribute("placeholder", data.address);

  // username
  document
    .querySelector(".teacher-f-username")
    .setAttribute("value", data.username);
};

// Login functions
// Display login form & Hide welcome box
loginButton.addEventListener("click", (e) => {
  e.preventDefault();

  //Hide dull main container
  main.setAttribute("style", "display:none;");
  appForms.setAttribute("style", "display:flex;");
  headerContainer.setAttribute("style", "display:none;");

  //Show login form
  loginFormBox.setAttribute("style", "display:flex");
});

registerToLogin.addEventListener("click", (e) => {
  e.preventDefault();

  //Hide dull main container
  main.setAttribute("style", "display:none;");
  appForms.setAttribute("style", "display:flex;");
  headerContainer.setAttribute("style", "display:none;");
  registerFormBox.setAttribute("style", "display:none;");

  //Show login form
  loginFormBox.setAttribute("style", "display:flex");
});
// Login function
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Data from the form
  const username = loginUsername.value.toLowerCase().split(" ").join("");
  const password = loginPassword.value.toLowerCase().split(" ").join("");

  fetch("/login?username=" + username + "&password=" + password).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          console.log(data.error);
          loginError.setAttribute(
            "style",
            "display:block; color:red; margin-bottom:5px; animation:fade 1s;"
          );

          return setTimeout(() => {
            loginError.setAttribute("style", "display:none;");
          }, 3000);
        } else {
          console.log(data.message);
          appForms.setAttribute("style", "display:none !important");
          mainBar.setAttribute("class", "col-12 col-md-8 mt-2");

          main.setAttribute("style", "display:flex;");
          headerContainer.setAttribute("style", "display:flex;");
          sideBar.setAttribute("style", "display:flex;");

          loadItems(data);
        }
      });
    }
  );
});

// Register functions
// Display register form & Hide welcome box
registerButton.addEventListener("click", (e) => {
  e.preventDefault();

  //Hide dull welcome-box & Login box already on display
  main.setAttribute("style", "display:none;");
  appForms.setAttribute("style", "display:flex;");
  headerContainer.setAttribute("style", "display:none;");
  loginFormBox.setAttribute("style", "display:none;");

  //Show register form
  registerFormBox.setAttribute("style", "display:flex");
});

loginToRegister.addEventListener("click", (e) => {
  e.preventDefault();

  //Hide dull welcome-box & Login box already on display
  main.setAttribute("style", "display:none;");
  appForms.setAttribute("style", "display:flex;");
  headerContainer.setAttribute("style", "display:none;");
  loginFormBox.setAttribute("style", "display:none;");

  //Show register form
  registerFormBox.setAttribute("style", "display:flex");
});

// Register Function
registerForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

// Teacher profile functions
const teacherSave = document.querySelector("#profile-save");
const teacherForm = document.querySelector("#profile-form");

// Enable disable inputs
document.querySelector("#profile-edit").addEventListener("click", (e) => {
  e.preventDefault();

  document.querySelectorAll(".disabled").forEach((element) => {
    element.removeAttribute("disabled");
  });

  teacherSave.removeAttribute("disabled");
  teacherSave.setAttribute("style", "color:#fff");
});

//Edit Function
teacherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const username = document.querySelector(".teacher-f-username").value;
  const name = document.querySelector(".teacher-f-name").value.toUpperCase();
  const age = document.querySelector(".teacher-f-age").value;
  const address = document.querySelector(".teacher-f-address").value;
  const feild = document.querySelector(".teacher-f-feild").value;
  const mail = document.querySelector(".teacher-f-mail").value;
  const phone = document.querySelector(".teacher-f-phone").value;

  fetch(
    "/editUser?username=" +
      username +
      "&name=" +
      name +
      "&age=" +
      age +
      "&address=" +
      address +
      "&feild=" +
      feild +
      "&mail=" +
      mail +
      "&phone=" +
      phone
  ).then((response) => {
    response.json().then((data) => {
      if (data.success) {
        loadItems(data.newInfo);
      } else {
        console.log("Failed");
      }
    });
  });
});
