let trackNumber = 0;
let randomAudioToggle = false;
let audioTracks = [];
const urlAudio = "";

const MIN_tracks = [
    "./assets/music/Jingle Bell Rock.mp3",
    "./assets/music/Happy New Year.mp3",
    "./assets/music/Last Christmas.mp3",
    "./assets/music/Let It Snow!.mp3",
    "./assets/music/Песенка о медведях.mp3",

];
const EXT_tracks = [
    "https://informat.name/hny/2019/audio/hny.mp3"
];

window.addEventListener("DOMContentLoaded", function () {
    initializeTracks();
    const audioPlayer = document.getElementsByTagName("audio")[0];
    const volumeContainer = document.getElementById('volumeContainer');
    const volumeBar = volumeContainer.querySelector('.volume-bar');
    const progressContainer = document.getElementById('progress');
    const progressBar = progressContainer.querySelector('.progress-bar');
    const currentTimeDisplay = document.getElementById('currentTime');
    const totalDurationDisplay = document.getElementById('totalDuration');
    const playBtn = document.getElementById('playBtn');

    audioPlayer.src = audioTracks[trackNumber];
    audioPlayer.volume = 0.4;

    playBtn.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
    });

    audioPlayer.addEventListener('play', () => {
        playBtn.textContent = 'Пауза';
    });

    audioPlayer.addEventListener('pause', () => {
        playBtn.textContent = 'Играть';
    });

    audioPlayer.addEventListener('volumechange', function () {
        volumeBar.style.height = (audioPlayer.volume * 100) + '%';
    }, false);

    audioPlayer.addEventListener('loadedmetadata', function() {
        if (isNaN(audioPlayer.duration)) {
            totalDurationDisplay.textContent = "00:00";
        } else {
            totalDurationDisplay.textContent = formatSeconds(audioPlayer.duration);
        }
        audioPlayer.play();
    });

    audioPlayer.addEventListener('timeupdate', function() {
        currentTimeDisplay.textContent = formatSeconds(audioPlayer.currentTime);
        progressBar.style.width = ((audioPlayer.currentTime / audioPlayer.duration) * 100) + '%';
    });

    progressContainer.addEventListener('click', function(e) {
        let rect = progressContainer.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let ratio = x / rect.width;
        audioPlayer.currentTime = ratio * audioPlayer.duration;
    });

    volumeContainer.addEventListener('click', function(e) {
        let rect = volumeContainer.getBoundingClientRect();
        let y = e.clientY - rect.top;
        let ratio = y / rect.height;
        audioPlayer.volume = 1 - ratio;
    });

    audioPlayer.play()
    audioPlayer.addEventListener("ended", function () {
        stepAudio(trackNumber + 1);
    });
    audioPlayer.addEventListener("error", function () {
        console.log("Музыка: Ошибка. Пропускаем!!!");
        nextAudio(trackNumber + 1);
    });

    document.getElementById("audioNext").addEventListener("click", nextAudio);
    document.getElementById("audioRnd").addEventListener("click", randomAudio);
    document.getElementById("audioExt").addEventListener("click", extendTracks);
    document.getElementById("audioIni").addEventListener("click", initializeTracks);
});

function stepAudio(N) {
    randomAudioToggle ? randomAudio(N) : nextAudio(N);
}

function formatSeconds(seconds) {
    let minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds - minutes * 60);
    return `${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : '' + number;
}

function nextAudio() {
    const audioPlayer = document.getElementsByTagName("audio")[0];
    trackNumber = (trackNumber + 1) % audioTracks.length;
    let S = audioTracks[trackNumber];
    if (S !== undefined) {
        audioPlayer.src = S;
        // audioPlayer.play();
        console.log("МУЗЫКА: " + trackNumber + ") " + audioPlayer.src);
    } else {
        console.log("МУЗЫКА: " + trackNumber + " неопределено!!!");
    }
    randomAudioToggle = false;
}

function randomAudio() {
    const audioPlayer = document.getElementsByTagName("audio")[0];
    let R = Math.floor(Math.random() * audioTracks.length);
    trackNumber = R;
    audioPlayer.src = audioTracks[trackNumber];
    audioPlayer.play();
    console.log("МУЗЫКА: " + trackNumber + ") " + audioPlayer.src);
    randomAudioToggle = true;
}

function initializeTracks() {
    audioTracks = MIN_tracks.map(track => urlAudio + track);
    console.log("МУЗЫКА: " + audioTracks);
}

function extendTracks() {
    audioTracks = audioTracks.concat(EXT_tracks);
    console.log("МУЗЫКА: " + audioTracks);
}

document.addEventListener('keydown', function (event) {
    if (event.code === 'KeyN') {
        nextAudio();
    }
    if (event.code === 'KeyR') {
        randomAudio();
    }
    if (event.code === 'KeyE') {
        extendTracks();
    }
    if (event.code === 'KeyS') {
        initializeTracks();
    }
});
