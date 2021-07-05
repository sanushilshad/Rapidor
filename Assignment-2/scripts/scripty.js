
const price=$('#Price');
const quantity=$('#Quantity');
const discount=$('#Discount');
const gross=$('#Gross_Amount');
const discount_amount=$('#Discount_Amount');
const net_total=$('#total_bill');
const label=$('#label-1');
const cess_amount=$('#cess_amount');

const B2B=$('#B2B');
const B2C=$('#B2C');



let price_num=0;
let quantit_num=1;
let discount_var;
let discount_amount_var;
let gross_amount_var;
let cess=0;




let calculation= function(){

    
    price_num=parseInt(price.val());
    quantit_num=parseInt(quantity.val());
    gross_amount_var=price_num*quantit_num;
    discount_var=discount.val();
    label.text(discount_var+'%');

    if (B2C.is(":checked")){
        cess=(gross_amount_var-discount_amount_var)*(1/100);
        cess_amount.attr('placeholder',cess);
    }
    else{
        cess=0;
        cess_amount.attr('placeholder',cess);
    }

    
    discount_amount_var=(price_num*quantit_num)*discount_var/100;
    gross.attr('placeholder',gross_amount_var);
    discount_amount.attr('placeholder', discount_amount_var);
    net_total.attr('placeholder', gross_amount_var-discount_amount_var+cess);
    

}

price.on('input',calculation);
quantity.on('input',calculation);
discount.on('input',calculation);
B2B.on('input',calculation);
B2C.on('input',calculation);

// price.on('input',function(){
   
//    price_num=parseInt(price.val());
//     quantit_num=quantity.val();
//     er=price_num*quantit_num;
//     gross.attr('placeholder',er);
//     dd=discount.val()
//     k=(price_num*quantit_num)*dd/100;
//     discount_amount.attr('placeholder', k);
//     net_total.attr('placeholder', er-k);
    

// });



// quantity.on('input',function(){

//     quantit_num=parseInt(quantity.val());
//     er=price_num*quantit_num;
//     gross.attr('placeholder', er);
//     k=(price_num*quantit_num)*dd/100;
//     discount_amount.placeholder=k;
//     discount_amount.attr('placeholder', k);
//     net_total.attr('placeholder', er-k);
    
    

// });

// discount.on('input',function(){

//    dd=discount.val();
//    label.text(dd+'%');

//    k=(price_num*quantit_num)*dd/100;
//    discount_amount.attr('placeholder', k);
//    net_total.attr('placeholder', er-k);
   

// });




// const price=document.querySelector('#Price');
// const quantity=document.querySelector('#Quantity');
// const discount=document.querySelector('#Discount');
// const gross=document.querySelector('#Gross_Amount');
// const discount_amount=document.querySelector('#Discount_Amount');
// const net_total=document.querySelector('#total_bill');

// price.oninput=()=>{

//     price_num=parseInt(price.value);
 
//     quantit_num=quantity.value;
//     er=price_num*quantit_num;
//     gross.placeholder=er;
//     dd=discount.value
//     k=(price_num*quantit_num)*dd/100;
//     discount_amount.placeholder=k;
//     net_total.placeholder=er-k;
    
//  }

 
//  quantity.oninput=()=>{

//     console.log(quantity.value);
//     quantit_num=parseInt(quantity.value);
//     er=price_num*quantit_num;
//     gross.placeholder=er;
//     k=(price_num*quantit_num)*dd/100;
//     discount_amount.placeholder=k;
//     net_total.placeholder=er-k;
//  }


  
//  discount.onclick=()=>{
//    dd=discount.value
//    k=(price_num*quantit_num)*dd/100;
//    discount_amount.placeholder=k;
//    net_total.placeholder=er-k;
//  }




    

