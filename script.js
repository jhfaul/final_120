var grades = [
  {
    text: "Bobby",
    importance: "A",

  },
  {
    text: "Sally",
    importance: "C",
  
  },
  {
    text: "Jenny",
    importance: "C",
 
  },
  {
    text: "Susie",
    importance: "A",
 
  },
  {
    text: "Timmy",
    importance: "D",
  
  },
  {
    text: "Phillip",
    importance: "B",
 
  }
];
var loggedIn = false;

function app() {
  if (loggedIn == true) {
    var pages = ["Home", "Add Grades", "Display Grades"];

    nav(pages);
  } else {
    intEle();
    renPage("login");
  }
}

function intEle() {
  var nav = document.createElement("nav");
  nav.classList.add("nav");
  var wrapper = document.createElement("div");
  wrapper.classList.add("wrapper");
  document.body.appendChild(nav);
  document.body.appendChild(wrapper);
}

function nav(list) {
  for (var i = 0; i < list.length; i++) {
    const button = document.createElement("button");
    const val = list[i];
    button.innerHTML = list[i];
    button.addEventListener("click", function () {
      renPage(val);
    });
    document.body.querySelector(".nav").appendChild(button);
  }
}

function renPage(page) {
  if (page === "login") {
    login();
  } else if (page === "Home") {
    home();
  } else if (page === "Add Grades") {
    addGrades();
  } else if (page === "Display Grades") {
    displayGrades();
  }
}

function login() {
  var wrapper = document.querySelector(".wrapper");

  var username = document.createElement("input");
  username.id = "inputUser";
  username.placeholder = "Username";

  var password = document.createElement("input");
  password.setAttribute("type", "password");
  password.id = "inputPass";
  password.placeholder = "Password";

  var submitButton = document.createElement("button");
  submitButton.innerHTML = "Login";
  submitButton.className = "button";

  var loginInsight = document.createElement("h3");

  loginInsight.id = "loginInsight";

  wrapper.innerHTML = "";
  wrapper.appendChild(loginInsight);
  wrapper.appendChild(username);
  wrapper.appendChild(password);
  wrapper.appendChild(submitButton);

  document.body.querySelector(".button").addEventListener("click", function () {
    if (usernameValid(inputUser) && passwordValid(inputPass)) {
      loggedIn = true;
      app();

      home();
    } else {
      if (!usernameValid(inputUser) && passwordValid(inputPass)) {
        window.alert("Username is incorrect, please try again. ");
      } else if (usernameValid(inputUser) && !passwordValid(inputPass)) {
        window.alert("Password is incorrect, please try again. ");
      } else {
        window.alert("Neither the Username or Password are correct. ");
      }
    }
  });

  function usernameValid(ele) {
    if (ele.value == "teacherCool101") {
      return true;
    } else {
      return false;
    }
  }

  function passwordValid(ele) {
    if (ele.value == "StupidPassword345") {
      return true;
    } else {
      return false;
    }
  }
}

function home() {
  var wrapper = document.querySelector(".wrapper");
  wrapper.innerHTML = "Student Gradebook";

  var button1 = document.createElement("h3");
  var button2 = document.createElement("h3");

  button1.addEventListener("click", function () {
    renPage("addGrades");
  });
  button2.addEventListener("click", function () {
    displayGrades();
  });
  document.body.querySelector(".wrapper").appendChild(button1);
  document.body.querySelector(".wrapper").appendChild(button2);
}

function addGrades() {
  var wrapper = document.querySelector(".wrapper");

  var text = document.createElement("textarea");
  text.id = "inputNote";
  text.placeholder = "Enter student name..";

  var importance = document.createElement("input");
  importance.setAttribute("type", "string");
  importance.setAttribute("value", "");
  importance.setAttribute("A", "F");

  importance.setAttribute("A", "F");
  importance.id = "inputImp";
  importance.placeholder = "Enter Grade";

  var noteInsight = document.createElement("h3");
  noteInsight.innerHTML = "Entering Grades for Student";
  noteInsight.id = "noteInsight";

  var submitButton = document.createElement("button");
  submitButton.innerHTML = "Submit";
  submitButton.className = "button";
  wrapper.innerHTML = "";
  wrapper.appendChild(noteInsight);
  wrapper.appendChild(text);
  wrapper.appendChild(importance);
  wrapper.appendChild(submitButton);

  document.body.querySelector(".button").addEventListener("click", function () {
    if (inputValid(inputNote) && numberValid(inputImp)) {
      submission();
      window.alert("Grade has been entered successfully. ");
      addGrades();
    } else {
      if (!inputValid(inputNote) && numberValid(inputImp)) {
        window.alert("Enter a name");
      } else if (inputValid(inputNote) && !numberValid(inputImp)) {
        window.alert("Enter a letter grade");
      } else {
        window.alert("Check the name is correct and the grade box is not empty.");
      }
    }
  });

  function submission() {
    var obj = {
      text: inputNote.value,
      importance: (inputImp.value)
    };

    grades.push(obj);
  }

  function inputValid(ele) {
    if (ele.value !== "") {
      return true;
    } else {
      return false;
    }
  }

  function numberValid(ele) {
    if (!isNaN(ele.value) && ele.value === 'A') {
      return true;
    } else {
      return false;
    }
  }
}

function displayGrades() {
  var wrapper = document.querySelector(".wrapper");

  var sortBy = [
    {
      prop: "importance",
      direction: -1
    },
    {
      prop: "text",
      direction: 1
    }
  ];

  grades.sort(function (a, b) {
    let i = 0,
      result = 0;
    while (i < sortBy.length && result === 0) {
      result =
        sortBy[i].direction *
        (a[sortBy[i].prop].toString() < b[sortBy[i].prop].toString()
          ? -1
          : a[sortBy[i].prop].toString() > b[sortBy[i].prop].toString()
          ? 1
          : 0);
      i++;
    }
    return result;
  });

  wrapper.innerHTML = "";

  for (var i = 0; i < grades.length; i++) {
    var ele = document.createElement("div");
    ele.classList.add("borderBottom");
    ele.innerHTML = grades[i].importance + "" + grades[i].text;
    wrapper.appendChild(ele);
  }
}

app();