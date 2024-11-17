firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        console.log("USER:", user); // User is signed in
        console.log("USER ID: ", user.userID)

        function createInspectionCardHTML(imagePath, address, detailsLink) {
            return `
                <div class="card shadow border-0 mb-4">
                <img src="${imagePath}" class="card-img-top card-image" alt="location of the ongoing item"
                    style="object-fit: cover" />
                <div class="card-body d-flex flex-row align-items-center justify-content-between p-3">
                <p class="card-title fw-semibold">${address}</p>
                <a href="${detailsLink}" class="btn btn-primary">Details</a>
                </div>
                </div>`;
        }

        function getOngoingInspectionPosts() {
            const userID = user.uid;
            const archivedInpectionsDiv = document.getElementById('archived_inspection_list');

            db.collection("inspections")
                .where('userID', "==", userID) 
                .get()
                .then((documents) => {
                    documents.forEach((doc) => {
                        const data = doc.data(); 
                        const address = data.address;
                        const completionDate = data.inspectionCompletionDate;
                        const archived_status = data.archived;

                        const temporaryDiv = document.createElement('div');
                        temporaryDiv.innerHTML = createInspectionCardHTML(
                            "/images/interior_inspection.png",
                            address,
                            "#"
                        );

                        if (completionDate && (archived_status)) {
                            archivedInpectionsDiv.appendChild(temporaryDiv);
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
    }
});
