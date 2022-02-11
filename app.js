const people = require("./people");
const stocks = require("./stocks")

async function main(){


       //  1. getPersonById :
         console.log("Get Person By Id Test Case");
         try{
         let person = await people.getPersonById('7989fa5e-8f3f-458d-ad58-23c8d9ef5a10'); 
         console.log(person);
             }
             
            catch(e){
             console.log(e);
         }
 
         //Test cases for getPersonById
         // await getPersonById(-1); \\ Throws Error 
         // await getPersonById(1001); \\ Throws Error 
         // await getPersonById();\\ Throws Error
         // await getPersonById('7989fa5e-5617-43f7-a931-46036f9dbcff');\\ Throws person not found Error
         
 
         //2. sameEmail :
         try{
             console.log("Same Email TestCase");
             let sameEmailVal = await people.sameEmail('harvard.edu') ;
             console.log(sameEmailVal);
              }catch(e){
              console.log(e);
          }
     
         
         
        //    await sameEmail("foobar"); \\ Throws Error
        //    await sameEmail("foobar."); \\ Throws Error
        //    await sameEmail("foobar.123"); \\ Throws Error
        //    await sameEmail(".com"); \\ Throws Error
        //    await sameEmail(); \\ Throws Error 
        //    await sameEmail("google.com.hk");
 
         //3. manipulateIp
         try{
             console.log("ManipulateIp Test Case");
             let manipulateIpVal = await people.manipulateIP(); 
             console.log(manipulateIpVal);
 
              }catch(e){
              console.log(e);
          }
         
 
         //4. sameBirthday 
         try{
             console.log("Same Birthday Test Case");
             let sameBirthdayValues = await people.sameBirthday(09,25);
             console.log(sameBirthdayValues);
              }catch(e){
              console.log(e);
          }
         
         //Test cases for sameBirthday
         // await sameBirthday(09, 25); \\ Returns: ['Khalil Ovitts',  'Erny Van Merwe', 'Emanuel Saben', 'Iorgos Tembridge']
         // await sameBirthday(9, 25); \\ Returns: ['Khalil Ovitts',  'Erny Van Merwe', 'Emanuel Saben', 'Iorgos Tembridge']
         // await sameBirthday("09", "25"); \\ Returns: ['Khalil Ovitts',  'Erny Van Merwe', 'Emanuel Saben', 'Iorgos Tembridge'] because the parameters can be parsed into valid numbers.
         // await sameBirthday(09, 31); \\ Throws Error: There are not 31 days in Sept
         // await sameBirthday(13, 25); \\ Throws Error: Month > 12
         // await sameBirthday(02, 29); \\ Throws Error: There are not 29 days in Feb
         // await sameBirthday("09", "31"); \\ Throws Error: There are not 31 days in Sept
         // await sameBirthday("      ", "25"); \\ Throws Error
         // await sameBirthday(); \\ Throws Error:
 
 

 
         //5. listShareholders
         try{
             console.log("List Share Holders Test Case");
             let shareHoldersList = await stocks.listShareholders('Aeglea BioTherapeutics, Inc.'); 
             console.log(shareHoldersList);
              }catch(e){
              console.log(e);
          }
 
          //Test cases for listShareHolders
         // await listShareholders('7283e5d6-7481-41cb-83b3-5a4a2da34717') // Throws Error
         // await listShareholders('Nuveen Preferred and Income 2022 Term Fund') // Throws Error
 
 
         //6. totalShares
         try{
             console.log("Total Shares Test Case");
             let topShares = await stocks.totalShares('Aeglea BioTherapeutics, Inc.'); 
             console.log(topShares);
              }catch(e){
              console.log(e);
          }
 
        
 
         //7. listStocks 
             try{
             console.log("List Stocks Test Case");
             let listShareHolder = await stocks.listStocks("Grenville", "Pawelke" );
             console.log(listShareHolder);
             }catch(e){
             console.log(e);
         }
 
 
         //Test cases for listStocks
         // await listStocks('Patrick', "Hill"); // Throws Error because Patrick Hill is not in people.json
         // await listStocks(); // Throws Error
         // await listStocks("foo"); // Throws Error 
         // await listStocks("      ", "        "); // Throws Error
         // await listStocks(1,2); // Throws Error
 
         //8. getStockById
         try{
             console.log("Get Stocks By Id Test Case");
             let stockById = await stocks.getStockById("f652f797-7ca0-4382-befb-2ab8be914ff0"); 
             console.log(stockById);
             console.log()
             }catch(e){
             console.log(e);
         }
 
         //Test cases for getStockById
         // await getStockById(-1); \\ Throws Error 
         // await getStockById(1001); \\ Throws Error 
         // await getStockById();\\ Throws Error
         // await getStockById('7989fa5e-5617-43f7-a931-46036f9dbcff');\\ Throws stock not found Error
 
      }
        
//call main
main();