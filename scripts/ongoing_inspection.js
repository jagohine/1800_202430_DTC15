function OngoingInspection() {
  // let params = new URL(window.location.href);
  // will be replaced by url
  let ID = "Fds6lqokYvjqxCiItQws";
  console.log(ID);

  db.collection("inspections")
    .doc(ID)
    .get()
    .then((doc) => {
      // read all data
      thisPost = doc.data();
      inputAddress = doc.data().address;
      inputCity = doc.data().city;
      inputProvince = doc.data().province;
      inputNumber = doc.data().contact;
      inputLink = doc.data().link;
      checkbox = doc.data().checkbox;
      extraRequest = doc.data().extraRequest;
      // call the populating function
      populateOngoingInspection();
    })
    .catch((error) => {
      console.error("Error fetching:", error);
    });
}

function populateOngoingInspection() {
  //   console.log("populateOngoingInspection working!");
  document.getElementById("inputAddress").value = inputAddress;
  document.getElementById("inputCity").value = inputCity;
  document.getElementById("inputNumber").value = inputNumber;
  document.getElementById("inputProvince").value = inputProvince;

  // inputLink is not a required input
  if (inputLink) {
    document.getElementById("inputLink").value = inputLink;
  } else {
    document.getElementById("inputLink").value = "N/A";
  }

  // populate the checkbox array
  document.getElementById("extraRequest").value = extraRequest;
  Object.keys(checkbox).forEach((key) => {
    let checkboxElement = document.getElementById(key);
    if (checkbox[key] === "checked") {
      checkboxElement.checked = checkbox[key] === "checked";
    } else {
      console.log(`Checkbox with ID "${key}" not checked`);
    }
  });
}

OngoingInspection();
