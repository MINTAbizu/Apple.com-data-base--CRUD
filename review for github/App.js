var mysql =require("mysql")
var express=require("express");

var bodyparser=require("body-parser");
// const express= require("express");
var app=express()
app.listen(3000,()=>{
    console.log("lisen on port 2000")
})
app.use(bodyparser.urlencoded({ extended: true }));



var mysqlConnection=mysql.createConnection({
    user: "",
  password: "",
  host: "127.0.0.1",
  database: "",


})
mysqlConnection.connect((err)=>{
    if(err){
        console.log(err);
       
        
    }
    console.log("data base Conected");
})

// data base table  creation
app.get("/install", (req, res) => {
    let message = "Tables Created";
    let createProducts = `CREATE TABLE if not exists Products(
        product_id int auto_increment,
        product_url varchar(255) not null,
        product_name varchar(255) not null,
        PRIMARY KEY (product_id)
    )`;
    let createProductDescription = `CREATE TABLE if not exists ProductDescription(
      description_id int auto_increment,
      product_id int(11) not null,
      product_brief_description TEXT not null,
      product_description TEXT not null,
      product_img varchar(255) not null,
      product_link varchar(255) not null,
      PRIMARY KEY (description_id),
      FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;
    let createProductPrice = `CREATE TABLE if not exists ProductPrice(
      price_id int auto_increment,
      product_id int(11) not null,    
      starting_price varchar(255) not null,
      price_range varchar(255) not null,
      PRIMARY KEY (price_id),
      FOREIGN KEY (product_id) REFERENCES Products(product_id)
    )`;
    mysqlConnection.query(createProducts, (err, results, fields) => {

      if (err) {console.log(err);}
    });
    mysqlConnection.query(createProductDescription, (err, results, fields) => {
      if (err){ console.log(err);}
    });
    mysqlConnection.query(createProductPrice, (err, results, fields) => {
      if (err){ console.log(err);}
    });
  
    res.end(message);
  });

// insert data



// app.post("/addiphone",(req ,res)=>{
//    let Id=req.body.iPhoneId;
//    let img=req.body.imgPath;
//    let Url=req.body.iphonelink;
//    let Title = req.body.iphoneTitle;
//   let StartPrice=req.body.StartPrice;
//  let priceRange=req.body.priceRange;
//    let briefDescription=req.body.briefDescription;
//  let Description=req.body.fullDescription;






//  let sqlAddToProducts =
//   "INSERT INTO Products (product_url, product_name) VALUES ('" +
//  Id +
//  "', '" +
//   Title +
//   "' )";

//   mysqlConnection.query(sqlAddToProducts, (err, result),()=> {
// if (err){
//   console.log(err)
// }
// console.log("1 record inserted");
// });


// let getmetheid="SELECT * FROM  Products WHERE product_url="+'"+ Id +' 


// mysqlConnection.query(getmetheid,(err,rows,fildes)=>{
//   console.log(row)
  
//   let addedproductID=0

//   addedproductID  =rows[0].product_id
//   console.log(addedproductID);

// if(addedproductID !=0){
//   let sqladdtodescription="INSERT INTO productdescription(product_id,brif_description,product_imag, product_link) VALUES('"+addedproductID+"',     '"+ 
//    briefDescription+"','"+img+"','"+ Url+"') "
  
//   mysqlConection.query(sqladdtodescription,(error,results)=>{
//       if(error){
//           console.log(error);
//       }
  
//    })

// }


// }
// )

//  let sqladdtodescription="INSERT INTO productdescription(product_id, brif_description,product_imag, product_link) VALUES( '"+addedproductID+"'  ,   '"+ 
//  briefDescription+"','"+img+"','"+ Url+"') "

// mysqlConection.query(sqladdtodescription,(error,results)=>{
//     if(error){
//         console.log(error);
//     }

//  })


// var sqladdtoprice="INSER INTO productprice (product_id,starting_price,  price_range) VALUES(  '"+addedproductID+"',      '"+StartPrice+"','"+ priceRange+"')"

// mysqlConection.query(sqladdtoprice,(err,results)=>{
//    if(err){
//     console.log(err)
//    }

// })






//  })


 app.post("/addiphone",(req,res)=>{
  console.log(req.body)
let id=req.body.iphoneId
let img=req.body.imgPath
let url=req.body.imgPath
let link=req.body. iphoneLink
let titile=req.body.iphoneTitle
let price=req.body. StartPrice
let  priceRange=req.body. priceRange
let  briefDescription=req.body. briefDescription

let  fullDescription=req.body. fullDescription


let inserttoProducts="INSERT INTO Products( product_url,product_name) VALUES ('"+id+"','"+ titile+"')"
 
mysqlConnection.query(inserttoProducts,(error,result)=>{
  if(error){
    console.log(error)
  }
  console.log(error)


   const getmetheid= "SELECT * FROM Products WHERE product_url = '"+id+"'";

   mysqlConnection.query(getmetheid,(error,row,fileds)=>{
    console.log(row)
    let selectedid=row[0].product_id; 
    console.log(selectedid)

    if(selectedid !=0){

      let insertintodescrption="INSERT INTO ProductDescription(product_id,product_brief_description,product_description,product_img,product_link) VALUES('"+ id+"','"+briefDescription+"','"+fullDescription+"','"+img+"','"+link+"')"
    
       mysqlConnection.query(insertintodescrption,(error,result,filed)=>{
      if(error){
        console.log(error)
      }
      console.log(result)
    })

    let insertintoprice="INSERT INTO  ProductPrice( product_id,starting_price,price_range )VALUES('"+id+"','"+price+"','"+priceRange+"') "
     
    mysqlConnection.query(insertintoprice,(error,result,filed)=>{
      if(error){
        console.log(error)
      }
      console.log(result)
    })
   

     


  }
   })



  // const id =result.insertID

  console.table(result)



  
// let insertintoproductdescription="INSERT INTO  ProductDescription( product_id , product_brief_description, product_description, product_img,product_link) VALUES('"+ id+"','"+ briefDescription+"','"+ fullDescription+"','"+ img+"','"+ link+"')"



// mysqlConnection.query(insertintoproductdescription,(error,result)=>{
//   if(error){
//     console.log(error)
//   }
//   console.log(error)
// })


// // console.table(result)


  res.end("eysera nw")




 })
})