// const punch=document.querySelector('#Btn-1');
// const reset=document.querySelector('#Btn-2');
// const image=document.querySelector('img');
// const progress=document.querySelector('.bar');
const punch =$('#Btn-1');
const reset=$('#Btn-2');
const image=$('img');
const progress=$('.bar');
let count=100;

punch.on("click", function(){
    count=count-19;
 
    if (count<0){
        count=0;
    }
    
    progress.css('width', count + '%');
    
    if (count<=0){
        //image.setAttribute('src',"/images/bag-burst.png");
        image.attr('src', '/images/bag-burst.png')
        /*punch.setAttribute("disabled", "disabled");*/
        punch.disabled=true; 
    }
 

});


// punch.onclick=()=>{
//     count=count-19;
//     alert(count);
//     if (count<0){
//         count=0;
//     }
    
//     progress.style.width=count+'%';
    
//     if (count<=0){
//         //image.setAttribute('src',"/images/bag-burst.png");
//         image.attr('src', '/images/bag-burst.png')
//         /*punch.setAttribute("disabled", "disabled");*/
//         punch.disabled=true; 
//     }
 

// }

reset.on("click", function(){
            count=100;
            punch.disabled=false;
            image.attr('src',"/images/bag.png");
            //progress.style.width=100+'%';
            progress.css('width', 100 + '%');
   

        
    });


    

