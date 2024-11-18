function createInspection(event) {
  event.preventDefault();
  console.log("inside form");
  let inputAddress = document.getElementById("inputAddress").value;
  let inputCity = document.getElementById("inputCity").value;
  let inputProvince = document.getElementById("inputProvince").value;
  let inputNumber = document.getElementById("inputNumber").value;
  let inputLink = document.getElementById("inputLink").value;

  let checkboxes = document.querySelectorAll(".form-check-input");
  let checkboxesStatus = {};
  for (let i = 0; i < checkboxes.length; i++) {
    let checkbox = checkboxes[i];
    if (checkbox.checked) {
      checkboxesStatus[checkbox.id] = "checked";
    } else {
      checkboxesStatus[checkbox.id] = "unchecked";
    }
  }

  let extraRequest = document.getElementById("extraRequest").value;

  // console.log(
  //   inputAddress,
  //   inputCity,
  //   inputNumber,
  //   inputLink,
  //   extraRequest,
  //   checkboxesStatus,
  //   inputProvince
  // );

  var user = firebase.auth().currentUser;
  if (user) {
    var currentUser = db.collection("users").doc(user.uid);
    var userID = user.uid;

    db.collection("inspections")
      .add({
        userID: userID,
        address: inputAddress,
        city: inputCity,
        province: inputProvince,
        contact: inputNumber,
        link: inputLink,
        checkbox: checkboxesStatus,
        extraRequest: extraRequest,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        inspectionCreationDate: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then(() => {
        alert("Your request has been submitted!");
        window.location.href = "home.html";
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        alert("There was an error submitting your request. Please try again.");
      });
  } else {
    console.log("No user is signed in");
  }
}
