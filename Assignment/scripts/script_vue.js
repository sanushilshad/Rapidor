var punch= new Vue({
    el: "#vue_app",
    delimiters: ['[[', ']]'],
    data: {
        count: 100,
        src : '/images/bag.png',
        disab : false

    },
    methods: {
        punch: function(){
            this.count-=19;
            // console.log(this.count-=19)
            if (this.count<0){
                this.count=0
                this.src = '/images/bag-burst.png';
                console.log(this.src);
                this.disab= true;
                
            }
            else{
                
                console.log(this.src);
                this.disab= false;
            }
        },
        
        reset_punch: function(){
            this.disab= false;
            this.src = '/images/bag.png';
            this.count=100;
        }
        
    }
    
})