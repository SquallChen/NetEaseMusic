$(function(){
    $.get('SquallChen/NetEaseMusic/blob/master/lyric.json').then(function(object){
        let {lyric} = object
        let array = lyric.split('\n')
        let regex =/^\[(.+)\](.*)$/
        array = array.map(function(string,index){
            let matches =string.match(regex)
            if(matches){
				return {time: matches[1], words: matches[2]}
			}
        })
        let $lyric = $('.lyric')
        array.map(function(object){
            if(!object){return}
            let $p = $('<p/>')
            $p.attr('data-time',object.time).text(object.words)
            $p.appendTo($lyric.children('.lines'))
        })
    })
    let audio = document.createElement('audio')
    audio.src = 'http://dl.stream.qqmusic.qq.com/C4000035GveV3i9dBM.m4a?vkey=DFE330675943095FB54FFA6F0E6B3BBA2718E07E2DFA4F035C43E2CD18318418CEAE14AB71354AA0326E4FC8B1BB47377EAFA2FB37B73486&guid=1895781468&uin=0&fromtag=66'
    audio.oncanplay=function(){
        audio.play()
        $('.disc-container').addClass('playing')
    }
    $('.icon-pause').on('click',function(){
        audio.pause()
        $('.disc-container').removeClass('playing')
    })
    $('.icon-play').on('click',function(){
        audio.play()
        $('.disc-container').addClass('playing')
    })
})
