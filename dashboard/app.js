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
  updateDoc,
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
          let reDirecting = () => {
            window.location.replace("../login/login.html");
          };
          setTimeout(reDirecting, 3000);
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
      let notiFy = document.getElementById("noti");
      let notiHeading = document.getElementById("noti-heading");
      notiHeading.innerText = "Sign-out Successfully";
      notiFy.style.display = "flex";
    })
    .catch((error) => {
      console.error(error.message);
    });
};
btn.addEventListener("click", logout);

let btn2 = document.querySelector("#deleteAcc");
let delAcc = async () => {
  isFirestoreCompleted = false;
  let user = auth.currentUser;
  await deleteUser(user).then(async () => {
    await deleteDoc(doc(db, "users", userID[0]));
    let notiFy = document.getElementById("noti");
    let notiHeading = document.getElementById("noti-heading");
    notiHeading.innerText = "Deleted Successfully";
    notiFy.style.display = "flex";
    let reDirecting = () => {
      window.location.replace("../login/login.html");
    };
    setTimeout(reDirecting, 3000);
  });
};
btn2.addEventListener("click", delAcc);

let btn3 = document.querySelector("#updateAcc");
let showData = () => {
  let topUp = document.getElementById("main-top");
  topUp.style.display = "flex";
};
btn3.addEventListener("click", showData);
let btn4 = document.querySelector("#cross");
let quitTop = () => {
  let topUp = document.getElementById("main-top");
  if (topUp.style.display = "flex") {
    topUp.style.display = "none";
  };
}
btn4.addEventListener("click", quitTop);

let btn5 = document.querySelector("#updatedData");
let updateData = async () => {
  let fname = document.getElementById("upd-fname");
  let lname = document.getElementById("upd-lname");
  let city = document.getElementById("upd-city");
  let gender = document.getElementsByName("gender");
  let usergenderChecker = () =>
    [...gender].find((gender) => gender.checked)?.value || null;

  let userCitychecker = () => (city.selectedIndex !== 0 ? city.value : null);

  try {
    await updateDoc(doc(db, "users", userID[0]), {
      fname: fname.value,
      lname: lname.value,
      name: `${fname.value} ${lname.value}`,
      city: userCitychecker(),
      gender: usergenderChecker(),
    });
    quitTop();
    let notiFy = document.getElementById("noti");
    let notiHeading = document.getElementById("noti-heading");
    notiHeading.innerText = "Updated Successfully"
    notiFy.style.display = "flex";
    checkUser();
    console.log("updated");
  } catch (error) {
    console.error(error);
  }
};
btn5.addEventListener("click", updateData);

let closeBtn = document.getElementById("closeBtn");
let closeTop = () => {
  let notiFy = document.getElementById("noti");
  notiFy.style.display = "none";
}
closeBtn.addEventListener('click', closeTop);
