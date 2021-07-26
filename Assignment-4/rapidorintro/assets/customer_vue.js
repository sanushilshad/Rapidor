var app = new Vue ({
    el: "#app",
    delimiters: ['[[', ']]'],
    data: {

        a: 10,
        customer_list: [],
        name1: null,
        user_name: null,
        mobile: null,
        name2: null,
        user_name2: null,
        mobile2: null,
        update_id: null

    },
    methods: {
        square(){
            return this.a * this.a
        },

        fetch_customer(){
            let url = '/customer/fetch'
            axios.get(url, {}).then(response =>{
                
                this.customer_list = response.data
                console.log("fetched",this.customer_list)
            })

        },
        delete_customer(customer){
            console.log(customer)
            let url = '/customer/delete'
            axios.post(url,{'id':customer.id}).then(response =>{
                new Noty({
                    text: response.data.message,
                    theme    : 'mint',
                    type : 'success',
                    timeout : false,
             
                }).show();
                if (response.data.status){
                    
                    const index = this.customer_list.indexOf(customer);
                    if (index > -1) {
                      this.customer_list.splice(index, 1);
                    }

                }
            }) 
        },

        fetch_customer_again(customer) {
            console.log(customer.id);
            this.update_id = customer.id
            let url = '/customer/fetch_single'
            axios.post(url, { 'id': customer.id }).then(response => {
                this.name2 = response.data.name;
                this.user_name2 = response.data.username;
                this.mobile2 = response.data.mobile;


            
            })
        },

        update_customer() {
            console.log(this.update_id)
            axios.post('/customer/update', {
                id: this.update_id,
                name: this.name2,
                username: this.user_name2,
                mobile: this.mobile2,
  
            }).then( (response)=> {
                console.log(response)
                this.fetch_customer()
            });
            
        },

        create() {
            axios.post('/customer/create', {
            name:  this.name1,
            username: this.user_name,
            mobile: this.mobile,
            })
                .then( (response)=> {
                    
                    this.fetch_customer()
                    
                });
            
        }
        

        
    },


    mounted (){
        console.log("mounted", this.a)
        console.log(this.square())
        this.fetch_customer()
    }
})