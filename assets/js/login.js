var vm = new Vue({
    el: '#login-form',
    methods: {
        loginClick: function() {
            Materialize.toast('Login success! Redirecting...');
            setTimeout(function() {
                window.location.href = 'sales_list.html';
            }, 1500);
        }
    }
});