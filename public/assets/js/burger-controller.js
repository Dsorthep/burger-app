const axios = require("axios");
const inputEl = document.getElementById("burger-form");
        
    function addBurger(name) {
        axios.post('/api/burgers', {
                burger_name: name
            })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
        
        document.getElementById("submit-button").addEventListener("click", function() {
            addBurger(inputEl.value);
            inputEl.value = "";
        });

        function getTheBurgers() {
            axios.get('/api/burgers')
                .then(function(response) {
                    console.log(response.data[0].devoured);
                    const burgerArray = response.data;
                    const notDevoured = burgerArray.filter(function(value) {
                        return value.devoured === false;
                    })
                    console.log(notDevoured);
                   
                    const uneatenEl = document.getElementById("uneaten");
                    const uneatenElStr = notDevoured.map(burger => `
                <div class="boxes">${burger.burger_name}
                    <button id="${burger.id}" class="d-flex justify-content-end devour-button btn btn-primary btn-sm">DEVOUR IT!</button>
                </div>`);
                    const innerHtml = uneatenElStr.join("\n<hr/>\n");
                    uneatenEl.innerHTML = innerHtml



                    const eaten = burgerArray.filter(function(value) {
                        return value.devoured === true;
                    })
                    console.log(eaten);
                    const eatenEl = document.getElementById("devoured");
                    const eatenElStr = eaten.map(burger => `
                    <div class="box">${burger.burger_name}</div>`);
                    const eatenHtml = eatenElStr.join("\n<hr/>\n");
                    eatenEl.innerHTML = eatenHtml;
                })
                .catch(function(error) {
                    console.log(error);
                });
        };
        getTheBurgers()

        function devourBurger() {
            axios.post(`/api/burgers/${event.target.id}`)
                .then(function(response) {
                    console.log(response);
                    getTheBurgers()
                        
                })
                .catch(function(error) {
                    console.log(error);
                });
        }

        addEventListener("click", function(event) {
           
            devourBurger();

        })