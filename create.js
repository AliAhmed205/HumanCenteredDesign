const themeIds = ['casual', 'feestelijk', 'zakelijk', 'begrafenis', 'standaard']
const themeContainer = document.getElementById('outfitInstellen')
const backButtons = document.querySelectorAll('.terug')
const clothingIds = ['hoofddeksel', 'bovenkleding', 'onderkleding', 'schoeisel', 'accessoires']
const clothingContainer = document.getElementById('clothingOptions')
const cancelProgress = document.getElementById('annuleer')
let selectedClothing = [];


// const steps = document.querySelectorAll('.step')

let options = {
  currentStep: 0,
  allSteps: document.querySelectorAll('.step')
}


function stepBack() {
  if (options.currentStep > 0) {
    const oldStep = options.currentStep
    options.allSteps[oldStep].style.display = 'none'
    options.currentStep = options.currentStep - 1
    const newStep = options.currentStep
    options.allSteps[newStep].style.display = 'block'

    // Verwijder de "Geen optie beschikbaar" sectie als die aanwezig is
    const noItemContainer = document.querySelector('.noResults')
    if (noItemContainer) {
      noItemContainer.remove()
    }
  }
}

function stepForward() {
  if (options.currentStep < options.allSteps.length - 1) {
    const oldStep = options.currentStep
    options.allSteps[oldStep].style.display = 'none'
    options.currentStep = options.currentStep + 1
    const newStep = options.currentStep
    options.allSteps[newStep].style.display = 'block'
  }
}

function addToSelectedClothing(clothingItem) {
  selectedClothing.push(clothingItem);
}

themeIds.forEach(themeId => {
  const themeBtn = document.getElementById(themeId)
  themeBtn.addEventListener('click', () => {
    stepForward()
    localStorage.setItem('theme', themeId)
  })
})

backButtons.forEach(backButton => {
  createBackButtonEvent(backButton)
})

function createBackButtonEvent(backButton) {
  backButton.addEventListener('click', () => {
    stepBack()
  })
}

// Function to check if overview section exists
function hasOverviewSection() {
  return document.querySelector('.overzicht') !== null;
}

// Function to create overview section
function createOverviewSection() {
  const main = document.querySelector('main');
  const overzicht = document.createElement('section');
  overzicht.classList.add('overzicht');
  const overzichtLijst = document.createElement('ul');
  const overzichTitel = document.createElement('h2');
  overzicht.ariaLive = "assertive"
  overzichTitel.innerHTML = '<h2>Jouw kledingkeus overzicht<h2>';
  overzicht.appendChild(overzichTitel);
  overzicht.appendChild(overzichtLijst);
  main.insertBefore(overzicht, main.firstChild);
}

// Function to add clothing item to overview list
function addToOverviewList(itemText) {
  const overzichtLijst = document.querySelector('.overzicht ul');
  const overzichtLijstItem = document.createElement('li');
  overzichtLijstItem.innerHTML = itemText;
  overzichtLijst.appendChild(overzichtLijstItem);
}


