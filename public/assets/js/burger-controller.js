

// ADDING A BURGER
function addBurger() {
    const newBurgerEl = document.getElementById("burger-form");
    axios.post('/burgers', {
        name: newBurgerEl.value,
        isDevoured: "false"
    }).then(function(res) {
        newBurgerEl.value = "";
        newBurgerEl.focus();
    }).catch(function(err) {
        console.log(err);
    });
}

// HANDLING THE BUTTON
document.getElementById("submit-button").addEventListener("click", event => {
    addBurger();
    displayBurger();
    devourBurger();
});

// GETTING A BURGER
async function getBurger() {
    const burgers = await axios.get('/api/burgers')
    .then(function(res) {
        return res.data;
    })
    .catch(function(err) {
        console.log(err);
    });
    return burgers;
}

// DISPLAYING THE BURGER
async function displayBurger() {
    const burgers = await getBurger();

    const devouredEl = document.getElementById("devoured");
    const burgerInputEl = document.getElementById("burger-input");
    const devouredElStr = [];
    const burgerInputElStr = burgers.map(burger => {
        if (burger.isDevoured) {
            devouredElStr.push(`<div class="row justify-content-md-end justify-content-sm-center">
            <div class="col devoured text-left">${burger.id}. ${burger.name}</div>
        </div>`);
    } else {
        return `<div class="row d-flex justify-content-center">
        <div class="col-8 col-md-7 col-lg-8 new-burger text-left">${burger.id}. ${burger.name}</div>
        <div class="col-4 col-md-5 col-lg-4">
            <button class="btn-sm btn-primary devoured-btn" type="submit"> DEVOUR IT!</button>
        </div>
    </div>`;
    } 
    });
    burgerInputEl.innerHTML = burgerInputElStr.join("\n");
    devouredEl.innerHTML = devouredElStr.join("\n");

    const devouredBtnEls = document.querySelectorAll(".devoured-btn");
    const burgerEls = document.querySelectorAll(".new-burger");
    const devouredObj = { devouredBtns: devouredBtnEls, burgers: burgerEls };
    return devouredObj;
}

// CREATING NEW BURGERS EQUAL TO THE LENGTH OF THE ARRAY
async function mapDevourBtnsAndBurgers() {
    const devouredObj = await displayBurger();
    const devouredBtns = devouredObj.devouredBtns;
    const newBurgers = devouredObj.burgers;
    const toDevourArr = [];
    for (let i = 0; i < devouredBtns.length; i ++) {
        toDevourArr.push({ "burgerId": newBurgers[i].innerHTML.split(".")[0], "burgerName": newBurgers[i].innerHTML.split(".")[1], "button": devouredBtns[i] });
    }
    return toDevourArr;
}

// HANDLING THE DEVOUR BUTTON
async function devourBurger() {
    let toDevourArr = await mapDevourBtnsAndBurgers();
    for (let i = 0; i < toDevourArr.length; i++) {
        toDevourArr[i].button.addEventListener("click", async function() {
            axios.post('/api/burgers', {
                id: toDevourArr[i].burgerId,
            }).then(function(res) {
                displayBurger();
                devourBurger();
            }).catch(function(err) {
                console.log(err);
            });
        });
    }
}
devourBurger();

        
    
        
        

        

                   
       