async function getInspectionPost(inspectionPostId, collection) {
    try {
        console.log("Attempting to get document:", inspectionPostId);
        const docRef = db.collection(collection).doc(inspectionPostId);
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

function fieldToLabel(field) {
    switch (field) {
        case 'washerDryer':
            return 'Washer/Dryer';
            break;
        case 'roommates':
            return 'Roommates';
            break;
        case 'petFriendly':
            return 'Pet Friendly';
            break;
        case 'publicTransit':
            return 'Public Transit';
            break;
        case 'parking':
            return 'Parking';
            break;
        case 'neighbourhoodSafety':
            return 'Neighbourhood Safety';
            break;
        case 'livingRoom':
            return 'Living Room';
            break;
        case 'kitchen':
            return 'Kitchen';
            break;
        case 'bedroom':
            return 'Bedroom';
            break;
        case 'bathroom':
            return 'Bathroom';
            break;
        case 'internet_connection':
            return 'Internet Connection';
            break;
        case 'acHeater':
            return 'AC/Heater';
            break;
        default:
            return "ERROR: Field not found";
    }
}


function addInspectionDetailToPage(detail, detail_content) {
    const contentContainer = document.createElement('div');
    contentContainer.className = 'mb-3';

    const headingLabel = document.createElement('label');
    headingLabel.className = 'form-label fw-bold';
    headingLabel.textContent = detail;

    const contentBox = document.createElement('div');
    contentBox.className = 'border rounded p-2';
    contentBox.textContent = detail_content;

    contentContainer.appendChild(headingLabel);
    contentContainer.appendChild(contentBox);

    document.getElementById('dynamic-content').appendChild(contentContainer);
}



// Test it out
async function test() {

    // inspection post id hardcoded for demo purposes. in the future it will be passed as a parameter
    const inspectionPostID = "h2ro1W6Ycdj0yXrlBCqS"
    const collection = "inspections"


    // Read inspection post info
    post = await getInspectionPost(inspectionPostID, collection);
    console.log(post)

    // Add inspection details to page, one by one
    Object.entries(post.checkbox).forEach(([key, value]) => {
        console.log(`Adding content| ${key}: ${value}`);
        if (value != 'unchecked') {
        addInspectionDetailToPage(fieldToLabel(key), value);
        };});
    
    inspectionCreationDate = document.getElementById('inspectionCreationDate');
    inspectionCompletionDate = document.getElementById('inspectionCompletionDate');
    inspectionAddress = document.getElementById('inspectionAddress');
    inspectorName = document.getElementById('inspectorName');
    inspectionCreationDate.textContent = post.inspectionCreationDate.toDate();
    inspectionCompletionDate.textContent = post.inspectionCompletionDate.toDate();
    inspectionAddress.textContent = post.address;
    inspectorName.textContent = post.inspector.name;
    inspectorRef = await post.inspector.get();
    inspectorData = inspectorRef.data();
    console.log("INSPECTOR NAME: ", inspectorData.name);
    inspectorName.textContent = inspectorData.name;

}

test();

// Get inspectionDocID from URL and store in browser's local storage
function saveInspectionDocIDAndRedirect() {
    let params = new URL(window.location.href)
    let ID = params.searchParams.get("docID");
    localStorage.setItem('inspectionDocID', ID);
    window.location.href = 'review.html'
}