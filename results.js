// Function to generate random diseases and accuracy percentages for demonstration
// Function to generate random diseases and accuracy percentages for demonstration
function generateMockResults(symptoms) {
    // Define common symptoms and corresponding diseases
    const symptomDiseaseMap = {
        "Fever": ["Common Cold", "Influenza", "Pneumonia"],
        "Cough": ["Common Cold", "Influenza", "Bronchitis"],
        "Headache": ["Migraine", "Tension Headache"],
        "Fatigue": ["Common Cold", "Influenza", "Anemia"],
        "Sore Throat": ["Common Cold", "Strep Throat"],
        "Runny Nose": ["Common Cold", "Allergy", "Sinusitis"],
        "Shortness of Breath": ["Asthma", "Pneumonia"],
        "Nausea": ["Food Poisoning", "Gastritis", "Viral Gastroenteritis"],
        "Vomiting": ["Food Poisoning", "Gastritis", "Viral Gastroenteritis"],
        "Diarrhea": ["Food Poisoning", "Gastroenteritis", "Irritable Bowel Syndrome"],
        "Abdominal Pain": ["Gastritis", "Appendicitis", "Kidney Stones"],
        "Chest Pain": ["Heart Attack", "Pneumonia", "Angina"],
        "Joint Pain": ["Arthritis", "Lupus", "Fibromyalgia"],
        "Back Pain": ["Muscle Strain", "Herniated Disc", "Kidney Stones"],
        "Muscle Aches": ["Flu", "Fibromyalgia", "Chronic Fatigue Syndrome"],
        "Dizziness": ["Vertigo", "Anemia", "Dehydration"],
        "Difficulty Swallowing": ["GERD", "Strep Throat", "Esophageal Cancer"],
        "Rash": ["Contact Dermatitis", "Eczema", "Psoriasis"],
        "Swollen Lymph Nodes": ["Infection", "Mononucleosis", "Lymphoma"],
        "Weight Loss": ["Hyperthyroidism", "Diabetes", "Cancer"]
    };

    // Initialize results array
    const results = [];

    // Iterate over each symptom
    Object.keys(symptomDiseaseMap).forEach(symptom => {
        // Check if the symptom is selected
        if (symptoms.includes(symptom)) {
            // Get corresponding diseases for the symptom
            const diseases = symptomDiseaseMap[symptom];

            // Generate mock results for each disease
            diseases.forEach(disease => {
                const accuracy = Math.floor(Math.random() * (100 - 50 + 1)) + 50; // Random accuracy between 50% to 100%

                results.push({
                    Issue: {
                        Name: disease,
                        Accuracy: accuracy + "%" // Set the accuracy here
                    },
                    Specialisation: [{ Name: 'General Physician' }] // Mock specialization
                });
            });
        }
    });

    return results;
}


// Function to fetch results based on selected symptoms
async function getResults(symptoms) {
    const results = generateMockResults(symptoms); // Use the mock data
    
    if (results.length === 0) {
        document.querySelector(".pop-up-bg").style.display = "flex";
    } else {
        const table = document.querySelector("table");
        
        results.forEach(result => {
            let tableRow = document.createElement("tr");
            let diseaseTd = document.createElement("td");
            let accuracyTd = document.createElement("td");
            let doctorSpecialization = document.createElement("td");
            let getInLineTd = document.createElement("td"); // New td for the button
            
            tableRow.appendChild(diseaseTd);
            tableRow.appendChild(accuracyTd);
            tableRow.appendChild(doctorSpecialization);
            tableRow.appendChild(getInLineTd); // Append the button td
            
            diseaseTd.innerText = result.Issue.Name;
            accuracyTd.innerText = result.Issue.Accuracy;
            
            const docsList = result.Specialisation;
            doctorSpecialization.innerText = docsList.map(doc => doc.Name).join(', ');
            
            // Create the "Get in Line" button
            let getInLineBtn = document.createElement("button");
            getInLineBtn.textContent = "Get in Line";
            getInLineBtn.classList.add("get-in-line-btn"); // Add a class for styling
            getInLineTd.appendChild(getInLineBtn);
            
            table.appendChild(tableRow);
        });
    }
}

