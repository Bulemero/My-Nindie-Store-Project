var myVueObject = new Vue({
    el: "#app",
    data: {
        url: "https://api.myjson.com/bins/kcn7k",
        active: "nindiesMainHome",
        games: [],
        inputValue: "",
        search: "",
        chosenGame: {},
        chosenCategory: "",
        chosenPrice: 0,
        chosenPegi: 0,
        categories: [],
        prices: [],
        pegis: [],
        loaded: false,
        cart: []
    },

    methods: {
        getData() {
            //------------------------------Fetch data -------------------------------------------------------------->
            fetch("https://api.myjson.com/bins/kcn7k")
                .then(function (response) {
                    return response.json();
                })
                .then(function (data) {
                    console.log(data);
                    myVueObject.games = data;
                    // console.log(myVueObject.games);
                    myVueObject.getCatPricePegi();

                    setTimeout(function () {
                        myVueObject.loaded = true;
                    }, 800);
                })
                .catch(err => {
                    // Do something for an error here
                    console.log(err);
                });
        },

        setPage(activePage) {
            this.active = activePage;
        },
        searchEngine() {
            this.search = this.inputValue;
            this.inputValue = "";
        },
        resetSearch() {
            this.search = "";
        },
        selectedGame(game) {
            this.chosenGame = game;
            console.log(this.chosenGame);
        },

        scrollToTop() {
            window.scrollTo(0, 0);
        },

        getCategories(categoriesList) {
            return categoriesList.join(", ");
        },
        getCatPricePegi() {
            this.games.forEach(game => {
                game.category.forEach(category => {
                    if (!this.categories.includes(category)) {
                        this.categories.push(category);
                    }
                });

                if (!this.prices.includes(game.price)) {
                    this.prices.push(game.price);
                }
                if (!this.pegis.includes(game.pegi)) {
                    this.pegis.push(game.pegi);
                }
            });

            this.pegis.sort((a, b) => a - b);
            this.prices.sort((a, b) => a - b);
            this.categories.sort();
        },

        addToCart(selected) {
            let found = false;
            this.cart.forEach(game => {
                if (selected.title === game.title) {
                    found = true;
                    game.count++;
                }
            });

            if (!found) {
                this.cart.push(selected);
            }
        },

        retrieveFromCart(selected) {
            if (selected.count > 1) {
                this.cart.forEach(game => {
                    if (selected.title === game.title) {
                        selected.count--;
                    }
                });
            }
        },

        deleteFromCart(game, regret) {
            game.count = 1;
            this.cart.splice(regret, 1);

        }

        //        totalPrice() {
        //
        //        let sortedCart = {};
        //
        //        for (let k = 0; k < this.products.length; k++) {
        //
        //            if (!sortedCart.hasOwnProperty(this.products[k].name)) {
        //
        //                sortedCart[this.products[k].name] = {
        //                    price: this.products[k].price,
        //                    count: 1
        //                }
        //            } else {
        //                sortedCart[this.products[k].name].count++
        //            }
        //
        //        }
        //
        //        console.log(sortedCart);
        //
        //        let sumTotal = 0;
        //        for (let i = 0; i < this.products.length; i++) {
        //
        //            sumTotal += this.products[i].price;
        //
        //        }
        //
        //        if (this.products.length >= 5) {
        //            sumTotal -= sumTotal * 0.1;
        //        };
        //
        //        return sumTotal;
    },

    computed: {
        filteredGames: function () {
            return this.games.filter(game =>
                game.title.toLowerCase().match(this.search.toLowerCase())
            );
            //            .filter((game) =>
            //            game.category.includes(this.chosenCategory))
            //            .filter((game) =>
            //            game.price.includes(this.chosenPrice))
            //            .filter((game) =>
            //            game.pegi.includes(this.chosenPegi))
        },

        gameTotal() {
            let total = 0;
            if (this.cart.length > 0) {
                this.cart.forEach(game => {
                    total += game.price * game.count;
                })
            }
            return total.toFixed(2);
        }
    },
    created() {
        this.getData();
    }
});
