function sayHello() {
    
}
//sayHello();

//------------------------------------------------
// Call this function when the "logout" button is clicked
//-------------------------------------------------
function logout() {
    firebase.auth().signOut().then(() => {
        // Sign-out successful.
        console.log("logging out user");
    }).catch((error) => {
        // An error happened.
    });
}
/** menu setup  */
function setup() {
    $("#past_inspections_button").on('click', function () {
        $("#past_inspections_button").css('background-color', 'blue');
        $("#ongoing_inspections_button").css('background-color', 'grey');
        $("#requests_button").css('background-color', 'grey');
        $("#ongoing_inspections_list").remove(); 
        $("#inspection_request_list").remove();
        $.get(`/div_components/past_inspections.html`, function (data) {
            $("#menu_container").append(data);
        });



    });
    $("#ongoing_inspections_button").on('click', function () {
        $("#ongoing_inspections_button").css('background-color', 'blue');
        $("#past_inspections_button").css('background-color', 'grey');
        $("#requests_button").css('background-color', 'grey');
        $("#inspection_request_list").remove(); 
        $("#past_inspections_list").remove();
        $.get(`/div_components/ongoing_inspections.html`, function (data) {
            $("#menu_container").append(data);
        });



    });
    $("#requests_button").on('click', function () {
        $("#requests_button").css('background-color', 'blue');
        $("#ongoing_inspections_button").css('background-color', 'grey');
        $("#past_inspections_button").css('background-color', 'grey');
        $("#ongoing_inspections_list").remove(); 
        $("#past_inspections_list").remove();
        $.get(`/div_components/inspection_requests.html`, function (data) {
            $("#menu_container").append(data);
        });


    });

}
$(document).ready(setup)