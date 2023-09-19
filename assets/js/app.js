// media controllers
const playPause = document.querySelector("#play-stop");
const backward = document.querySelector("#backward");
const forward = document.querySelector("#forward");

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
        name: "Travel Love Beats",
        source: "./assets/music/Travel Love Beats.mp3",
        cover: "./assets/images/chillhop.jpg"
    },
    {
        name: "Night Sky Unreated",
        source: "./assets/music/Night Sky.mp3",
        cover: "./assets/images/chillhop-2.jpg"
    },
    {
        name: "Be a Music",
        source: "./assets/music/Be a Music.mp3",
        cover: "./assets/images/chillhop-3.jpg"
    },
    {
        name: "Slow Day",
        source: "./assets/music/Slow Day.mp3",
        cover: "./assets/images/chillhop-4.jpg"
    },
    {
        name: "Carti Mangolia",
        source: "./assets/music/Carti mangolia.mp3",
        cover: "./assets/images/chillhop-2.jpg"
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
        li.addEventListener('click', () => {
            songIndex = index;
            isPlaying = false;
            loadMusic(song).then(() => playSong());
        });
        append(li,h3);
        append(ul,li)
    })
    append(musicbox, ul);
}

let songIndex = 0;
// preloaded song
loadMusic(songList[songIndex]);


function loadMusic(song) {
    return new Promise((resolve) => {
        coverArt.src = song.cover;
        songName.innerText = song.name;
        audio.src = song.source;
        console.log(audio.currentTime)
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
}

function backPlay() {
    songIndex--;
    if(songIndex < 0) {
        songIndex = songList.length - 1;
    }
    isPlaying = false;
    loadMusic(songList[songIndex]).then(() => playSong());

}
function playHandler() {
    isPlaying = !isPlaying;
    isPlaying ? pauseSong() : playSong();
}


// player event
playPause.addEventListener("click", playHandler);
backward.addEventListener("click", backPlay);
forward.addEventListener("click", nextPlay);

createPlayList()
