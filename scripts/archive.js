function setCookie(name, value, sameSite = "Lax") {
  const date = new Date();
  date.setTime(date.getTime() + 60 * 1000); // set the expiry date to a minute from now
  const expires = `expires=${date.toUTCString()}`;
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Lax`;
  console.log(
    `Setting cookie: ${name}=${value}; ${expires}; path=/; SameSite=${sameSite}`
  );
}

function goToInspection(inspectionPostIDTag) {
  // set a cookie encoding the inspection post id and then
  // go to the corresponding inspection post details page

  // strip off the non-id characters
  const inspectionPostID = inspectionPostIDTag.slice(17);

  // set a cookie (expires in a minute)
  setCookie("inspectionPostID", inspectionPostID);
  // go to the inspection details page
  window.location.href = "inspection_details.html";
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("USER:", user); // User is signed in
    console.log("USER ID: ", user.uid);

    function createInspectionCardHTML(imagePath, address, inspectionPostID) {
      return `
                <div class="card shadow border-0 mb-4">
                <img src="${imagePath}" class="card-img-top card-image" alt="location of the ongoing item"
                    style="object-fit: cover" />
                <div class="card-body d-flex flex-row align-items-center justify-content-between p-3">
                <p class="card-title fw-semibold">${address}</p>
                <a id="${inspectionPostID}" href="#" class="btn btn-primary">Details</a>
                </div>
                </div>`;
    }

    function getArchivedInspectionPosts() {
      const userID = user.uid;
      const archivedInpectionsDiv = document.getElementById(
        "archived_inspection_list"
      );

      db.collection("inspections")
        .where("userID", "==", userID) // Query inspections for the logged-in user
        .get()
        .then((documents) => {
          documents.forEach((doc) => {
            const data = doc.data(); // Get document data
            const address = data.address;
            const completionDate = data.inspectionCompletionDate;
            const archived_status = data.archived;
            const inspectionPostID = `inspectionPostID_${doc.id}`;

            const temporaryDiv = document.createElement("div");
            temporaryDiv.innerHTML = createInspectionCardHTML(
              "/images/interior_inspection.png",
              address,
              inspectionPostID
            );

            // set up the event listener for the details button
            const detailsButton = temporaryDiv.querySelector(
              `#${inspectionPostID}`
            );
            detailsButton.addEventListener("click", (event) => {
              event.preventDefault();
              goToInspection(inspectionPostID);
            });

            if (completionDate && archived_status) {
              archivedInpectionsDiv.appendChild(temporaryDiv);
            }
          });
        })
        .catch((error) => {
          console.log("Error fetching inspections:", error);
        });
    }

    getArchivedInspectionPosts();
  } else {
    console.log("No user is signed in");
    // Redirect to login or handle unauthenticated state here
  }
});
