// query for the searcch function

let checked_1=[]





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
       checked_1=[]
       $.each(product_list, function(index, value){
        
        
        let a=`<div class="mm">
            <div class="row ">

            <div class="col">
              <h4 style='font-size:20px; text-align:center'>${index+1}</h4></div>
            <div  class="col">
              <h4 style='font-size:20px; text-align:center '>${value['name']}</h4></div>
            <div  class="col">
              <h4 style='font-size:20px; text-align:center'>${value['code']}</h4></div>
            <div  class="col">
              <h4 style='font-size:20px; text-align:center'>${value['unit_price']}</h4></div>
            <div  class="col">
              <div class="form-check ">
                <input class="form-check-input checky" style=margin-left:41% type="checkbox" value="" id=${value['id']}>
              </div>
          </div>
            <hr>
          </div>
          </div>`

        $(".listing").append(a)    
          
      });


        $(".checky").on('click',function() {
          console.log('fdf')
          if (this.checked) {
          checked_1.push($(this).attr('id'))
          console.log(checked_1)
          }
          else if(!this.checked){
            let inde=checked_1.indexOf($(this).attr('id'))
            checked_1.splice(inde,1)
          console.log(checked_1)
  
          }
  
  });
    });
})






$('#order_submit').on('click', function(){

  $('.jj').remove()
  console.log("Clicked Submit");
    // let id_2=checked_1
    console.log(checked_1)

  axios.post('http://127.0.0.1:8000/order/cart', {
    'id':  checked_1

  })
  .then(function (response) {
    
    console.log("Retuerned list:", response.data.list)
    let products_choosen = response.data.list
    $.each(products_choosen, function(index, value){
        
  
      let a =`<div class="kk">
          <div class="row productfield">

          <div class="col">
          <button type="button" data-id= ${value['id']} class="btn btn-danger delete" ><i class="fas fa-times"></i></button>
          </div>
          <div  class="col">
            <h4 class='name' style='font-size:20px; text-align:center '>${value['name']}</h4></div>
          <div  class="col">
            <h4 class='code'  style='font-size:20px;  text-align:center'>${value['code']}</h4></div>
          <div  class="col">
            <h4 class='unit_price' style='font-size:20px; text-align:center'>${value['unit_price']}</h4></div>
        
          <div  class="col">
            <input type='text' class='qty-1' value=0></div>
          
          <div  class="col">
            <h4  class="tax_percent tax_percent${value['id']}" style='font-size:20px; text-align:center'>${value['tax_percent']}</h4></div>
        
          <div  class="col">
            <h4 class="line_total line_total${value['id']}" style='font-size:20px; text-align:center'>0</h4></div>
         
          <hr>
      </div>
        </div>`

      
    


    total_calculations=`
    <div class='jj'>
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
      $(".output").append(a)
      

    })

    $(".total_calculations").append(total_calculations)
    
    // let gross_total=0
    $('.qty-1').on('input',function(){
      
      let $this = $(this);
      let parent_row = $this.parent().parent()
      let unit_price = parent_row.find('.unit_price').text()
      let tax_percent = parent_row.find('.tax_percent').text()
      let line_total=parent_row.find('.line_total')
      let qty = $this.val()
      let x=(parseFloat(unit_price)*parseFloat(qty))
      x=x+ (parseFloat(tax_percent)/100) * x
      line_total.text(x)
      // let gross_total=0;
      // let tax_total=0;
      // $.each(value_id, function(index, value){
        // for displaying gross_total
        //   looped=$(('.line_total'+value)).text();
        //   gross_total=gross_total+parseFloat(looped)
        //   console.log("gross_total:",gross_total)
        //   $('.gross_total').text(gross_total)

        // // for dsplaying tax_total
        //   line_tax_percent =$(('.tax_percent'+value)).text();
        //   tax_total=tax_total+(looped*(line_tax_percent/100))
        //   console.log("tax_total:", tax_total)
        //   $('.tax_total').text(tax_total)

        // // for dsplaying grand total
        // $('.grand_total').text(tax_total+gross_total)
    // })
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
    
   })
})




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





  








