// let fs = require('fs');
// let rootPath = require('electron-root-path').rootPath;

// get today date return 2021-02-25(Thu)
function getTodayDate() {
    // Date 2021-02-25-17:45:34 Thu
    // year = splitDate[3] "2021"
    // month = splitDate[1] "Feb"
    // weekDay = splitDate[0] "Thu"
    // day = splitDate[2] "25"
    // time = splitDate[4] "17:45:34"

    var date = new Date();
    splitDate = String(date).split(' ');

    month = {"Jan":'01', "Feb":'02', "Mar":'03', "Apr":'04',
            "May":'05', "Jun":'06',"Jul":'07', "Aug":'08',
            "Sep":'09', "Oct":'10', "Nov":'11', "Dec":'12'};

    todayDate = splitDate[3] + '-' + month[splitDate[1]] + '-' + 
                splitDate[2] + '(' + splitDate[0]+')'
    return todayDate;
}
  
// get parameter (room)
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function numberValidTest(number) {
    var regExp = /^\d{2}-\d{3}$/;
    if(regExp.test(number)) {
        return true;
    } else{
        return false;
    }
}

// time table function
function applyCheckbox(t) {
    var room = getParameterByName('room');
    var checkbox = document.querySelector('.reserveTable tr:nth-child(' + String(t+2) + ') td:nth-child(1) input');

    if (roomList[room][t] != '00-000') {
        console.log('이미 예약이 됨');
        return ;
    }
    changeChecked(t);
}

function changeChecked(t) {
    var checkbox = document.querySelector('.reserveTable tr:nth-child(' + String(t+2) + ') td:nth-child(1) input');
    if (checkbox.checked == true) {
        checkbox.checked = false;
    } else {
        checkbox.checked = true;
    }
}

// apply day log on reservation page's time table
function reservationTable() {
    var room = getParameterByName('room');

    for(i=0; i<15; i++) {
        var tr = document.querySelector('.reserveTable tr:nth-child(' + String(i+2) + ')');
        tr.querySelector('td:nth-child(1)').addEventListener("click", function applyCheckbox(i){});
        tr.querySelector('td:nth-child(2)').innerText = classList[i];
        tr.querySelector('td:nth-child(3)').innerText = timeList[i];
        if (!roomList[room][i].includes('00-000')) {
            // tr.style.color = '#00ff00';
            tr.style.backgroundColor = '#adadad';
            tr.querySelector('td:nth-child(4)').innerText = roomList[room][i];
        }
    }
    console.log('apply table');
}

// apply day log on overall page's time table
function overallTable() {
    var roomAraay = Array('a','b','c','d','e');

    for(i=0; i<5; i++) {
        for(j=0; j<15; j++) {
            r = roomAraay[i].toUpperCase();
            // query = ".sA td:nth-child(3)"
            var qeury = '.s' + r + ' td:nth-child(' + String(j+1) + ')';
            table = document.querySelector(qeury);
            if(!roomList[roomAraay[i]][j].includes('00-000')) {
                table.style.backgroundColor = "#f26336";
                table.style.color = "#ffffff";
            }
        }
    }
    console.log('apply overall table');
}

// create text file
function createDayLogFile() {
    d = getTodayDate();
    textPath = rootPath+'/log/day_log/'+d+'.txt';
    data = 'a : 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000\n'+
            'b : 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000\n'+
            'c : 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000\n'+
            'd : 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000\n'+
            'e : 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000';
    
    fs.writeFile(textPath, data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("create empty day log file");
    });
}

function createUserLogFile() {
    d = getTodayDate();
    textPath = rootPath+'/log/user_log/'+d+'.txt';
    data = 'current time / stu_number / stu_name / phone number / option / seminar / time';
    
    fs.writeFile(textPath, data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("create empty user log file");
    });
}

