const menuBtn = document.querySelector(".menu-btn"),
  container = document.querySelector(".container");

const progressBar = document.querySelector(".bar"),
  progressDot = document.querySelector(".dot"),
  currentTimeEl = document.querySelector(".current-time"),
  DurationEl = document.querySelector(".duration");

menuBtn.addEventListener("click", () => {
  container.classList.toggle("active");
});

let playing = false,
  currentSong = 0,
  shuffle = false,
  repeat = false,
  favourites = [],
  audio = new Audio();

const songs = [
  {
    title: "Keep You Safe",
    artist: "Yahya",
    img_src: "/mine/MeandU/assets/mylope.jpg",
    src: "https://audio.jukehost.co.uk/DMrzK6lZSBdVpcqY0pPmJ7rCcUOJMJO9",
  },
  {
    title: "Mantra Hujan",
    artist: "Kobo Kanaeru",
    img_src: "/mine/MeandU/assets/kobo.jpeg",
    src: "https://audio.jukehost.co.uk/zZapAf3lSCf1dLMhTf8zDgnlc1aheqOw",
  },

  {
    title: "Say SO - Doja Cat (cover)",
    artist: "Rainych",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/p2p5gvge1y01eq8lqbj6a/Rainych-SAY-SO-Doja-Cat-Japanese-Version-cover.mp3?rlkey=hfovtwm8zp5j0rtgp607wr5hw&st=qt9fdmpe&                                                                                                                                      ",
  },

  {
    title: "From The Start",
    artist: "Laufey",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/ayh8lxufzm1ga3puwcxr1/laufey-From-The-Start-Lyrics.mp3?rlkey=djrzy4cblhtrm4lk5bblk0el3&st=6ux82555&",
  },
  {
    title: "It Will Rain",
    artist: "Bruno Mars",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/l8w12hlukmwtuj2lyvhcf/Bruno-Mars-It-Will-Rain-Official-Music-Video.mp3?rlkey=79bgci43sk5249xz8cnkdl1ht&st=q5dty3qn&",
  },
  {
    title: "Hadal Ahbek",
    artist: "Issam Alnajjar",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/zc1fjmajfg4f58fuk05sa/Issam-Alnajjar-Hadal-Ahbek-Performance-Video.mp3?rlkey=1ni7u1rphqrqgpc101xevth2r&st=un56txb7&",
  },
  {
    title: "Nandemonaiya - (cover)",
    artist: "Mone Kamishiraisi",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/01kkur35j5pf6e6qh2wd4/Japanese-soft-song-Nandemonaiya-Mone-Kamishiraishi-Mitsuha-Lyrics-Video.mp3?rlkey=5r2y8bav3usy4zgdnumxeiz2e&st=64kgk1xz&",
  },
  {
    title: "Blue",
    artist: "Keshi",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/c75blkdp532a6qmztlf1b/keshi-blue.mp3?rlkey=rn3x6ajjbev0qntcmaf4j0o1a&st=m4ix6fao&",
  },
  {
    title: "Understand",
    artist: "Keshi",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/lmvw9xn7fa3jp39jcs9pc/keshi-UNDERSTAND-Lyric-Video.mp3?rlkey=g071g2mjj2qw776sbelizamrz&st=y12dxfvt&",
  },
  {
    title: "Fly Me To The Moon",
    artist: "The Macarons Project",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/pa68rnnt4mejxq01h8fbo/spotifydown.com-Fly-Me-to-the-Moon.mp3?rlkey=4gr9bay5vmqbo6k0gll1wpzz1&st=b3r3ynh8&",
  },
  {
    title: "Matcha Puff!",
    artist: "Heiakim, Chevy",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/x0idhqv5sqv12jicweosn/spotifydown.com-Matcha-Puff.mp3?rlkey=vao86rzai3st9pkevtoyydvkq&st=eos2n5ws&",
  },
  {
    title: "Youre Here Thats The Thing-",
    artist: "Beabadoobee",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/7ic0px60nyltj0dystg8x/spotifydown.com-You-re-here-that-s-the-thing.mp3?rlkey=zwbusx3f6878680oifme6veu3&st=hzyngbvp&",
  },
  {
    title: "Lets Love",
    artist: "Suho ",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/yck2ie6xdk6u067gxjbps/SUHO-Let-s-Love-MV.mp3?rlkey=0xy89lwm03cd5qp3g3un9ojlh&st=vnbdcb0u&",
  },
  {
    title: "Wait",
    artist: "Exo",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/2vimhs4y5nttyc79rm5zt/Wait.mp3?rlkey=kfh5j08o56g4p65zeqwkwcu3a&st=dg9zbg8g&",
  },
  {
    title: "Dont Go",
    artist: "Exo",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/jpv5xynyfii0fvhci9c57/Don-t-Go.mp3?rlkey=h79izbghc39j7x1xfxshe2gf1&st=e1sn4561&",
  },
  {
    title: "「ひまわりの約束」",
    artist: "秦 基博",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/yk569fpqhnu1m2pajp93i/Music-Video.mp3?rlkey=nq3vpxy4mkhnb030hhq33qg7l&st=9wff3rn0&",
  },
  {
    title: "Odoriko",
    artist: "Vaundy",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/9xdx9t1ya9mv1n77sks0s/Vaundy-odoriko.mp3?rlkey=e053qgwi3nkgxtqpsvx3r0jjg&st=goyx9bwn&",
  },

  {
    title: "You're Mine",
    artist: "Vestia Zeta",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/v9tm4fwqhd7gfkckigrkl/Vestia-Zeta-You-re-Mine.mp3?rlkey=38z0filza1dzjc87tj4y2r9pu&st=wjwzn8xl&",
  },
  {
    title: "If I Could Ride a Bike",
    artist: "Park Bird, Chevy",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/q81kcz2r56xum7g4ld5ir/Park-Bird-Chevy-If-I-Could-Ride-a-Bike.mp3?rlkey=s4a53dg3272rgj08ose32bjjl&st=wh9gftvv&",
  },
  {
    title: "Never Mine",
    artist: "After Nourway",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/t2hlfh1qhd6uzz8tzk7yz/Never-Mine-After-Nourway-LirikTerjemahan.mp3?rlkey=gvl4vab0llyvog714ehui7fpt&st=c3by66mu&",
  },
  {
    title: "Take A Chance With Me",
    artist: "NIKI",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/fbizgx3pqkg1mmtwbo0d1/NIKI-Take-A-Chance-With-Me-Official-Lyric-Video.mp3?rlkey=su9e3b5ms6n4n1swlaqomz7fd&st=3ty2zz40&",
  },
  {
    title: "Best Friend",
    artist: "Rex Orange County",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/jujfwvp9mwozmctljya0t/Rex-Orange-County-Best-Friend-Official-Audio.mp3?rlkey=61skdypa1gouu2gwb4rvugqzw&st=sa8g6ujs&",
  },
  {
    title: "Snooze",
    artist: "Sza",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/4ds9l0t6y55sml73oqddq/SZA-Snooze-Audio.mp3?rlkey=pv5raf0r39btj7eluvpiaew55&st=x4szt0sj&",
  },
  {
    title: "Im Yours",
    artist: "Jason Mraz",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/y5pzskyl4rtgud3o5hbfy/Jason-Mraz-I-m-Yours-Official-Video-4K-Remaster.mp3?rlkey=g0abznckwgv6b5sl05nvzbhgw&st=m4wrbps4&",
  },
  {
    title: "Jadian Yuk",
    artist: "Chloe Pawapua",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/l4nr6l78wg6fivias35dr/Chloe-Pawapua-Jadian-Yuk.mp3?rlkey=e2mtf2jprhrplepm2p8t6vjvl&st=2mrg6ll4&",
  },
  {
    title: "Tolong",
    artist: "Budi Doremi",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/k8a5sao7a9zhdnvysbc9g/Budi-Doremi-Tolong-Official-Lyric-Video.mp3?rlkey=y0qpogyd4xhai06klchq0lz1j&st=e9gdndae&",
  },
  {
    title: "Seberkas Sinar",
    artist: "Nike Ardilla",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/qsrz2ssgsawlcl1fw13ar/Nike-Ardilla-Seberkas-Sinar.mp3?rlkey=fupqlpjlj4u3109vpj9l59m9w&st=xp47z0t2&",
  },
  {
    title: "Tiba Tiba Cinta Datang (Cover)",
    artist: "Pelin",
    img_src: "/MeandU/assets/ltc.jpeg",
    src: "https://dl.dropbox.com/scl/fi/u0it0fwqzie1p468txknv/Tiba-tiba-Cinta-Datang-cover-by-Pelin.mp3?rlkey=n1ffvkczeltqerrsr372lh5bm&st=kix7ynkf&",
  },
];

