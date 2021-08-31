

var stock_list=[];
var historyList=[];
var StockData=[];
var chartdata=[];
var dps = [];
var res1=[];
var date_range=[];
var company_name="";
var company_description="";
var chartype="";
var syb="";
var date="";
var time="";
//const fetch = require('node-fetch');
/*async function fetchStocks(StockData) {
    const response = await fetch('http://localhost:3000/stock');
    stocks = await response.json();
    StockData=[];
    for(item in stocks){
      StockData.push(stocks[item]);
   }
    console.log(typeof(stocks));

    console.log(StockData.length);
    // waits until the request completes...
    

    
  }
  */

  
  async function showDate() {
    
    
    await fetchCompany();
    date=document.getElementById("date").value || "";
    time=document.getElementById("time").value || "";
    chartype=document.getElementById("chart").value || "";
    await isStockSymbolExist(syb,date,time,StockData);
    
  }

async function fetchCompany() {
  const response = await fetch('http://localhost:3000/stock');
    stocks = await response.json();
    StockData=[];
    for(item in stocks){
      StockData.push(stocks[item]);
   }
  searchFunction();
  const res = await fetch('https://financialmodelingprep.com/api/v3/profile/'+syb+'?apikey=5985de078ee30ed8d40ba14b5e3555b7');
  const stock = await res.json();
  // waits until the request completes...
  
  company_description=stock.length>0?stock[0].description:'Company Not exist';
  company_name=stock.length>0?stock[0].companyName:'sorry';
  console.log(stock);
  console.log(company_description);
  console.log(company_name);
  let h = document.getElementById("company_name");
  let p = document.getElementById("company_description");
  
  h.innerHTML = company_name;
  p.innerHTML = company_description;
  
  for(var i=0;i<StockData.length;i++){
    var temp= StockData[i];
        if(temp.symbol==syb){
          res1.push(temp);
        }
  };
  console.log(res1);
  if(chartype=="ohlc"){
    chart1(res1);
  }
  else if(chartype=="candlestick"){
    chart2(res1);
  }
  else{
    chart3(res1);
  }
  

}



async function searchFunction() {
    const val = document.getElementById("search").value;
    syb=val;
    console.log(val);
    historyList.push(val);
    ul = document.getElementById("history_list");

    document.getElementById("search_box").appendChild(ul);


    let li = document.createElement('li');
    ul.appendChild(li);

    li.innerHTML += val;

  }

  
function chart1(data_range){
  console.log("chart",chartype);
  dps = [];
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: time+ "Stock Price upto " + date
            },
            axisX: {
                valueFormatString: "DD MMM"
            },
            axisY: {
                title: "Price",
                prefix: "$"
            },
            data: [{
                type: "ohlc",                
                name: company_name +" Stock Price",
                color: "#DD7E86",
                showInLegend: true,
                yValueFormatString: "$##0.00",
                xValueType: "date",
                dataPoints: dps
            }]
        });
        
        parseData(data_range)
        function parseData(date_range) {
            for (var i = 0; i < date_range.length; i++) {
              var temp=[]
                {
                temp.push(date_range[i].open);
                temp.push(date_range[i].high);
                temp.push(date_range[i].low);
                temp.push(date_range[i].close);
                
                }
              
                dps.push({x:new Date(date_range[i].date),y:temp});
                //console.log(temp);
              
              
            }
            console.log(dps);
            chart.render();
        }
        
        }


        function chart2(data_range){
          console.log("chart",chartype);
          dps = [];
                var chart = new CanvasJS.Chart("chartContainer", {
                    animationEnabled: true,
                    exportEnabled: true,
                    title: {
                        text: time+ "Stock Price upto " + date
                    },
                    axisX: {
                        valueFormatString: "DD MMM"
                    },
                    axisY: {
                        title: "Price",
                        prefix: "$"
                    },
                    data: [{
                        type: "candlestick",                
                        name: company_name +" Stock Price",
                        color: "#DD7E86",
                        showInLegend: true,
                        yValueFormatString: "$##0.00",
                        xValueType: "date",
                        dataPoints: dps
                    }]
                });
                
                parseData(data_range)
                function parseData(date_range) {
                    for (var i = 0; i < date_range.length; i++) {
                      var temp=[]
                        {
                        temp.push(date_range[i].open);
                        temp.push(date_range[i].high);
                        temp.push(date_range[i].low);
                        temp.push(date_range[i].close);
                        
                        }
                      
                        dps.push({x:new Date(date_range[i].date),y:temp});
                        //console.log(temp);
                      
                      
                    }
                    console.log(dps);
                    chart.render();
                }
                
                }
     
                
                function chart3(data_range){
                  console.log("chart",chartype);
                  dps = [];
                        var chart = new CanvasJS.Chart("chartContainer", {
                            animationEnabled: true,
                            exportEnabled: true,
                            title: {
                                text: time+ "Stock Price upto " + date
                            },
                            axisX: {
                                valueFormatString: "DD MMM"
                            },
                            axisY: {
                                title: "Price",
                                prefix: "$"
                            },
                            data: [{
                                type: chartype,                
                                name: company_name +" Stock Price",
                                color: "#DD7E86",
                                showInLegend: true,
                                yValueFormatString: "$##0.00",
                                xValueType: "date",
                                dataPoints: dps
                            }]
                        });
                        
                        parseData(data_range)
                        function parseData(date_range) {
                            for (var i = 0; i < date_range.length; i++) {
                              var temp=[]
                                {
                                temp.push(date_range[i].open);
                                temp.push(date_range[i].high);
                                temp.push(date_range[i].low);
                                temp.push(date_range[i].close);
                                
                                }
                              
                                dps.push({x:new Date(date_range[i].date),y:temp});
                                //console.log(temp);
                              
                              
                            }
                            console.log(dps);
                            chart.render();
                        }
                        
                        }
                

  async function isStockSymbolExist(syb,date,range,StockData){
    
      date=new Date(date);     
      var gap;
      if(range==="Weekly") gap=7;
      else gap=30;
      var date_final= new Date(date);
      date_final.setDate(date_final.getDate()- gap);
      // console.log(date);
      // console.log("lol1")
      // console.log(date_final);
      // console.log("lol2")

      stock_list=[];
      console.log(StockData.length);
      console.log(syb);
      for(var i=0;i<StockData.length;i++){
        var temp= new Date(StockData[i].date);
            if(StockData[i].symbol==syb && temp.getTime()>date_final.getTime() && temp.getTime()<=date.getTime()){
              stock_list.push(StockData[i]);
            }
      };
          
        
      console.log("stock list",stock_list);
      if(chartype=="ohlc"){
        chart1(stock_list);
      }
      else if(chartype=="candlestick"){
        chart2(stock_list);
      }
      
      else{
        
          chart3(stock_list);
        
      }
  
   
  };
  //var date=new Date("2021-01-04T00:00:00.000Z")
  //fetchStocks()
  //isStockSymbolExist("AAPL",date,"weekly");
