'use strict';

$(function () {

    $('.dropdown').on('click', function () {
        $('.dropdown').addClass('active');
        $('.dropup').removeClass('active' //触发后的事件
        );$('.content-short').addClass('active');
        $('.content-long').removeClass('active');
    });
    $('.dropup').on('click', function () {
        $('.dropup').addClass('active');
        $('.dropdown').removeClass('active');
        $('.content-long').addClass('active');
        $('.content-short').removeClass('active' //触发后的事件

        );
    });

    $.get('./songs.json').then(function (response) {
        var items = response;
        items.forEach(function (i) {
            var $li = $('\n                <li>\n                 <a href="./song.html?id=' + i.id + '">\n                 <h3>' + i.name + '</h3>\n               <div class="main">\n                    <svg class="sq">\n                        <use xlink:href="#icon-sq"></use>\n                     </svg>\n                     <p class="album">' + i.album + '</p>\n                     <svg class="playsvg">\n                        <use xlink:href="#icon-play-circled"></use>\n                     </svg>\n                     <p class="ranking">' + i.id + '</p>\n                     <div class="underline"></div>\n                 </div>\n                    </a>\n                    </li>\n                           ');
            $('#songListMusic').append($li);
            $li.attr('data-downloaded', 'yes');
        });
        $('#songListLoading').remove //当所有歌曲元素加载完毕，去除loading gif

        /*$li.text(response.content)  */ //页面内容填充

        ();
    }, function () {
        //如果获取失败，就.....


    });
});