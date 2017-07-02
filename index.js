$(function() {
    $.get('./songs.json').then(function (response) {  //当获取songs.json成功后，遍历i，将其所有内容填入页面
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
        $('#lastMusicloading').remove()//当所有歌曲元素加载完毕，去除loading gif
    }, function () {
        //如果获取失败，就.....
    })

    $('.indexnav').on('click','ol.tabitems>li',function(e){     //当导航里li元素被点击时
        let $li = $(e.currentTarget).addClass('active')         //当前点击的li元素添加.active
        $li.siblings().removeClass('active')                    //所有非点击的兄弟元素移动.active
        let index = $li.index()
        $li.trigger('tabChange',index)                          //监听tabChange事件，若其执行则自动触发下一步
        $('.tabcontent > li').eq(index).addClass('active').siblings().removeClass('active')   //触发后的事件
    })

    $('.indexnav').on('tabChange',function(e,index){             //当tabChange事件发生时
        let $li = $('.tabcontent > li').eq(index)
        if($li.attr('data-downloaded') === 'yes'){               //添加data自定义属性
            return
        }
        if(index === 1){
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
                     <p class="ranking">${'0'+i.id}</p>
                     <div class="underline"></div>
                 </div>
                    </a>
                    </li>
                           `)
                    $('#hotMusic').append($li)
                })
                $('#hotMusicloading').remove()//当所有歌曲元素加载完毕，去除loading gif

                /*$li.text(response.content)  */                     //页面内容填充
                $li.attr('data-downloaded','yes')
            }, function () {
                //如果获取失败，就.....


            })
        }else if(index === 2){
            $.get('./page3.json').then((response)=>{
               /* $li.text(response.content)*/
                $li.attr('data-downloaded','yes')
            })
        }
    })


    let timer = undefined
    $('input#searchSong').on('input',function(e){
        let $input = $(e.currentTarget)
        let value = $input.val().trim()
        if(value === ''){
            $('#output').text('')
            return
        }


        if(timer){
            clearTimeout(timer)
        }


        timer = setTimeout(function(){
            search(value).then((result)=>{
                timer = undefined
                if(result.length !== 0 ){
                    for(var i=0;i<result.length;i++){
                        let $li = $(`
                        <li>
                         <a href="./song.html?id=${result[i].id}">
                        <h3>${result[i].name}</h3>
                       <div class="main">
                        <svg class="sq">
                            <use xlink:href="#icon-sq"></use>
                            </svg><p class="album">${result[i].album}</p>
                            <svg class="playsvg">
                            <use xlink:href="#icon-play-circled"></use>
                            </svg>
                         </div>
                            </a>
                            </li>
                                   `)

                                $('#output').append($li)
                         }
                }else{
                    let $p = '<p id="sorry">非常抱歉，没有找到这首歌</p>'
                    $('#output').append($p)
                }
            })
        },500)
    })

    function search(keyword){                                 //搜索函数传入关键字，模拟在服务器上搜索数据库
        return new Promise((resolve,reject)=>{
            var database = [                                   //创建数组存放以供搜索的数据
                { "id":1, "name":"一笑倾城","album":"汪苏泷 / 明柏辰&明筱岩 / 陈墨一 / 杨梓鑫 - 我想和你唱 第二季 第9期"},
                { "id":2, "name":"Fake废","album":"黄礼格 - Fake废"},
                { "id":3, "name":"不为谁而作的歌","album":"林俊杰 - 天生是优我 第十二期"},
                { "id":4, "name":"父亲写的散诗","album":"姚晨 - 2017跨界歌王 第十一期"},
                { "id":5, "name":"泡沫", "album":"G.E.M.邓紫棋 / 余赛亚 / 戴斯琪 / 肖茗 - 我想和你唱 第二季 第9期"},
                { "id":6, "name":"돌려놔 (FLY WITH THE WIND)","album":"Lina / Navi - 품위있는 그녀 OST PART.2"},
                { "id":7, "name":"失约","album":"Twins - 失约"},
                { "id":8, "name":"最美","album":"陈赫 - 2017跨界歌王 第十一期"},
                { "id":9, "name":"成都","album":"张继科 - 2017跨界歌王 第十一期"},
                { "id":10, "name":"新贵妃醉酒","album":"李玉刚 / 徐天意 / 杨姣 / 祝颂皓 - 我想和你唱 第二季 第9期"}
            ]

            let result = database.filter(function(item){        //筛选函数，当已有数据与输入的关键字中任意一字体匹配，返回这个item.name
                return item.name.indexOf(keyword)>=0



            })
            setTimeout(function(){
                resolve(result)
            },(Math.random () * 200 + 300))  //模拟服务器随机返回时间1~1.2S
        })
    }
    window.search = search
})