// Function to populate the correct address to the review form
var inspectionDocID = localStorage.getItem("inspectionDocID");

function getInspectorAdress(id) {
    db.collection("inspections")
        .doc(id)
        .get()
        .then((thisInspection) => {
            var inspectionAddress = thisInspection.data().adress;
            document.getElementById("inspectorAddress").innerHTML = inspectionAddress
        });
}
getInspectorAdress(id)


// Function for star reviews
 const stars = document.querySelectorAll('.star');

 stars.forEach((star, index) => {
    star.addEventListener('click', () => {
        for (let i = 0; i <= index; i++) {
            document.getElementById(`star${i + 1}`).textContent = 'star';
        }
        // remove star if user reduce rating
        for (let i = index + 1; i < 5; i++) {
            document.getElementById(`star${i + 1}`).textContent = 'star_outline';
        }
    });
 });

 
 // Function to enable user to write reviews:
 function writeReview() {
    console.log("inside write review");
    const stars = document.querySelectorAll('.star');
    let Rating = 0;
    stars.forEach((star) => {
        if (star.textContent === 'star') {
            Rating ++;
        }
    });

    let timeLiness = document.querySelector('input[name="timeliness"]:checked').value;
    let accuRacy = document.querySelector('input[name="accuracy"]:checked').value;
    let friendLiness = document.querySelector('input[name="friendliness"]:checked').value;

    var user = firebase.auth().currentUser;
    if (user) {
        var currentUser = db.collection("users").doc(user.uid);
        var userID = user.uid;
        db.collection("reviews").add({
            rating: Rating,
            timeliness: timeLiness,
            accuracy: accuRacy,
            friendliness: friendLiness,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            window.location.href = "thanks.html";
        });
    } else {
        console.log("No user is signed in");
        window.location.href = 'review.html';
    }
 }