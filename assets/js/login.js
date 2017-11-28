var vm = new Vue({
    el: '#login-form',
    delimiters: ["<%","%>"],
    data: {
        signup: {
            username: '',
            fullname: '',
            email: '',
            password: ''
        }
    },
    methods: {
        loginClick: function() {
            Materialize.toast('Login success! Redirecting...');
            setTimeout(function() {
                window.location.href = 'sales_list.html';
            }, 1500);
        },
        signupForm: function() {
            // send this.data.signup to server
            Materialize.toast('Signup success! Redirecting...');
            setTimeout(function() {
                window.location.href = 'sales_list.html';
            }, 1500);
        }
    }
});