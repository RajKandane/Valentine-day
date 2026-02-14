/* ---------------- MUSIC ---------------- */

let musicPlaying = false
const music = document.getElementById("bg-music")
music.volume = 0.35

// Start music on first click (100% works on all browsers)
document.addEventListener("click", () => {
    music.play()
        .then(() => {
            musicPlaying = true
            document.getElementById('music-toggle').textContent = '🔊'
        })
        .catch(() => {})
}, { once: true })


function toggleMusic() {
    if (music.paused) {
        music.play()
        musicPlaying = true
        document.getElementById('music-toggle').textContent = '🔊'
    } else {
        music.pause()
        musicPlaying = false
        document.getElementById('music-toggle').textContent = '🔇'
    }
}


/* ---------------- CONFETTI ---------------- */

window.addEventListener('load', () => {
    launchConfetti()
})

function launchConfetti() {
    const colors = ['#ff69b4','#ff1493','#ff85a2','#ffb3c1','#ff0000','#ff6347','#fff','#ffdf00']
    const duration = 6000
    const end = Date.now() + duration

    // Big burst
    confetti({
        particleCount: 150,
        spread: 100,
        origin: { x: 0.5, y: 0.3 },
        colors
    })

    // Side cannons
    const interval = setInterval(() => {
        if (Date.now() > end) {
            clearInterval(interval)
            return
        }

        confetti({
            particleCount: 40,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.6 },
            colors
        })

        confetti({
            particleCount: 40,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.6 },
            colors
        })
    }, 300)
}
