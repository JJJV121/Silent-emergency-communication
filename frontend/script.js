// Function to simulate calling an emergency service
function callService(service) {
    alert(`Calling ${service}...`);
}

// Function to start Text-to-Speech
function startTextToSpeech() {
    const text = prompt("Enter text to convert to speech:");
    if (text) {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
    }
}

// Function to start Speech-to-Text
function startSpeechToText() {
    if (!('webkitSpeechRecognition' in window)) {
        alert("Speech-to-Text is not supported in this browser.");
        return;
    }
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = function(event) {
        alert(`You said: ${event.results[0][0].transcript}`);
    };
    recognition.onerror = function() {
        alert("Speech recognition failed. Please try again.");
    };
    recognition.start();
}

// Function to share live location
function shareLocation() {
    const locationStatus = document.getElementById("location-status");
    if (!navigator.geolocation) {
        locationStatus.textContent = "Geolocation is not supported by your browser.";
        return;
    }
    locationStatus.textContent = "Fetching location...";
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            locationStatus.textContent = `Location shared: Latitude ${latitude}, Longitude ${longitude}`;
        },
        () => {
            locationStatus.textContent = "Unable to retrieve your location.";
        }
    );
}

// Function to manage emergency contacts
function manageContacts() {
    const contactName = prompt("Enter the name of the contact:");
    const contactNumber = prompt("Enter the phone number of the contact:");
    if (contactName && contactNumber) {
        const contactList = document.getElementById("contact-list");
        const listItem = document.createElement("li");
        listItem.textContent = `${contactName} - ${contactNumber}`;
        contactList.appendChild(listItem);
    }
}