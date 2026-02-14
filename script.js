/* ---------------- GIF + BUTTON LOGIC ---------------- */

const gifStages = [
    "https://media.tenor.com/EBV7OT7ACfwAAAAj/u-u-qua-qua-u-quaa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAd/chiikawa-hachiware.gif",
    "https://media.tenor.com/f_rkpJbH1s8AAAAj/somsom1012.gif",
    "https://media.tenor.com/OGY9zdREsVAAAAAj/somsom1012.gif",
    "https://media1.tenor.com/m/WGfra-Y_Ke0AAAAd/chiikawa-sad.gif",
    "https://media.tenor.com/CivArbX7NzQAAAAj/somsom1012.gif",
    "https://media.tenor.com/5_tv1HquZlcAAAAj/chiikawa.gif",
    "https://media1.tenor.com/m/uDugCXK4vI4AAAAC/chiikawa-hachiware.gif"
]

const noMessages = [
    "No",
    "Are you positive? 🤔",
    "Pookie please... 🥺",
    "If you say no, I will be really sad...",
    "I will be very sad... 😢",
    "Please??? 💔",
    "Don't do this to me...",
    "Last chance! 😭",
    "You can't catch me anyway 😜"
]

const yesTeasePokes = [
    "try saying no first... I bet you want to know what happens 😏",
    "go on, hit no... just once 👀",
    "you're missing out 😈",
    "click no, I dare you 😏"
]

let yesTeasedCount = 0
let noClickCount = 0
let runawayEnabled = false
let musicPlaying = false

const catGif = document.getElementById('cat-gif')
const yesBtn = document.getElementById('yes-btn')
const noBtn = document.getElementById('no-btn')
const music = document.getElementById('bg-music')

/* ---------------- RELIABLE MUSIC AUTOPLAY ---------------- */

music.volume = 0.35

function startMusic() {
    if (musicPlaying) return

    music.play()
        .then(() => {
            musicPlaying = true
            document.getElementById('music-toggle').textContent = '🔊'
        })
        .catch(() => {})
}

/* Unlock audio on ANY user interaction */
["click","touchstart","mousemove","keydown","scroll"].forEach(event => {
    document.addEventListener(event, startMusic, { once: true })
})

function toggleMusic() {
    if (music.paused) {
        music.play()
        document.getElementById('music-toggle').textContent = '🔊'
    } else {
        music.pause()
        document.getElementById('music-toggle').textContent = '🔇'
    }
}

/* ---------------- YES / NO BUTTON LOGIC ---------------- */

function handleYesClick() {
    if (!runawayEnabled) {
        const msg = yesTeasePokes[Math.min(yesTeasedCount, yesTeasePokes.length - 1)]
        yesTeasedCount++
        showTeaseMessage(msg)
        return
    }
    showYesPage()
}

function showTeaseMessage(msg) {
    let toast = document.getElementById('tease-toast')
    toast.textContent = msg
    toast.classList.add('show')
    clearTimeout(toast._timer)
    toast._timer = setTimeout(() => toast.classList.remove('show'), 2500)
}

function handleNoClick() {
    noClickCount++

    const msgIndex = Math.min(noClickCount, noMessages.length - 1)
    noBtn.textContent = noMessages[msgIndex]

    const currentSize = parseFloat(window.getComputedStyle(yesBtn).fontSize)
    yesBtn.style.fontSize = `${currentSize * 1.35}px`

    const padY = Math.min(18 + noClickCount * 5, 60)
    const padX = Math.min(45 + noClickCount * 10, 120)
    yesBtn.style.padding = `${padY}px ${padX}px`

    if (noClickCount >= 2) {
        const noSize = parseFloat(window.getComputedStyle(noBtn).fontSize)
        noBtn.style.fontSize = `${Math.max(noSize * 0.85, 10)}px`
    }

    const gifIndex = Math.min(noClickCount, gifStages.length - 1)
    swapGif(gifStages[gifIndex])

    if (noClickCount >= 5 && !runawayEnabled) {
        enableRunaway()
        runawayEnabled = true
    }
}

function swapGif(src) {
    catGif.style.opacity = '0'
    setTimeout(() => {
        catGif.src = src
        catGif.style.opacity = '1'
    }, 200)
}

function enableRunaway() {
    noBtn.addEventListener('mouseover', runAway)
    noBtn.addEventListener('touchstart', runAway, { passive: true })
}

function runAway() {
    const margin = 20
    const btnW = noBtn.offsetWidth
    const btnH = noBtn.offsetHeight
    const maxX = window.innerWidth - btnW - margin
    const maxY = window.innerHeight - btnH - margin

    const randomX = Math.random() * maxX + margin / 2
    const randomY = Math.random() * maxY + margin / 2

    noBtn.style.position = 'fixed'
    noBtn.style.left = `${randomX}px`
    noBtn.style.top = `${randomY}px`
    noBtn.style.zIndex = '50'
}

/* ---------------- YES PAGE WITHOUT RELOAD ---------------- */

function showYesPage() {

    // change title
    document.title = "Yay! 🎉"

    // replace content
    document.querySelector(".container").innerHTML = `
        <h1 class="yes-title">Knew you would say yes! 🎉</h1>

        <div class="gif-container">
            <img id="cat-gif" src="https://media.tenor.com/eNHbizSfVb0AAAAj/lovemode-cute.gif">
        </div>

        <p class="yes-message">You just made me the happiest person! 💕</p>
    `

    launchConfetti()
}

/* CONFETTI */
function launchConfetti() {
    const script = document.createElement('script')
    script.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.2/dist/confetti.browser.min.js"
    script.onload = () => {

        const duration = 6000
        const end = Date.now() + duration

        confetti({
            particleCount: 150,
            spread: 100,
            origin: { x: 0.5, y: 0.3 }
        })

        const interval = setInterval(() => {
            if (Date.now() > end) return clearInterval(interval)

            confetti({ particleCount: 40, angle: 60, spread: 55, origin: { x: 0, y: 0.6 } })
            confetti({ particleCount: 40, angle: 120, spread: 55, origin: { x: 1, y: 0.6 } })

        }, 300)
    }

    document.body.appendChild(script)
}

