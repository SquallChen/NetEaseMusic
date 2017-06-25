/*<li>
<h3>Fake废</h3>
<p>
<svg class="sq">
    <use xlink:href="#icon-sq"></use>
    </svg>
    黄礼格-Fake废</p>
    <a href="#">
    <svg class="playsvg">
    <use xlink:href="#icon-play-circled"></use>
    </svg>
    </a>
    </li>*/
$(function(){
    $.get('./songs.json').then(function(response){
        let items = response
        items.forEach((i)=>{
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
    },function(){
        //如果失败，就.....
    })

})