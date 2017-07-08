'use strict';

$(function () {

    var id = parseInt(location.search.match(/\bid=([^&]*)/)[1], 10);

    $.get('./songs.json').then(function (response) {
        //获取song.json成功后，执行
        var songs = response;
        var song = songs.filter(function (s) {
            return s.id === id;
        })[0];
        var url = song.url,
            name = song.name,
            lyric = song.lyric;

        initPlayer.call(undefined, url);
        initText(name, lyric);
        $('.page').css({ "background-image": 'url(./img/' + id + '-2.jpg)' } //将背景图片修改为对应ID的图
        );$('.disc-container .cover')[0].src = './img/' + id + '-1.jpg';
    });

    function initText(name, lyric) {
        $('.song-description > h1').text(name);
        parseLyric(lyric);
    }
    function initPlayer(url) {
        var audio = document.createElement('audio');
        audio.src = url;
        audio.oncanplay = function () {
            audio.play();
            $('.disc-container').addClass('playing');
        };
        $('.icon-pause').on('click', function () {
            audio.pause();
            $('.disc-container').removeClass('playing'
            /* $('.pointer').css('transform-origin','left 0 ')*/
            );$('.pointer').css('transition', '.5s ease-in-out ');
            $('.pointer').css('transform', 'rotateZ(-14deg)');
        });
        $('.icon-play').on('click', function () {
            audio.play();
            $('.disc-container').addClass('playing');

            $('.pointer').css('transform', 'rotateZ(0deg)');
        });

        setInterval(function () {
            var seconds = audio.currentTime;
            var munites = ~~(seconds / 60);
            var left = seconds - munites * 60;
            var time = pad(munites) + ':' + pad(left);
            var $lines = $('.lines > p');
            var $whichline = void 0;
            for (var i = 0; i < $lines.length; i++) {
                var currentLineTime = $lines.eq(i).attr('data-time');
                var nextLineTime = $lines.eq(i + 1).attr('data-time');
                if ($lines.eq(i + 1).length !== 0 && currentLineTime < time && nextLineTime > time) {
                    $whichline = $lines.eq(i);
                    break;
                }
            }
            if ($whichline) {
                $whichline.addClass('active').prev().removeClass('active');
                var top = $whichline.offset().top;
                var linesTop = $('.lines').offset().top;
                var delta = top - linesTop - $('.lyric').height() / 3;
                $('.lines').css('transform', 'translateY(-' + delta + 'px)');
            }
        }, 100);
    }

    function pad(number) {
        return number >= 10 ? number + '' : '0' + number;
    }

    function parseLyric(lyric) {
        var array = lyric.split('\n');
        var regex = /^\[(.+)\](.*)$/;
        array = array.map(function (string, index) {
            var matches = string.match(regex);
            if (matches) {
                return { time: matches[1], words: matches[2] };
            }
        });
        var $lyric = $('.lyric');
        array.map(function (object) {
            if (!object) {
                return;
            }
            var $p = $('<p/>');
            $p.attr('data-time', object.time).text(object.words);
            $p.appendTo($lyric.children('.lines'));
        });
    }
});