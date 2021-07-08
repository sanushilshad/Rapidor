// script for adding a new customer
$('#submit-1').on('click',function(){
    axios.post('http://127.0.0.1:8000/customer/create', {
      name:  $('#name').val(),
      mobile:  $('#mobile').val(),
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
    axios.post('http://127.0.0.1:8000/customer/delete',{
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
    customer_id_1 = $this.attr('data-id');
    axios.post('http://127.0.0.1:8000/customer/fetch_single',{
        'id':customer_id_1
    }).then(function (response) {
        $('#name-2').attr("value",response.data.name);
        $('#mobile-2').attr("value",response.data.mobile);
    });
});
  
  
  
$('#submit-2').on('click',function(){
    confirm_2=confirm("Confirm Updation");
    if (confirm_2==true){
        update_cust(customer_id_1)
    }
})
   
  
function update_cust(customer_id){
    axios.post('http://127.0.0.1:8000/customer/update',{
        id:customer_id,
        name:  $('#name-2').val(),
        mobile:  $('#mobile-2').val(),
    }).then(function (response) {
        console.log(response)
        location.reload() 
    });
}   
  