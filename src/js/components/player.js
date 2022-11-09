const player = document.querySelector('.player'),
  playBtn = document.querySelector('.player__cover-pause'),
  progressBar = document.querySelector('.player__info-nav-controls-progress'),
  pauseBtn = document.querySelector('.player__cover-pause'),
  presentTime = document.querySelector('.player__info-nav-time-present'),
  fullTime = document.querySelector('.player__info-nav-time-full'),
  volumeBtn = document.querySelector('.player__info-nav-controls-volume-btn'),
  volumeSelect = document.querySelector('.player__info-nav-controls-volume-select'),
  audio = document.querySelector('.player__audio')

let playerStatus = false;
let volumeStatus = true;

// update volume
volumeSelect.value = localStorage.getItem('volume');
audio.volume = volumeSelect.value / 100;

// save volume settings
setInterval(() => {
  if (volumeSelect.value > 5) {
    localStorage.setItem('volume', volumeSelect.value);
  };
}, 1007);

// Play/Pause compositions
function playComposition() {
  if (playerStatus === false) {
    audio.play();
    playerStatus = true;
    document.querySelector('.player__cover-pause-svg-play').classList.add('--disable');
    document.querySelector('.player__cover-pause-svg-pause').classList.remove('--disable');
    document.querySelector('.player__cover-pause-svg-pause').classList.add('--active');
    setTimeout(() => {
      updateFullTime(fullTime, audio.duration);
    }, 1000);
  } else {
    audio.pause();
    playerStatus = false;
    document.querySelector('.player__cover-pause-svg-play').classList.remove('--disable');
    document.querySelector('.player__cover-pause-svg-pause').classList.add('--disable');
    document.querySelector('.player__cover-pause-svg-pause').classList.remove('--active');
  }
}

playBtn.addEventListener('click', playComposition);

// change on list

// Progress bar
audio.addEventListener('timeupdate', function(e) {
  const { duration, currentTime } = e.srcElement;
  progressBar.value = (currentTime / duration) * 100;
  updateFullTime(presentTime, audio.currentTime);

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
  document.querySelector('.player__cover-pause-svg-play').classList.remove('--disable');
  document.querySelector('.player__cover-pause-svg-pause').classList.add('--disable');
  document.querySelector('.player__cover-pause-svg-pause').classList.remove('--active');
  playerStatus = false;
  audio.currentTime = this.value / 100 * audio.duration;
};

progressBar.onchange = function () {
  audio.play();
  document.querySelector('.player__cover-pause-svg-play').classList.add('--disable');
  document.querySelector('.player__cover-pause-svg-pause').classList.remove('--disable');
  document.querySelector('.player__cover-pause-svg-pause').classList.add('--active');
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
  audio.volume = volumeSelect.value / 100;
  if (volumeSelect.value == 0) {
    volumeStatus = false;
    document.querySelector('.player__info-nav-controls-volume-btn-svg').innerHTML = `<use xlink:href="img/sprite.svg#sound-mute"></use>`;
  } else {
    volumeStatus = true;
    document.querySelector('.player__info-nav-controls-volume-btn-svg').innerHTML = `<use xlink:href="img/sprite.svg#sound-nonmute"></use>`;
  };
};

// time update
function updateFullTime(el, time) {
  let min10 = Math.floor(time / 600);
  let min1 = Math.floor(time / 60);
  let sec10 = Math.floor(time % 60 / 10);
  let sec1 = Math.floor(time % 10);
  el.innerHTML = `${min10}${min1}:${sec10}${sec1}`
}
