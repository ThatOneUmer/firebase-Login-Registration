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
      let notiFy = document.getElementById("noti");
      let notiHeading = document.getElementById("noti-heading");
      notiHeading.innerText = "Sign-up Successfully";
      notiFy.style.display = "flex";
      let ref = await doc(db, "users", user.uid);
      const docRef = await setDoc(ref, {
        email: userEmail.value,
        city: userCitychecker(),
        name: `${userFirstname.value} ${userLastname.value}`,
        fname: userFirstname.value,
        lname: userLastname.value,
        gender: usergenderChecker(),
        username: userName.value,
        userId: user.uid,
      });
      let reDirecting = () => {
        window.location.replace("./dashboard/dashboard.html");
      };
      setTimeout(reDirecting, 3000);
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

let closeBtn = document.getElementById("closeBtn");
let closeTop = () => {
  let notiFy = document.getElementById("noti");
  notiFy.style.display = "none";
};
closeBtn.addEventListener("click", closeTop);