clothingIds.forEach(clothingId => {
  const clothingBtn = document.getElementById(clothingId)


  clothingBtn.addEventListener('click', () => {

    clothingContainer.style.display = 'none'

    const overzichtItem = document.querySelector('.overzicht')

    if (overzichtItem) {
      overzichtItem.style.display = "none"
    }

    const theme = localStorage.getItem('theme') // Haal het gekozen thema op uit localStorage
    const type = clothingId

    const savedFormData = JSON.parse(localStorage.getItem('formData'))


    // Haal opgeslagen gegevens op en controleer of deze bestaan
    if (!savedFormData) {
      // Geen gegevens beschikbaar, toon een foutmelding
      const main = document.querySelector('main');
      const noDataContainer = document.createElement('section');
      // const overzichtSection = document.querySelector('.overzicht')
      noDataContainer.classList.add('noResults');
      const noData = document.createElement('p');
      noData.textContent = 'Er zijn geen opgeslagen gegevens beschikbaar voor het gekozen thema en kledingstype.';
      const backButton = document.createElement('button');
      backButton.textContent = 'Terug';
      backButton.addEventListener('click', () => {
        noDataContainer.remove();
        clothingContainer.style.display = 'block';
      });
      noDataContainer.appendChild(noData);
      noDataContainer.appendChild(backButton);
      main.appendChild(noDataContainer);
      return; // Stop de functie hier
    }


    // Filter op het gekozen thema
    const filtered = savedFormData.filter(item => {
      return item.typeKleding === theme && item.type === type
    })

    const main = document.querySelector('main')
    const resultSection = document.createElement('section')
    resultSection.classList.add('results')
    const ulEl = document.createElement('ul')



    const backButton = document.createElement('button')
    backButton.textContent = 'Terug'
    backButton.addEventListener('click', () => {
      resultSection.remove()
      clothingContainer.style.display = "block"
    })



    if (filtered.length === 0) {
      // Geen optie beschikbaar
      const noItemContainer = document.createElement('section')
      noItemContainer.classList.add('noResults')
      const noItem = document.createElement('p')
      noItem.textContent = 'Geen optie beschikbaar'

      backButton.textContent = 'Terug'
      backButton.addEventListener('click', () => {
        noItemContainer.remove()
        clothingContainer.style.display = "block"
      })



      noItemContainer.appendChild(noItem)
      noItemContainer.appendChild(backButton)

      main.appendChild(noItemContainer)
    } else {
      // Toon resultaten
      filtered.forEach(filterItem => {
        const liEl = document.createElement('li')
        const btnEl = document.createElement('button')
        btnEl.type = 'button'
        btnEl.innerHTML = `${hexToColorName(filterItem.kleur)} ${filterItem.kledingstuk}`


        localStorage.setItem('kledingstuk', filterItem.kledingstuk)
        localStorage.setItem('kleur', filterItem.kleur)
        const extraDetails = localStorage.setItem('extraDetails', filterItem.extraDetails)

        btnEl.addEventListener("click", () => {
          resultSection.remove();

          clothingContainer.style.display = 'flex'

          if (overzichtItem) {
            overzichtItem.style.display = 'block'
          }

          if (!hasOverviewSection()) {
            createOverviewSection();
          }

          const overzicht = document.querySelector('.overzicht')

          // if(overzicht === "block"){

          // }

          // Voeg de gekozen kleding toe aan de lijst van gekozen kleding
          const overzichtLijstItem = document.createElement('li')

          const clothingElement = document.getElementById(clothingId)
          if (clothingElement) {
            clothingElement.parentElement.classList.add('hidden')
          }



          // const theme = localStorage.getItem('theme');
          const color = hexToColorName(localStorage.getItem('kleur'));
          const clothing = localStorage.getItem('kledingstuk');
          const extraDetails = localStorage.getItem('extraDetails');

          let itemText = `<button aria-label="${color} ${clothing}" class="addedClothing" data-id=${clothingId}>  ${color} ${clothing}<span aria-label="Verwijder kledingstuk">&#10005</span></button>`;
          if (extraDetails) {
            itemText = `<button aria-label="${color} ${clothing}" class="addedClothing" data-id=${clothingId}>  ${color} ${extraDetails} ${clothing}<span aria-label="Verwijder kledingstuk">&#10005</span></button>`;
          }

          addToOverviewList(itemText);

          const textChange = clothingContainer.querySelector('h2')


          const addedClothing = document.querySelectorAll('.addedClothing')


          // Voeg eventlistener toe om kledingstukken te kunnen verwijderen
          addedClothing.forEach(item => {
            item.addEventListener('click', () => {
              const id = item.dataset.id
              const clothingElement = document.getElementById(id)


              if (clothingElement) {
                clothingElement.parentElement.classList.remove('hidden')
              }
              const overzichtOptie = document.querySelector('.overzicht')
              const parent = item.parentElement
              if(overzichtOptie){
              parent.remove()
              const ulOverzicht = overzichtOptie.querySelector('ul li')

              if (!ulOverzicht) {
                overzichtOptie.remove()
              }
            }
            })
          })
        })


        if (filterItem.extraDetails) {
          btnEl.innerHTML += ` - ${filterItem.extraDetails}`

          // Voeg audio toe op basis van extra details
          const audioFiles = [{
              keywords: ["glitter", "glitters"],
              file: "./audio/glitters.mp3"
            },
            {
              keywords: ["uitvaart", "dood"],
              file: "./audio/death.mp3"
            },
            {
              keywords: ["stoer", "deftig", "cool"],
              file: "./audio/stoer.mp3"
            },
            {
              keywords: ["stippen", "cirkels", "rondjes"],
              file: "./audio/dots.mp3"
            },
            {
              keywords: ["romantisch", "lief", "sexy"],
              file: "./audio/love.mp3"
            },
          ]

          audioFiles.forEach(({
            keywords,
            file
          }) => {
            if (keywords.some(keyword => filterItem.extraDetails.includes(keyword))) {
              btnEl.addEventListener("focus", function () {
                setTimeout(() => {
                  const audio = new Audio(file)
                  audio.play()
                  audio.volume = 1
                }, 1000)
              })
            }
          })
        }

        liEl.appendChild(btnEl)
        ulEl.appendChild(liEl)
      })

      resultSection.appendChild(ulEl)
      resultSection.appendChild(backButton)
      main.appendChild(resultSection)

    }
  })
})


function hexToColorName(hexCode) {
  switch (hexCode) {
    case '#FF0000':
      return 'Rood'
    case '#0000FF':
      return 'Blauw'
    case '#008000':
      return 'Groen'
    case '#FFFF00':
      return 'Geel'
    case '#FFA500':
      return 'Oranje'
    case '#800080':
      return 'Paars'
    case '#FFC0CB':
      return 'Roze'
    case '#000000':
      return 'Zwart'
    case '#40E0D0':
      return 'Turkwaas'
    case '#FFFFFF':
      return 'Wit'
    case '#A52A2A':
      return 'Bruin'
    case '#808080':
      return 'Grijs'
    case '#F5F5DC':
      return 'Beige'
    default:
      return 'Onbekend'
  }
}