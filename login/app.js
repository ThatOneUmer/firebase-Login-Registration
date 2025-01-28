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

let signInUser = async (form) => {
  form.preventDefault();
  await signInWithEmailAndPassword(auth, userName.value, passWord.value)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      let notiFy = document.getElementById("noti");
      let notiHeading = document.getElementById("noti-heading");
      notiHeading.innerText = "Sign-ip Successfully";
      notiFy.style.display = "flex";
      let reDirecting = () => {
        window.location.replace("./dashboard/dashboard.html");
      };
      setTimeout(reDirecting, 3000);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("error aagaya ", errorMessage);
      let notiFy = document.getElementById("noti");
      let notiHeading = document.getElementById("noti-heading");
      notiHeading.innerText = "Wrong Credentials!!";
      notiFy.style.display = "flex";
    });
};
let formBox = document.getElementById("formBox");
formBox.addEventListener("submit", signInUser);

let closeBtn = document.getElementById("closeBtn");
let closeTop = () => {
  let notiFy = document.getElementById("noti");
  notiFy.style.display = "none";
};
closeBtn.addEventListener("click", closeTop);
