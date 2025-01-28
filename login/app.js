import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getFirestore,
  app,
} from "../firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);

let checkUser = async () => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        let reDirecting = () => {
          window.location.replace("../dashboard/dashboard.html");
        }
        setTimeout(reDirecting, 3000)
        console.log(user);
        // ...
      } else {
        // User is signed out
        console.log("signed out");
      }
    });
  } catch (error) {
    console.error(error);
  }
};

checkUser();

let userName = document.getElementById("username");
let passWord = document.getElementById("password");

let signInUser = async (e) => {
  e.preventDefault();
  await signInWithEmailAndPassword(auth, userName.value, passWord.value)
    .then((userCredential) => {
      // Signed in
      let notiFy = document.getElementById("noti");
      let notiHeading = document.getElementById("noti-heading");
      notiHeading.innerText = "Sign-In Successfully";
      notiFy.style.display = "flex";
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};
let formBox = document.getElementById("formBox");
formBox.addEventListener("submit", signInUser);

// var usersData = JSON.parse(localStorage.getItem("Users"));
// console.log(usersData);

// function searchinguserData(user) {
//   for (let i = 0; i < usersData.length; i++) {
//     if (
//       user.username === usersData[i].username &&
//       user.password === usersData[i].password
//     ) {
//       return usersData[i];
//     }
//   }
// }

// function submitData(e) {
//   e.preventDefault();
//   var userName = document.getElementById("username").value;
//   var passWord = document.getElementById("password").value;
//   var error = document.getElementsByClassName("error");

//   var loginUser = searchinguserData({ username: userName, password: passWord });

//   if (loginUser) {
//     console.log(loginUser);
//     localStorage.setItem("login", JSON.stringify(loginUser));
//     window.location.replace("../dashboard/dashboard.html");
//   } else {
//     error[0].style.display = "block";
//     error[0].innerText = "wrong credentials";
//     error[1].style.display = "block";
//     error[1].innerText = "wrong credentials";
//   }
// }
