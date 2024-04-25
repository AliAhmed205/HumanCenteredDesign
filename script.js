const homeSection = document.getElementById('home-section')
const kledingForm = document.getElementById('kledingFormulier')
const registerBtn = document.getElementById('buttonForm')
const cancelBtn = document.getElementById('cancel')
const outfitMaken = document.getElementById('outfitInstellen')
const outfitBtn = document.getElementById('buttonCreate')


window.addEventListener('DOMContentLoaded', function () {
    const savedFormData = JSON.parse(localStorage.getItem('formData'));

    if (document.getElementById('display-section')) {
        document.getElementById('kledingstuk').value = savedFormData.kledingstuk || document.getElementById('kledingstuk').options[0].value;
        document.getElementById('kleur').value = savedFormData.kleur || document.getElementById('kleur').options[0].value;
        document.getElementById('stof').value = savedFormData.stof || document.getElementById('stof').options[0].value;
        document.getElementById('seizoen').value = savedFormData.seizoen || document.getElementById('seizoen').options[0].value;
        document.getElementById('typeKleding').value = savedFormData.typeKleding || document.getElementById('typeKleding').options[0].value;
        document.getElementById('extraDetails').value = savedFormData.extraDetails || '';
    }

    const kledingFormulier = document.getElementById('kledingFormulier');
    if (kledingFormulier) {
        kledingFormulier.addEventListener('submit', function (event) {
            event.preventDefault(); // Voorkom standaardformulierverzending

            saveFormData(kledingFormulier); // Roep de functie aan om de formuliergegevens op te slaan

            // Alert weergeven
            alert("Kledingstuk toegevoegd! De pagina wordt nu vernieuwd zodat je nog meer kunt toevoegen.");

            kledingFormulier.reset();
            window.location.href = "index.html"




            // Redirect naar index.html na het verzenden van het formulier
            // window.location.href = 'index.html';
        });
    }
});

if(cancelBtn){
  cancelBtn.addEventListener('click', ()=> {
    window.location.href = "index.html"
  })
}


const clothingTypes = {
    't-shirt': 'bovenkleding',
    overhemd: 'bovenkleding',
    broek: 'onderkleding',
    jeans: 'onderkleding',
    jurk: 'onderkleding',
    rok: 'onderkleding',
    trui: 'bovenkleding',
    vest: 'bovenkleding',
    jas: 'bovenkleding',
    baret: 'hoofddeksel',
    bleezer: 'bovenkleding',
    hoodie: 'bovenkleding',
    handtas: 'accessoires',
    short: 'onderkleding',
    leggings: 'onderkleding',
    ondergoed: 'onderkleding',
    sokken: 'accessoires',
    schoenen: 'schoeisel',
    sjaal: 'accessoires',
    handschoenen: 'accessoires',
    hoed: 'hoofddeksel',
    zonnebril: 'accessoires',
    muts: 'hoofddeksel',
}




function saveFormData(kledingFormulier) {
    const inputs = kledingFormulier.querySelectorAll('select, textarea')
    const newFormData = {
        date: new Date(),
        type: clothingTypes[document.getElementById('kledingstuk').value]
    };
    if (inputs) {
        inputs.forEach(input => {
            newFormData[input.id] = input.value
        })
    }
    console.log(newFormData);
    let savedData = JSON.parse(localStorage.getItem('formData'));

    if (!Array.isArray(savedData)) {
        savedData = [];
    }

    savedData.push(newFormData);

    localStorage.setItem('formData', JSON.stringify(savedData));
}