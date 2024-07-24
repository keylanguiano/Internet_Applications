let current_music = 0

const seekBar = document.querySelector ('.seek-bar')

const songName = document.querySelector ('.music-name')
const artistName = document.querySelector ('.artist-name')
const diskName = document.querySelector ('.disk-name')

const disk = document.querySelector ('.disk')

const currentTime = document.querySelector ('.current-time')
const musicDuration = document.querySelector ('.song-duration')

const controlBtn = document.querySelector ('.control-btn')
const playBtn = document.querySelector ('.play-btn')

const forwardBtn = document.querySelector ('.forward-btn')
const backwardBtn = document.querySelector ('.backward-btn')

const music = document.querySelector ('#audio')

controlBtn.addEventListener('click', function() 
{
    if (controlBtn.className.includes ('pause')) 
    {
        music.pause()
        playBtn.src = '../ASSETS/ICONS/Play.svg'
    } 
    else 
    {
        music.play()
        playBtn.src = '../ASSETS/ICONS/Pause.svg'
    }

    controlBtn.classList.toggle ('pause')
    disk.classList.toggle ('play')
});

const setMusic = (i) =>
{
    seekBar.value = 0

    const song = songs [i]
    current_music = i

    music.src = song.path

    songName.innerHTML = song.name > 10 ? song.name.substring (0, 10) : song.name
    artistName.innerHTML = song.artist
    diskName.innerHTML = song.disk
    disk.style.backgroundImage = `url('${song.cover}')`;
    currentTime.innerHTML = '00:00'
    
    setTimeout ( () =>
    {
        seekBar.max = music.duration
        musicDuration.innerHTML = formatTime (music.duration)
    }, 300)
}

setMusic (0)

const formatTime = (time) =>
{
    let min = Math.floor (time / 60)

    if (min < 10)
    {
        min = `0${min}`
    }

    let sec = Math.floor (time % 60)

    if (sec < 10)
    {
        sec = `0${sec}`
    }

    return `${min}:${sec}`
}

setInterval(() =>
{
    seekBar.value = music.currentTime
    currentTime.innerHTML = formatTime (music.currentTime)

    if (Math.floor (music.currentTime) == Math.floor (seekBar.max))
    {
        forwardBtn.click ()
    }
}, 500)

seekBar.addEventListener ('change', () =>
{
    music.currentTime = seekBar.value
})

const play_music = () =>
{
    music.play ()

    controlBtn.src = '../ASSETS/ICONS/Pause.svg'
    disk.classList.add ('play')
}

forwardBtn.addEventListener ('click', () => 
{
    if (current_music >= songs.length - 1)
    {
        current_music = 0
    }
    else
    {
        current_music++
    }
    console.log(current_music)
    setMusic (current_music)
    play_music ()
})

backwardBtn.addEventListener ('click', () => 
{
    if (current_music <= 0)
    {
        current_music = songs.length - 1
    }
    else
    {
        current_music--
    }
    console.log(current_music)
    setMusic (current_music)
    play_music ()
})