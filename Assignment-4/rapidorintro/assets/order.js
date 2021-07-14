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
            <h4 style='font-size:20px; text-align:center'>${value['tax_percent']}</h4></div>
        
          <div  class="col">
            <h4 class="grand_total" style='font-size:20px; text-align:center'>0</h4></div>
         
          <hr>
        
        </div>`

      $(".output").append(a)
    })

    $('.qty-1').on('input',function(){
      var $this = $(this);
      console.log( $this.val())
      let unit_pr = $('.unit_price').text() 
      $('.grand_total').text($this.val()*unit_pr)


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



  








