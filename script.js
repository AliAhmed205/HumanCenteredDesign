const homeSection = document.getElementById('home-section')
const kledingForm = document.getElementById('kledingFormulier')
const registerBtn = document.getElementById('buttonForm')
const cancelBtn = document.getElementById('cancel')
const outfitMaken = document.getElementById('outfitInstellen')
const outfitBtn = document.getElementById('buttonCreate')


window.addEventListener('DOMContentLoaded', function () {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));

    if (savedFormData) {
        document.getElementById('kledingstuk').value = savedFormData.kledingstuk || document.getElementById('kledingstuk').options[0].value;
        document.getElementById('kleur').value = savedFormData.kleur || document.getElementById('kleur').options[0].value;
        document.getElementById('stof').value = savedFormData.stof || document.getElementById('stof').options[0].value;
        document.getElementById('seizoen').value = savedFormData.seizoen || document.getElementById('seizoen').options[0].value;
        document.getElementById('typeKleding').value = savedFormData.typeKleding || document.getElementById('typeKleding').options[0].value;
        document.getElementById('extra-details').value = savedFormData.extraDetails || '';
    }

    const kledingFormulier = document.getElementById('kledingFormulier');
    if (kledingFormulier) {
        kledingFormulier.addEventListener('submit', function(event) {
            event.preventDefault(); // Voorkom standaardformulierverzending

            saveFormData(); // Roep de functie aan om de formuliergegevens op te slaan

            // Alert weergeven
            alert('Kledingstuk toegevoegd!');

            // Redirect naar index.html na het verzenden van het formulier
            window.location.href = 'index.html';
        });
    }
});

function saveFormData() {
    const newFormData = {
        kledingstuk: document.getElementById('kledingstuk').value,
        kleur: document.getElementById('kleur').value,
        stof: document.getElementById('stof').value,
        seizoen: document.getElementById('seizoen').value,
        typeKleding: document.getElementById('typeKleding').value,
        extraDetails: document.getElementById('extra-details').value,
        date: new Date()
    };

    let savedData = JSON.parse(localStorage.getItem('formData'));

    if (!Array.isArray(savedData)) {
        savedData = [];
    }

    savedData.push(newFormData);

    localStorage.setItem('formData', JSON.stringify(savedData));
}

