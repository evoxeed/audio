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
    audioPlayer.src = audioTracks[trackNumber];
    audioPlayer.volume = 0.4;
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

function nextAudio() {
    const audioPlayer = document.getElementsByTagName("audio")[0];
    trackNumber = (trackNumber + 1) % audioTracks.length;
    let S = audioTracks[trackNumber];
    if (S !== undefined) {
        audioPlayer.src = S;
        audioPlayer.play();
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
