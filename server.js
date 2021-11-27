var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if(path === '/'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`<!DOCTYPE html>
                    <html>
                    <head>
                      <meta charset="utf-8">
                      <title>跳动的心</title>
                      <link rel="stylesheet" href="/x" type="text/css"/>
                    </head>
                    <body>
                      <div id="heart">
                        <div class="left"></div>
                        <div class="right"></div>
                        <div class="bottom"></div>
                      </div>
                      <script src="/y" type="text/javascript">
                      </script>
                    </body>
                    </html>`)
    response.end()
  } else if(path === '/x'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write(`*{box-sizing: border-box;}
                    #heart{
                      display: inline-block;
                      margin: 100px;
                      position: relative;
                      animation: .5s heart infinite alternate-reverse;
                    
                    }
                    @keyframes heart {
                      0%{
                        transform: scale(1);
                      }
                      100%{
                        transform: scale(1.2);
                      }
                    }

                    #heart>.left{
                      background: red;
                      width: 50px;
                      height: 50px;
                      position: absolute;
                      transform: rotate(45deg) translateX(31px);
                      bottom: 50px;
                      left: -50px;
                      border-radius: 50% 0 0 50%;
                    }
                    #heart>.right{
                      background: red;
                      width: 50px;
                      height: 50px;
                      border-radius: 50%;
                      position: absolute;
                      transform: rotate(45deg) translateY(31px);
                      bottom: 50px;
                      right: -50px;
                      border-radius: 50% 50% 0 0;
                    }
                    #heart>.bottom{
                      background: red;
                      width: 50px;
                      height: 50px;
                      transform: rotate(45deg);
                    }`)
    response.end()
  }else if(path === '/y'){
    response.statusCode = 200
    response.setHeader('Content-Type', 'text/js;charset=utf-8')
    response.write(`console.log("这是JS")`)
    response.end()
  } else {
    response.statusCode = 404
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)