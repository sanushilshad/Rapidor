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
        grand_total: 0
        

    },
    methods: {

        quant_fix(a) {
            if (isNaN(a) || a == "" || !a) {
                return a = 0
            }
            
        },

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


        
        // checked(code){
        //     if (this.checked_list.indexOf(code) == -1){
        //         console.log("checked");
        //         this.checked_list.push(code);
        //         console.log(this.checked_list);
        //       }
        //     else{
        //         console.log("unchecked");
        //         this.checked_list = jQuery.grep(this.checked_list, function(value) {
        //             return value != code;
        //           });
        //           console.log(this.checked_list);
        //     }
            
            
        // },



        add_product() {

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
        delete_product(delete_code){
                this.order_lines = this.order_lines.filter(order => order.code !== delete_code)
                this.checked_list = this.checked_list.filter(check => check !== delete_code)
        },

        all_calculations(a) {
            this.gross_total = 0
            this.grand_total = 0

            // this.order_lines.forEach((product, index) => {
            //     if (isNaN(product['qty'])  ) {
                    
            //         product['qty']=0
                    
            //     }
                

                
            // })
            // // Calculating line_total 
            // if (isNaN(a['qty']) || a['qty'] == "") {
                let gross_amount = parseFloat(a['qty']) * parseFloat(a['unit_price'])
                let discount_value = (gross_amount * (this.bill_discount / 100))
                let discounted_amount = gross_amount - discount_value
                this.line_total[a['code']] = discounted_amount + ((parseFloat(a['tax_percent']) / 100) * discounted_amount)
            // }
            
            this.order_lines.forEach((product, index) => {
                let quantity = product.qty
                let unit_price = product.unit_price
                quantity = quantity || 0
                unit_price = unit_price || 0
                this.gross_total += (parseFloat(quantity) * parseFloat(unit_price))
                if (quantity) {
                    
                }
                   
                    
                    

                
            })
            //  this.grand_total = (Object.values(this.line_total)).reduce((a, b) => a + b, 0);
            
            


            // // //Calculating and gross total
            // // this.gross_total += gross_amount

            // // //Calculating tax_total
            // // let tax_amount = discounted_amount * (tax_rate/100)
            // // this.tax_total += tax_amount

            // // //Calculating total discount_total
            // // this.discount_total += (gross_amount * (this.bill_discount / 100))
            
            // // //Calculating grand total
            // // this.grand_total += line_total

        },
        line_total_calc(product_code){
                console.log("star",product_code)
                
                console.log(this.line_total[product_code])
                return (this.line_total[product_code])
        },
        


    },

    filters: {
  cap: function (value) {
            if (!value) return 0
            else {
                return
            }
    
  }
},
    


    mounted (){
        console.log("mounted",this.a)
        console.log(this.qty)
    }
})