const themeIds = ['casual', 'feestelijk', 'zakelijk', 'begrafenis', 'standaard']
const themeContainer = document.getElementById('outfitInstellen')
const backButtons = document.querySelectorAll('.terug')
const clothingIds = ['hoofddeksel', 'bovenkleding', 'onderkleding', 'schoeisel', 'accessoires']
const clothingContainer = document.getElementById('clothingOptions')

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

clothingIds.forEach(clothingId => {
  const clothingBtn = document.getElementById(clothingId)

  clothingBtn.addEventListener('click', () => {

    clothingContainer.style.display = 'none'

    const theme = localStorage.getItem('theme') // Haal het gekozen thema op uit localStorage
    const type = clothingId

    const savedFormData = JSON.parse(localStorage.getItem('formData'))

    // Filter op het gekozen thema
    const filtered = savedFormData.filter(item => {
      return item.typeKleding === theme && item.type === type
    })

    if (filtered.length === 0) {
      // Geen optie beschikbaar
      const noItemContainer = document.createElement('section')
      noItemContainer.classList.add('noResults')
      const noItem = document.createElement('p')
      noItem.textContent = 'Geen optie beschikbaar'

      const backButton = document.createElement('button')
      backButton.textContent = 'Terug'
      backButton.addEventListener('click', () => {
        window.location.href = 'create.html'
      })

      noItemContainer.appendChild(noItem)
      noItemContainer.appendChild(backButton)

      const main = document.querySelector('main')
      main.appendChild(noItemContainer)
    } else {
      // Toon resultaten
      filtered.forEach(filterItem => {
        const main = document.querySelector('main')
        const resultSection = document.createElement('section')
        resultSection.classList.add('results')

        const ulEl = document.createElement('ul')
        const liEl = document.createElement('li')
        const btnEl = document.createElement('button')
        btnEl.type = 'button'

        localStorage.setItem('kledingstuk', filterItem.kledingstuk)
        localStorage.setItem('kleur', filterItem.kleur)
        const extraDetails = localStorage.setItem('extraDetails', filterItem.extraDetails)

        const overzicht = document.createElement('section')
        const overzichtLijst = document.createElement('ul')
        const overzichtLijstItem = document.createElement('li')

        btnEl.addEventListener("click", () => {

          resultSection.style.display = 'none'
          clothingContainer.style.display = 'flex'

          if (!extraDetails) {
            overzichtLijstItem.innerHTML = `<button class="addedClothing" data-id=${clothingId}> ${hexToColorName(localStorage.getItem('kleur'))} ${localStorage.getItem('extraDetails')}  ${localStorage.getItem('kledingstuk')}<span aria-label="Verwijder kledingstuk">&#10005</span></button>`
          } else {
            overzichtLijstItem.innerHTML = `<button class="addedClothing" data-id=${clothingId}>  ${hexToColorName(localStorage.getItem('kleur'))} ${localStorage.getItem('kledingstuk')}<span aria-label="Verwijder kledingstuk">&#10005</span></button>`
          }
          const addedClothing = overzichtLijstItem.querySelectorAll('.addedClothing')

          addedClothing.forEach(item => {
            item.addEventListener('click', () => {
              const id = item.dataset.id
              const clothingElement = document.getElementById(id)
              if (clothingElement) {
                clothingElement.parentElement.classList.remove('hidden')
              }
              item.remove()
            })
          })


          overzichtLijst.appendChild(overzichtLijstItem)
          overzicht.appendChild(overzichtLijst)
          clothingContainer.appendChild(overzicht)

          const clothingElement = document.getElementById(clothingId)
          if (clothingElement) {
            clothingElement.parentElement.classList.add('hidden')
          }
        })

        btnEl.innerHTML = `${hexToColorName(filterItem.kleur)} ${filterItem.kledingstuk}`

        if (filterItem.extraDetails) {
          btnEl.innerHTML += ` - ${filterItem.extraDetails}`

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
        resultSection.appendChild(ulEl)
        main.appendChild(resultSection)
      })
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