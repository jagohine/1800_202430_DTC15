async function getInspectionPost(inspectionPostId, collection) {
  try {
    console.log("Attempting to get document:", inspectionPostId);
    const docRef = db.collection(collection).doc(inspectionPostId);
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      console.log("Inspection post data:", docSnap.data());

      // get archive status and change archive button color
      return docSnap.data();
    } else {
      console.log("No such document exists!");
      return null;
    }
  } catch (e) {
    console.error("Error getting inspection post: ", e);
  }
}

function fieldToLabel(field) {
  switch (field) {
    case "washerDryer":
      return "Washer/Dryer";
      break;
    case "roommates":
      return "Roommates";
      break;
    case "petFriendly":
      return "Pet Friendly";
      break;
    case "publicTransit":
      return "Public Transit";
      break;
    case "parking":
      return "Parking";
      break;
    case "neighbourhoodSafety":
      return "Neighbourhood Safety";
      break;
    case "livingRoom":
      return "Living Room";
      break;
    case "kitchen":
      return "Kitchen";
      break;
    case "bedroom":
      return "Bedroom";
      break;
    case "bathroom":
      return "Bathroom";
      break;
    case "internet_connection":
      return "Internet Connection";
      break;
    case "acHeater":
      return "AC/Heater";
      break;
    case "extraRequest":
      return "Extra Requirement";
      break;
    default:
      return "ERROR: Field not found";
  }
}

function addInspectionDetailToPage(detail, detail_content) {
  const contentContainer = document.createElement("div");
  contentContainer.className = "mb-3";

  const headingLabel = document.createElement("label");
  headingLabel.className = "form-label fw-bold";
  headingLabel.textContent = detail;

  const contentBox = document.createElement("div");
  contentBox.className = "border rounded p-2";
  contentBox.textContent = detail_content;

  contentContainer.appendChild(headingLabel);
  contentContainer.appendChild(contentBox);

  document.getElementById("dynamic-content").appendChild(contentContainer);
}

function getCookie(name) {
  const cookies = document.cookie.split("; ");
  for (let cookie of cookies) {
    const [key, value] = cookie.split("=");
    if (key === name) return value;
  }
  return null;
}

// Test it out
async function test() {
  const inspectionPostID = getCookie("inspectionPostID");
  console.log("inspectionPostID: ", inspectionPostID);

  const collection = "inspections";

  // Read inspection post info
  post = await getInspectionPost(inspectionPostID, collection);

  console.log(post);

  // Add inspection details to page, one by one
  Object.entries(post.checkbox).forEach(([key, value]) => {
    // console.log(`Adding content| ${key}: ${value}`);
    if (value != "unchecked") {
      addInspectionDetailToPage(
        fieldToLabel(key),
        "Waiting to be inspected..."
      );
    }
  });
  if (post.extraRequest) {
    addInspectionDetailToPage(fieldToLabel("extraRequest"), post.extraRequest);
    console.log(post.extraRequest);
  }

  inspectionCreationDate = document.getElementById("inspectionCreationDate");
  inspectionCompletionDateDiv = document.getElementById(
    "inspectionCompletionDateDiv"
  );
  inspectionAddress = document.getElementById("inspectionAddress");
  inspectorName = document.getElementById("inspectorName");
  inspectionCreationDate.textContent = post.inspectionCreationDate.toDate();

  if (inspectionCompletionDateDiv && post.inspectionCompletionDate) {
    function produceInspectionCompletionDateHTML(date) {
      return `<label class="form-label fw-bold">Inspection Completion Date</label><div
    class="border rounded p-2" id="inspectionCompletionDate">${date}</div>`;
    }
    inspectionCompletionDateDiv.innerHTML = produceInspectionCompletionDateHTML(
      post.inspectionCompletionDate.toDate()
    );
  }
  if (post.address) {
    inspectionAddress.textContent = post.address;
  }
  if (post.inspector) {
    inspectorRef = await post.inspector.get();
    inspectorData = inspectorRef.data();
    if (inspectorData) {
      if (post.inspector) {
        if (post.inspector.name) {
          inspectorName.textContent = post.inspector.name;
          console.log("INSPECTOR NAME: ", inspectorData.name);
        }
      }
    }
  }

  // only display review and archive buttons where it makes sense

  // set up the buttons we'll need
  // log some stuff for debugging

  const reviewButton = document.createElement("button");
  reviewButton.textContent = "Leave a Review";
  reviewButton.className = "btn btn-primary bottom-0 end-0 m-3";
  reviewButton.onclick = saveInspectionDocIDAndRedirect;

  const archiveIcon = document.createElement("i");
  archiveIcon.textContent = "archive";
  archiveIcon.id = "archiveIcon";
  archiveIcon.className = "material-icons archiveIcon align-self-center ml-4";
  archiveIcon.onclick = saveArchive;

  // Append buttons if it makes sense
  if (post.inspectionCompletionDate) {
    console.log(
      "Inspection date's here!: ",
      post.inspectionCompletionDate.toDate()
    );
    archiveAndReviewDiv.appendChild(archiveIcon);
    if (post.archived) {
      archiveIcon.classList.add("colorChanged");
    } else {
      archiveIcon.classList.remove("colorInit");
    }

    if (!post.review) {
      console.log("This hasn't been reviewed yet!");
      archiveAndReviewDiv.appendChild(reviewButton);
    } else {
      // log the review user ID for debugging purposes
      const reviewReference = post.review;
      reviewReference.get().then((reviewSnapshot) => {
        console.log(
          "This post has been reviewed. Review userID: ",
          reviewSnapshot.data().userID
        );
      });
    }
  }
}

