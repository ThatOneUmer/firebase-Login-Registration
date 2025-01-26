import {
  getAuth,
  getDoc,
  signOut,
  deleteUser,
  onAuthStateChanged,
  app,
  getFirestore,
  deleteDoc,
  doc,
} from "../firebase.js";
const auth = getAuth(app);
const db = getFirestore(app);
let userID = [];
let isFirestoreCompleted = true;

let checkUser = async () => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        userID.push(uid);
        let Fname = document.getElementById("userFname");
        let fullName = document.getElementById("ufname");
        let userMail = document.getElementById("uename");
        let userCity = document.getElementById("ucname");
        let userGender = document.getElementById("ugname");

        let dataCatcher = async () => {
          const querySnapshot = await getDoc(doc(db, "users", uid));
          const user = querySnapshot.data();

          Fname.innerText = user.fname;
          fullName.innerText = user.name;
          userMail.innerText = user.email;
          userCity.innerText = user.city;
          userGender.innerText = user.gender;
        };
        dataCatcher();
        // ...
      } else {
        // User is signed out
        console.log("signed out");
        if (isFirestoreCompleted) {
          console.log(user);
          window.location.replace("../login/login.html");
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};
checkUser();

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

let btn2 = document.querySelector("#deleteAcc");
let delAcc = async (userid) => {
  isFirestoreCompleted = false;
  let user = auth.currentUser;
  await deleteUser(user).then(async () => {
    await deleteDoc(doc(db, "users", userID[0]));
    window.location.replace("../login/login.html");
  });
};
btn2.addEventListener("click", delAcc);
