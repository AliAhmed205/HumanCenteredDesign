const removeBtn1 = document.querySelector('.addedClothing1')
const kerst = document.querySelector('.kerst')
const halloween = document.querySelector('.halloween')
const classy = document.querySelector('.classy')
const glitter = document.querySelector('.glitter')
const helder = document.querySelector('.helder')
const finishedBtn = document.getElementById('finish')

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

if (glitter) {
  glitter.addEventListener("focus", function () {
    setTimeout(() => {
      const audio = new Audio();
      audio.src = "../audio/glitters.mp3";
      audio.play();
      audio.loop = false;
      audio.volume = 1;
    }, 1000);
  });
}

if (classy) {
  classy.addEventListener("focus", function () {
    setTimeout(() => {
      const audio = new Audio();
      audio.src = "../audio/noir.mp3";
      audio.play();
      audio.loop = false;
      audio.volume = 1;
    }, 1000);
  });
}

if (kerst) {
  kerst.addEventListener("focus", function () {
    setTimeout(() => {
      const audio = new Audio();
      audio.src = "../audio/kerst.mp3";
      audio.play();
      audio.loop = false;
      audio.volume = .6;
    }, 1000);
  });
}

if (halloween) {
  halloween.addEventListener("focus", function () {
    setTimeout(() => {
      const audio = new Audio();
      audio.src = "../audio/halloween.mp3";
      audio.play();
      audio.loop = false;
      audio.volume = 1;
    }, 1000);
  });
}
if (helder) {
  helder.addEventListener("focus", function () {
    setTimeout(() => {
      const audio = new Audio();
      audio.src = "../audio/helder.mp3";
      audio.play();
      audio.loop = false;
      audio.volume = 1;
    }, 1000);
  });
}

if (finishedBtn){
    finishedBtn.addEventListener('click', function (){
    console.log('clicked!')
    const audio = new Audio()
    audio.src = "../audio/completion.mp3"
    audio.play()
    audio.loop = false
    audio.volume = 1;
  })
}
