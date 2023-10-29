//2019.12.21 0.1
var G_track_N = 0;
var RND_Audio = false;
var HNY_tracks = [];

var MIN_tracks = ["audio/Jingle_Bells.mp3",
    "audio/magic moments.mp3",
    "audio/hny1.mp3",
    "audio/Попурри1.mp3",
    "audio/Metal_Cover.mp3",
    "audio/hny_abba.mp3",
    "audio/novogod_igr.mp3",
    "audio/We_Wish_You_A_MC.mp3",
    "audio/Deck The Hall - Nat King Cole.mp3",
    "audio/Jingle Bells (Japanese version).mp3",

    "audio/Last_Christmas.mp3",
    "audio/Ulibnutsj.mp3",
    "audio/99Аранжировка.mp3",
    "audio/End Title.mp3",
    "audio/Jingle Bell Rock.mp3",
    "audio/Louis Armstrong - Winter Wonderland.mp3",
    "audio/Снег над Ленинградом.mp3",
    "audio/Танец феи Драже.mp3",
    "audio/Veselaya.mp3"
];

var EXT_tracks = ["https://monfon.org/dl/546855083/Brenda_Lee_-_Rockin_Around_the_Christmas_Tree_(monfon.org).mp3",
    "https://monfon.org/dl/1369018655/Gene_Autry_-_Rudolph_the_Red_Nosed_Reindeer_(monfon.org).mp3",
    "https://monfon.org/dl/1851383994/Gene_Autry_-_Frosty_the_Snowman_(monfon.org).mp3",
    "https://monfon.org/dl/333323380/Bing_Crosby_-_Sleigh_Ride_(monfon.org).mp3",
    "https://monfon.org/dl/1096697910/Nat_King_Cole_-_The_Christmas_Song_Chestnuts_Roasting_on_an_Open_Fire_(monfon.org).mp3",
    "https://monfon.org/dl/1994294768/Bing_Crosby_-_Im_Dreaming_of_a_White_Christmas_(monfon.org).mp3",
    "https://monfon.org/dl/610185650/Frank_Sinatra_-_Mistletoe_and_Holly_(monfon.org).mp3",
    "https://monfon.org/dl/1776217452/Eartha_Kitt_-_Santa_Baby_(monfon.org).mp3",
    "https://monfon.org/dl/1918865066/Dean_Martin_-_Baby_Its_Cold_Outside_(monfon.org).mp3",
    "https://monfon.org/dl/1486857355/Doris_Day_-_Here_Comes_Santa_Claus_(monfon.org).mp3",
    "https://monfon.org/dl/236965957/Frank_Sinatra_-_Santa_Claus_Is_Coming_to_Town_(monfon.org).mp3",
    "https://monfon.org/dl/865864711/Pat_Boone_-_Here_Comes_Santa_Claus_(monfon.org).mp3",
    "https://monfon.org/dl/1629239745/Nat_King_Cole_-_Frosty_the_Snowman_(monfon.org).mp3",
    "https://monfon.org/dl/1214013346/Alma_Cogan_-_Never_Do_a_Tango_with_an_Eskimo_(monfon.org).mp3",
    "https://monfon.org/dl/1142726973/Dean_Martin_-_Ive_Got_My_Love_to_Keep_Me_Warm_(monfon.org).mp3",
    "https://monfon.org/dl/161274623/Doris_Day_-_Ol_Saint_Nicholas_(monfon.org).mp3",
    "https://monfon.org/dl/1058870969/Ella_Fitzgerald_-_Santa_Claus_Got_Stuck_in_My_Chimney_(monfon.org).mp3",
    "https://monfon.org/dl/1822245499/Teresa_Brewer_-_I_Saw_Mommy_Kissing_Santa_Claus_(monfon.org).mp3",
    "https://monfon.org/dl/1272797268/Ella_Fitzgerald_Bing_Crosby_-_Its_A_Marshmallow_World_(monfon.org).mp3",

    "https://monfon.org/dl/528615255/Bing_Crosby_-_Auld_Lang_Syne_(monfon.org).mp3",
    "https://cdn.mp3xa.me/f878oPgCtd55H1cr0eb7uA/1576685114/L21wMy8yMDE0LzAxL0JyeWFuIEFkYW1zIC0gTWVycnkgQ2hyaXN0bWFzLm1wMw",
    "https://cdn.mp3xa.me/D0RTG-y4EqLR_76ZBQadjg/1576685205/L21wMy8yMDE0LzEyL0dheWFuYSAmIE1hbmEgSXNsYW5kIC0gVGhlIENocmlzdG1hcyBTb25nLm1wMw",
    "https://monfon.org/dl/1658381824/Perry_Como_-_Its_Beginning_to_Look_a_Lot_Like_Christmas_(monfon.org).mp3"
];

