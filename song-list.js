$(function(){

    $('.dropdown').on('click',function(){
        $('.dropdown').addClass('active')
        $('.dropup').removeClass('active')   //触发后的事件
        $('.content-short').addClass('active')
        $('.content-long').removeClass('active')
    })
    $('.dropup').on('click',function(){
        $('.dropup').addClass('active')
        $('.dropdown').removeClass('active')
        $('.content-long').addClass('active')
        $('.content-short').removeClass('active')   //触发后的事件

    })


    $.get('./songs.json').then((response)=>{
        let items = response
        items.forEach((i) => {
            let $li = $(`
                <li>
                 <a href="./song.html?id=${i.id}">
                 <h3>${i.name}</h3>
               <div class="main">
                    <svg class="sq">
                        <use xlink:href="#icon-sq"></use>
                     </svg>
                     <p class="album">${i.album}</p>
                     <svg class="playsvg">
                        <use xlink:href="#icon-play-circled"></use>
                     </svg>
                     <p class="ranking">${i.id}</p>
                     <div class="underline"></div>
                 </div>
                    </a>
                    </li>
                           `)
            $('#songListMusic').append($li)
            $li.attr('data-downloaded','yes')
        })
        $('#songListLoading').remove()//当所有歌曲元素加载完毕，去除loading gif

        /*$li.text(response.content)  */                     //页面内容填充

    }, function () {
        //如果获取失败，就.....


    })






})