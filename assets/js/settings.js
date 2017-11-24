var vm = new Vue({
    el: '#settings',
    data: {
        rows: [
            {email: 'dayat.py@gmail.com', password: 'asdf', proxy_use: false, proxy_ip: '', proxy_port: ''}
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