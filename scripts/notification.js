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
              notification.textContent = `Inspection ID: ${item.id}, Completion Date: ${item.inspectionCompletionDate}`;
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
