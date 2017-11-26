Vue.filter('replacenone', function (value) {
    return value.replace(/None,/g, '');
});

var vm = new Vue({
    el: '#app',
    mounted: function() {
        $('table').dataTable({
            "columnDefs": [{
                "targets": 1,
                "orderable": false
            },{
                "targets": 10,
                "orderable": false
            }]
        });
    },
    created: function() {
        var url = "http://localhost:3000/orders"; // change this url to your endpoint

        // use axios to send request to backend
        axios.get(url)
            .then(function(response) {
                // catch your response here
                vm.items = response.data;
            })
            .then(function() {
                $('table').dataTable({
                    "columnDefs": [{
                        "targets": 9,
                        "orderable": false
                    }]
                });
            })
    },
    methods: {
        searchDataTable: function(e) {
            var val = e.currentTarget.value;
            var dt = $('table').DataTable();
            dt.search(val).draw();
        },
        editPriceModal: function(index) {
            // console.log(vm.items[index]);
            this.selectedItemIndex = index;
            $('#modalEditPrice').modal('open');
        },
        saveEditPrice: function() {
            var item = vm.items[this.selectedItemIndex];

            // update price, dont forget to update in backend to
            this.$set(item, 'Price', this.newPrice);
            this.newPrice = 0;
            $('#modalEditPrice').modal('close');
        },

        markAsDeleted: function(index) {
            // this.items.splice(index, 1);
            var item = this.items[index];

            // change object property, dont forget to update in backend too
            this.$set(item, 'status', 'deleted');
        },
        markAsOrdered: function(index) {
            var item = this.items[index];
            this.$set(item, 'status', 'ordered');
        },
        markAsShipped: function(index) {
            var item = this.items[index];
            this.$set(item, 'status', 'shipped');
        },
        getOrderedClass: function(item) {
            if (item.status == 'ordered' || item.status == 'shipped') {
                return 'btn-bs-info';
            }
            return 'btn-bs-default';
        },
        getShippedClass: function(item) {
            if (item.status == 'shipped') {
                return 'btn-bs-warning';
            }
            return 'btn-bs-default';
        }
    },
    data: {
        // items: [
        //     {
        //         name: 'Tiebao New Riding Cycling Shoes',
        //         img: 'assets/img/Tiebao New Riding Cycling Shoes.jpg',
        //         from: 'amazon',
        //         id: 112323,
        //         buyer: 'Shalonda Dorgan',
        //         address: '680 Shirley Court. Tualatin, OR 97062',
        //         price: 20,
        //         sold_at: 'May 3, 2018, 9:26 pm',
        //         source: 'Source',
        //         qty: 2,
        //     },
        //     {
        //         name: 'anti theft usb charging travel backpacks',
        //         img: 'assets/img/anti theft usb charging travel backpacks.jpg',
        //         from: 'amazon',
        //         id: 117576,
        //         buyer: 'Bill Mcnair',
        //         address: '9654 Ridgewood Rd. West Roxbury, MA 02132',
        //         price: 10,
        //         sold_at: 'Oct. 22, 2018, 10:31 pm',
        //         source: 'Source',
        //         qty: 5,
        //     },
        //     {
        //         name: 'Autumn Winter Superhero Superman Batman Spiderman Men',
        //         img: 'assets/img/Autumn Winter Superhero Superman Batman Spiderman Men.jpg',
        //         from: 'ebay',
        //         id: 119585,
        //         buyer: 'Cassey Emmett',
        //         address: '120 Arnold Ave. Chicago Heights, IL 60411',
        //         price: 11,
        //         sold_at: 'Sep. 9, 2018, 10:20 pm',
        //         source: 'Source',
        //         qty: 4,
        //     },
        //     {
        //         name: 'Clorts Men BOA Lacing System Running Shoes Free Run',
        //         img: 'assets/img/Clorts Men BOA Lacing System Running Shoes Free Run.jpg',
        //         from: 'amazon',
        //         id: 125959,
        //         buyer: 'Ken Ratcliff',
        //         address: '761 New Ave. Albany, NY 12203',
        //         price: 12.1,
        //         sold_at: 'Jul. 30, 2018, 9:00 pm',
        //         source: 'Source',
        //         qty: 1,
        //     },
        //     {
        //         name: 'DBPOWER 3 Color Backlight Gaming Keyboard',
        //         img: 'assets/img/DBPOWER 3 Color Backlight Gaming Keyboard.jpg',
        //         from: 'ebay',
        //         id: 105858,
        //         buyer: 'Cythia Killgore',
        //         address: '440 Clinton Ave. Jacksonville Beach, FL 32250',
        //         price: 14.2,
        //         sold_at: 'Apr. 23, 2018, 5:27 pm',
        //         source: 'Source',
        //         qty: 2,
        //     },
        //     {
        //         name: 'Donkey 325RS Optical Gaming Mouse',
        //         img: 'assets/img/Donkey 325RS Optical Gaming Mouse.jpg',
        //         from: 'amazon',
        //         id: 119955,
        //         buyer: 'Tarah Kampen',
        //         address: '29 W. Gregory Rd. Coventry, RI 02816',
        //         price: 22.5,
        //         sold_at: 'Jun. 10, 2018, 9:01 am',
        //         source: 'Source',
        //         qty: 2,
        //     },
        //     {
        //         name: "Li-Ning Men's SUPER LIGHT XIV Running Shoes",
        //         img: "assets/img/Li-Ning Men's SUPER LIGHT XIV Running Shoes.jpg",
        //         from: 'ebay',
        //         id: 135857,
        //         buyer: 'Ilse Macias',
        //         address: '781 Stillwater St. Saint Charles, IL 60174',
        //         price: 4.7,
        //         sold_at: 'Apr. 1, 2018, 12:22 pm',
        //         source: 'Source',
        //         qty: 1,
        //     },
        //     {
        //         name: "Marvel Superhero Clothing Superman T-Shirt Men",
        //         img: "assets/img/Marvel Superhero Clothing Superman T-Shirt Men.jpg",
        //         from: 'amazon',
        //         id: 128959,
        //         buyer: 'Jolene Dietrich',
        //         address: '9329 South Mulberry St. Marion, NC 28752',
        //         price: 24.1,
        //         sold_at: 'Jul. 8, 2018, 4:17 pm',
        //         source: 'Source',
        //         qty: 1,
        //     },
        //     {
        //         name: "New 2.4Ghz Mini Portable Wireless Mouse USB Optical",
        //         img: "assets/img/New 2.4Ghz Mini Portable Wireless Mouse USB Optical.jpg",
        //         from: 'amazon',
        //         id: 113096,
        //         buyer: 'Cordie Elmore',
        //         address: '8152 East Shipley Ave. Batavia, OH 45103',
        //         price: 21,
        //         sold_at: 'Dec. 29, 2017, 5:39 pm',
        //         source: 'Source',
        //         qty: 4,
        //     },
        //     {
        //         name: "Onemix men's sport running shoes music rhythm",
        //         img: "assets/img/Onemix men's sport running shoes music rhythm.jpg",
        //         from: 'amazon',
        //         id: 115704,
        //         buyer: 'Deadra Consolini',
        //         address: '62 Chestnut St. Bakersfield, CA 93306',
        //         price: 11.2,
        //         sold_at: 'Nov. 2, 2018, 9:48 pm',
        //         source: 'Source',
        //         qty: 3,
        //     },
        //     {
        //         name: "Sleeve T Shirt O-Neck Men",
        //         img: "assets/img/Sleeve T Shirt O-Neck Men.jpg",
        //         from: 'amazon',
        //         id: 136586,
        //         buyer: 'Anne Cripps',
        //         address: '9982 Catherine Street Newnan, GA 30263',
        //         price: 22,
        //         sold_at: 'Sep. 8, 2018, 12:30 pm',
        //         source: 'Source',
        //         qty: 2,
        //     },
        //     {
        //         name: "Soccer Shoes TF Turf Soles Breathable Outdoor Sneakers",
        //         img: "assets/img/Soccer Shoes TF Turf Soles Breathable Outdoor Sneakers.jpg",
        //         from: 'amazon',
        //         id: 137783,
        //         buyer: 'Dinah Gao',
        //         address: '842 Marsh St. Conyers, GA 30012',
        //         price: 17,
        //         sold_at: 'Feb. 28, 2018, 1:26 pm',
        //         source: 'Source',
        //         qty: 8,
        //     },
        //     {
        //         name: "Super Cool breathable running shoes men",
        //         img: "assets/img/Super Cool breathable running shoes men.jpg",
        //         from: 'amazon',
        //         id: 138876,
        //         buyer: 'Lauretta Oney',
        //         address: '9956 Lake Forest Rd. Piscataway, NJ 08854',
        //         price: 15.8,
        //         sold_at: 'Jul. 6, 2018, 10:14 pm',
        //         source: 'Source',
        //         qty: 8,
        //     },
        //     {
        //         name: "TEAMWOLF Immortal Laser Changeable Gaming mouse",
        //         img: "assets/img/TEAMWOLF Immortal Laser Changeable Gaming mouse.jpg",
        //         from: 'amazon',
        //         id: 138890,
        //         buyer: 'Tisa Spahn',
        //         address: '158 Bridgeton Lane. Southgate, MI 48195',
        //         price: 17.3,
        //         sold_at: 'Jun. 3, 2018, 9:18 am',
        //         source: 'Source',
        //         qty: 7,
        //     },
        //     {
        //         name: "TeckNet Bluetooth Wireless Mouse 2.4g",
        //         img: "assets/img/TeckNet Bluetooth Wireless Mouse 2.4g.jpg",
        //         from: 'ebay',
        //         id: 149009,
        //         buyer: 'Octavio Ranck',
        //         address: '9765 State Rd. West Roxbury, MA 02132',
        //         price: 11.9,
        //         sold_at: 'Feb. 26, 2018, 7:38 pm',
        //         source: 'Source',
        //         qty: 2,
        //     }
        // ]
        items: [],

        // app state
        newPrice: 0,
        selectedItemIndex: null,
    },
})