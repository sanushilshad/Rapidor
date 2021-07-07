var modal = document.getElementById("myModal2");
var span = document.getElementsByClassName("close")[0];
// Get the button that opens the modal




// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

clbt.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}


// jQuery(document).on('click', ".btn.btn-success", function(){
//   console.log("edited")
//   var $this = $(this);
//   var id = $this.attr('id');
//   var id2 = $this.attr('id').split('-')[1];
//   console.log(id);
//   //do stuff with this id or $this element
//   id.onclick = function() {
//     modal.style.display = "block";
//     console.log('bruh');
//   }

// });


$('.update').on('click', function(){
  console.log("edited")
  var $this = $(this);
  modal.style.display = "block";
  var id2 = $this.attr('id').split('-')[1];
  console.log(id2)

});


