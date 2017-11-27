var vm = new Vue({
    el: '#settings',
    delimiters: ["[[","]]"],
    data: {
        rows: [
            {
                email: 'john.doe@gmail.com',
                password: 'asdf',
                proxy_use: false,
                proxy_ip: '',
                proxy_port: '',
                app_id: '',
                cert_id:'',
                dev_id: ''
            }
        ]
    },
    methods: {
        save: function() {
            Materialize.toast('Changes saved', 2000);
        },
        addAccount: function() {
            this.rows.push({email: '', password: '', proxy_use: false, proxy_ip: '', proxy_port: ''});
        },
        removeAccount: function(index){
            if (confirm('Remove this account?')) {
                this.rows.splice(index, 1);
                Materialize.toast('Account removed', 2000);
            }
        }
    }
});