document.addEventListener("DOMContentLoaded",
    function (){
        InitTracks();
        var IDaudio = document.getElementsByTagName("audio")[0];
        IDaudio.my_track_N = 0;
        IDaudio.src =  HNY_tracks[ IDaudio.my_track_N ];
        IDaudio.volume = 0.4;
        IDaudio.play();
        console.log("МУЗЫКА старт... "+ IDaudio.src);

        IDaudio.addEventListener("ended", function(){ StepAudio(G_track_N+1); } );
        IDaudio.addEventListener("error", function(){ console.log("Музыка: Ошибка. Пропускаем!!!"); NextAudio(G_track_N+1); } );

        var ID = document.getElementById("audioNext");
        ID.addEventListener("click", function(event){ NextAudio(); }, true);
        ID = document.getElementById("audioRnd");
        ID.addEventListener("click", function(event){ RndAudio(); }, false);
        ID = document.getElementById("audioExt");
        ID.addEventListener("click", function(event){ ExtendTracks(); }, true);
        ID = document.getElementById("audioIni");
        ID.addEventListener("click", function(event){ InitTracks(); }, true);
    }
);


function StepAudio(N){
    if ( RND_Audio ) RndAudio(N);
    else NextAudio(N);
}

function NextAudio(N){
    var IDaudio = document.getElementsByTagName("audio")[0];
    if( N == undefined ) {
        G_track_N = (G_track_N + 1 ) % HNY_tracks.length;
    }
    else{
        G_track_N = N % HNY_tracks.length;
    }
    var S = HNY_tracks[ G_track_N ];
    if ( S !== undefined ){
        IDaudio.src =  S;
        IDaudio.play();
        console.log("МУЗЫКА: "+G_track_N+") "+ IDaudio.src);
    }
    else
        console.log("МУЗЫКА: "+G_track_N+" неопределено!!!" );
    if( G_track_N == NaN ) G_track_N = 0;
    RND_Audio = false;
}


function RndAudio(){
    var IDaudio = document.getElementsByTagName("audio")[0];
    var R = Math.round(Math.random()*HNY_tracks.length/4+1);
    G_track_N = (G_track_N + R ) % HNY_tracks.length;
    IDaudio.src =  HNY_tracks[ G_track_N ];
    IDaudio.play();
    console.log("МУЗЫКА: "+G_track_N+") "+ IDaudio.src);
    RND_Audio = true;
}


function InitTracks(){
    HNY_tracks = [];
    HNY_tracks = HNY_tracks.concat(MIN_tracks);
    console.log("МУЗЫКА: "+ HNY_tracks);
}

function ExtendTracks(){
    HNY_tracks = HNY_tracks.concat(EXT_tracks);
    console.log("МУЗЫКА: "+ HNY_tracks);
}

document.addEventListener('keydown', function(event) {
    if (event.code == 'KeyN') {
        NextAudio();
    }
    if (event.code == 'KeyR') {
        RndAudio();
    }
    if (event.code == 'KeyE') {
        ExtendTracks();
    }
    if (event.code == 'KeyS') {
        InitTracks();
    }
});