test();

// Get inspectionDocID from URL and store in browser's local storage
function saveInspectionDocIDAndRedirect() {
  let params = new URL(window.location.href);
  let ID = params.searchParams.get("inspectionPostID");
  localStorage.setItem("inspectionPostID", ID);
  window.location.href = "review.html";
}

// update archive status and write to database
async function saveArchive() {
  try {
    // try to get the get the inspection post ID from a cookie
    const inspectionPostID = getCookie("inspectionPostID");
    console.log("Inspection Post ID:", inspectionPostID);
    // get the post reference from the inspection post ID
    const docRef = db.collection("inspections").doc(inspectionPostID);
    // get the document from firestore
    const inspectionDoc = await docRef.get();
    // check to see the document actually exists
    if (!inspectionDoc.exists) {
      console.error("Error: the requested post does not exist");
      return;
    }
    // get the data from the document
    const currentData = inspectionDoc.data();
    // has this inspection been archived?
    const archiveStatus = currentData.archived || false; // default value is false
    console.log("Current archive status:", archiveStatus);
    // flip the archive status
    const newArchiveStatus = !archiveStatus;
    // update the document with the new archive status
    await docRef.update({ archived: newArchiveStatus });
    console.log("Archive status updated to:", newArchiveStatus);
    if (newArchiveStatus) {
      alert("Successfully archived!");
    } else {
      alert("Archive removed!");
    }
    // double check that we updated correctly, for logging/debugging
    const updatedDocSnap = await docRef.get();
    const updatedData = updatedDocSnap.data();
    console.log("Verified updated archive status:", updatedData.archived);
    // set the archiveIcon accordingly
    const archiveIcon = document.getElementById("archiveIcon");
    if (newArchiveStatus) {
      window.location.href = "archive.html";
    } else {
      window.location.href = "home.html";
    }
  } catch (error) {
    console.error("Error updating archive status:", error);
  }
}

// Read reviews data from Firebase and populate them to the correct inspection
function populateReviews() {
  console.log("test");
  let inspectionCardTemplate = document.getElementById("reviewCardTemplate");
  let inspectionCardGroup = document.getElementById("reviewCardGroup");

  let params = new URL(window.location.href);
  let inspectionID = params.searchParams.get("inspectionPostID");
  console.log("Inspection ID from URL:", inspectionID);

  if (!inspectionID) {
    console.error("No inspection ID found in URL.");
    return;
  }

  db.collection("reviews")
    .where("inspectionPostID", "==", inspectionID)
    .get()
    .then((allReviews) => {
      if (allReviews.empty) {
        console.warn("No reviews found for inspectionPostID:", inspectionID);
        return;
      }

      reviews = allReviews.docs;
      console.log(reviews);

      reviews.forEach((doc) => {
        var timeliness = doc.data().timeliness;
        var accuracy = doc.data().accuracy;
        var friendliness = doc.data().friendliness;
        var feedback =
          doc.data().feedback || "No additional feedback provided.";
        var time = doc.data().timestamp.toDate();
        var rating = doc.data().rating;

        console.log(rating);
        console.log(time);

        let reviewCard = inspectionCardTemplate.content.cloneNode(true);

        reviewCard.querySelector(
          ".overall"
        ).innerHTML = `<b>Overall rating:</b>`;
        reviewCard.querySelector(
          ".timeliness"
        ).innerHTML = `<b>Inspector's timeliness:</b> ${timeliness}`;
        reviewCard.querySelector(
          ".accuracy"
        ).innerHTML = `<b>Inspector's info accuracy:</b> ${accuracy}`;
        reviewCard.querySelector(
          ".friendliness"
        ).innerHTML = `<b>Inspector's timeliness:</b> ${friendliness}`;
        reviewCard.querySelector(
          ".feedback"
        ).innerHTML = `<b>Additional feedback:</b> ${feedback}`;

        let starRating = "";
        for (let i = 0; i < rating; i++) {
          starRating += '<span class="material-icons">star</span>';
        }
        for (let i = rating; i < 5; i++) {
          starRating += '<span class="material-icons">star_outline</span>';
        }
        reviewCard.querySelector(".star-rating").innerHTML = starRating;
        inspectionCardGroup.appendChild(reviewCard);
      });
    })
    .catch((error) => {
      console.error("Error fetching reviews:", error);
    });
}
populateReviews();
