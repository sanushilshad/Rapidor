const price=document.querySelector('#Price');
const quantity=document.querySelector('#Quantity');
const discount=document.querySelector('#Discount');
const gross=document.querySelector('#Gross_Amount');
const discount_amount=document.querySelector('#Discount_Amount');
const net_total=document.querySelector('#total_bill');
// const price=$('#Price');
// const quantity=$('#Quantity');
// const discount=$('#Discount');
// const gross=$('#Price');
// const discount_amount=$('#Discount_Amount');
// const net_total=$('#total+discount');
let price_num=0;
let quantit_num=1;
let discount_perc=0;
let count=100;
let orgin_price;
let discount_price;
let final_price;
let dd;
let k;
let er;
// price.on("input", function(){
//     count=price.value;
 
//     console.log(count)
 

// });


price.oninput=()=>{

    price_num=parseInt(price.value);
 
    quantit_num=quantity.value;
    er=price_num*quantit_num;
    gross.placeholder=er;
    dd=discount.value
    k=(price_num*quantit_num)*dd/100;
    discount_amount.placeholder=k;
    net_total.placeholder=er-k;
    
 }

 
 quantity.oninput=()=>{

    console.log(quantity.value);
    quantit_num=parseInt(quantity.value);
    er=price_num*quantit_num;
    gross.placeholder=er;
    k=(price_num*quantit_num)*dd/100;
    discount_amount.placeholder=k;
    net_total.placeholder=er-k;
 }


  
 discount.onclick=()=>{
   dd=discount.value
   k=(price_num*quantit_num)*dd/100;
   discount_amount.placeholder=k;
   net_total.placeholder=er-k;
 }




    

