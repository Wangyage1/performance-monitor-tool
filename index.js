
//前端性能监控
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('views', 'views');
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/www'));

//路由的顺序肥肠重要
app.post('/abnormal', (req, res) => {
    console.log('abnormalData', req.body)
    res.end();
});

app.use('/', (req, res) => {
    res.render('index')
});

app.listen(9000, () => {
    console.log('listening on 9000');
})