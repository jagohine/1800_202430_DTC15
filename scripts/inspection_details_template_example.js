// Test function to read an inspection post and display it in the inspection details template
async function getInspectionPost(inspectionPostId) {
    try {
        console.log("Attempting to get document:", inspectionPostId);
        const docRef = db.collection('inspection_posts').doc(inspectionPostId);
        const docSnap = await docRef.get();

        if (docSnap.exists) {
            console.log("Inspection post data:", docSnap.data());
            return docSnap.data();
        } else {
            console.log("No such document exists!");
            return null;
        }
    } catch (e) {
        console.error("Error getting inspection post: ", e);
    }
}



// Test it out
async function test() {

    // inspection post id hardcoded for demo purposes. in the future it will be passed as a parameter
    const inspectionPostID = "MjRUbpT7q5utOKwZkvEj"


    // Read inspection post info
    data_response = await getInspectionPost(inspectionPostID);
    console.log(data_response)

    // Set the html values
    document.getElementById("inspectionCreationDate").innerHTML = data_response.creation_date.toDate().toString();
    document.getElementById("inspectionCompletionDate").innerHTML = data_response.completion_date.toDate().toString();

    fast_internet_checkbox = document.getElementById("fast_internet_checkbox");
    data_response.internet_is_fast ? fast_internet_checkbox.checked = true : fast_internet_checkbox.checked = false;

    clean_room_checkbox = document.getElementById("clean_room_checkbox");
    data_response.room_is_clean ? clean_room_checkbox.checked = true : clean_room_checkbox.checked = false;

    clean_kitchen_checkbox = document.getElementById("clean_kitchen_checkbox");
    data_response.kitchen_is_clean ? clean_kitchen_checkbox.checked = true : clean_kitchen_checkbox.checked = false;

    hot_shower_checkbox = document.getElementById("hot_shower_checkbox");
    data_response.shower_is_hot ? hot_shower_checkbox.checked = true : hot_shower_checkbox.checked = false;

    quiet_room_checkbox = document.getElementById("quiet_room_checkbox");
    data_response.room_is_quiet ? quiet_room_checkbox.checked = true : quiet_room_checkbox.checked = false;

    general_inspection_instructions = document.getElementById("general_inspection_instructions");
    general_inspection_instructions.innerHTML = data_response.general_inspection_requirements_description;

    general_inspector_notes = document.getElementById("general_inspector_notes");
    general_inspector_notes.innerHTML = data_response.general_inspector_comments;

    room_address = document.getElementById("room_address");
    room_address.innerHTML = data_response.address;

    inspector_name = document.getElementById("inspector_name");
    inspector_name.innerHTML = data_response.inspector_name;
}

test();