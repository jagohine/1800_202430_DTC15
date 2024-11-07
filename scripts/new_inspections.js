function createInspection() {
  console.log("inside form");
  let inputAddress = document.getElementById("inputAddress").value;
  let inputCity = document.getElementById("inputCity").value;
  let inputNumber = document.getElementById("inputNumber").value;

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

  let extraInformation = document.getElementById("extraInformation").value;

  console.log(
    inputAddress,
    inputCity,
    inputNumber,
    extraInformation,
    checkboxesStatus
  );

  var user = firebase.auth().currentUser;
  if (user) {
    var currentUser = db.collection("users").doc(user.uid);
    var userID = user.uid;

    db.collection("create_inspection").add({
      userID: userID,
      address: inputAddress,
      city: inputCity,
      contact: inputNumber,
      checkbox: checkboxesStatus,
      extraRequest: extraInformation,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  } else {
    console.log("No user is signed in");
  }
}
