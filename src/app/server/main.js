const express = require('express')
const path = require('path')
var bodyParser = require('body-parser');
var _ = require('underscore')

const app = express()

console.log(path.join(__dirname, 'public'))

app.use('/assets', express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

var posts = [{id: 1, title: 'Oh baby', body: 'Food is nice', author: 'ILikeFood'}, {id: 2, title: 'Suck it', body: 'ILikeFood is a dumbdumb!', author: 'Trollolol'}]
var comments = [{body: 'What the hell is this guy on?'}, {body: 'poop there it is!'}]


app.get('/posts', function (req, res) {
  console.log(posts)
  res.send(posts)
})

app.get('/post/:id', function (req, res) {
  console.log(req.params.id)
  var post = _.findWhere(posts, {id: parseInt(req.params.id)})
  var ret = {post: post, comments: comments}
  console.log(ret)
  res.send(ret)
})


app.get('*', function (req, res) {
  const html = `<!DOCTYPE html>
  <html>
    <head>
      <title>AnonyPost</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body>
      <div id="container"/>
      <script src="/assets/js/browser.js"></script>
    </body>
  </html>
  `

  res.send(html)
})


app.post('/posts', function (req, res){
  console.log(req.body)
  posts.push(req.body)
  res.send(req.body)
})

app.post('/comment', function (req, res){
  console.log(req.body)
  res.send(req.body)
})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
