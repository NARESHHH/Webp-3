const axios = require('axios')
const people = require('./people')

const getStocks = async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json');
    return data // this will be the array of people objects
  }

const getStockById=async function getStockById(id){
    if(!id){
        throw 'ERROR:Id parameter required';  
    }

    //check id parameter is string type
    if(typeof id !== 'string'){
        throw 'ERROR: Id parameter need to be a string';  
    }

    //Check id parameter is just an empty spaces
    if (id == null || id.trim() === ''){
        throw 'ERROR: Empty parameter provided';
    }

    var res = {}

    const data = await getStocks();
    if(data.length == 0){
        throw "ERROR in fetching stocks data"
    }

    for (let ele of data){
        if(ele.id === id){
            res = ele;
            return res;
        }
    }
    throw "No object with ERROR Found"

  }

  const listShareholders = async function listShareholders(stockName){
      if(!(stockName)){
          throw "ERROR: StockName parameter is required"
      }
      if(typeof stockName == 'String'){
          throw "ERROR: stockName string parameter is required"
      }
      if(stockName == null || stockName.trim()==''){
          throw "ERROR: StockName parameter is Empty"
      }

      const data = await getStocks();

      
      final = []
      
      for(let ele of data){
          if(ele.stock_name===stockName){
              res = {}
              shares = []
              res["id"] = ele.id;
              res["stock_name"]= ele.stock_name;
              let shareholders = ele.shareholders;
              
              for(let key of shareholders){
                  
                  let obj = {};
                  
                  let obj1 = await people.getPersonById(key['userId'])
                  first = obj1.first_name;
                  last = obj1.last_name;
                  noOfShares = key['number_of_shares']; 
                  
                  obj = {'first_name' : (first), 'last_name' : (last) ,'number_of_shares' : (noOfShares)};
                  shares.push(obj);

                  if(Object.keys(obj).length === 0){
                    break;
                  }
                }
                res['shareholders'] = shares; 
                final.push(res);

            }

        }
              if(final.length !== 0){
                return JSON.stringify(final, null, "\t");
            }else{
                throw 'NOO DATA FOUND ERROR'; 
            }
               
    }
      
const totalShares = async function totalShares(stockName){
        //check id parameter is exist
        if(!stockName){
            throw 'ERROR: stockName parameter is required';  
        }
    
        //check id parameter is string type
        if(typeof stockName !== 'string'){
            throw 'ERROR : stockName parameter needs to be string.';  
        }
        if(isNaN(stockName)==false){
            throw "ERROR: Number provided as string.";
        }
    
        //Check id parameter is just an empty spaces
        if (stockName == null || stockName.trim() === ''){
            throw 'ERROR: stockName parameter should not be empty.';
        }

        const stocksdata = await getStocks()
        let sum = 0;
        let num = 0;
        let flag = false;
        for(let ele of stocksdata){
            if(ele.stock_name === stockName){
                flag = true
                 num = ele.shareholders.length
                let shares = ele.shareholders;
                for(let share of shares){
                    sum = sum + share['number_of_shares']
                }
                

            }
           
        }
        if(flag === true ){
        if (num == 0){
            let res = stockName+" currently has no shareholders.";
            return res;
        }
        else{
            let res = stockName+"has "+ num +" shareholders that own a total of "+ sum +" shares.";
            return res;
        }
    }
    else{
        throw 'ERROR: No stock with that name';
    }
    

}

const listStocks = async function listStocks(firstName, lastName){
    if(!(firstName) || !(lastName)){
        throw "ERROR: FirstName or LastName parameter is Missing."
    }
    if(typeof firstName !== 'string' || typeof lastName !== 'string'){
        throw " ERROR : FirstName or LastName need to be a String"
    }

    if(isNaN(firstName)==false || isNaN(lastName)==false){
        throw "ERROR: Number provided as string or Empty space provided"
    }
    const peopledata = await people.getPeople();
    if(peopledata.length == 0){
        throw "ERROR: Peopledata is empty"
    }
    let id = '';
    for(let ele of peopledata){
        if(ele.first_name === firstName && ele.last_name === lastName){
            id = ele.id
            
        }
    }
    if(id === null || id === ''){
        throw firstName +" "+lastName+' is not present in people.json';
    } 

    const stockdata = await getStocks();

    var result = []

    for(let ele of stockdata){
        var shareholders = ele.shareholders;
        for(let share of shareholders){
           // console.log(share)
            if(id === share.userId){
               let obj = {stock_name: ele.stock_name, number_of_shares: share.number_of_shares}
               result.push(obj)
            }
        }
        
    }
    if (result.length !== 0) {
        return result;
    }else{
        throw 'Person does not owns shares in any  company';
    }
}

  

  module.exports ={
      getStocks,
      getStockById,
      listShareholders,
      totalShares,
      listStocks
  }