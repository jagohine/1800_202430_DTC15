function insertNameFromFirestore() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            console.log(user.uid);
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                let userName = userDoc.data().name;
                console.log(userName);
                document.getElementById("name-goes-here").innerText = userName;
            })
        } else {
            console.log("No user is logged in.")
        }           
    })
}

insertNameFromFirestore();