firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // console.log("USER:", user); // User is signed in
    console.log("USER ID: ", user.uid);

    function getUnNotifiedPosts() {
      const userID = user.uid;
      const unNotifiedPosts = document.getElementById("notificationList");
      const finishNotificationPosts = document.getElementById(
        "pastNotificationList"
      );
      db.collection("inspections")
        .where("userID", "==", userID)
        .get()
        .then((queryResults) => {
          const filteredResults = queryResults.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter(
              (doc) =>
                doc.inspectionCompletionDate !== null &&
                doc.isNotified === false
            );
          const filteredFInishedResults = queryResults.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }))
            .filter(
              (doc) =>
                doc.inspectionCompletionDate !== null && doc.isNotified === true
            );
          // console.log(
          //   "Filtered Results:",
          //   filteredResults,
          //   filteredFInishedResults
          // );

          if (filteredResults.length > 0) {
            unNotifiedPosts.innerHTML = "";
            filteredResults.forEach((item) => {
              const notification = document.createElement("div");
              notification.innerHTML = `<div class="alert alert-primary p-2 m-2 w-100" role="alert">
                  Inspection on ${item.address} has been updated by our inspector. 
                  click <a id="${item.id}" href="http://127.0.0.1:5500/inspection_details.html?inspectionPostID=${item.id}">here</a> to see the response.
              </div>`;
              unNotifiedPosts.appendChild(notification);
            });
          } else {
            // console.log("No new notifications.");
            // notificationList.textContent = "No new notifications.";
          }
          if (filteredFInishedResults.length > 0) {
            finishNotificationPosts.innerHTML = "";
            filteredFInishedResults.forEach((item) => {
              const pastNotification = document.createElement("div");
              pastNotification.innerHTML = `<div class="alert alert-light p-2 m-2 w-100" role="alert">
                  Inspection on ${item.address} completed.
              </div>`;
              finishNotificationPosts.appendChild(pastNotification);
            });
          } else {
            // console.log("No past notifications available.");
          }
        })
        .catch((error) => {
          console.error("Error fetching documents: ", error);
        });
    }

    getUnNotifiedPosts();
  } else {
    console.log("No user is signed in");
    // Redirect to login or handle unauthenticated state here
  }
});
