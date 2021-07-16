// query for the searcch function

let checked_1=[]
let product_list;





$('#search').keyup( function(){
    
    console.log("Entered: " + $('#search').val());
    axios.post('http://127.0.0.1:8000/order/search', {
      customer:  $('#search').val()

    })
    .then(function (response) {
      $('.options').remove()
      let  search_list = response.data.list;
      $.each(search_list, function(index, value) {
        $("#datalistOptions").append(`<option class='options' value=${value}>`);
        });
        $('#customer_name').text('customer_name:'+$('#search').val())
    })
})




// $('.update').on(click,function(){


// })

$('#order').on('click', function(){
  
    console.log("mymy");
    axios.get('http://127.0.0.1:8000/order/list', {
    })
    .then(function (response) {
       console.log("data acquired");
       console.log(response.data.status)
       product_list = response.data.list;
       console.log(product_list)
       $('.mm').remove()
       
       $.each(product_list, function(index, value){
        
        
        let a=`<div class="mm">
            <div class="row">

            <div class="col ">
              <h4 class='index' style='font-size:20px; text-align:center'>${index+1}</h4></div>
            <div  class="col ">
              <h4 class='name' style='font-size:20px; text-align:center '>${value['name']}</h4></div>
            <div  class="col ">
              <h4 class='code' style='font-size:20px; text-align:center'>${value['code']}</h4></div>
            <div  class="col unit_price">
              <h4 class=unitprice style='font-size:20px; text-align:center'>${value['unit_price']}</h4></div>
            <div  class="col tax_percent">
              <h4 class='taxpercent' style='font-size:20px; text-align:center'>${value['tax_percent']}</h4></div>
            <div  class="col">
              <div class="form-check ">
                <input class="form-check-input checky" style=margin-left:41% type="checkbox" >
              </div>
          </div>
            <hr>
          </div>
          </div>`

        $(".listing").append(a)
        
        

        
        

        
          
      });
      $('.mm').each(function(index,values){
        code3=$(values).find('.code').text()
        if (checked_1.indexOf(code3) >= 0){
          ($(values).find('.checky')).attr('checked', true)
        }
              })

  //       $(".checky").on('click',function() {
  //         console.log('fdf')
  //         if (this.checked) {
  //         checked_1.push($(this).attr('id'))
  //         console.log(checked_1)
  //         }
  //         else if(!this.checked){
          //   let inde=checked_1.indexOf($(this).attr('id'))
          //   checked_1.splice(inde,1)
          // console.log(checked_1)
  
  //         }
  
  // });
    });
})






