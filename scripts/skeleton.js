//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------
function loadSkeleton() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // If the "user" variable is not null, then someone is logged in
      // User is signed in.
      // Do something for the user here.
      console.log(
        $("#topNavbarPlaceholder").load("./text/top_nav_after_login.html")
      );
      console.log(
        $("#addInspectionBarPlaceholder").load("./text/add_inspection_bar.html")
      );
      console.log($("#bottomNavbarPlaceholder").load("./text/bottom_nav.html"));
    } else {
      // No user is signed in.
      console.log(
        $("#topNavbarPlaceholder").load("./text/top_nav_before_login.html")
      );
      console.log($("#bottomNavbarPlaceholder").load("./text/bottom_nav.html"));
    }
  });
}
loadSkeleton(); //invoke the function

// highlight current location on bottom navbar
function displayNavbarHighlight() {
  let params = new URL(window.location.href);
  let pageNow = params.href;
  if (pageNow.includes("home")) {
    const iconNow = document.getElementById("homeBtn");
    if (iconNow) {
      iconNow.classList.add("filterIcon");
    }
  }
  if (pageNow.includes("notification")) {
    const iconNow = document.getElementById("notificationBtn");
    if (iconNow) {
      iconNow.classList.add("filterIcon");
    }
  }
}
// have to wait the navbar fully loaded
setTimeout(() => {
  displayNavbarHighlight();
}, 500);

// if user does not have any inspection post, render the guide and hide the list on home page
function newUserGuide() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      let params = new URL(window.location.href);
      let pageNow = params.href;
      if (pageNow.includes("home")) {
        db.collection("inspections")
          .where("userID", "==", user.uid)
          .get()
          .then((documents) => {
            if (documents.empty) {
              console.log($("#guideInfoPlaceholder").load("./text/guide.html"));
              let ongoingList = document.getElementById("ongoing_inspections");
              if (ongoingList) {
                ongoingList.classList.add("hideTitle");
              }
              let pastList = document.getElementById("past_inspections");
              if (pastList) {
                pastList.classList.add("hideTitle");
              }
            }
          })
          .catch((error) => {
            console.log("Error fetching inspections:", error);
          });
      }
    } else {
      console.log("No user is logged in.");
    }
  });
}

newUserGuide();
