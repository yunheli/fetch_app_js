 var request = require("request")
// 
function fetch_app(appid){
  request.get("http://www.wandoujia.com/apps/"+appid,function(err,response,body){
    var cheerio = require('cheerio');

    $ = cheerio.load(body);
    console.log($(".app-info .title").text())
    console.log($(".desc-info .con").text())

    var screenshots = $(".screenshot .j-scrollbar-wrap .view-box .overview").children();
    for(var i=0;i<screenshots.length;i++){
      screenshot = screenshots[i];
      console.log($(screenshot).attr("src"))
    }
  })
}


process.stdin.setEncoding('utf8');
console.log("输入appid:")
process.stdin.on('readable', function() {
  var chunk = process.stdin.read();
  if (chunk !== null) {
    process.stdout.write('data: ' + chunk);
    fetch_app(chunk)
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});
