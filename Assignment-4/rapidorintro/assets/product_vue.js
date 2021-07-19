var app = new Vue ({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {

        a: 10,
        product_list: []
    },
    methods: {
        square(){
            return this.a * this.a
        },

        fetch_product(){
            let url = '/product/fetch'
            axios.post(url, {}).then(response =>{
                
                this.product_list = response.data
                console.log(this.product_list)
            })

        },
        delete_product(product){
            console.log(product)
            let url = '/product/delete'
            axios.post(url,{'id':product.id}).then(response =>{
                new Noty({
                    text: response.data.message,
                    theme    : 'mint',
                    type : 'success',
                    timeout : false,
             
                }).show();
                if (response.data.status){
                    
                    const index = this.product_list.indexOf(product);
                    if (index > -1) {
                      this.product_list.splice(index, 1);
                    }

                }

            }
                )
        }

        
    },


    mounted (){
        console.log("mounted", this.a)
        console.log(this.square())
        this.fetch_product()
    }
})