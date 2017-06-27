$(function() {
    $.get('./songs.json').then(function (response) {
        let items = response
        items.forEach((i) => {
            let $li = $(`
                <li>
                 <a href="./song.html?id=${i.id}">
                <h3>${i.name}</h3>
               <div class="main">
                <svg class="sq">
                    <use xlink:href="#icon-sq"></use>
                    </svg><p class="album">${i.album}</p>
                    <svg class="playsvg">
                    <use xlink:href="#icon-play-circled"></use>
                    </svg>
                 </div>
                    </a>
                    </li>
                           `)
            $('#lastMusic').append($li)
        })
        $('#lastMusicloading').remove()
    }, function () {
        //如果失败，就.....
    })

    $('.indexnav').on('click','ol.tabitems>li',function(e){
        let $li = $(e.currentTarget).addClass('active')
        $li.siblings().removeClass('active')
        let index = $li.index()
        $li.trigger('tabChange',index)
        $('.tabcontent > li').eq(index).addClass('active').siblings().removeClass('active')
    })

    $('.indexnav').on('tabChange',function(e,index){
        let $li = $('.tabcontent > li').eq(index)
        if($li.attr('data-downloaded') === 'yes'){
            return
        }
        if(index === 1){
            $.get('./page2.json').then((response)=>{
                $li.text(response.content)                       //页面内容填充
                $li.attr('data-downloaded','yes')
            })
        }else if(index === 2){
            $.get('./page3.json').then((response)=>{
                $li.text(response.content)
                $li.attr('data-downloaded','yes')
            })
        }
    })

})