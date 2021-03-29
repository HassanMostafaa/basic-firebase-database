const form1 = document.querySelector("#form1");
const form2 = document.querySelector("#form2");
const id = document.querySelector("#id");
const username = document.querySelector("#name");
const age = document.querySelector("#age");
const email = document.querySelector("#email");
var wantedID = document.querySelector("#getID");
var database = firebase.database();
var userDetails = document.querySelector(".userDetails");

form1.addEventListener("submit", (e) => {
  e.preventDefault();
  database
    .ref("/Users Details")
    .child("/user ")
    .child("number" + id.value)
    .set({
      username: username.value,
      email: email.value,
      age: age.value,
      id: uuidv4(),
    });

  console.log("done");
});

form2.addEventListener("submit", (e) => {
  e.preventDefault();
  database
    .ref("/Users Details")
    .child("/user ")
    .child("number" + wantedID.value)
    .get()
    .then((snap) => {
      if (snap.exists()) {
        userDetails.innerHTML = `<span style="font-weight:600">Name : </span> ${
          snap.val().username
        } <br /> <span style="font-weight:600">E-mail : </span> ${
          snap.val().email
        } <br/> <span style="font-weight:600">Age : </span> ${snap.val().age}`;
      } else {
        userDetails.innerHTML = "No Available Data";
      }
    })
    .catch((error) => console.error(error));
});
