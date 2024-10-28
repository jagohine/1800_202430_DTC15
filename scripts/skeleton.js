//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------
function loadSkeleton() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // If the "user" variable is not null, then someone is logged in
      // User is signed in.
      // Do something for the user here.
      console.log(
        $("#topNavbarPlaceholder").load("./text/top_nav_after_login.html")
      );
      console.log($("#bottomNavbarPlaceholder").load("./text/bottom_nav.html"));
    } else {
      // No user is signed in.
      console.log(
        $("#topNavbarPlaceholder").load("./text/top_nav_before_login.html")
      );
    }
  });
}
loadSkeleton(); //invoke the function
