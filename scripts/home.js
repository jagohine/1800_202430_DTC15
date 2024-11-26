function setCookie(name, value, sameSite = "Lax") {
  const date = new Date();
  date.setTime(date.getTime() +  24 * 60 * 60 * 1000); // set the expiry date to a day from now
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
  window.location.href = "inspection_details.html?inspectionPostID=" + inspectionPostID; // Add inspection docID to URL
}

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("USER:", user); // User is signed in
    console.log("USER ID: ", user.uid);

    function createInspectionCardHTML(address, inspectionPostID) {
      // Create an array of images
      const images = [
        "images/example_images/apartment1.jpg",
        "images/example_images/apartment2.webp",
        "images/example_images/apartment3.jpeg",
        "images/example_images/apartment4.jpeg",
        "images/example_images/apartment5.jpg",
        "images/example_images/apartment6.jpg",
        "images/example_images/apartment7.jpg",
        "images/example_images/apartment8.jpg",
        "images/example_images/apartment9.jpg",
        "images/example_images/apartment10.jpg",
        "/images/interior_inspection.png"
      ];

      // Assign a random image to the img card in html
      const randomImage = images[Math.floor(Math.random() * images.length)];

      return `
                <div class="card shadow border-0 mb-4">
                <img src="${randomImage}" class="card-img-top card-image" alt="location of the ongoing item"
                    style="object-fit: cover" />
                <div class="card-body d-flex flex-row align-items-center justify-content-between p-3">
                <p class="card-title fw-semibold">${address}</p>
                <a id="${inspectionPostID}" href="#" class="btn btn-primary">Details</a>
                </div>
                </div>`;
    }

    function getOngoingInspectionPosts() {
      const userID = user.uid;
      const ongoingInpectionsDiv = document.getElementById(
        "ongoing_inspections"
      );
      const pastInpectionsDiv = document.getElementById("past_inspections");

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

            if (completionDate && !archived_status) {
              pastInpectionsDiv.appendChild(temporaryDiv);
            }
            if (!completionDate) {
              ongoingInpectionsDiv.appendChild(temporaryDiv);
            }
          });
        })
        .catch((error) => {
          console.log("Error fetching inspections:", error);
        });
    }

    getOngoingInspectionPosts();
  } else {
    console.log("No user is signed in");
    // Redirect to login or handle unauthenticated state here
  }
});