// read text file
function loadDayLog() {
    d = getTodayDate();
    textPath = rootPath+'/log/day_log/'+d+'.txt';

    data = fs.readFileSync(textPath, {encoding: 'utf8'});
    s = data.split('\n');
    var i = 0;
    for(key in roomList) {
        // a : 0,0,0 => [0,0,0]
        roomList[key] = s[i].slice(4,).split(', ');
        i = i+1;
    }
    console.log('load text data');
}

// if element == 1, change stu_number and save day log file
function saveDayLogByArray(stu_number) {
    d = getTodayDate();
    textPath = rootPath+'/log/day_log/'+d+'.txt';
    data = ''
    
    // if element == 1, change stu_number
    for(var room in roomList) {
        for(i=0; i<roomList[room].length; i++) {
            if (roomList[room][i] == 1) {
                roomList[room][i] = stu_number;
            }
        }
    }

    // save day log file
    for(key in roomList) {
        data = data + key + ' : ' + roomList[key].join(', ') + '\n';
    }

    fs.writeFile(textPath, data, function(err) {
        if(err) {
            return console.log(err);
        }
        console.log("save  day log file");
    });
}

function saveUserLog(option, name, number, tel, room, time) {
    d = getTodayDate();
    textPath = rootPath+'/log/user_log/'+d+'.txt';
    data = fs.readFileSync(textPath, {encoding: 'utf8'});

    let today = new Date();   
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    let seconds = today.getSeconds();  // 초

    data = data + '\n' + hours + ':' + minutes + ':' + seconds;
    data = data + ' ' + number + ' ' + name + ' ' + tel;
    data = data + ' ' + option + ' ' + room + ' ' + time;
    fs.writeFileSync(textPath, data, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}

// output: 해당 학생이 예약한 시간 리스트
function reserveTime(stu_number) {
    result = [];
    for(key in roomList) {
        for(i=0; i<roomList[key].length; i++) {
            if (roomList[key][i] == stu_number) {
                result.push([key, i]);
            }
        }
    }
    return result;
}

function print() {
    for(key in roomList){
        console.log(key, roomList[key]);
    }
}

// number, name match check
function checkMatched(number, name) {
    if (studentList[number] == name) {
        console.log('학번, 이름이 정확합니다');
        return true;
    }
    if (number.slice(3,4) == '2') {
        console.log('외국인임');
        return true;
    }
    return false;
}

// modal 
function appear_modal(option) {
    document.querySelector('.modal_wrap').style.display ='block';
    document.querySelector('.black_bg').style.display ='block';
    var modal = document.querySelector('.modal_content');
    if (option=='not_info')     modal.innerText = '학번, 이름을 입력해주세요';
    if (option == 'over_time')   modal.innerText = '세미나실을 최대 3시간 이용 가능합니다';
    if (option == 'not_check_reserve')  modal.innerText = '예약할 시간을 선택해 주세요.';
    if (option == 'not_reserve')    modal.innerText = '예약을 하지 않았습니다.';
    if (option == 'not_checkbox') modal.innerText = '취소할 시간을 선택해주세요';
    if (option == 'wrong_info') modal.innerText = '학번과 이름을 정확히 입력해주세요';
}

function close_modal() {
    document.querySelector('.modal_wrap').style.display ='none';
    document.querySelector('.black_bg').style.display ='none';
}

// main modal
function appear_mainModal() {
    document.querySelector('.mainModal_close').addEventListener('click', close_mainModal);
    document.querySelector('.mainModal_wrap').style.display='block';
    document.querySelector('.black_bg').style.display ='block';
}

function close_mainModal() {
    document.querySelector('.mainModal_wrap').style.display ='none';
    document.querySelector('.black_bg').style.display ='none';
}

// reservatoin button
function reservation() {
    var reserveForm = document.reserveForm;
    var stu_number = reserveForm.number.value;
    var stu_name = reserveForm.name.value;
    var stu_tel = reserveForm.tel.value;
    var room = getParameterByName('room');
    var checkList = [];
    reserveList = reserveTime(stu_number);

    for (i=0; i<15; i++) {
        var checkbox = document.querySelector('.reserveTable tr:nth-child(' + String(i+2) + ') td:nth-child(1) input');
        if (checkbox.checked == true) {
            checkList.push([room,i]); 
        }
    }

    // if don't input number or name, show modal
    document.querySelector('.modal_close').addEventListener('click', close_modal);
    if (!stu_number || !stu_name) {
        appear_modal('not_info');
    } else if (checkList.length + reserveList.length > 3) {
        appear_modal('over_time');
    } else if (!checkList.length) {
        appear_modal('not_check_reserve');
    } else if (!checkMatched(stu_number, stu_name)) {
        appear_modal('wrong_info');
    } else {
        
        for (i=0; i<checkList.length; i++) {
            roomList[checkList[i][0]][checkList[i][1]] = 1;
            saveUserLog('reservation', stu_name, stu_number, stu_tel, checkList[i][0], checkList[i][1]);
        }
        saveDayLogByArray(stu_number);
        reserveForm.submit();
    }
}


// cancel reservation functions
function checkbox_load(e) {    
    var form = document.cancelInputForm;    
    var stu_number = form.number.value;
    var stu_name = form.name.value;
    var stu_tel = form.tel.value;
    numberValidTest(stu_number);

    document.querySelector('#stu_number').innerText = stu_number;
    document.querySelector('#stu_name').innerText = stu_name;
    document.querySelector('#stu_tel').innerText = stu_tel;
    reserveList = reserveTime(stu_number);
    console.log(reserveList);

    // modal appear
    document.querySelector('.modal_close').addEventListener('click', close_modal);
    if(!stu_number || !stu_name) {
        appear_modal('not_info');
        return;
    } else if (reserveList.length == 0) {
        appear_modal('not_reserve')
        return;
    } else if (!checkMatched(stu_number, stu_name)) {
        appear_modal('wrong_info');
        return;
    } 
    e.preventDefault();
    // form.submit();
    
    document.querySelector('.checkInputForm input[type="button"]').style.display = 'none';
    document.querySelector('.cancelForm').style.display = 'block';
    var checkbox = document.getElementsByName("time");
    // whether visible or unvisible checkbox
    for (var i=0; i<checkbox.length; i++) {
        if (i < reserveList.length) {
            formLi = document.querySelector('form li:nth-child('+String(i+1)+')')
            formLi.style.display = 'block';
            idx = reserveList[i][1]
            var str = reserveList[i][0].toUpperCase() + ' : ' + classList[idx] + ', ' + timeList[idx];
            formLi.querySelector('label').innerText = str;
        } else {
            document.querySelector('form li:nth-child('+String(i+1)+')').style.display = 'none';
        }
    }
}

function reserve_cancel() {
    var checkbox = document.getElementsByName("time");
    var isCheck = false;

    stu_number = document.querySelector('#stu_number').innerText;
    stu_name = document.querySelector('#stu_name').innerText;
    stu_tel = document.querySelector('#stu_tel').innerText;

    reserveList = reserveTime(stu_number);
    
    // effectiveness test
    for (var i=0; i<checkbox.length; i++) {
        if (checkbox[i].checked == true) {
            isCheck = true;
        }
    }
    
    // modal appear
    document.querySelector('.modal_close').addEventListener('click', close_modal);
    if(!isCheck) {
        appear_modal('not_checkbox');
    } else {
        for (var i=0; i<checkbox.length; i++) {
            if (checkbox[i].checked == true) {
                roomList[reserveList[i][0]][reserveList[i][1]] = 1;
                saveUserLog('reservation_cancel', stu_name, stu_number, stu_tel, reserveList[i][0], reserveList[i][1]);
            }
        }
    
        saveDayLogByArray('00-000');
        document.cancelForm.submit();
    }
}