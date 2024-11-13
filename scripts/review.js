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