// Function to handle the click event of "Get in Line" button
function handleGetInLineClick() {
    // Show the popup form
    document.querySelector('.popup-bg').style.display = 'flex';

    // Populate the state dropdown
    fetch('https://indian-cities-api-nocbegfhqg.now.sh/states')
        .then(response => response.json())
        .then(data => {
            var stateDropdown = document.getElementById('state');
            stateDropdown.innerHTML = '';
            data.forEach(state => {
                var option = document.createElement('option');
                option.text = state.name;
                option.value = state.id;
                stateDropdown.add(option);
            });
        })
        .catch(error => console.error('Error fetching states:', error));
}

// Function to attach event listeners to "Get in Line" buttons
function attachEventListenersToButtons() {
    var buttons = document.querySelectorAll('.get-in-line-btn');
    buttons.forEach(button => {
        button.addEventListener('click', handleGetInLineClick);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Define the array of symptoms
    const symptoms = [
        "Fever", "Cough", "Headache", "Fatigue", "Sore Throat", 
        "Runny Nose", "Shortness of Breath", "Nausea", "Vomiting", 
        "Diarrhea", "Abdominal Pain", "Chest Pain", "Joint Pain", 
        "Back Pain", "Muscle Aches", "Dizziness", "Difficulty Swallowing", 
        "Rash", "Swollen Lymph Nodes", "Weight Loss"
    ];

    // Define an array to store diseases
    let diseasesData = [];

    // Generate all possible combinations of symptoms
    function generateCombinations(symptoms) {
        const combinations = [];
        for (let i = 1; i <= symptoms.length; i++) {
            for (let j = 0; j <= symptoms.length - i; j++) {
                combinations.push(symptoms.slice(j, j + i));
            }
        }
        return combinations;
    }

    // Function to generate diseases based on symptom combinations
    function generateDiseases(combinations) {
        // Simulate generating diseases based on symptom combinations
        for (let i = 0; i < combinations.length; i++) {
            const diseaseName = `Disease ${i + 1}`;
            const accuracy = `${Math.floor(Math.random() * 40) + 60}%`;
            const specialization = i % 2 === 0 ? "General Practitioner" : "Specialist";
            diseasesData.push({ disease: diseaseName, accuracy: accuracy, specialization: specialization });
        }
    }

    // Generate all combinations of symptoms
    const allCombinations = generateCombinations(symptoms);

    // Generate diseases based on symptom combinations
    generateDiseases(allCombinations);

    // Function to generate table rows based on diseases data
    function generateTableRows() {
        const tableBody = document.querySelector('table tbody');
        tableBody.innerHTML = ''; // Clear previous rows

        diseasesData.forEach(disease => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="diseaseName">${disease.disease}</td>
                <td class="accuracy">${disease.accuracy}</td>
                <td class="doctorSpecialization">${disease.specialization}</td>
                <td class="bookAppointment"><button class="get-in-line-btn">Get in Line</button></td>
            `;
            tableBody.appendChild(row);
        });
    }

    // Call the function to generate table rows
    generateTableRows();

    // Function to handle the click event of "Get in Line" button
    function handleGetInLineClick() {
        // Show the popup form
        document.querySelector('.pop-up-bg').style.display = 'flex';

        // Populate the state dropdown
        fetch('https://indian-cities-api-nocbegfhqg.now.sh/states')
            .then(response => response.json())
            .then(data => {
                var stateDropdown = document.getElementById('state');
                stateDropdown.innerHTML = '';
                data.forEach(state => {
                    var option = document.createElement('option');
                    option.text = state.name;
                    option.value = state.id;
                    stateDropdown.add(option);
                });
            })
            .catch(error => console.error('Error fetching states:', error));
    }

    // Function to attach event listeners to "Get in Line" buttons
    function attachEventListenersToButtons() {
        var buttons = document.querySelectorAll('.get-in-line-btn');
        buttons.forEach(button => {
            button.addEventListener('click', handleGetInLineClick);
        });
    }

    // Call the function to attach event listeners to buttons
    attachEventListenersToButtons();

    // Assuming you have a function named `checkResults` that checks if there are any results
    // If there are no results, show the pop-up
    if (diseasesData.length === 0) {
        document.querySelector('.pop-up-bg').style.display = 'flex';
    }
});
