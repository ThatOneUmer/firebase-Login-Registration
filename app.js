import {
  getFirestore,
  collection,
  addDoc,
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  doc,
  setDoc,
  app,
} from "./firebase.js";

const auth = getAuth(app);
const db = getFirestore(app);
let isFirestoreCompleted = true;
let userPassword = document.getElementById("password");
let userEmail = document.getElementById("email");
let emError = document.getElementsByClassName("emailError")[0];
let heaDing = document.getElementById("heading");
let errorr = document.getElementsByClassName("er-2")[0];
let userFirstname = document.getElementById("Fname");
let userLastname = document.getElementById("Lname");
let userName = document.getElementById("username");
let userGender = document.getElementsByName("gender");
let userCity = document.getElementById("userCity");
let usergenderChecker = () =>
  [...userGender].find((gender) => gender.checked)?.value || null;

let userCitychecker = () =>
  userCity.selectedIndex !== 0 ? userCity.value : null;

let signUpUser = async (e) => {
  e.preventDefault();
  try {
    isFirestoreCompleted = false;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail.value,
      userPassword.value
    ).then(async (userCredential) => {
      const user = userCredential.user;
      console.log(user);
      let ref = await doc(db, "users", user.uid);
      const docRef = await setDoc(ref, {
        email: userEmail.value,
        city: userCitychecker(),
        name: `${userFirstname.value} ${userLastname.value}`,
        fname: userFirstname.value,
        gender: usergenderChecker(),
        username: userName.value,
        userId: user.uid,
      });
      window.location.replace("./dashboard/dashboard.html");
    });
  } catch (error) {
    console.error("Error during sign-up:", error);
  }
};
document.getElementById("form-box").addEventListener("submit", signUpUser);

let checkUser = async () => {
  try {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (isFirestoreCompleted) {
          console.log(user);
          window.location.replace("./dashboard/dashboard.html");
        }
      } else {
        console.log("signed out");
      }
    });
  } catch (error) {
    console.error("Error monitoring auth state:", error);
  }
};
checkUser();

// function getUserData() {
//   return JSON.parse(localStorage.getItem("Users"));
// }

// function setUsersData(udata) {
//   localStorage.setItem("Users", JSON.stringify(udata));
// }

// function setLoginData(ldata) {
//   localStorage.setItem("login", JSON.stringify(ldata));
// }

// var userRegData = getUserData() ? [...getUserData()] : [];
// var loginUsers = getUserData() ? [] : [];

// Validations start
// function unValid(uname) {
//   if (uname.target.value.length < 5) {
//     uname.target.nextElementSibling.innerText = "atleast 5 char required";
//     uname.target.nextElementSibling.style.display = "block";
//     return;
//   }

//   uname.target.nextElementSibling.style.display = "none";
// }

// function upValid(upw) {
//   if (upw.target.value.length < 8) {
//     upw.target.nextElementSibling.innerText = "Atleast 8 char required";
//     upw.target.nextElementSibling.style.display = "block";
//     return;
//   }

//   upw.target.nextElementSibling.style.display = "none";
// }

// function ueValid(mail) {
//   if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail.target.value)) {
//     mail.target.nextElementSibling.style.display = "none";
//     return;
//   } else {
//     mail.target.nextElementSibling.style.display = "block";
//     mail.target.nextElementSibling.innerText = "Invalid Email Address";
//   }
// }
// Validations End

// function submitData(e) {
//   e.preventDefault();
//   for (let i = 0; i < userRegData.length; i++) {
//     if (userEmail.value === userRegData[i].useremail) {
//       emError.style.display = "block";
//       emError.innerText = "Email already exist";
//       return;
//     }
//   }
//   if (userCity.selectedIndex === 0) {
//     errorr.style.display = "block";
//     errorr.innerText = "Please select your city";
//     return;
//   }
//   emError.style.display = "none";

//   userRegData = [
//     ...userRegData,
//     {
//       firstName: userFirstname.value,
//       lastName: userLastname.value,
//       username: userName.value,
//       useremail: userEmail.value,
//       password: userPassword.value,
//       usergender: usergenderChecker(),
//       usercity: userCitychecker(),
//     },
//   ];

//   loginUsers = [
//     {
//       firstName: userFirstname.value,
//       lastName: userLastname.value,
//       username: userName.value,
//       useremail: userEmail.value,
//       password: userPassword.value,
//       usergender: usergenderChecker(),
//       usercity: userCitychecker(),
//     },
//   ];
//   setUsersData(userRegData);
//   setLoginData(loginUsers);
//   window.location.replace("./dashboard/dashboard.html");
// }
