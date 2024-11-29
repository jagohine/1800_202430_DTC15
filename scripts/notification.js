firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    console.log("USER:", user); // User is signed in
    console.log("USER ID: ", user.uid);

    function getUnNotifiedPosts() {
      const userID = user.uid;
      const unNotifiedPosts = document.getElementById("notificationList");
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
          console.log("Filtered Results:", filteredResults);

          if (filteredResults.length > 0) {
            unNotifiedPosts.innerHTML = "";

            filteredResults.forEach((item) => {
              const notification = document.createElement("p");
              notification.innerHTML = `<div class="alert alert-primary p-2 m-2" role="alert">
                  Inspection ID: ${item.id}  on ${item.address} has been finished. 
                  click <a id="${item.id}" href="http://127.0.0.1:5500/inspection_details.html?inspectionPostID=${item.id}">here</a> to the post
              </div>`;
              unNotifiedPosts.appendChild(notification);
            });
          } else {
            notificationList.textContent = "No notifications available.";
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
