import { getAuth, signOut, onAuthStateChanged, app, getFirestore } from "../firebase.js";
const auth = getAuth(app);
const db = getFirestore(app);

let checkUser = async () => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        console.log(user);
        // ...
      } else {
        // User is signed out
        console.log("signed out");
        window.location.replace("../login/login.html");
      }
    });
  } catch (error) {
    console.error(error);
  }
};
checkUser();

var Fname = document.getElementById("userFname");
var fullName = document.getElementById("ufname");
var userMail = document.getElementById("uename");
var userCity = document.getElementById("ucname");
var userGender = document.getElementById("ugname");

// Fname.innerText = loginUsers.firstName;
// fullName.innerText = loginUsers.firstName + " " + loginUsers.lastName;
// userMail.innerText = loginUsers.useremail;
// userCity.innerText = loginUsers.usercity;
// userGender.innerText = loginUsers.usergender;

// function auTo() {
//   for (let i = 0; i < loginUsers.length; i++) {
//     Fname.innerText = loginUsers[i].firstName;
//     fullName.innerText = loginUsers[i].firstName + " " + loginUsers[i].lastName;
//     userMail.innerText = loginUsers[i].useremail;
//     userCity.innerText = loginUsers[i].usercity;
//     userGender.innerText = loginUsers[i].usergender;
//   }
// }
// auTo();

let btn = document.querySelector("#signOut");
let logout = async () => {
  await signOut(auth)
    .then(() => {
      console.log("logged out");
      window.location.replace("../login/login.html");
    })
    .catch((error) => {
      console.error(error.message);
    });
};
btn.addEventListener("click", logout);
