function displayFinishedInspectionInfo(collection) {
  db.collection(collection)
    .get()
    .then((allPosts) => {
      allPosts.forEach((doc) => {
        console.log(doc.data().inspection_rating);
        console.log("get!");
      });
    });
  (error) => {
    console.error("Error retrieving posts:", error);
  };
}
displayFinishedInspectionInfo("inspection_posts");

// // Using update to change only the inspection_rating field
// // async function updateInspectionRating(inspectionPostId, newRating) {
// //   try {
// //     const docRef = doc(db, "inspection_posts", inspectionPostId);
// //     await updateDoc(docRef, { inspection_rating: newRating });
// //     console.log("Inspection rating updated to:", newRating);
// //   } catch (e) {
// //     console.error("Error updating inspection rating: ", e);
// //   }
// // }
