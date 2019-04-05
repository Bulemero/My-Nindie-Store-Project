//------------------------------Fetch data -------------------------------------------------------------->
fetch("https://api.myjson.com/bins/xgy54")
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        console.log(data);
        app.nindies = data;
        console.log(app.nindies);
    })
