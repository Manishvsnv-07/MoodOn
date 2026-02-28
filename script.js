document.addEventListener("DOMContentLoaded", function () {

    console.log("jay shree ram")
    let currentsong = new Audio();
    let currentfolder;
    let play = document.getElementById("play");
    let currentindex = 0;
    let songname;

    async function getsongs(foldername) {
        let allsongs = await fetch(`http://127.0.0.1:3000/songs/${foldername}`)
        let x = await allsongs.text()
        let div = document.createElement("div")
        div.innerHTML = x;
        let as = div.querySelectorAll("a")
        let songarray = []
        let albumarray = []
        as.forEach(link => {
            let href = link.getAttribute("href")
            if (href.endsWith(".mp3")) {
                let songn = href.replaceAll("%20", " ").replaceAll("%5C", "/")
                let songname = songn.split("/").pop()
                songarray.push(songname)
            }
        });
        return songarray

    }



    let songarray = [];
    async function main() {
        let f;
        let fe;
        let folder;
        let currentfolder;
        let allsongs = await fetch(`http://127.0.0.1:3000/songs`)
        let x = await allsongs.text()
        let div = document.createElement("div")
        div.innerHTML = x;
        let atags = div.querySelectorAll("a")
        let yourmusic = document.querySelector(".yourmusic")
        let hitmusic = document.querySelector(".hitmusics")
        let folderarray = []
        let array = Array.from(atags)
        for (let index = 0; index < 5; index++) {
            const e = array[index];
            let clean = e.href.replaceAll("%5C", "/")
            if (e.href.includes("songs")) {
                folder = clean.split("/").splice(5)[0]
                folderarray.push(folder)
                f = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
                fe = await f.json()
                yourmusic.innerHTML = yourmusic.innerHTML + `<div class="first" data-folder="${folder}">
                                <img src="songs/${folder}/cover.jpg" width="133px" class="firstimg" style="border-radius: 10px;"
                                    alt="img">
                                <h2>${fe.Description}</h2>
                                <img src="imgs/cardplay.svg" class="cardplay" width="50px" alt="Inside Card Play">
                            </div>`
            }
        }
        for (let index = 5; index < array.length; index++) {
            const e = array[index];
            let clean = e.href.replaceAll("%5C", "/")
            if (e.href.includes("songs")) {
                folder = clean.split("/").splice(5)[0]
                folderarray.push(folder)
                f = await fetch(`http://127.0.0.1:3000/songs/${folder}/info.json`)
                fe = await f.json()
                hitmusic.innerHTML = hitmusic.innerHTML + `<div class="first" data-folder="${folder}">
                                <img src="songs/${folder}/cover.jpg" width="133px" class="firstimg" style="border-radius: 10px;"
                                    alt="img">
                                <h2>${fe.Description}</h2>
                                <img src="imgs/cardplay.svg" class="cardplay" width="50px" alt="Inside Card Play">
                            </div>`
            }
        }

        currentsong.addEventListener("timeupdate", () => {
            localStorage.setItem("currentTime", currentsong.currentTime);
            localStorage.setItem("currentindex", currentindex);
        });
        let playlistSelected = false
        let colorchange = document.querySelector(".liked")
        let fav = document.querySelector(".favsinger")
        let gradient = `linear-gradient(175deg,
    #3a2f70 0%,
    #2e2655 20%,
    #2c2451 40%,
    #1a1827 60%,
    #1e1e1e 80%,
    #121212 100%
)`
        let getright = document.querySelector(".right")
        colorchange.addEventListener("mouseenter", () => {
            getright.style.background = gradient
        })
        fav.addEventListener("mouseenter", () => {
            getright.style.background = "#1e1e1e"
        })

        let seekbar = document.querySelector(".whiteline")
        currentsong.addEventListener("timeupdate", () => {
            seekbar.style.width = (currentsong.currentTime / currentsong.duration) * 100 + "%"
            seekbar.style.display = "block"
        })
        let bar = document.querySelector(".seekbar")
        bar.addEventListener("click", (e) => {
            let percentage = (e.offsetX / e.target.getBoundingClientRect().width) * 100;

            document.querySelector(".whiteline").style.width = percentage + "%";
            document.querySelector(".whiteline").style.behavior = "smooth"

            currentsong.currentTime = ((currentsong.duration) * percentage) / 100;
        })


        let volumecontrol = document.querySelector(".slider")
        let volumeclass = document.querySelector(".volumecontrol")
        volumecontrol.addEventListener("input", (e) => {
            currentsong.volume = (e.target.value) / 100
            let h2 = document.querySelector(".volumecontrol").getElementsByTagName("h2")[0]
            h2.textContent = parseInt(currentsong.volume * 100) + "%"
            localStorage.setItem("volume", currentsong.volume)
        })
        window.addEventListener("load", () => {
            let savedVolume = localStorage.getItem("volume")
            let h2 = document.querySelector(".volumecontrol").getElementsByTagName("h2")[0]
            if (savedVolume != null) {
                let volumevalue = parseFloat(savedVolume)
                currentsong.volume = volumevalue
                volumecontrol.value = volumevalue
            }
            else {
                currentsong.volume = 1
                currentsong.value = 100
                h2.textContent = "100%"
            }
        })
        let volumebutton = document.querySelector(".volumecontrol").getElementsByTagName("img")[0]
        volumebutton.addEventListener("click", (e) => {
            currentsong.muted = !currentsong.muted
            if (currentsong.muted) {
                volumebutton.src = "imgs/mute.svg"
                volumecontrol.value = 0
                let h2 = document.querySelector(".volumecontrol").getElementsByTagName("h2")[0]
                h2.textContent = 0 + "%"
            }
            else {
                volumebutton.src = "imgs/volume.svg"
                let savedVolume = localStorage.getItem("volume")
                let h2 = document.querySelector(".volumecontrol").getElementsByTagName("h2")[0]
                h2.textContent = parseInt(savedVolume * 100) + "%"
                if (savedVolume != null) {
                    currentsong.volume = savedVolume
                    volumecontrol.value = savedVolume * 100
                }

            }
        })

        let home = document.querySelector(".home")
        home.addEventListener("click", () => {
            window.location.href = window.location.href;
        })


        play.addEventListener("click", (e) => {

            e.stopPropagation();
            if (!currentsong.src) return;
            if (currentsong.paused) {
                currentsong.play()
                play.src = "imgs/pause.svg"
                let ongoing = document.querySelector(".ongoingmusic")
                ongoing.innerHTML = `<img src="songs/${currentfolder}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                                        <h2>${songarray[currentindex]}</h2>`
                let display = document.querySelector(".displaymusicandvolume")
                display.innerHTML = `<img src="songs/${currentfolder}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                                        <h2>${songarray[currentindex]}</h2>`
            }
            else {
                currentsong.pause()
                play.src = "imgs/play.svg"
            }
        })


        next.addEventListener("click", () => {
            currentindex++;
            currentsong.src = `songs/${currentfolder}/${songarray[currentindex]}`
            if (currentindex < songarray.length) {
                currentsong.play()
                let ongoing = document.querySelector(".ongoingmusic")
                ongoing.innerHTML = `<img src="songs/${currentfolder}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                                <h2>${songarray[currentindex]}</h2>`
                let display = document.querySelector(".displaymusicandvolume")
                display.innerHTML = `<img src="songs/${currentfolder}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                                        <h2>${songarray[currentindex]}</h2>`
                let currentmusic = document.querySelectorAll(".music")[currentindex]
                let previousmusic = document.querySelectorAll(".music")[currentindex - 1]
                currentmusic.classList.add("active")
                previousmusic.classList.remove("active")
            }
            else {
                currentindex = 0
                currentsong.src = `songs/${currentfolder}/${songarray[currentindex]}`
                currentsong.play()
                let ongoing = document.querySelector(".ongoingmusic")
                ongoing.innerHTML = `<img src="songs/${currentfolder}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                                <h2>${songarray[0]}</h2>`
                let display = document.querySelector(".displaymusicandvolume")
                display.innerHTML = `<img src="songs/${currentfolder}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                                        <h2>${songarray[0]}</h2>`
                let currentmusic = document.querySelectorAll(".music")[0]
                let previousmusic = document.querySelectorAll(".music")[songarray.length - 1]
                currentmusic.classList.add("active")
                previousmusic.classList.remove("active")
            }
        })

        previous.addEventListener("click", () => {
            if (currentindex > 0) {
                currentindex--;
                currentsong.src = `songs/${currentfolder}/${songarray[currentindex]}`
                currentsong.play()
                let ongoing = document.querySelector(".ongoingmusic")
                ongoing.innerHTML = `<img src="songs/${currentfolder}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                            <h2>${songarray[currentindex]}</h2>`

                let display = document.querySelector(".displaymusicandvolume")
                display.innerHTML = `<img src="songs/${currentfolder}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                                        <h2>${songarray[currentindex]}</h2>`

                let currentmusic = document.querySelectorAll(".music")[currentindex]
                let previousmusic = document.querySelectorAll(".music")[currentindex + 1]
                currentmusic.classList.add("active")
                previousmusic.classList.remove("active")

            }

            else {
                currentindex = 0
                currentsong.src = `songs/${currentfolder}/${songarray[currentindex]}`
                currentsong.play()
                let currentmusic = document.querySelectorAll(".music")[0]
                let previousmusic = document.querySelectorAll(".music")[currentindex + 1]
                currentmusic.classList.add("active")
                previousmusic.classList.remove("active")
            }

        })

        currentsong.addEventListener("ended", async () => {
            currentindex++;
            if (currentindex < songarray.length) {
                currentsong.src = `songs/${currentfolder}/${songarray[currentindex]}`
                await currentsong.play()
                let ongoing = document.querySelector(".ongoingmusic")
                ongoing.innerHTML = `<img src="songs/${currentfolder}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                                <h2>${songarray[currentindex]}</h2>`
                let display = document.querySelector(".displaymusicandvolume")
                display.innerHTML = `<img src="songs/${currentfolder}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                                            <h2>${songarray[currentindex]}</h2>`

                let currentmusic = document.querySelectorAll(".music")[currentindex]
                let previousmusic = document.querySelectorAll(".music")[currentindex - 1]
                currentmusic.classList.add("active")
                previousmusic.classList.remove("active")
            }
            else {
                currentindex = 0
                currentsong.src = `songs/${currentfolder}/${songarray[currentindex]}`
                currentsong.play()
                let ongoing = document.querySelector(".ongoingmusic")
                ongoing.innerHTML = `<img src="songs/${currentfolder}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                                <h2>${songarray[0]}</h2>`
                let display = document.querySelector(".displaymusicandvolume")
                display.innerHTML = `<img src="songs/${currentfolder}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                                        <h2>${songarray[0]}</h2>`
                let currentmusic = document.querySelectorAll(".music")[0]
                let previousmusic = document.querySelectorAll(".music")[songarray.length - 1]
                currentmusic.classList.add("active")
                previousmusic.classList.remove("active")
            }
        })


        let getcards = document.querySelector(".cardcontainer")
        getcards.addEventListener("click", async (e) => {
            let card = e.target.closest(".first")
            if (!card) return;
            let foldername = card.dataset.folder;
            currentfolder = foldername;
            songarray = await getsongs(foldername);
            playlistSelected = true
            let cardclicksection = document.querySelector(".Playlistafterclick")
            cardclicksection.innerHTML = `
                <div class="playlistheader">
                    <img src="imgs/back.svg" width="30px" class="back filter" alt="back button">
                    <img src="songs/${foldername}/cover.jpg" style = "width: 170px; object-fit: cover; border-radius:5px;" alt="Anuv Jain">
                    <div class="playlistheadertext">
                        <h1>DAILY MIX</h1>
                    </div>
                </div>
                <div class="allsongsincard">
                    <div class="elementsname">
                        <h3>#Title</h3>
                        <h3 class = "Albumt">Album</h3>
                    </div>
                    <div class="linefix">
                        <div class="line"></div>
                    </div>
                    <div class="cardmusic">
                    </div>
                    <div class="displaymusicandvolume">             
                 </div>
                </div>`
            let inf = await fetch(`http://127.0.0.1:3000/songs/${foldername}/info.json`)
            let infe = await inf.json()
            let getplaylistafterclick = document.querySelector(".Playlistafterclick")
            getcards.classList.add("hide")
            getplaylistafterclick.classList.remove("hide")
            songarray.forEach((song, index) => {
                let container = document.querySelector(".cardmusic");
                container.innerHTML += `<div class="music" data-song="${song}">
                    <div class="musicitems">
                    <h1>${index + 1}</h1>
                    <img src="songs/${foldername}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                    <h2>${song}</h2>
                    <img src="imgs/play.svg" class="musicplaybar filter" alt="Play Music">
                    </div>
                    <div class="albumname">
                    <h3>- ${infe.title}</h3>
                    </div>
                    </div> 
                    `;

            });
            let m = document.querySelector(".cardmusic")
            m.addEventListener("click", (e) => {
                let musiccard = e.target.closest(".music")
                if (!musiccard) return;
                songname = musiccard.dataset.song
                currentindex = songarray.indexOf(songname)
                localStorage.setItem("currenindex", currentindex)
                currentsong.pause()
                currentsong.src = `songs/${foldername}/${songname}`
                currentsong.load()
                currentsong.play().catch(err => console.error(err))
                play.src = "imgs/pause.svg"


                let ongoing = document.querySelector(".ongoingmusic")
                ongoing.innerHTML = `<img src="songs/${foldername}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                            <h2>${songname}</h2>`

                let display = document.querySelector(".displaymusicandvolume")
                display.innerHTML = `<img src="songs/${foldername}/cover.jpg" style="width: 38px; height: 38px; border-radius:7px;" alt="Anuv Jain">
                                        <h2>${songname}</h2>`

            })


            let getmusicbox = document.querySelectorAll(".music");
            getmusicbox.forEach(box => {
                box.addEventListener("click", () => {
                    getmusicbox.forEach(b => { b.classList.remove("active") })
                    box.classList.add("active")
                })
            })

            let backbutton = document.querySelector(".playlistheader").getElementsByClassName("back")[0]
            backbutton.addEventListener("click", () => {
                getcards.classList.remove("hide")
                getplaylistafterclick.classList.add("hide")
            })
        })


    }
    main()
    getsongs()


});