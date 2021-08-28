const express =require('express');
const bodyParser= require('body-parser');
const mongoose =require('mongoose');
const cors =require('cors');
const getstocksdata = require('./controllers/stockdata');
const getstocksymbol = require('./controllers/stocksymbol');
const path = require('path');
const app = express();
const dotenv = require("dotenv");
const { createProxyMiddleware } = require('http-proxy-middleware');


app.use(bodyParser.urlencoded({extended: false}));

dotenv.config();
app.use(cors());


module.exports = function(app) {
  app.use(
    '/stock',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    })
  );
};

app.get('/stock',getstocksdata);
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});


//Database Connection

const PORT=process.env.PORT||3000;
mongoose.Promise = global.Promise;
mongoose.connect(`${process.env.CONNECTION_URL}`,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(()=>app.listen(PORT,()=>{console.log("server running")}))
  .catch((error)=>console.log(error.message));