$('#order_submit').attr('data-bs-dismiss',"modal").on('click', function(){
  // if (checked_1.indexOf(code3) >= 0){
  //   ($(values).find('.checky')).attr('checked', true)
  // }
  $('.jj').remove()
  $('.mm').each(function(index,values){
    // code3=$(values).find('.code').text()
    // if (checked_1.indexOf(code3) >= 0)
    if($(values).find('.checky').is(":checked")){
      let checked_code=($(values).find('.code').text())
      checked_1.push(checked_code);
     
      let a =
      `<div class="kk">
        <div class="row productfield">

      
        <div  class="col">
          <h4 class='name' style='font-size:20px; text-align:center '>${$(values).find('.name').text()}</h4></div>
        <div  class="col ">
          <h4 class='codey'  style='font-size:20px;  text-align:center'>${$(values).find('.code').text()}</h4></div>
        <div  class="col">
          <h4 class='unit_price' style='font-size:20px; text-align:center'>${$(values).find('.unitprice').text()}</h4></div>
    
        <div  class="col">
          <input type="number" class='qty-1' value=0></div>
      
        <div  class="col">
          <h4  class="tax_percent tax_percent${values['id']}" style='font-size:20px; text-align:center'>${$(values).find('.taxpercent').text()}</h4></div>
    
        <div  class="col">
          <h4 class="line_total line_total${$(values).find('.id').text()}" style='font-size:20px; text-align:center'>0</h4></div>
        <div class="col destry_the_selected_product">
          <button type="button" style="margin-left:40%" data-id= 'buttony' class="btn btn-danger delete" ><i class="fas fa-times"></i></button>
        </div>
     
        <hr>
      </div>
    </div>`

  $(".output").append(a)

    }
    
    
  })
  console.log(checked_1);
  let b=
  `<div class='jj'>
    <div class="row">
      <div class='col align-self-end'>
        <h4> Gross Total:</h4>
      </div>
      <div class='col align-self-end'>
        <h4 class='gross_total'>0</h4>
      </div>
    </div>

    <div class="row">
      <div class='col align-self-end'>
        <h4 >Tax Total: </h4>
      </div>
      <div class='col align-self-end'>
        <h4 class='tax_total'>0</h4>
      </div>
    </div>
    <hr>
    <div class="row">
      <div class='col align-self-end'>
        <h4>Grand Total</h4>
      </div>

      <div class='col align-self-end'>
        <h4 class='grand_total'>0</h4>
      </div>   
    </div>
  </div>`
  $(".total_calculations").append(b)

  $('.qty-1').on('input',function(){
    $('#onsubmit').attr('disabled',false);
  
    let $this = $(this);
    let parent_row = $this.parent().parent()
    let unit_price = parent_row.find('.unit_price').text()
    let tax_percent = parent_row.find('.tax_percent').text()
    let line_total=parent_row.find('.line_total')
    let qty = $this.val()
    let x=(parseFloat(unit_price)*parseFloat(qty))
    x=x+ (parseFloat(tax_percent)/100) * x
    line_total.text(x)
 
    let gross_total=0;
    let tax_total=0;
    let grand_total=0;
    $('.productfield').each(function(index,value){
      qty=$(value).find('.qty-1').val()
      unit_price=$(value).find('.unit_price').text()
      tax_rate=$(value).find('.tax_percent').text()

      //calculating and inserting gross total
      gross_total=gross_total+(unit_price*qty)
      $('.gross_total').text(gross_total)

      // calculating and inserting tax total
      tax_total=tax_total+(unit_price*qty)*(tax_rate/100)
      $('.tax_total').text(tax_total.toFixed(2))

      //calculating and inserting grand_total
      grand_total=grand_total+(unit_price*qty)+(unit_price*qty)*(tax_rate/100)
      $('.grand_total').text(grand_total)
      

      
     })
  })




  $(".destry_the_selected_product").on('click',function(){
    let $this = $(this);
    
    del1 = $this.parent().find('.codey').text()
    let inde=checked_1.indexOf(del1)
    checked_1.splice(inde,1)
    console.log(checked_1)
    
    let parent_row = $this.parent().parent()
    parent_row.remove()
    let gross_total=0;
    let tax_total=0;
    let grand_total=0;
    $('.gross_total').text(gross_total)
    $('.tax_total').text(tax_total.toFixed(2))
     $('.grand_total').text(grand_total)
    $('.productfield').each(function(index,value){
      qty=$(value).find('.qty-1').val()
      unit_price=$(value).find('.unit_price').text()
      tax_rate=$(value).find('.tax_percent').text()

      //calculating and inserting gross total
      gross_total=gross_total+(unit_price*qty)
      $('.gross_total').text(gross_total)

      // calculating and inserting tax total
      tax_total=tax_total+(unit_price*qty)*(tax_rate/100)
      $('.tax_total').text(tax_total.toFixed(2))

      //calculating and inserting grand_total
      grand_total=grand_total+(unit_price*qty)+(unit_price*qty)*(tax_rate/100)
      $('.grand_total').text(grand_total)
      

      
     })
    


  })



})



    //  $.each(product_list, function(index, value){
      
    //   if ($.inArray(value['code'], checked_1) !== -1)
    //  {    
            
    //     console.log(value['code'])

    //  }
     

$('#onsubmit').on('click', function(){
 let lines=[]
 $('.productfield').each(function(index,value){
  let product_list={}
  product_list['product_name']=$(value).find('.name').text()
  product_list['product_code']=$(value).find('.code').text()
  product_list['qty']=$(value).find('.qty-1').val()
  product_list['unit_price']=$(value).find('.unit_price').text()
  product_list['tax_rate']=$(value).find('.tax_percent').text()
  lines.push(product_list)
  
 })
    console.log(lines)
    console.log("Entered: " + $('#search').val());
    
    axios.post('http://127.0.0.1:8000/order/create', {
      "customer_code": $('#search').val(),
      "lines":lines,
      


    })
    .then(function (response) {
      console.log('lines')
      alert(response.data.message);

 
  }) 
})





  








