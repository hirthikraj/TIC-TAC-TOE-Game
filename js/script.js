selectBox = document.querySelector(".Select-Box"), // grabbing the selectBox
PlayerXbtn = selectBox.querySelector(".player-x"), // grabbing the playerX btn in the selectBox
PlayerObtn = selectBox.querySelector(".player-o"), // grabbing the playerO btn in the selectBox
playBoard = document.querySelector(".playboard"), // grabbing the playboard box
allBox = document.querySelectorAll("section span"), // garbbing all the boxes from the player box
turn = document.querySelector(".turn"), //garbbing the turn box form the play board box
resultbox = document.querySelector(".resultbox"),
wonText = resultbox.querySelector(".wonText"),
replaybtn = resultbox.querySelector("button");

window.onload = () => {  // on window load

    for (let i = 0; i < allBox.length; i++) {
        allBox[i].setAttribute("onclick","clickedBox(this)");
     }


    PlayerXbtn.onclick = () => { //clcicking player X
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
    }

    PlayerObtn.onclick = () => { // clicking player O
        selectBox.classList.add("hide");
        playBoard.classList.add("show");
        turn.setAttribute("class","turn active player");
    }
 
}

let playerXIcon = "fa fa-close"; //grabbing the cross icon form the font awesome 
let playerOIcon = "fa fa-circle-o"; //grabbing the circle icon form the font awesome 
let playerSign = "X";
let runbot = true;

function clickedBox(element){ //on click function 

    if(turn.classList.contains("player")){
        element.innerHTML = `<i class="${playerOIcon}"></i>`; //clicking the box will result in cross icon 
        turn.classList.add("active"); //changing the active player
        playerSign = "O";
        element.setAttribute("id",playerSign);
    }
    else{
        element.innerHTML = `<i class="${playerXIcon}"></i>`; //clicking the box will result in circle icon 
        turn.classList.add("active"); //changing the active player
        element.setAttribute("id",playerSign);
    }
    checkWinner();
    playBoard.style.pointerEvents="none";
    element.style.pointerEvents="none";
    let randomDelayTime = ((Math.random()*1000)+200).toFixed();
    setTimeout(() => {
        bot();
    }, randomDelayTime);
}

function bot(){  // bot function where it randomly choose any box
    if(runbot){
        playerSign="O";
    let array=[];
    for (let i = 0; i < allBox.length; i++) { //choosing boxes where it not clicked
        if(allBox[i].childElementCount == 0){
            array.push(i);
        }
    }

    let randomBox = array[Math.floor(Math.random() * array.length)]; // varaible for generating random boxes
    if(array.length>0) //if the array is greater than zero,then it works
    {
        if(turn.classList.contains("player"))
        {
            allBox[randomBox].innerHTML =`<i class="${playerXIcon}"></i>`;
            turn.classList.remove("active");
            playerSign="X";
            allBox[randomBox].setAttribute("id",playerSign);
        }
        else
        {
            allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`; //clicking the box will result in cross icon 
            turn.classList.remove("active"); //changing the active player
            allBox[randomBox].setAttribute("id",playerSign);
        }
        checkWinner();
    }
    allBox[randomBox].style.pointerEvents="none";
    playBoard.style.pointerEvents="auto";
    playerSign="X";
    }
}

function getId(idname){
    return document.querySelector(".box"+idname).id;
}
function checkId(val1,val2,val3,Sign){
    if(getId(val1)==Sign && getId(val2)==Sign && getId(val3)==Sign){
        return true;
    }
}

function checkWinner(){
    if( checkId(1,2,3,playerSign) || checkId(4,5,6,playerSign) || checkId(7,8,9,playerSign) || checkId(1,4,7,playerSign) || checkId(2,5,8,playerSign) || checkId(3,6,9,playerSign) || checkId(1,5,9,playerSign) || checkId(3,5,7,playerSign)){
        runbot=false;
        bot(runbot);

        setTimeout(() => {
            playBoard.classList.remove("show");
            resultbox.classList.add("show");
        }, 1200);

        wonText.innerHTML = `Player <p>${playerSign}</p> Won `;
    }
    else
    {
        if(getId(1)!="" && getId(2)!="" && getId(3)!="" && getId(4)!="" && getId(5)!="" && getId(6)!="" && getId(7)!="" && getId(8)!="" && getId(9)!=""){
            console.log(playerSign+" is a Winner");
            runbot=false;
            bot(runbot);

            setTimeout(() => {
            playBoard.classList.remove("show");
            resultbox.classList.add("show");
            }, 1200);

            wonText.textContent = `Match Drawn`;
        }
    }
}

replaybtn.onclick = () => {
    window.location.reload();
} 



