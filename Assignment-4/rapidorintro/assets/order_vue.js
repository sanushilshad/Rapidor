var app = new Vue ({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {

        search: '',
        
        search_list: [],
        product_list_1: [],
        product_list: [],
        checked_list: [],
        line_total: {},
        qty: 0,
        order_lines: [],
        bill_discount: 0,
        gross_total: 0,
        tax_total: 0,
        discount_total: 0,
        grand_total: 0,
        show:false
        

    },
    methods: {

        search_value(){
            let url = '/order/search';
            axios.post(url, {customer: this.search}).then(response =>{
                
                // this.product_list = response.data
                this.search_list = response.data.list
                console.log(this.search_list)
            })

        },

        order_list(){
            let url = '/order/list'
            axios.get(url, {}).then(response =>{
                
                this.product_list = response.data.list;
                this.product_list.forEach((product, index) => {
                console.log("blag",product)
                if (this.checked_list.includes(product.code)) {
                    product.checked = true;
                }
                
            });
                
                console.log("data acquired");
                console.log(this.product_list);
            })
        },


  



        add_product() {

            this.show=true
            this.product_list.forEach((product, index) => {
                console.log("blag",product.code)
                if (product.checked && !this.checked_list.includes(product.code)) {
                    
                   
                    this.order_lines.push(product)
                    this.checked_list.push(product.code)
                }
                else if (!product.checked && this.checked_list.includes(product.code)) {
                    this.order_lines = this.order_lines.filter(order => order.code !== product.code)
                    this.checked_list = this.checked_list.filter(check => check !== product.code)
                }
                
            });
            // this.order_lines = this.product_list.filter(product => product.checked);
            
            
        },
        delete_product(delete_code) {
            console.log("delete_code", delete_code);
            this.order_lines = this.order_lines.filter(order => order.code !== delete_code);
            this.checked_list = this.checked_list.filter(check => check !== delete_code);
            delete this.line_total[delete_code];
            this.all_calculations();
            console.log("length_line_total:",this.checked_list.length)
            if (this.checked_list.length == 0) {
                this.show=false
            }
                
            
        },

        all_calculations() {
            this.gross_total = 0
            this.grand_total = 0
            this.tax_total = 0
            this.discount_total = 0
            // all_calculations(a) {
                // let gross_amount = parseFloat(a['qty']) * parseFloat(a['unit_price'])
                // let discount_value = (gross_amount * (this.bill_discount / 100))
                // let discounted_amount = gross_amount - discount_value
                // let tax_value = ((parseFloat(a['tax_percent']) / 100) * discounted_amount)
                // this.line_total[a['code']] = discounted_amount + tax_value
                // this.tax_total+=tax_value
            // }
            
            this.order_lines.forEach((product, index) => {
                
                let quantity = product.qty
                let unit_price = product.unit_price
                quantity = quantity || 0
                unit_price = unit_price || 0


                let gross_amount = parseFloat(quantity) * parseFloat(unit_price)
                let discount_value = (gross_amount * (this.bill_discount / 100))
                let discounted_amount = gross_amount - discount_value
                let tax_value = ((parseFloat(product['tax_percent']) / 100) * discounted_amount)
                this.line_total[product['code']] = discounted_amount + tax_value
                //tax_total
                this.tax_total += tax_value

                //discount_total
                this.discount_total += discount_value
                

               //gross_total
                this.gross_total += (parseFloat(quantity) * parseFloat(unit_price))

                // grand_total
                this.grand_total += this.line_total[product.code]
                    

                
            })
            this.discount_total = this.discount_total.toFixed(2);
            this.gross_total = this.gross_total.toFixed(2);
            this.tax_total = this.tax_total.toFixed(2);
            this.grand_total = this.grand_total.toFixed(2);


        },
        line_total_calc(product_code){
                console.log("star",product_code)
                
                console.log(this.line_total[product_code])
                return (this.line_total[product_code])
        },

        order_submit() {


            let lines = []
            this.order_lines.forEach((product, index) => {
                let product_list = {}
                product_list['product_name'] = product['name']
                product_list['product_code'] = product['code']
                product_list['qty'] = product['qty']
                product_list['unit_price'] = product['unit_price']
                product_list['tax_rate'] = product['tax_percent']
                lines.push(product_list)

            })
            console.log("blag")
            axios.post('http://127.0.0.1:8000/order/create', {
                "customer_code": this.search,
                "lines": lines,
            })
                .then(function (response) {
                    new Noty({
                        text: response.data.message,
                        theme: 'mint',
                        type: 'success',
                        timeout: false,
                    }).show();
                })
        }
        
            

    },



    mounted (){
        console.log("mounted",this.a)
        console.log(this.qty)
    }
})