document.onkeydown = checkKey;
var fan = document.getElementById('fan');
var speedometer = document.getElementById('speedometer');
var balance = document.getElementById('balance');
var shop = document.getElementById("shop");
var visibleSpeed = 0;
var throwables = [];
var countingDown = false,
    countdownDone = false,
    score = 0,
    baseCoins = 0;
    basePower = 5;
    pressing = 0,
    platform = "unknown",
    spinningDuration = 5;
    timer = {time: spinningDuration},
    scoreDisplay = document.getElementById("timer");

var user = new User(baseCoins, basePower);

$(document).ready(function () {
    console.log("document ready");
    $("#upPower").text(`${user.powerUpPrice} C`);
});

function checkKey(e) {
    e = e || window.event;
    e.target.blur();
    let currentSpeed = parseFloat(window.getComputedStyle(fan).animationDuration) * 1000;
    switch (e.key) {
        case "ArrowRight":
            if (countingDown) {
                if (currentSpeed !== 0) {
                    adjustSpeed(user.power);
                } else {
                    setSpeed(1000);
                }
            }
            break;
        case " ":
            setSpeed(0);
            if (!countingDown){
                countDown();
            }
            break;
        case "Enter":
            if(!countingDown) {
                throwObject();
            }
    }
}

function overlay() {
    el = document.getElementById('overlay');
    el.style.visibility = el.style.visibility == 'visible' ? 'hidden' : 'visible';
    window.scrollTo(0, 0);
}

function adjustSpeed(speed) {
    let currentSpeed = parseFloat(window.getComputedStyle(fan).animationDuration) * 1000;
    let newSpeed = currentSpeed - speed;
    if (newSpeed < 1000) {
        fan.style.animationDuration = `${newSpeed}ms`;
        currentSpeed = parseInt(window.getComputedStyle(fan).animationDuration);
        visibleSpeed += speed/5;
        speedometer.innerText = `${Math.round(visibleSpeed, 1) / 10}mph`;
    } else {
        setSpeed(0);
    }
}

function setSpeed(speed) {
    let currentSpeed = parseFloat(window.getComputedStyle(fan).animationDuration) * 1000;
    fan.style.animationDuration = `${speed}ms`;
    currentSpeed = parseInt(window.getComputedStyle(fan).animationDuration);
    visibleSpeed = 0;
    speedometer.innerText = `${Math.round(visibleSpeed, 1) / 10}mph`;
}

function selectThrowable(name) {
    var toss = {};
    for (var t in throwables) {
        if (throwables[t].name === name) {
            toss = throwables[t];
            break;
        }
    }
    if (toss.unlocked === true) {
        user.throwable = toss;
        alert(`You just selected ${name}`);
    } else {
        alert("You have not yet unlocked this throwable.");
    }
}

function buyThrowable(name) {
    var toss = {};
    for (var t in throwables) {
        if (throwables[t].name === name) {
            toss = throwables[t];
            break;
        }
    }
    if (!toss.unlocked) {
        let price = toss.unlockPrice;
        if (user.coins - price >= 0) {
            user.coins -= price;
            toss.unlocked = true;
            balance.innerText = `${user.coins} C`;
            alert(`You just unlocked ${name}`);
        } else {
            alert(`You cannot afford to buy this ${name}`);
        }
    } else {
        alert(`You have already unlocked ${name}`);
    }
}

function buyUpgrade(name) {
    if (name === "Power") {
        console.log("upgrading power")
        let price = user.powerUpPrice;
        console.log(price)
        if (user.coins - price >= 0) {
            user.upgradePower();
            user.coins -= price;
            balance.innerText = `${user.coins} C`;
            $("#upPower").text(`${user.powerUpPrice} C`);
            alert(`You upgraded your ${name}`)
        } else {
            alert(`You do not have enough coins to upgrade your ${name}`)
        }
    }
}

function addThrowable(name, durability, unlockPrice, coinsDropped, image) {
    var toss = new Throwable(name, parseFloat(durability), parseInt(unlockPrice), parseInt(coinsDropped), image);
    throwables.push(toss);
}

function throwObject() {
    let currentSpeed = parseFloat(window.getComputedStyle(fan).animationDuration) * 1000;
    var toss = user.throwable;
    /* var img = document.createElement("img");
    img.setAttribute("src", toss.image);
    img.style.top = 250+"px";
    img.style.right = 250+"px";
    img.style.position = "relative";
    img.style.width = 100+"px";
    img.style.height = 100+"px";
    speedometer.appendChild(img); */
    
    if ((currentSpeed >= toss.durability) && (currentSpeed + toss.durability <= 1000)) {
        user.coins += toss.coinsDropped;
        adjustSpeed(-toss.durability);
        balance.innerText = `${user.coins} C`;
    } else {
    }
}
    
function updateTime() {
    scoreDisplay.innerHTML = "0" + timer.time.toFixed(2);
}

function startTimer() {
    var timerTween = TweenLite.to(timer, spinningDuration, {ease: Power0.easeNone, time: 0, onUpdate: updateTime});
}
function countDown(){
    countingDown = true;

    startTimer();

    setTimeout(function() {
        countdownDone = true;
        countingDown = false;
    }, (spinningDuration * 1000));
}

function reset() {
    countingDown = false;
    countdownDone = false;
    score = 0;
    timer = {time: spinningDuration};
    setSpeed(0);
}

function openShop() {
    shop.style.visibility = hidden;
}

function closeShop() {
    shop.style.visibility = visible;
}


























