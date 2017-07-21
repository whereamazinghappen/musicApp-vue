let request = require('request'),
    cheerio = require('cheerio'),
    qs = require('querystring');
// 爬虫获取歌单信息为异步操作故封装为一个promise    
function getdiscover() {
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
            let remd=[]
            $(".remd_li").each(function(k,v){
                let remditem={
                    "name":$(v).text(),
                    "href":$(v).attr("href"),
                    "image":$(v).find(".u-img").attr("src"),
                    "count":$(v).find(".remd_lnum").text()

                }
                remd.push(remditem)
            })
            resolve(remd);
            return
        })
    })
}
module.exports = {
    getdiscover: getdiscover
}