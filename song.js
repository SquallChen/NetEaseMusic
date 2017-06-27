$(function() {

    let id = parseInt(location.search.match(/\bid=([^&]*)/)[1], 10)

    $.get('./songs.json').then(function (response) {
        let songs = response
        let song = songs.filter(s => s.id === id)[0]
        let {url,name,lyric} = song
        initPlayer.call(undefined,url)
        initText(name,lyric)
        $('.page').css({"background-image":`url(./img/${id}-2.jpg)`})
        $('.disc-container .cover')[0].src=`./img/${id}-1.jpg`
    })

    function initText(name,lyric){
        $('.song-description > h1').text(name)
        parseLyric(lyric)
    }
    function initPlayer (url){
        let audio = document.createElement('audio')
        audio.src = url
        audio.oncanplay = function () {
            audio.play()
            $('.disc-container').addClass('playing')
        }
        $('.icon-pause').on('click', function () {
            audio.pause()
            $('.disc-container').removeClass('playing')
            $('.pointer').css('transform-origin','center top ')
            $('.pointer').css('transition','.5s ease-in-out ')
            $('.pointer').css('transform','rotateZ(-14deg)')
        })
        $('.icon-play').on('click', function () {
            audio.play()
            $('.disc-container').addClass('playing')

            $('.pointer').css('transform','rotateZ(0deg)')
        })

        setInterval(()=>{
            let seconds = audio.currentTime
            let munites = ~~(seconds / 60)
            let left = seconds - munites * 60
            let time = `${pad(munites)}:${pad(left)}`
            let $lines = $('.lines > p')
            let $whichline
            for(let i=0;i<$lines.length;i++){
                let currentLineTime = $lines.eq(i).attr('data-time')
                let nextLineTime = $lines.eq(i+1).attr('data-time')
                if($lines.eq(i+1).length !== 0 && currentLineTime < time && nextLineTime > time){
                    $whichline = $lines.eq(i)
                    break
                }
            }
            if($whichline){
                $whichline.addClass('active').prev().removeClass('active')
                let top = $whichline.offset().top
                let linesTop = $('.lines').offset().top
                let delta = top - linesTop -$('.lyric').height()/3
                $('.lines').css('transform',`translateY(-${delta}px)`)
            }
        },100)
    }

    function pad(number){
        return number >=10 ? number + '':'0' + number
    }

    function parseLyric(lyric){
        let array = lyric.split('\n')
        let regex = /^\[(.+)\](.*)$/
        array = array.map(function (string, index) {
            let matches = string.match(regex)
            if (matches) {
                return {time: matches[1], words: matches[2]}
            }
        })
        let $lyric = $('.lyric')
        array.map(function (object) {
            if (!object) {
                return
            }
            let $p = $('<p/>')
            $p.attr('data-time', object.time).text(object.words)
            $p.appendTo($lyric.children('.lines'))
        })
    }

})

