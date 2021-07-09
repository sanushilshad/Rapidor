const punch=document.querySelector('#Btn-1');
const reset=document.querySelector('#Btn-2');
const image=document.querySelector('img');
const progress=document.querySelector('.bar');
let count=100;

punch.onclick=()=>{
    count=count-19;
    if (count<0){
        count=0;
    }
    
    progress.style.width=count+'%';
    if (count<=0){
        image.setAttribute('src',"/images/bag-burst.png");
        /*punch.setAttribute("disabled", "disabled");*/
        punch.disabled=true; 
    }
 

}

reset.onclick=()=>{
            count=100;
            punch.disabled=false;
            image.setAttribute('src',"/images/bag.png");
            progress.style.width=100+'%';
   

    }
    

