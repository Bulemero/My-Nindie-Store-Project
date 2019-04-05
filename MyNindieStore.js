var myVueObject = new Vue({
    el: "#app",
    data: {

        url: "https://api.myjson.com/bins/xgy54",
        active: 'nindiesMainHome',
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
        cart: [],
        count: 1
    },

    methods: {

        getData() {

            //------------------------------Fetch data -------------------------------------------------------------->
            fetch("https://api.myjson.com/bins/xgy54")
                .then(function (response) {
                    return response.json();
                }).then(function (data) {
                    console.log(data);
                    myVueObject.games = data;
                    //                    console.log(myVueObject.games);
                    myVueObject.getCatPricePegi();

                    setTimeout(function () {
                        myVueObject.loaded = true;
                    }, 800);

                }).catch(err => {
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
        getCategories(categoriesList) {
            return categoriesList.join(", ");
        },
        getCatPricePegi() {
            this.games.forEach(game => {
                game.category.forEach(category => {
                    if (!this.categories.includes(category)) {
                        this.categories.push(category)
                    }
                })

                if (!this.prices.includes(game.price)) {
                    this.prices.push(game.price)
                }
                if (!this.pegis.includes(game.pegi)) {
                    this.pegis.push(game.pegi)
                }
            })

            this.pegis.sort((a, b) => a - b);
            this.prices.sort((a, b) => a - b);
            this.categories.sort();
        },



        addGames() {
            count++;
        },
        
        retrieveGames() {
            count--;
        }

    },

    computed: {
        filteredGames: function () {

            return this.games.filter((game) => game.title.toLowerCase().match(this.search.toLowerCase()))
            //            .filter((game) =>
            //            game.category.includes(this.chosenCategory))
            //            .filter((game) =>
            //            game.price.includes(this.chosenPrice))
            //            .filter((game) =>
            //            game.pegi.includes(this.chosenPegi))
        },

    },
    created() {
        this.getData();

    }
});

var count = 1;
var countEl = document.getElementById("count");

function plus() {
    count++;
    countEl.value = count;
}

function minus() {
    if (count > 1) {
        count--;
        countEl.value = count;
    }
}
