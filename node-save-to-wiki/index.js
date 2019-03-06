const express = require('express')
// const chalk = require('chalk')
const moment=require('moment')
const {move}=require('./move')
const ipAddress=require('./ip-address')

const app = express()
app.configure(function () {
  app.use(express.bodyParser())
})

//设置跨域访问
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("X-Powered-By", ' 3.2.1')
  res.header("Content-Type", "application/jsoncharset=utf-8")
  next()
})

//处理POST请求  
app.post('/wiki', function (req, res) {
  console.log(req.body)

  const curYear=new Date().getFullYear()
  const weekOfYear=moment().weeks()//本周是当年的第几周

  move(curYear,weekOfYear,req.body).then(_ => {
    res.send(`http://${ipAddress}:2019/news/`)
    console.log(`${curYear}年第${weekOfYear}周.md 生成成功！`)
  })
})

app.listen(1994)
console.log('Listening on port 1994')  
