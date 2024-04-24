const removeBtn1 = document.querySelector('.addedClothing1')

if(removeBtn1){

  removeBtn1.addEventListener('click', ()=> {
    window.location.href = 'part-1.html'
  })
}

const removeBtn2true = document.querySelector('.addedClothing2true')
const removeBtn2false = document.querySelector('.addedClothing2false')

if(removeBtn2true){

  removeBtn2true.addEventListener('click', ()=> {
    window.location.href = 'part-2-true.html'
  })
}
if(removeBtn2false){

  removeBtn2false.addEventListener('click', ()=> {
    window.location.href = 'part-2-false.html'
  })
}

const removeBtn3true = document.querySelector('.addedClothing3true')
const removeBtn3false = document.querySelector('.addedClothing3false')

if(removeBtn3true){

  removeBtn3true.addEventListener('click', ()=> {
    window.location.href = 'part-4-true.html'
  })
}
if(removeBtn3false){

  removeBtn3false.addEventListener('click', ()=> {
    window.location.href = 'part-4-false.html'
  })
}

