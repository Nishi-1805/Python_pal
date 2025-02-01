document.getElementById('submitCode').addEventListener('click', async () => {
    const code = document.getElementById('codeInput').value;
    const responseDiv = document.getElementById('response');

    if (code.trim() === "") {
        alert('Please enter some Python code before submitting.');
        return; 
    }

    responseDiv.innerHTML = "Loading...";

    const response = await fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
    });

    const data = await response.json();
    responseDiv.innerHTML = data.message;

    updateProgress("Submitted Python Code"); 
    displayProgress(); 
});

function selectCharacter(character) {
    const tutorInfo = document.getElementById('tutorInfo');
    const tutorDisplay = document.getElementById('tutorDisplay');
    const characterSelection = document.getElementById('characterSelection');

    characterSelection.style.display = 'none';

    switch (character) {
        case 'cat':
            tutorInfo.innerHTML = '<p>You have selected the Cat Tutor! 🐱</p>';
            break;
        case 'superhero':
            tutorInfo.innerHTML = '<p>You have selected the Superhero Tutor! 🦸‍♂️</p>';
            break;
        case 'robot':
            tutorInfo.innerHTML = '<p>You have selected the Robot Tutor! 🤖</p>';
            break;
        default:
            tutorInfo.innerHTML = '<p>Please select a tutor.</p>';
    }

    tutorDisplay.style.display = 'block';
}

document.getElementById('submitHomework').addEventListener('click', async () => {
    const homeworkAnswer = document.getElementById('homeworkInput').value;

    if (homeworkAnswer.trim() === "") {
        alert('Please enter your homework answer before submitting.');
        return; 
    }

    const feedbackResponse = await fetch('/submit-homework', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answer: homeworkAnswer }),
    });
    const feedbackData = await feedbackResponse.json();

    document.getElementById('homeworkInput').style.display = 'none';
    document.getElementById('submitHomework').style.display = 'none';

    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML = `<p class="feedback">Feedback: ${feedbackData.message}</p>`;
    showFunFact();
    updateProgress("Submitted Homework"); 
    displayProgress(); 
});

function updateProgress(topic) {
    let progress = JSON.parse(localStorage.getItem('progress')) || [];
    if (!progress.includes(topic)) {
        progress.push(topic);
        localStorage.setItem('progress', JSON.stringify(progress));
    }
}

function displayProgress() {
    const progress = JSON.parse(localStorage.getItem('progress')) || [];
    const progressList = document.getElementById('progressList');
    progressList.innerHTML = ''; 
    progress.forEach(topic => {
        const listItem = document.createElement('li');
        listItem.textContent = topic;
        progressList.appendChild(listItem);
    });
}

const funFacts = [
    "Did you know? Python was created by Guido van Rossum and released in 1991!",
    "Python is named after the British comedy group Monty Python!",
    "Python supports multiple programming paradigms, including procedural, object-oriented, and functional programming."
];

function showFunFact() {
    const randomFact = funFacts[Math.floor(Math.random() * funFacts.length)];
    const responseDiv = document.getElementById('response');
    responseDiv.innerHTML += `<p class="fun-fact">Fun Fact: ${randomFact}</p>`;
}

document.getElementById('saveApiKey').addEventListener('click', () => {
    const apiKeyInput = document.getElementById('apiKeyInput');
    const apiKey = apiKeyInput.value;

    if (apiKey.trim() === "") {
        alert('Please fill in the API Key field with valid data.');
    } else {
        localStorage.setItem('apiKey', apiKey);
        alert('API Key saved successfully!');
        apiKeyInput.value = ""; 
    }
});

displayProgress();