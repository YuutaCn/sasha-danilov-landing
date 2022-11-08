const player = document.querySelector('.player'),
  playBtn = document.querySelector('.player__cover-pause'),
  progressBar = document.querySelector('.player__info-nav-controls-progress'),
  pauseBtn = document.querySelector('.player__cover-pause'),
  presentTime = document.querySelector('.player__info-nav-time-present'),
  fullTime = document.querySelector('.player__cover-pause'),
  volumeBtn = document.querySelector('.player__info-nav-controls-volume-btn'),
  volumeSelect = document.querySelector('.player__info-nav-controls-volume-select'),
  audio = document.querySelector('.player__audio'),
  changeOnList = document.querySelector('.player__select-list-item-href')

let playerStatus = false;
let volumeStatus = true;

// Play/Pause compositions
function playComposition() {
  if (playerStatus === false) {
    audio.play();
    playerStatus = true;
    document.querySelector('.player__cover-pause-svg-play').classList.add('--disable');
    document.querySelector('.player__cover-pause-svg-pause').classList.remove('--disable');
    changeOnList.classList.add('--active');
  } else {
    audio.pause();
    playerStatus = false;
    document.querySelector('.player__cover-pause-svg-play').classList.remove('--disable');
    document.querySelector('.player__cover-pause-svg-pause').classList.add('--disable');
  }
}

playBtn.addEventListener('click', playComposition);

// change on list
changeOnList.addEventListener('click', playComposition);

// Progress bar
audio.addEventListener('timeupdate', function(e) {
  const { duration, currentTime } = e.srcElement;
  progressBar.value = (currentTime / duration) * 100;

  if (currentTime >= duration) {
    playComposition()
    audio.currentTime = 0;
    changeOnList.classList.remove('--active');
  }
});

// Change time
progressBar.oninput = function () {
  if (audio.surrentTime === 0) {
    audio.play();
    playerStatus = true;
  }
  audio.pause();
  playerStatus = false;
  audio.currentTime = this.value / 100 * audio.duration;
};

progressBar.onchange = function () {
  audio.play();
  playerStatus = true;
};

// mute compasition
volumeBtn.addEventListener('click', function(){
  if (volumeStatus === true) {
    audio.volume = 0;
    volumeStatus = false;
    volumeSelect.value = 0;
    document.querySelector('.player__info-nav-controls-volume-btn-svg').innerHTML = `<use xlink:href="img/sprite.svg#sound-mute"></use>`;
  } else {
    volumeSelect.value = localStorage.getItem('volume');
    audio.volume = volumeSelect.value / 100;
    volumeStatus = true;
    document.querySelector('.player__info-nav-controls-volume-btn-svg').innerHTML = `<use xlink:href="img/sprite.svg#sound-nonmute"></use>`;
  };
});

// select volume
volumeSelect.oninput = function(el) {
  audio.volume = volumeSelect.value / 100
  // console.log(volumeSelect.value / 100)
  if (volumeSelect.value == 0) {
    volumeStatus = false;
    document.querySelector('.player__info-nav-controls-volume-btn-svg').innerHTML = `<use xlink:href="img/sprite.svg#sound-mute"></use>`;
  } else {
    volumeStatus = true;
    document.querySelector('.player__info-nav-controls-volume-btn-svg').innerHTML = `<use xlink:href="img/sprite.svg#sound-nonmute"></use>`;
  };
};

// update volume
volumeSelect.value = localStorage.getItem('volume');
audio.volume = volumeSelect.value / 100;

// save volume settings
setInterval(() => {
  if (volumeSelect.value > 5) {
    localStorage.setItem('volume', volumeSelect.value);
  };
}, 1007);
