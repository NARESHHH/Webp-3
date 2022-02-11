const axios = require('axios')

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json');
    return data // this will be the array of people objects
  }

const getPersonById =  async function getPersonById(id){
    if(!(id)){
        throw "ERROR: id Parameter Required";
    }

    if(typeof id !== 'string'){
        throw "ERROR: Id need to be of string type";
    }
    if(isNaN(id)==false){
        throw " ERROR : Integer provided as string"
    }
    
    const data = await getPeople();

    for(let ele of data){
        if(ele.id === id){
            return ele
        }
    }
    throw "Person details with id not found !!!!!!"


}

const sameEmail = async function sameEmail(emailDomain){
    if((!emailDomain)){
        throw "ERROR: emailDomain parameter required";  
    }

    //Check that parameters are string type
    if((typeof emailDomain !== 'string') ){
        throw 'emailDomain parameters are not string type';  
    }

    //Check id parameter is just an empty spaces
    if ((emailDomain == null || emailDomain.trim() === '')){
        throw 'emailDomain  parameters are empty';
    }

    var input = emailDomain.split(".")
    
    if(input.length<=1 || input.length >3){
        throw " emailDomain error"
    }
    
    for(let i=1;i<=input.length-1;i++){
        
        if(input[i].length < 2 || input[i].length > 3){
            
            throw "Email domain error1"
        }
        if(!isNaN(input[i])){
            throw " emaildomain name error"
        }
    }
    for(let i=0;i<input.length;i++){
        for(let j=0;j<input.length;j++){
            if(parseInt(input[i].charAt(j))=== NaN){
                throw "Error: Number identified, string identified";
            }
        }
    }
    var res = []

    const data = await getPeople();

    emailDomain = emailDomain.toLocaleLowerCase();
    for(const ele of data){
        if(ele.email.split('@')[1]===emailDomain){
            res.push(ele)
        }
    }
    
    if(res.length > 1){
        return JSON.stringify(res, null, "\t");
    }
    else{
        throw "Error no data found or least data found with domain name"
    }
    
}

const manipulateIP = async function manipulateIp()
{
    var sum = 0;
    let high;
    let low;
    let highObj = {};
    let lowObj = {};
    if(arguments.length !== 0){
        throw 'Illegal argument passed';
    }
    const data = await getPeople();

    if(data.length === 0){
        throw 'Person json file is empty';
    }
    else{
        
        var res = {}
        
    for(let ele of data){
        
        var num = parseInt(ele.ip_address.split(".").join(""))
        var myArr = String(num).split("").map((num)=>{
            return Number(num)
          })
        var sortedarray = myArr.sort();
        var ip = +sortedarray.join("");
        var fname = ele.first_name;
        var lname = ele.last_name;
        sum =  sum + ip;

        if(high == null & low == null){
            high = ip;
            low = ip;
            highObj['firstName'] = (fname);
            highObj['lastName'] = (lname);
            lowObj['firstName'] = (fname);
            lowObj['lastName'] = (lname);
                    
            res['highest'] =(highObj);
            res['lowest'] = (lowObj);
        }
        else if(high < ip){
            high = ip;
            delete res.highest;
            highObj['firstName'] = (fname);
            highObj['lastName'] = (lname);
            res['highest'] =(highObj);

        }
        else if(low > ip){
            low = ip;
            delete res.lowest;
            lowObj['firstName'] = (fname);
            lowObj['lastName'] = (lname);
            res['lowest'] = (lowObj);
        }


    }
    let total = data.length;
    
    res['average']  = (Math.floor((sum/total)));
  }
  return res;

}

const sameBirthday = async function sameBirthday(month, day){
    if(!(month) || !(day)){
        throw "ERROR : Month/day parameters are missing"
    }
    var b = parseInt(day);
    var a = parseInt(month);
    month = a;
    day = b;
    if(isNaN(month) == true || isNaN(day)){
        throw " ERROR in Month or Day arguments"
    }
    if(typeof day === 'string'){
        if(day == null || day.trim() === ''){
            throw 'day is an empty string';
        }
        if(month == null || month.trim() === ''){
            throw 'It is an empty string';
        }
    }
   //Check that month and day of number type
   if(typeof month !== 'number' || typeof day !== 'number'){
       throw 'Month or Day are not numbers';
    }

cal = {
    1: ['Jan',31],
    2: ['Feb',28],
    3: ['Mar',31],
    4: ['Apr',30],
    5: ['May',31],
    6: ['Jun',30],
    7: ['Jul',31],
    8: ['Aug',31],
    9: ['Sept',30],
    10:['Oct',31],
    11:['Nov',30],
    12:['Dec',31]
}
if( month in Object.keys(cal)){

    if(day > cal[month][1] || day < 0){
        throw "Error: There are not "+day+" days in "+cal[month][0]
    }
}
else{

    throw " ERROR : Month is greater than 12"
}
const data = await getPeople();
var res = []
for(let ele of data){
    dob = ele.date_of_birth.split('/');
    if(Number(dob[0])===month && Number(dob[1])===day){
        let fname = ele.first_name;
        let lname = ele.last_name;
        res.push(fname+" "+lname);
    }

}
if (res.length !== 0) {
    return res;
}else{
    throw 'There is no people with same birthday : '+month+"/"+day;
    }


}

module.exports={
      getPeople,
      getPersonById,
      sameEmail,
      manipulateIP,
      sameBirthday
  }