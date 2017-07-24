var express         = require('express');
var app             = express();
var bodyParser      = require('body-parser');
var multer          = require('multer');
var fs              = require('fs');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var upload = multer({ dest: './public/uploads/' });

app.get('/', function(req, res){
    res.render('index');
});

app.post('/get-file-size', upload.any(), function(req, res){
        var filesize = {
            'filesize': req.files[0]['size']
        };
        var filepath = req.files[0]['path'];
        fs.unlink(filepath, (err)=>{
            if(err) throw err;
            else console.log('Uploaded file was deleted successfully...');
        });
        res.json(filesize);
});



app.listen(process.env.PORT, process.env.IP, () => {
    console.log('Server is listening to PORT: ' + process.env.PORT);
});