const playlistContainer = document.querySelector("#playlist"),
  infoWrapper = document.querySelector(".info"),
  coverImage = document.querySelector(".cover-image"), // added comma here
  currentSongTitle = document.querySelector(".current-song-title"),
  currentFavourite = document.querySelector("#current-favourite");

function init() {
  updatePlaylist(songs);
  loadSong(currentSong);
}
init();

function updatePlaylist(songs) {
  //remove any existing element
  playlistContainer.innerHTML = ""; // removed space here
  //use for each on songs array
  songs.forEach((song, index) => {
    //extract data from song
    const { title, src } = song;
    //check if included in favourites array
    const isFavourite = favourites.includes(index);
    // create a tr to wrappe song
    const tr = document.createElement("tr");
    tr.classList.add("song");
    tr.innerHTML = `
    <td class="no">
      <h5>${index + 1}</h5>
    </td>
    <td class="title">
      <h6>${title}</h6>
    </td>
    <td class="length">
      <h5>2:03</h5>
    </td>
    <td>
      <i class="fas fa-heart ${isFavourite ? "active" : ""}"></i>
    </td>
    `;

    playlistContainer.appendChild(tr);

    // play song when clicked on playlist songs
    tr.addEventListener("click", (e) => {
      // add to favourites
      if (e.target.classList.contains("fa-heart")) {
        addToFavourite(index);
        e.target.classList.toggle("active");
        // if heart clicked just add to fav dont play
        return;
      }
      currentSong = index;
      loadSong(currentSong);
      audio.play();
      container.classList.remove("active");
      playPauseBtn.classList.replace("fa-play", "fa-pause");
      playing = true;
    });

    const audioForDuration = new Audio(src);
    audioForDuration.addEventListener("loadedmetadata", () => {
      const duration = audioForDuration.duration;

      let songDuration = formatTime(duration);
      tr.querySelector(".length h5").innerText = songDuration; // removed space here
    });
  });
}

