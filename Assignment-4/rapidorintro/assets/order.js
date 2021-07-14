// query for the searcch function
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
    });
})


$('#order_submit').keyup( function(){
  
  console.log("Entered: " + $('#order_submit').val());
  axios.post('http://127.0.0.1:8000/order/search', {
    customer:  $('#search').val()

  })
  .then(function (response) {
    
  })
})


    
   






