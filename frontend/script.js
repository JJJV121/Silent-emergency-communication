// Function to simulate calling an emergency service
function callService(service) {
    let number;
    switch (service) {
        case 'ambulance':
            number = '108';
            break;
        case 'fire':
            number = '101';
            break;
        case 'police':
            number = '100';
            break;
        default:
            alert('Invalid service');
            return;
    }
    alert(`Dialing ${number} for ${service}...`);
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
            const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            locationStatus.innerHTML = `Location shared: <a href="${mapsUrl}" target="_blank">View on Map</a>`;
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
        addContact(contactName, contactNumber);
    }
}

const contactList = document.getElementById('contact-list');

// Function to add a contact to the list
function addContact(name, phone) {
    const listItem = document.createElement('li');
    listItem.className = 'contact-item';
    listItem.innerHTML = `
        <span>${name} - ${phone}</span>
    `;
    contactList.appendChild(listItem);
}

// Function to simulate calling the highest-priority contact
function callPriorityContact() {
    const contactList = document.getElementById('contact-list');
    if (contactList.children.length === 0) {
        alert("No contacts available to call.");
        return;
    }
    const firstContact = contactList.children[0].textContent;
    alert(`Calling ${firstContact}...`);
}

// Sync contacts between pages using localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
    savedContacts.forEach(contact => addContact(contact.name, contact.phone));
});

document.getElementById('contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value;
    const phone = document.getElementById('contact-phone').value;

    if (name && phone) {
        addContact(name, phone);

        // Save to localStorage
        const savedContacts = JSON.parse(localStorage.getItem('contacts')) || [];
        savedContacts.push({ name, phone });
        localStorage.setItem('contacts', JSON.stringify(savedContacts));

        document.getElementById('contact-form').reset();
    }
});