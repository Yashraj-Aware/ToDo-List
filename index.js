    // HTML Tags,divs and various other selected  


const content = document.querySelector(".content");

const list = document.getElementById("list");

const header = document.querySelector(".header");

const input = document.getElementById("input");

const date = document.getElementById("date");

const color = document.querySelector(".color-width");


    // Functioning the date paramter


arrDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
arrMonth = ["Jan","Feb","Mar","April","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
var today = new Date();
var day = today.getDay();
var month = today.getMonth();
var d = today.getDate();
date.innerHTML = `<p>${arrDay[day]}, ${arrMonth[month]} ${d}</p>`


    // Variables and declaration of arrays which are required


let arrlist = [];
let id = 0;
let progressValue = 0;
let maxlists = 0;
let CHECK = "fa-check-circle";
let UNCHECK = "fa-circle-thin";
let LINETHROUGH = "lineThrough";


    // function to add tasks on to do list


function addToDo(todo,id,done,trash){
    if(trash === true)
    {
        return;
    }
    const DONE = done?CHECK:UNCHECK;
    const LINE = done?LINETHROUGH :"";

    
    const item = `                <li class = "item">
                <i class="chk fa ${DONE} co" job = "complete" id = "${id}"></i>
                    <span class = "text ${LINE}">${todo}</span>
                <i class="trash fa fa-trash-o de" job = "delete" id = "${id}"></i>
    </li>`;
    const position = "beforeend";

    list.insertAdjacentHTML(position,item);
}


// calling the add function when the enter key is pressed


document.addEventListener("keyup" , function(ev){
    if(ev.key === "Enter")
    {    
        const todo = input.value.toUpperCase();
        if(todo)
        {
            addToDo(todo , id , false, false);
            arrlist.push({ 
                todo:todo,
                id:id,
                done:false,
                trash:false
            });
            id++;
        }
        maxlists++;
            input.value = null;
        }
    } );



    // bt pressing right arrow the background theme changes

    
    let bgid = 0;
    document.addEventListener("keyup",function(event){
        //ArrowRight
        if(event.key === "ArrowRight")
        {
            bgid++;
            if(bgid > 5)
            {
                bgid = 1;
            }
            header.style.backgroundImage = `url('../img/bg${bgid}.jpg')`
        }
    });

    // when the todo is completed this function is invoked
    
    
function complete(element){
    element.classList.toggle(CHECK);
    element.classList.toggle(UNCHECK);
    arrlist[element.id].done = arrlist[element.id].done ? false : true;
    progressValue++
}


function remove(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
    arrlist[element.id].trash = true;
    progressValue--;
    maxlists--;
}

list.addEventListener("click" , function(event){
let element = event.target;
let job = event.target.attributes.job.value;
 


    if(job === "complete")
    {
        complete(element);
        function colour(){
            color.style.width = `${(progressValue/maxlists)*100}%`;
            color.innerText = `${Math.ceil((progressValue/maxlists)*100)}%`
        }
        colour();
    }
    else
    {
        remove(element);

        function colour(){
            switch (progressValue) {
                case 0:
                    color.style.width = 0;
                    color.innerText = "0%"
                    break;
            
                default:
                    color.style.width = `${(progressValue/maxlists)*100}%`;
                    color.innerText = `${Math.ceil((progressValue/maxlists)*100)}%`
                    break;
            }
        }
        colour();
        
    }

});