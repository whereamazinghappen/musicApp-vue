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
                    "name": $(v).text(),
                    "href": $(v).attr("href"),
                    "image": $(v).find(".u-img").attr("src"),
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
module.exports = {
    getRecommends: getRecommends,
    getNewSongs: getNewSongs
}