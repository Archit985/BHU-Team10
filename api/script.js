
window.addEventListener('load', fetchStocks);
var  stocks;
var stock_list=[];
var historyList=[];
var StockData=[];
var chartdata=[];
var dps = [];
var date_range=[];
var company_name="";
var company_description="";
var chartype="";
var syb="";
var date="";
var time="";
//const fetch = require('node-fetch');
async function fetchStocks() {
    const response = await fetch('http://localhost:3000/stock');
    stocks = await response.json();
    StockData.push(stocks);
    // waits until the request completes...

    
  }
  async function showDate() {
    
    date_range=[];
    fetchCompany();
    date=document.getElementById("date").value|| 0;
    time=document.getElementById("time").value || 0;
    await isStockSymbolExist(syb,date,time);
    date_range.push(stock_list);
    console.log("date_range",date_range);
    
  }

async function fetchCompany() {
  searchFunction();
  const response = await fetch('https://financialmodelingprep.com/api/v3/profile/'+syb+'?apikey=5985de078ee30ed8d40ba14b5e3555b7');
  const stock = await response.json();
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
  

}



function searchFunction() {
    const val = document.getElementById("search").value;
    syb=val;
    console.log(val);
    historyList.push(val);
    document.getElementById("search").value="";
    ul = document.getElementById("history_list");

    document.getElementById("search_box").appendChild(ul);


    let li = document.createElement('li');
    ul.appendChild(li);

    li.innerHTML += val;

  }

  
function chart(){
  dps = [];
        var chart = new CanvasJS.Chart("chartContainer", {
            animationEnabled: true,
            exportEnabled: true,
            title: {
                text: company_name + time +'('+date+')'
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
        
        $.getJSON("https://canvasjs.com/data/gallery/javascript/intel-stock-price.json", parseData);
        
        function parseData(date_range) {
          var ylabel=[];
            for (var i = 0; i < date_range.length; i++) {
              ylabel[i]=[];
                {
                ylable[i]=[];
                ylabel[i][0]=date_range[i].open;
                ylabel[i][1]=date_range[i].high;
                ylabel[i][2]=date_range[i].low;
                ylabel[i][3]=date_range[i].close;
                }
              
                dps.push({x:date_range[i].date,y:ylabel[i]});
              
              
              
            }
            chart.render();
        }
        
        }


  const isStockSymbolExist = async (syb,date,range) => {
    try {
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
      Object.entries(stocks).forEach(([key, obj]) => {
        var temp= new Date(obj.date);
            if(obj.symbol==syb && temp>=date_final && temp<=date){
              stock_list.push(obj);
            }
      });
          
          
      console.log("stock list",stock_list);
      
    } catch (err) {
      throw Error("lol");
    }
  };
  var date=new Date("2021-01-04T00:00:00.000Z")
  //fetchStocks()
  //isStockSymbolExist("AAPL",date,"weekly");
