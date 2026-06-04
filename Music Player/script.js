const songs = [

{
    title:"Song: ZAROORAT",
    artist:"Artist: Mithoon | Mustafa Zahid",
    src:"song1.mp3"
},

{
    title:"Song: MEDITATION",
    artist:"Artist: Tanvi Senjaliya",
    src:"song2.mp3"
},

{
    title:"Song: PEACE OF MIND ",
    artist:"Artist: Unknown",
    src:"song3.mp3"
}

];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const duration = document.getElementById("duration");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const playlist = document.getElementById("playlist");

let currentSong = 0;

function loadSong(index){

    audio.src = songs[index].src;
    title.textContent = songs[index].title;
    artist.textContent = songs[index].artist;
}

loadSong(currentSong);

function playPause(){

    if(audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
}

function nextSong(){

    currentSong++;

    if(currentSong >= songs.length){
        currentSong = 0;
    }

    loadSong(currentSong);
    audio.play();
}

function prevSong(){

    currentSong--;

    if(currentSong < 0){
        currentSong = songs.length - 1;
    }

    loadSong(currentSong);
    audio.play();
}

audio.addEventListener("timeupdate", () => {

    progress.value =
    (audio.currentTime / audio.duration) * 100 || 0;

    duration.textContent =
    `${formatTime(audio.currentTime)} / ${formatTime(audio.duration || 0)}`;

});

progress.addEventListener("input",()=>{

    audio.currentTime =
    (progress.value / 100) * audio.duration;

});

volume.addEventListener("input",()=>{

    audio.volume = volume.value;

});

audio.addEventListener("ended",()=>{

    nextSong();

});

songs.forEach((song,index)=>{

    let li = document.createElement("li");

    li.textContent =
    `${song.title} - ${song.artist}`;

    li.addEventListener("click",()=>{

        currentSong = index;
        loadSong(index);
        audio.play();

    });

    playlist.appendChild(li);
    function formatTime(seconds){

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

});