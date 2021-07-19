var app = new Vue ({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {

        a: 10
    },
    methods: {
        square(){
            return this.a* this.a
        }
    },


    mounted (){
        console.log("mounted",this.a)
        console.log(this.square())
    }
})