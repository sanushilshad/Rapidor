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
            <div class="row">

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
    let value_id=[];
    $.each(products_choosen, function(index, value){
        
      value_id.push(value['id'])
      console.log("choosen id:",value_id)
      let a =`<div class="kk">
          <div class="row">

          <div class="col">
          <button type="button" data-id= ${value['id']} class="btn btn-danger delete" ><i class="fas fa-times"></i></button>
          </div>
          <div  class="col">
            <h4 style='font-size:20px; text-align:center '>${value['name']}</h4></div>
          <div  class="col">
            <h4  style='font-size:20px;  text-align:center'>${value['code']}</h4></div>
          <div  class="col">
            <h4 class='unit_price' style='font-size:20px; text-align:center'>${value['unit_price']}</h4></div>
        
          <div  class="col">
            <input type='text' class='qty-1'></div>
          
          <div  class="col">
            <h4  class="tax_percent" style='font-size:20px; text-align:center'>${value['tax_percent']}</h4></div>
        
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
            <h4 class='grand_total'>Grand Total: 0</h4>
          </div>
          
      </div>

      <div class="row">
          <div class='col align-self-end'>
            <h4 class='tax_total'>Tax Total: 0</h4>
          </div>
      </div>

      <div class="row">
          <div class='col align-self-end'>
            <h4 class='final_amount'>Final Amount: 0</h4>
          </div>
      </div>
    </div>`
      $(".output").append(a)
      

    })

    $(".total_calculations").append(total_calculations)
    
    let gross_total=0
    $('.qty-1').on('input',function(){
      
      let $this = $(this);
      let parent_row = $this.parent().parent()
      let unit_price = parent_row.find('.unit_price').text()
      let tax_percent = parent_row.find('.tax_percent').text()
      let line_total=parent_row.find('.line_total')
      let qty = $this.val()
      let x=parseFloat(qty)*parseFloat(unit_price)
      line_total.text(x)
      let gross_total=0;
      $.each(value_id, function(index, value){
          console.log("blag",$(('.line_total'+value)).text())
          looped=$(('.line_total'+value)).text();
          gross_total=gross_total+parseFloat(looped)
          console.log("gross_total:",gross_total)
          $('.gross_total').text(gross_total)
      })
      


    })





  //   $('.qty-1').on('input',function(){
  //     console.log('quantity clicked')
  //     console.log($(this).val())
  //     let qty_3 = $('.qty-1').val() 
  //     let unit_pr = $('.unit_price').text() 
  //     console.log("unit_pr",unit_pr)
  //     console.log(qty_3*unit_pr)
  //     let qty =$('.grand_total').text(qty_3*unit_pr) 

  //   })
    
  

    

    
   })
})



  








