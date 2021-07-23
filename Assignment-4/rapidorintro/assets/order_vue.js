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
                
                
                console.log("data acquired");
                console.log(this.product_list);
            })
        },
        
        checked(code){
            if (this.checked_list.indexOf(code) == -1){
                console.log("checked");
                this.checked_list.push(code);
                console.log(this.checked_list);
              }
            else{
                console.log("unchecked");
                this.checked_list = jQuery.grep(this.checked_list, function(value) {
                    return value != code;
                  });
                  console.log(this.checked_list);
            }
            
            
        },
        all_calculations(a){
           
            this.line_total[a['code']] = parseFloat(a['qty'])*parseFloat(a['unit_price'])
            this.tax_value = parseFloat(a['tax_percent'])*(this.line_total[a['code']]/100)
            this.line_total[a['code']] += this.tax_value
            // this.gross_total = this 

        },
        line_total_calc(product_code){
                console.log("star",product_code)
                
                console.log(this.line_total[product_code])
                return (this.line_total[product_code])
        },

        order_submit(){
            console.log('blag');
            
        },

        

        


    },


    mounted (){
        console.log("mounted",this.a)
        console.log(this.qty)
    }
})