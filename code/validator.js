var inp_x = document.getElementById('input_x');
var inp_R = document.getElementById('input_R');
var sendButton = document.getElementById('send_button');
var current_time = document.getElementById('current_time');
var working_time = document.getElementById('working_time');
var table = document.getElementById('res_table');
var tbody = table.getElementsByTagName('tbody')[0];
var pred_btn = null;
var error_message = "";

var x_value = null;
var y_value = null;
var r_value = null;


/*---------------Проверка данных--------------------*/

function checkX(){
    if (/[.|,]/.test(x_value)){
        //проверяем формат числа с плавающей точкой/запятой
        if (!/^-?\d+[.|,]\d+$/.test(x_value)){
            error_message += "X: Неправильный формат ввода числа с плавающей точкой\n";
            return false;
        } 
        // кол-во знаков после точки/запятой больше 5
        if (!/[.|,]\d{1,5}$/.test(x_value)){
            error_message += "X: Количество символов после запятой больше 5\n";
            return false;
        } 
        // перед запятой 1 цифра
        if(!/^-?\d{1}[.|,]/.test(x_value)){
            error_message += "X: Число не попадает в указанный диапазон\n";
            return false;
        }
    }
    else if (!/^-?\d{1}$/.test(x_value)){
        if(/^-?\d{1,}$/.test(x_value)) error_message += "X: Число не попадает в указанный диапазон\n";
        else error_message += "X: Неправильный формат ввода целого числа\n";
        return false;
    } 

    var value = x_value;
    value = Number(value.replace('\,', '.'));
    if (value <= -3 || value >= 5){
        error_message = "X: Число не попадает в указанный диапазон\n";
        return false;
    } 
    else return true;
}

function checkY(){
    if (y_value != null) return true;
    else{
        error_message += "Y: Не выбрано\n";
        return false;
    } 
}


function getData(){
    x_value = inp_x.value;
    r_value = inp_R.value;
}


/*--------Функция обработки ответа-------*/

var Handler = function(request){
      console.log(request.responseText);  
      var response = JSON.parse(request.responseText);
      updateTable(response);
      updateTime(response);
}


function updateTime(response){
    current_time.innerHTML = response.current_time;
    working_time.innerHTML = response.working_time + ' мс';
}

function updateTable(response){
    var row = document.createElement("tr");
    var cell_x = document.createElement("td");
    var cell_y = document.createElement("td");
    var cell_R = document.createElement("td");
    var cell_hit = document.createElement("td");
    cell_x.innerHTML = response.x;
    cell_y.innerHTML = response.y;
    cell_R.innerHTML = response.R;
    cell_hit.innerHTML = response.res;
    row.appendChild(cell_x);
    row.appendChild(cell_y);
    row.appendChild(cell_R);
    row.appendChild(cell_hit);
    tbody.appendChild(row);
}


/*----------------Отправка данных на сервер------------*/

function sendRequest(r_handler){
    var r_path = 'handler.php?x=' 
        + x_value + '&y='
        + y_value + '&R='
        + r_value;

    var request = new XMLHttpRequest(); 
    if (!request){
        return;
    }

    request.open("GET", r_path, true);
    request.responseType = 'text';
    request.setRequestHeader('Content-Type', 'application/x-www-form-url');
    
    request.addEventListener("readystatechange", () => {
       if (request.readyState === 4 && request.status === 200) {
            r_handler(request);
       }
   });
   
    request.send();
}


/*-------Кнопка отправить--------*/

function sendData(){
    error_message = "";
    getData();
	console.log(x_value + ' ' + y_value + ' ' + r_value);

    var check1 = checkX();
    var check2 = checkY();
    if(check1 && check2) sendRequest(Handler);
    else alert(error_message);
}

sendButton.addEventListener('click', sendData);


/*------------Определение выбранной кнопки-----------*/

const btns = document.querySelectorAll('button[id^=btn]')

btns.forEach(btn => {

   btn.addEventListener('click', event => {
        y_value = event.target.value;
        console.log(event.target.value);
        event.target.classList.add("active_btn");
        if (pred_btn == null) pred_btn = event.target;
        else{ 
            pred_btn.classList.remove("active_btn");
            if(event.target == pred_btn){
                pred_btn = null;
                y_value = null;
            }
            else pred_btn = event.target;
            
        }
   });

});
