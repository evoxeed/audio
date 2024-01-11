function insertHTML() {
    let htmlScript = `
    <fieldset class="audio-player">
        <legend class="audio-player"> Управление музыкой</legend>
        <audio style="display:none;" controls=""
               src="https://informat.name/hny/audio/Jingle Bells (Japanese version).mp3">
            Ваш браузер не поддерживает тег audio!
        </audio>
        <div id="customAudioPlayer">
            <button id="playBtn">Играть</button>
            <span id="currentTime">00:00</span>
            <div id="progress"><div class="progress-bar"></div></div>
            <span id="totalDuration">00:00</span>
            <div id="volumeContainer">
                <img id="volumeIcon" src="./assets/images/volume.png" height="30">
                <div id="sliderContainer">
                    <input id="volumeControl" type="range" min="0" max="1" step="0.01">
                </div>
            </div>
        </div>
        <div class="audio-player__btn">
            <nobr>
                <button class="audio-player" id="audioNext">N</button><span>&nbsp;-&nbsp;следующая мелодия.</span>
            </nobr>
            <nobr>
                <button class="audio-player" id="audioRnd">R</button><span>&nbsp;-&nbsp;случайная мелодия.</span>
            </nobr>
            <nobr>
                <button class="audio-player" id="audioExt">E</button><span>&nbsp;-&nbsp;добавить мелодий.</span>
            </nobr>
            <nobr>
                <button class="audio-player" id="audioIni">S</button><span>&nbsp;-&nbsp;стандартный набор.</span>
            </nobr>
        </div>
        <div class="audio-player__description">
               <span>N &nbsp;-&nbsp;следующая мелодия.</span>
               <span>R &nbsp;-&nbsp;случайная мелодия.</span>
               <span>E &nbsp;-&nbsp;добавить мелодий.</span>
               <span>S &nbsp;-&nbsp;стандартный набор.</span>
            </div>
    </fieldset>
    `;
    let audioHtml = document.createElement(`div`)
    audioHtml.innerHTML = htmlScript
    let audioSections = document.querySelector('audio');
    audioSections.before(audioHtml);
    audioSections.parentNode.removeChild(audioSections)
}

function handleAudio() {
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
        const volumeControl = document.getElementById('volumeControl');
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

        volumeControl.addEventListener('input', function () {
            audioPlayer.volume = this.value;
        }, false);

        audioPlayer.addEventListener('loadedmetadata', function() {
            if (isNaN(audioPlayer.duration)) {
                totalDurationDisplay.textContent = "00:00";
            } else {
                totalDurationDisplay.textContent = formatSeconds(audioPlayer.duration);
            }
            // audioPlayer.play();
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

        // audioPlayer.play()
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
}
insertHTML();
handleAudio();
