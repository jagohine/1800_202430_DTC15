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
    });
 });

 // Function to enable user to write reviews:
 function writeReview() {
    console.log("inside write review");
    
 }