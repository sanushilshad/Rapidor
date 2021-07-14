// script for adding a new customer
$('#submit-1').on('click',function(){
    console.log("positive");
    axios.post('http://127.0.0.1:8000/product/create', {
      name:  $('#name').val(),
      code:  $('#code').val(),
      unit_price: $('#unit_price').val(),
      tax_percent: $('#tax_percent').val(),

    })
    .then(function (response) {
      
      console.log(response)
      location.reload()
    });
    })
  
  
  
  
//   script for deleting customer
  
$('.delete').on('click', function(){
    confirm_delete=confirm('Confirm Deletion');
    if (confirm_delete==true){
        console.log("deleted")
        var $this = $(this);
        var customer_id = $this.attr('data-id');
        delete_customer(customer_id)
    }
    
  
});
   
function delete_customer(customer_id){
    axios.post('http://127.0.0.1:8000/product/delete',{
        'id':customer_id
    }).then(function (response) {
        console.log(response)
        location.reload()
    });  
}  
  
  
  
// script for updating customer
let customer_id_1;
$('.update').on('click', function(){
    console.log("updated")
    $('.update').attr("data-toggle","modal");
    $('.update').attr("data-target","#exampleModalCenter2");
    var $this = $(this);
    product_id_1 = $this.attr('data-id');
    axios.post('http://127.0.0.1:8000/product/fetch_single',{
        'id':product_id_1
    }).then(function (response) {
        console.log(response)
        $('#name-2').attr("value",response.data.name);
        $('#code-2').attr("value",response.data.code);
        $('#unit_price-2').attr("value",response.data.unit_price);
        $('#tax_percent-2').attr("value",response.data.tax_percent);
    });
});
  
  
  
$('#submit-2').on('click',function(){
    confirm_2=confirm("Confirm Updation");
    if (confirm_2==true){
        update_cust(product_id_1)
    }
})
   
  
function update_cust(product_id){
    axios.post('http://127.0.0.1:8000/product/update',{
        id:product_id,
        name:  $('#name-2').val(),
        code:  $('#code-2').val(),
        unit_price:  $('#unit_price-2').val(),
        tax_percent:  $('#tax_percent-2').val(),
    }).then(function (response) {
        console.log(response)
        location.reload() 
    });
}   
  