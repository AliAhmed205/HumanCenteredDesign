window.addEventListener('DOMContentLoaded', function () {
    displaySavedFormData();
});

function hexToColorName(hexCode) {
    switch(hexCode) {
        case '#FF0000':
            return 'Rood';
        case '#0000FF':
            return 'Blauw';
        case '#008000':
            return 'Groen';
        case '#FFFF00':
            return 'Geel';
        case '#FFA500':
            return 'Oranje';
        case '#800080':
            return 'Paars';
        case '#FFC0CB':
            return 'Roze';
        case '#000000':
            return 'Zwart';
        case '#40E0D0':
            return 'Turkwaas';
        case '#FFFFFF':
            return 'Wit';
        case '#A52A2A':
            return 'Bruin';
        case '#808080':
            return 'Grijs';
        case '#F5F5DC':
            return 'Beige';
        default:
            return 'Onbekend';
    }
}
function displaySavedFormData(dateFilter, colorFilter, typeFilter, styleFilter) {
    const savedData = JSON.parse(localStorage.getItem('formData'));

    const section = document.getElementById('display-section');
    if (!savedData || savedData.length === 0) {
        section.innerHTML = "<p style='text-align: center;'>Geen kledingstukken toegevoegd.</p>";
        return;
    }

    section.innerHTML = ""; // Clear section content

    savedData
    .sort((a, b) => {
        if (dateFilter === 'newest'){
            return new Date(b.date).getTime() - new Date(a.date).getTime()
        }
    })
    .filter(formData => {
        if (colorFilter) {
            return formData.kleur === colorFilter;
        }
        return true
    })

    .filter(formData => {
        if (typeFilter) {
            return formData.kledingstuk === typeFilter;
        }
        return true
    })
    .filter(formData => {
        if(styleFilter){
            return formData.typeKleding === styleFilter; 
        }
        return true
    })
    .forEach((formData, index) => {
        const kledingstukSection = document.createElement('li');
        kledingstukSection.classList.add('kledingstuk-section');
        kledingstukSection.setAttribute('tabindex', index + 1); // Toevoegen van tabindex aan li

        const dateAdded = new Date(formData.date).toLocaleDateString(); // Datum van toevoegen
        const formattedDate = `Toegevoegd op: ${dateAdded}`;
        const dateParagraph = document.createElement('h3');
        dateParagraph.textContent = formattedDate;
        kledingstukSection.appendChild(dateParagraph);

        // Maak een lijst van kledingstukinformatie
        const ul = document.createElement('ul');
        const fields = ['kledingstuk', 'kleur', 'stof', 'seizoen', 'typeKleding', 'extraDetails'];
        fields.forEach(field => {
            const li = document.createElement('li');
            if (field === 'kleur') {
                li.innerHTML = `<b>Kleur:</b> ${hexToColorName(formData[field])}`;
            } else {
                li.innerHTML = `<b>${field.charAt(0).toUpperCase() + field.slice(1)}:</b> ${formData[field]}`;
            }
            ul.appendChild(li);
        });
        kledingstukSection.appendChild(ul);

        // Voeg een verwijderknop toe
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Verwijder';
        deleteButton.setAttribute('tabindex', index + 2); // Toevoegen van tabindex aan verwijderknop
        deleteButton.addEventListener('click', function() {
            removeFormData(index);
            displaySavedFormData(); // Vernieuw de weergegeven gegevens na verwijderen
        });
        kledingstukSection.appendChild(deleteButton);

        section.appendChild(kledingstukSection);
    });
}


const formFilter = document.getElementById('filtering')

formFilter.addEventListener('change', (event) => {
    const filterForm = event.currentTarget;
    const formDate = new FormData(filterForm);
    const dateFilter = formDate.get('orderDate')
    const colorFilter = formDate.get('orderColor')
    const typeFilter = formDate.get('orderType')
    const styleFilter = formDate.get('orderStyle')

    displaySavedFormData(dateFilter, colorFilter, typeFilter, styleFilter)
})

function removeFormData(index) {
    const savedData = JSON.parse(localStorage.getItem('formData'));

    if (savedData && Array.isArray(savedData)) {
        savedData.splice(index, 1); // Verwijder het geselecteerde kledingstuk uit de array
        localStorage.setItem('formData', JSON.stringify(savedData)); // Bijgewerkte gegevens opslaan in localStorage
    }
}
