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

// Function to handle emergency service calls
function handleEmergency(service, number) {
    // Simulate sending location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const locationMessage = `Sending your location (Latitude: ${latitude}, Longitude: ${longitude}) to ${service}.`;
                console.log(locationMessage);
                alert(`Location has been shared! Calling ${service} (${number})...`);
            },
            () => {
                alert(`Unable to retrieve your location. Calling ${service} (${number})...`);
            }
        );
    } else {
        alert(`Geolocation is not supported by your browser. Calling ${service} (${number})...`);
    }
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
    const textBox = document.getElementById('speech-to-text-box');
    if (!('webkitSpeechRecognition' in window)) {
        textBox.value = "Speech-to-Text is not supported in this browser.";
        return;
    }
    const recognition = new webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.onresult = function(event) {
        textBox.value = event.results[0][0].transcript;
    };
    recognition.onerror = function() {
        textBox.value = "Speech recognition failed. Please try again.";
    };
    recognition.start();
}

// Function to share the current location using Google Maps
function shareLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                
                // Create an anchor element and trigger a click to open the link
                const link = document.createElement('a');
                link.href = googleMapsUrl;
                link.target = '_blank'; // Open in a new tab
                link.click();
            },
            () => {
                alert('Unable to retrieve your location.');
            }
        );
    } else {
        alert('Geolocation is not supported by your browser.');
    }
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

// Function to convert text to speech
function convertTextToSpeech(text) {
    if (text.trim() !== '') {
        // Check if the browser supports speech synthesis
        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(text);
            speech.lang = 'en-US'; // Set the language to English (US)
            window.speechSynthesis.speak(speech);
        } else {
            alert('Text-to-Speech is not supported in this browser.');
        }
    } else {
        alert('No text provided to convert to speech.');
    }
}