var app = new Vue ({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {

        a: 10,
        product_list: [],
        name1: null,
        code: null,
        unit_price: null,
        tax_percent: null,
        update_id: null,
        name2: null,
        code2: null,
        unit_price2: null,
        tax_percent2: null,
        update_id: null

    },
    methods: {
        square(){
            return this.a * this.a
        },

        fetch_product(){
            let url = '/product/fetch'
            axios.get(url, {}).then(response =>{
                
                this.product_list = response.data
                console.log("fetched",this.product_list)
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
            }) 
        },

        fetch_product_again(product) {
            console.log(product.id);
            this.update_id = product.id
            let url = '/product/fetch_single'
            axios.post(url, { 'id': product.id }).then(response => {
                this.name2 = response.data.name;
                this.code2 = response.data.code;
                this.unit_price2 = response.data.unit_price;
                this.tax_percent2 = response.data.tax_percent;


            
            })
        },

        update_product() {
            console.log(this.update_id)
            axios.post('/product/update', {
                id: this.update_id,
                name: this.name2,
                code: this.code2,
                unit_price: this.unit_price2,
                tax_percent: this.tax_percent2
            }).then( (response)=> {
                // console.log(response)
                this.fetch_product()
            });
            
        },

        create() {
            axios.post('/product/create', {
            name:  this.name1,
            code: this.code,
            unit_price: this.unit_price,
                tax_percent: this.tax_percent
            })
                .then( (response)=> {
                    
                    this.fetch_product()
                    
                });
            
        }
        

        
    },


    mounted (){
        console.log("mounted", this.a)
        console.log(this.square())
        this.fetch_product()
    }
})