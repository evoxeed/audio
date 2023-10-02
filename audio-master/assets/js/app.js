// media controllers
const playPause = document.querySelector("#play-stop");
const backward = document.querySelector("#backward");
const forward = document.querySelector("#forward");
let importButton = document.querySelector("#importButton")
let importInput = document.querySelector("#importInput")
// record player animation
const circleBig = document.querySelector("#circle-bg");
const circleSm = document.querySelector("#circle-sm");

// playing song
const songName = document.querySelector("#song-name");
const audio = document.querySelector("#audio");
const coverArt = document.querySelector("#cover");
const musicbox = document.querySelector("#musicbox");

// control button images
let playImg = "./assets/images/play.svg";
let pauseImg = "./assets/images/pause.svg";

// default controls
playPause.src = playImg;
let isPlaying = true;

const songList = [
    {
        name: "Jingle Bell Rock",
        source: "./assets/music/Jingle Bell Rock.mp3",
        cover: "./assets/images/pic1.jpg"
    },
    {
        name: "Happy New Year",
        source: "./assets/music/Happy New Year.mp3",
        cover: "./assets/images/pic2.jpg"
    },
    {
        name: "Last Christmas!",
        source: "./assets/music/Last Christmas.mp3",
        cover: "./assets/images/pic3.jpg"
    },
    {
        name: "Let It Snow!",
        source: "./assets/music/Let It Snow!.mp3",
        cover: "./assets/images/pic4.jpg"
    },
    {
        name: "Песенка о медведях",
        source: "./assets/music/Песенка о медведях.mp3",
        cover: "./assets/images/pic5.jpg"
    }
];
// helper function
function createEle(ele) {
    return document.createElement(ele);
}
function append(parent, child) {
    return parent.append(child);
}
// creating track list
const ul = createEle('ul')
function createPlayList() {
    songList.forEach((song, index) => {
        let h3 = createEle('h3');
        let li = createEle('li');

        li.classList.add("track-item");
        h3.innerText = song.name;
        li.setAttribute('id', 'track-' + index);
        li.addEventListener('click', () => {
            songIndex = index;
            isPlaying = false;
            loadMusic(song).then(() => playSong());
            markTrack(songIndex);
        });
        append(li,h3);
        append(ul,li)
    })
    append(musicbox, ul);
}

let songIndex = 0;
// preloaded song
loadMusic(songList[songIndex]);

function markTrack(activeIndex) {
    let prevActive = document.querySelector('.active-track');
    if(prevActive) {
        prevActive.classList.remove('active-track');
    }
    let activeTrack = document.querySelector('#track-' + activeIndex);
    if (activeTrack) {
        activeTrack.classList.add('active-track');
    }
}
function loadMusic(song) {
    return new Promise((resolve) => {
        coverArt.src = song.cover;
        songName.innerText = song.name;
        audio.src = song.source;
        audio.onloadeddata = () => {
            resolve();
        };
    });
}

function playSong() {
    playPause.src = pauseImg;
    circleBig.classList.add("animate");
    circleSm.classList.add("animate");

    audio.play();
}

function pauseSong() {
    playPause.src = playImg;
    circleBig.classList.remove("animate");
    circleSm.classList.remove("animate");

    audio.pause();
}

function nextPlay() {
    songIndex++;
    if(songIndex > songList.length - 1) {
        songIndex = 0;
    }
    isPlaying = false;
    loadMusic(songList[songIndex]).then(() => playSong());
    markTrack(songIndex);
}

function backPlay() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songList.length - 1;
    }
    isPlaying = false;
    loadMusic(songList[songIndex]).then(() => playSong());
    markTrack(songIndex);
}
function playHandler() {
    isPlaying = !isPlaying;
    isPlaying ? pauseSong() : playSong();
}

importButton.addEventListener('click', () => {
    importInput.click();
});

const removeExtension = filename => filename.slice(0, filename.lastIndexOf("."));

importInput.addEventListener('change', () => {
    let selectedFile = importInput.files[0];
    if (!selectedFile) {
        console.error('Файл не найден');
        return;
    }
    let songUrl = URL.createObjectURL(selectedFile); // Создаем ссылку на тот самый файл

    // Добавляем песню в список песен
    let importedSong = {
        name: removeExtension(selectedFile.name),
        source: songUrl, // используем созданную ссылку в качестве источника песни
        cover: './assets/images/default.jpg' // можно установить изображение по умолчанию
    };
    songList.push(importedSong);

    // Очищаем и пересоздаем список песен с добавленной песней
    ul.innerHTML = '';
    createPlayList();
    importInput.value = '';
});


// player event
playPause.addEventListener("click", playHandler);
backward.addEventListener("click", backPlay);
forward.addEventListener("click", nextPlay);
// Переключает к следующему треку после окончания текущего
audio.addEventListener("ended", nextPlay);

createPlayList()
markTrack(songIndex);
