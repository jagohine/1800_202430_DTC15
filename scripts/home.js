function writeInspectionDetails() {
    var inspectDetails = db.collection("inspection_posts");

    inspectDetails.add({
        code: "interior_inspection",
        name: "555 Seymour Street",
        check_internet_is_fast:true,
        check_room_is_clean: true,
        check_room_is_quiet: true,
        check_shower_is_hot: true,
        check_kitchen_is_clean: true,
        creation_date: firebase.firestore.FieldValue.serverTimestamp(),
        general_inspection_requirements_description: "Pay close attention to kitchen",
        general_inspector_comments: null,
        inspection_is_finished: null,
        inspection_rating: null,
        internet_is_fast: null,
        check_room_is_clean: null,
        check_room_is_quiet: null,
        check_shower_is_hot: null,
        check_kitchen_is_clean: null,
        completion_date: null
    });

    inspectDetails.add({
        code: "apartment1",
        name: "123 Main Street",
        check_internet_is_fast: true,
        check_room_is_clean: true,
        check_room_is_quiet: true,
        check_shower_is_hot: true,
        check_kitchen_is_clean: true,
        creation_date: firebase.firestore.FieldValue.serverTimestamp(),
        general_inspection_requirements_description: "Send me 5 pics of the room",
        general_inspector_comments: "Room is clean",
        inspection_is_finished: true,
        inspection_rating: 4,
        internet_is_fast: true,
        check_room_is_clean: true,
        check_room_is_quiet: true,
        check_shower_is_hot: true,
        check_kitchen_is_clean: true,
        completion_date: firebase.firestore.FieldValue.serverTimestamp()
    });

    inspectDetails.add({
        code: "apartment2",
        name: "789 Elm Street",
        check_internet_is_fast: true,
        check_room_is_clean: true,
        check_room_is_quiet: true,
        check_shower_is_hot: true,
        check_kitchen_is_clean: true,
        creation_date: firebase.firestore.Timestamp.fromDate(new Date("September 4, 2024")),
        general_inspection_requirements_description: "Is there a bathtub?",
        general_inspector_comments: "No bathtub",
        inspection_is_finished: true,
        inspection_rating: 3,
        internet_is_fast: true,
        check_room_is_clean: true,
        check_room_is_quiet: true,
        check_shower_is_hot: true,
        check_kitchen_is_clean: true,
        completion_date: firebase.firestore.Timestamp.fromDate(new Date("September 12, 2024"))
    });

    inspectDetails.add({
        code: "apartment3",
        name: "521 Hasting Street",
        check_internet_is_fast: null,
        check_room_is_clean: true,
        check_room_is_quiet: null,
        check_shower_is_hot: true,
        check_kitchen_is_clean: true,
        creation_date: firebase.firestore.Timestamp.fromDate(new Date("March 3, 2024")),
        general_inspection_requirements_description: "Check kitchen carefully",
        general_inspector_comments: "Kitchen is a bit messy",
        inspection_is_finished: true,
        inspection_rating: 3,
        internet_is_fast: null,
        check_room_is_clean: true,
        check_room_is_quiet: null,
        check_shower_is_hot: true,
        check_kitchen_is_clean: true,
        completion_date: firebase.firestore.Timestamp.fromDate(new Date("March 8, 2024"))
    });

    inspectDetails.add({
        code: "apartment4",
        name: "2421 Granville Street",
        check_internet_is_fast: true,
        check_room_is_clean: true,
        check_room_is_quiet: null,
        check_shower_is_hot: true,
        check_kitchen_is_clean: true,
        creation_date: firebase.firestore.Timestamp.fromDate(new Date("May 16, 2024")),
        general_inspection_requirements_description: null,
        general_inspector_comments: "Bedroom is about 300 sq feet",
        inspection_is_finished: true,
        inspection_rating: 5,
        internet_is_fast: true,
        check_room_is_clean: true,
        check_room_is_quiet: null,
        check_shower_is_hot: true,
        check_kitchen_is_clean: true,
        completion_date: firebase.firestore.Timestamp.fromDate(new Date("May 27, 2023"))
    });
}

// writeInspectionDetails();
