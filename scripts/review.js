// Function to populate the correct address to the review form
var inspectionPostID = localStorage.getItem("inspectionPostID");

// Function for star reviews
const stars = document.querySelectorAll('.star');
stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        for (let i = 0; i <= index; i++) {
            document.getElementById(`star${i + 1}`).textContent = 'star';
        }
        // remove star if user reduces rating
        for (let i = index + 1; i < 5; i++) {
            document.getElementById(`star${i + 1}`).textContent = 'star_outline';
        }
    });
});

function getInspectonAddress(id) {
    db.collection("inspections")
        .doc(id)
        .get()
        .then((thisInspection) => {
            var inspectionAddress = thisInspection.data().address;
            document.getElementById("inspectonAddress").innerHTML = inspectionAddress
        });
}
getInspectonAddress(id)

// Function to enable user to write reviews and add to "reviews" collection in Firestore:
function writeReview() {
    console.log("inside write review");
    const stars = document.querySelectorAll('.star');
    let Rating = 0;
    stars.forEach((star) => {
        if (star.textContent === 'star') {
            Rating++;
        }
    });

    let timeLiness = document.querySelector('input[name="timeliness"]:checked').value;
    let accuRacy = document.querySelector('input[name="accuracy"]:checked').value;
    let friendLiness = document.querySelector('input[name="friendliness"]:checked').value;
    let additionalFeedback = document.getElementById("feedback").value;

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        db.collection("reviews").add({
            inspectionPostID: inspectionPostID,
            userID: userID,
            rating: Rating,
            timeliness: timeLiness,
            accuracy: accuRacy,
            friendliness: friendLiness,
            feedback: additionalFeedback,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then((reviewReference) => {
            // set update the inspection post to store a reference to the review
            console.log("inspectionPostID: ", inspectionPostID);
            var inspectionPost = db.collection("inspections").doc(inspectionPostID);
            inspectionPost.update({ review: reviewReference });
            // go to the thank you page
            window.location.href = "thanks.html";
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'review.html';
    }
}