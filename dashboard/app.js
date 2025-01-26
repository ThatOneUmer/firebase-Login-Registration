import {
  getAuth,
  getDoc,
  signOut,
  onAuthStateChanged,
  app,
  getFirestore,
  doc,
} from "../firebase.js";
const auth = getAuth(app);
const db = getFirestore(app);

let checkUser = async () => {
  try {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
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
        window.location.replace("../login/login.html");
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
