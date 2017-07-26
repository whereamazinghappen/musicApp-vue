let request = require('request'),
    cheerio = require('cheerio'),
    axios = require('axios'),
    qs = require('querystring');
// 爬虫获取歌单信息为异步操作故封装为一个promise    
function getRecommends() {
    const URL = `http://music.163.com/m`;
    const OPTIONS = {
        url: URL,
        headers: {
            "Host": `music.163.com`,
            "Upgrade-Insecure-Requests": 1,
            "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1`
        }
    };
    return new Promise(function (resolve, reject) {
        request.post(OPTIONS, function (err, res) {
            if (err) {
                reject(err)
                return
            }
            let $ = cheerio.load(res.body.toString())
            let remd = []
            $(".remd_li").each(function (k, v) {
                let remditem = {
                    "name": $(v).find(".remd_text").text(),
                    "href": $(v).attr("href"),
                    "image": $(v).find(".u-img").attr("src").replace("thumbnail=40","thumbnail=246"),
                    "count": $(v).find(".remd_lnum").text()
                }
                remd.push(remditem)
            })
            resolve(remd);
            return
        })
    })
}
//使用axios获取最新歌曲列表数据
function getNewSongs() {
    const URL = "http://music.163.com/weapi/personalized/newsong?csrf_token=2bed48e852df2791b8acee95238a091e"
    const HEADERS = {
        "Content-Type":"application/x-www-form-urlencoded",
        Host: "music.163.com",
        Origin: "http://music.163.com",
        Referer: "http://music.163.com/m/",
        "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1`

    }
    const PARAMS = {
        params: "4DlxF867O7GB4740ejRZfiL7IGUjN26zo7FtcrtrFBew3+UHo2Qt19HqkgtB8iG8ueiJOVsp19Y5ZOUp6cffabhIS/dLZAlMPLKhk814ncbTEd6WNAzn6NTcEdnRgQFg",
        encSecKey: "2ff27e0f85aaa739b3419fe6b3409e20b71d6821bb2fd9b234faef4e989399cfce19dae152dd495206015444f672a535e9cd8576da206c955424d59009198aa68418c39d1c38e3861816993aac6a4cf277a2a2690c92978c7a00b7ca05c695bd17b90c280022a90802bb11f5e1ba80046cc4706b09d4088b086bbdaa46303b86"
    }
    // request.post({url: URL,qs:{csrf_token:"2bed48e852df2791b8acee95238a091e"},headers:HEADERS,form:PARAMS},function(err,res){
    //     console.log(res.body)
    // })

    // axios自身就返回Promise不需要像getRecommends中使用request(不返回Promise)时进行封装
    return axios.post(URL,qs.stringify(PARAMS),{headers:HEADERS})
}
// 爬取歌单数据
function getPlaylists() {
    const URL = `http://music.163.com/discover/playlist`
    const OPTIONS = {
        url: URL,
        headers: {
            "Host":"music.163.com",
            "Referer":"http://music.163.com/",
            "Upgrade-Insecure-Requests": 1,
            "Cookie":`_ntes_nnid=c6093c68f333d35210a7f9cc68704fd4,1473949457100; _ntes_nuid=c6093c68f333d35210a7f9cc68704fd4; usertrack=c+5+hlh6RcYFaGI+DgwyAg==; _ga=GA1.2.1820476543.1484408264; vjuids=74866630e.15adfefc93c.0.b3abdcf6d7e01; vjlast=1489815718.1491143384.13; vinfo_n_f_l_n3=cf7dee8ea0171ac1.1.0.1498488782512.0.1498489225406; jsessionid-cpta=f4X1GjWUGAxkuCAqqft80gfkRwSdl7BrhGEteTiCBATH%5CdC%5Cw%2Bu7fyHJpzNuV4JUZ79Oy8gI9gu51a%5C5YYlWZ%2FB7a%5CK8UXw0JgLg3MgHISvCMSX0S7h%2BJmiQ2y1nf5g0Mie3IQCSAbiic%2B5yIAo4lYwtduz2vU1HAW%2FP9JBCTUo%2B4U1U%3A1499423548282; c98xpt_=30; __csrf=2bed48e852df2791b8acee95238a091e; JSESSIONID-WYYY=oxn3meiQ5lF1FKW3W6Z%5C6FBRQc%2FGV2Sd%2FsduwRn49BH0O%5COlPt7t0dUmNkKeX489PWO0%5CjdQ%2BTpoOq4W4zj0akOdwZvXx2p6%2FFOu9jiFxPurnGjP2J3DHOpwPJMZgScx2Pyy9qZBMDlrCB%2B6GiGF7cWskyD2yhoOcRSN%2F6wZQPuaEeu5%3A1500970604175; _iuqxldmzr_=32; __utma=94650624.1285428924.1473949456.1500949654.1500967515.103; __utmb=94650624.17.10.1500967515; __utmc=94650624; __utmz=94650624.1500949654.102.60.utmcsr=baidu|utmccn=(organic)|utmcmd=organic`,
            "User-Agent": `User-Agent:Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36`
        }
    };
    return new Promise(function (resolve, reject) {
        request.get(OPTIONS, function (err, res) {
            if (err) {
                reject(err)
                return
            }
            let $ = cheerio.load(res.body.toString())
            let playlist = []
            $("#m-pl-container li").each(function (k, v) { 
               let playitem={
                   image:$(v).find(".j-flag").attr("src"),
                   name:$(v).find(".dec").text(),
                   href:$(v).find(".dec a").attr("href"),
                   count:$(v).find(".nb").text()
               }
               playlist.push(playitem)
            })
            resolve(playlist);
            return
        })
    })
}
//使用axios获取热歌排行榜数据
function getHotranks() {
    const URL = "http://music.163.com/weapi/v3/playlist/detail?csrf_token=2bed48e852df2791b8acee95238a091e"
    const HEADERS = {
        "Content-Type":"application/x-www-form-urlencoded",
        Host: "music.163.com",
        Origin: "http://music.163.com",
        Referer: "http://music.163.com/m/",
        "User-Agent": `Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1`

    }
    const PARAMS = {
       params:"I9L7MPQ20bHqgU5f+VP1RGkhP7ft59VlzUVXbx6StYyTguPIGZn5ddjS80pVyZ5mkxkx7SEp6GMcO1y6C5u7U5kpdL1AeUWz6uNpZuxt5y2gjGXb36pzh0CjdvOJXojtAolgVA3IjRz+cWP1XUVqTw==",
       encSecKey:"7e400e3930f6966e76f6daf696d20963a34838eec7d22896db5cd74169f0928824d11f31717cdbeb87a3a469c9f693106cb8a1efc284429f46661ad6845d8b84522074d85b6b5da25d604dfae07efedb6ff2cb4b8d274e162d33313222065e7d117c17d091726b350e467a40ec962de5eb2c2b5ffe9cc96c1845ba562ca8e1a6"
    }
    // request.post({url: URL,qs:{csrf_token:"2bed48e852df2791b8acee95238a091e"},headers:HEADERS,form:PARAMS},function(err,res){
    //     console.log(res.body)
    // })

    // axios自身就返回Promise不需要像getRecommends中使用request(不返回Promise)时进行封装
    return axios.post(URL,qs.stringify(PARAMS),{headers:HEADERS})
}
module.exports = {
    getRecommends: getRecommends,
    getNewSongs: getNewSongs,
    getPlaylists: getPlaylists,
    getHotranks:getHotranks
}