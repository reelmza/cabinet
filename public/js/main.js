// Welcome Box elements
const welcomeBox = document.querySelector("#welcome-box");

// Login Form elements
const loginButton = document.querySelector("#login-button");
const loginFormBox = document.querySelector("#login-form-box");
const loginForm = document.querySelector("#login-form");
const loginToRegister = document.querySelector("#login-register-link");
const loginError = document.querySelector(".myAlert");

// LoginForm Data
var loginUsername = document.querySelector("#login-username");
var loginPassword = document.querySelector("#login-password");
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
const checkCookie = () => {
  if (document.cookie != "") {
    rawCookie = document.cookie.split(";");
    const usernameArray = rawCookie[0].split("=");
    const passwordArray = rawCookie[1].split("=");

    const cookieUsername = usernameArray[1];
    const cookiePassword = passwordArray[1];

    // Cookie isswapped after browser resets, so use below function
    if (usernameArray[0] === "username") {
      loginFunction(cookieUsername, cookiePassword);
    } else {
      loginFunction(cookiePassword, cookieUsername);
    }
  } else {
    console.log("No cookie");
  }
};

const loadBasicData = (data) => {
  // Set cookie to avoid reload refresh
  document.cookie =
    "username=" + data.username + "; max-age=" + 60 * 60 * 24 * 20 + ";";
  document.cookie =
    "password=" + data.password + "; max-age=" + 60 * 60 * 24 * 20 + ";";

  // Basic user data
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

  // Notification
  const not = document.querySelectorAll(".notification-item");
  const notLength = not.length - 1;
  const dataNotification = data.notification;

  for (let i = notLength; i > -1; i--) {
    not[i].textContent = dataNotification[i];
  }

  // Classes schedule
  const monday = document.getElementsByClassName("monday-item");
  const tuesday = document.getElementsByClassName("tuesday-item");
  const wednessday = document.getElementsByClassName("wednessday-item");
  const thursday = document.getElementsByClassName("thursday-item");
  const friday = document.getElementsByClassName("friday-item");
  // console.log(data.schedule.monday[0].split(";"));

  const distribute = (day, dayString) => {
    for (var i = 0; i < data.schedule.monday.length; i++) {
      const split = data.schedule[dayString][i].split("@");
      day[i].innerHTML = split[0] + " <i class='far fa-clock'></i> " + split[1];
    }
  };
  distribute(monday, "monday");
  distribute(tuesday, "tuesday");
  distribute(wednessday, "wednessday");
  distribute(thursday, "thursday");
  distribute(friday, "friday");
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

// Login function /LoginForm
const loginFunction = (username, password) => {
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
          appForms.setAttribute("style", "display:none !important");
          mainBar.setAttribute("class", "col-12 col-md-8 mt-2");

          main.setAttribute("style", "display:flex;");
          headerContainer.setAttribute("style", "display:flex;");
          sideBar.setAttribute("style", "display:flex;");

          loadBasicData(data);
        }
      });
    }
  );
};

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // Data from the form
  const formUsername = loginUsername.value.toLowerCase().split(" ").join("");
  const formPassword = loginPassword.value.toLowerCase().split(" ").join("");

  console.log("From Form: " + formUsername, formPassword);
  loginFunction(formUsername, formPassword);
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
const teacherSave = document.querySelector(".saveBtn");
const teacherForm = document.querySelector("#profile-form");

// Enable disable inputs
document.querySelector(".editBtn").addEventListener("click", (e) => {
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
        loadBasicData(data.newInfo);
      } else {
        console.log("Failed");
      }
    });
  });
});

const showTableOptions = (manageBtn, btnContainer) => {
  document.getElementById(manageBtn).classList.add("hidden");
  document.getElementById(btnContainer).classList.remove("hidden");
};

const showAdd = (btnContainer, formContainer, addForm, allBtn, deleteForm) => {
  document.getElementById(btnContainer).classList.add("hidden");
  document.getElementById(formContainer).classList.remove("hidden");
  document.getElementById(addForm).classList.remove("hidden");
  document.getElementById(deleteForm).classList.add("hidden");
  document.getElementById(allBtn).classList.add("hidden");
};

const showDelete = (
  btnContainer,
  formContainer,
  deleteForm,
  allBtn,
  addForm
) => {
  document.getElementById(btnContainer).classList.add("hidden");
  document.getElementById(formContainer).classList.remove("hidden");
  document.getElementById(addForm).classList.add("hidden");
  document.getElementById(deleteForm).classList.remove("hidden");
  document.getElementById(allBtn).classList.add("hidden");
};

const cancelT = (tableName) => {
  if (tableName === "student") {
    document.getElementById("studentFormContainer").classList.add("hidden");
    document.getElementById("studentBtnContainer").classList.add("hidden");
    document.getElementById("allStudentButtons").classList.remove("hidden");
    document.getElementById("studentManageBtn").classList.remove("hidden");
  }

  if (tableName === "sch") {
    document.getElementById("schFormContainer").classList.add("hidden");
    document.getElementById("schBtnContainer").classList.add("hidden");
    document.getElementById("allSchButtons").classList.remove("hidden");
    document.getElementById("scheduleManageBtn").classList.remove("hidden");
  }
};
