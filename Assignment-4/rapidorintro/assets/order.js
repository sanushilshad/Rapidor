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