function formatTime(time) {
  //format time like 2:30
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  //add traling zero if seconds less than 10
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}

function loadSong(num) {
  //change all the title artist and times to current song
  infoWrapper.innerHTML = `
  <h2>${songs[num].title}</h2>
  <h3>${songs[num].artist}</h3>
  `;

  currentSongTitle.innerHTML = songs[num].title;

  //change the cover image
  coverImage.style.backgroundImage = `url(${songs[num].img_src})`; // removed "data/" here

  //add src of current song to audio variable
  audio.src = songs[num].src; // removed "data/" here

  // if song is in favourite highlight
  if (favourites.includes(num)) {
    currentFavourite.classList.add("active");
  } else {
    //  if not remove active
    currentFavourite.classList.remove("active");
  }
}

// funciton play pause next prev

const playPauseBtn = document.querySelector("#playpause"),
  nextBtn = document.querySelector("#next"),
  prevBtn = document.querySelector("#prev");

playPauseBtn.addEventListener("click", () => {
  if (playing) {
    // pause if already playing
    playPauseBtn.classList.replace("fa-pause", "fa-play");
    playing = false;
    audio.pause();
  } else {
    // if not playing play
    playPauseBtn.classList.replace("fa-play", "fa-pause"); // fixed typo here
    playing = true;
    audio.play();
  }
});

function nextSong() {
  //shuffle when playing next song
  if (shuffle) {
    shuffleFunc();
    loadSong(currentSong);
  }

  //if current song is not last in playlist
  if (currentSong < songs.length - 1) {
    //load the next song
    currentSong++;
  } else {
    currentSong = 0;
  }
  loadSong(currentSong);
  //after load if song was playing keep playing current too
  if (playing) {
    audio.play();
  }
}

nextBtn.addEventListener("click", nextSong);

function prevSong() {
  //shuffle when playing next song
  if (shuffle) {
    shuffleFunc();
    loadSong(currentSong);
  }
  //if first song playing go to last song
  if (currentSong > 0) {
    currentSong--;
  } else {
    currentSong = songs.length - 1;
  }
  loadSong(currentSong);
  //after load if song was playing keep playing current too
  if (playing) {
    audio.play();
  }
}
prevBtn.addEventListener("click", prevSong);

