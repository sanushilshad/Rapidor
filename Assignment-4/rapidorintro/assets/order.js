$('#search').keyup( function(){
    
    console.log("Entered: " + $('#search').val());
    
    axios.post('http://127.0.0.1:8000/order/search', {
      customer:  $('#search').val()

    })
    .then(function (response) {
      $('.options').remove()
      console.log(response.data.message);
      console.log(response.data.status);
      console.log(response.data.list);
      let  search_list = response.data.list;
      $.each(search_list, function(index, value) {
        console.log(value);
        
        $("#datalistOptions").append(`<option class='options' value=${value}>`);
       
        });
    
    })
})