function addToFavourite(index) {
  //check if already afav then remove
  if (favourites.includes(index)) {
    favourites = favourites.filter((item) => item !== index);
    //if current playing song is removed also remove current fav
    currentFavourite.classList.remove("active");
  } else {
    // if not already in fav add
    favourites.push(index);

    // if coming from current  favourit that is index and current are equals
    if (index === currentSong) {
      currentFavourite.classList.add("active");
    }
  }
  //if adding favourite rerender playlist to show favourites
  updatePlaylist(songs);
}
// add fav to current playing song when clicked heart
currentFavourite.addEventListener("click", () => {
  currentFavourite.classList.toggle("active");
  addToFavourite(currentSong);
});

// shuflle
const shuffleBtn = document.querySelector("#shuffle");
function shuffleSongs() {
  //if shuffle false make it true or vice versa
  shuffle = !shuffle;
  shuffleBtn.classList.toggle("active");
}
shuffleBtn.addEventListener("click", shuffleSongs);
//if shuffle true shuffle songs when playing next or prev
function shuffleFunc() {
  if (shuffle) {
    //select a random song from playlist
    currentSong = Math.floor(Math.random() * songs.length);
  }
}
const repeatBtn = document.querySelector("#current-repeat");
// Repeat functionality
function repeatSong() {
  if (repeat === 0) {
    // If repeat is off, make it 1, which means repeat the current song
    repeat = 1;
    // If repeat is on, make the button active
    repeatBtn.classList.add("active");
  } else if (repeat === 1) {
    // If repeat is 1, which means repeat the current song, make it 2, which means repeat the playlist
    repeat = 2;
    repeatBtn.classList.add("active");
  } else {
    // Else, turn off repeat
    repeat = 0;
    repeatBtn.classList.remove("active");
  }
}

// Add event listener to the repeat button
repeatBtn.addEventListener("click", repeatSong);
// on one click its repeat === 1 pm second repeat === 2 on third repeat === 0 and revise

// now if repeat on on audio end
audio.addEventListener("ended", () => {
  if (repeat === 1) {
    // if repeat current song
    // again load current song
    loadSong(currentSong);
    audio.play();
  } else if (repeat === 2) {
    //if repeat playlist'
    //play next song
    nextSong();
    audio.play();
  } else {
    // if repeat off
    // just play all playlist one time then stop
    if (currentSong === songs.length - 1) {
      // if its last song in playlist stop playing now
      audio.pause();
      playPauseBtn.classList.replace("fa-pause", "fa-play");
      playing = false;
    } else {
      //if not las continue to next
      nextSong();
      audio.play();
    }
  }
});

// progress bar
function progress() {
  // get duration and current time from audio
  let { duration, currentTime } = audio;

  // if anyone not a number make it 0

  isNaN(duration) ? (duration = 0) : duration;
  isNaN(currentTime) ? (currentTime = 0) : currentTime;

  //update time elements
  currentTimeEl.innerHTML = formatTime(currentTime);
  DurationEl.innerHTML = formatTime(duration);

  //progress dot
  let progressPercentage = (currentTime / duration) * 100;
  progressDot.style.left = `${progressPercentage}%`;
}
//update progress on audio timeupdate event
audio.addEventListener("timeupdate", progress);

// change progress when click on bar

function setProgress(e) {
  let width = this.clientWidth;
  let clickX = e.offsetX;
  let duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
progressBar.addEventListener("click", setProgress);

document.addEventListener("DOMContentLoaded", function () {
  const backButton = document.getElementById("back-icon");
  const backText = document.getElementById("back-text");

  backButton.addEventListener("click", goBack);
  backText.addEventListener("click", goBack);

  function goBack() {
    window.history.back();
  }
});
document.getElementById("back").addEventListener("click", function () {
  window.location.href = "/choose.html"; // replace with the URL you want to redirect to
});
// ... (rest of the code remains the same)

// Add volume slider and mute button
const volumeSlider = document.querySelector("#volume-slider"),
  muteBtn = document.querySelector("#mute");

volumeSlider.addEventListener("input", (e) => {
  audio.volume = e.target.value / 100;
});

muteBtn.addEventListener("click", () => {
  if (audio.volume === 0) {
    audio.volume = 1;
    muteBtn.classList.remove("fa-volume-mute");
    muteBtn.classList.add("fa-volume-up");
  } else {
    audio.volume = 0;
    muteBtn.classList.remove("fa-volume-up");
    muteBtn.classList.add("fa-volume-mute");
  }
});
