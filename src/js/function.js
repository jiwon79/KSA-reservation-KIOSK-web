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

  month = {
    "Jan": '01',
    "Feb": '02',
    "Mar": '03',
    "Apr": '04',
    "May": '05',
    "Jun": '06',
    "Jul": '07',
    "Aug": '08',
    "Sep": '09',
    "Oct": '10',
    "Nov": '11',
    "Dec": '12'
  };

  todayDate = splitDate[3] + '-' + month[splitDate[1]] + '-' +
    splitDate[2] + '(' + splitDate[0] + ')'
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
  if (regExp.test(number)) {
    return true;
  } else {
    return false;
  }
}

// time table function
function applyCheckbox(t) {
  var room = getParameterByName('room');
  var checkbox = document.querySelector('.reserveTable tr:nth-child(' + String(t + 2) + ') td:nth-child(1) input');

  if (data_number[room][t] != '00-000') {
    console.log('이미 예약이 됨');
    return;
  }
  changeChecked(t);
}

function changeChecked(t) {
  var checkbox = document.querySelector('.reserveTable tr:nth-child(' + String(t + 2) + ') td:nth-child(1) input');
  if (checkbox.checked == true) {
    checkbox.checked = false;
  } else {
    checkbox.checked = true;
  }
}

// apply day log on reservation page's time table
function reservationTable() {
  var room = getParameterByName('room');

  for (i = 0; i < 15; i++) {
    var tr = document.querySelector('.reserveTable tr:nth-child(' + String(i + 2) + ')');
    tr.querySelector('td:nth-child(1)').addEventListener("click", function applyCheckbox(i) {});
    tr.querySelector('td:nth-child(2)').innerText = classList[i];
    tr.querySelector('td:nth-child(3)').innerText = timeList[i];
    if (!data_number[room][i].includes('00-000')) {
      // tr.style.color = '#00ff00';
      tr.style.backgroundColor = '#adadad';
      tr.querySelector('td:nth-child(4)').innerText = data_number[room][i]+'('+data_name[room][i]+')';
    }
  }
  console.log('apply table');
}

// apply day log on overall page's time table
function overallTable() {
  var roomAraay = Array('a', 'b', 'c', 'd', 'e');

  for (i = 0; i < 5; i++) {
    for (j = 0; j < 15; j++) {
      r = roomAraay[i].toUpperCase();
      // query = ".sA td:nth-child(3)"
      var qeury = '.s' + r + ' td:nth-child(' + String(j + 1) + ')';
      table = document.querySelector(qeury);
      if (!data_number[roomAraay[i]][j].includes('00-000')) {
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
  // textPath = rootPath+'/log/day_log/'+d+'.txt';
  data_number = {
    'a': Array(15).fill('00-000'),
    'b': Array(15).fill('00-000'),
    'c': Array(15).fill('00-000'),
    'd': Array(15).fill('00-000'),
    'e': Array(15).fill('00-000')
  },
  data_name = {
    'a': Array(15).fill('-'),
    'b': Array(15).fill('-'),
    'c': Array(15).fill('-'),
    'd': Array(15).fill('-'),
    'e': Array(15).fill('-')
  }
  localStorage['data_number'] = JSON.stringify(data_number);
  localStorage['data_name'] = JSON.stringify(data_name);

  data = 'a : 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000\n' +
    'b : 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000\n' +
    'c : 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000\n' +
    'd : 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000\n' +
    'e : 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000, 00-000';
  localStorage['day_log/' + d] = data;
  console.log('create empty day log')
}

// read text file
function loadDayLog() {
  data_number = JSON.parse(localStorage['data_number']);
  data_name = JSON.parse(localStorage['data_name']);
  console.log('load text data');
}

// if element == 1, change stu_number and save day log file
function saveDayLogByArray(stu_number, stu_name) {
  d = getTodayDate();
  data = ''

  // if element == 1, change stu_number
  for (var room in data_number) {
    for(i=0; i<data_number[room].length; i++) {
      if (data_number[room][i] == 1) {
        data_number[room][i] = stu_number;
        data_name[room][i] = stu_name;
      }
    }
  }
  localStorage['data_number'] = JSON.stringify(data_number);
  localStorage['data_name'] = JSON.stringify(data_name);
  console.log("sace day log")
}

// function saveUserLog(option, name, number, tel, room, time) {
//     d = getTodayDate();
//     textPath = rootPath+'/log/user_log/'+d+'.txt';
//     data = fs.readFileSync(textPath, {encoding: 'utf8'});

//     let today = new Date();   
//     let hours = today.getHours(); // 시
//     let minutes = today.getMinutes();  // 분
//     let seconds = today.getSeconds();  // 초

//     data = data + '\n' + hours + ':' + minutes + ':' + seconds;
//     data = data + ' ' + number + ' ' + name + ' ' + tel;
//     data = data + ' ' + option + ' ' + room + ' ' + time;
//     fs.writeFileSync(textPath, data, function(err) {
//         if(err) {
//             return console.log(err);
//         }
//     });
// }

// output: 해당 학생이 예약한 시간 리스트
function reserveTime(stu_number) {
  result = [];
  for (room in data_number) {
    for (i=0; i<data_number[room].length; i++) {
      if (data_number[room][i] == stu_number) {
        result.push([room, i]);
      }
    }
  }
  return result;
}

function print() {
  for (key in data_number) {
    console.log(key, data_number[key]);
  }
}

// number, name match check
function checkMatched(number, name) {
  if (studentList[number] == name) {
    console.log('학번, 이름이 정확합니다');
    return true;
  }
  if (number.slice(3, 4) == '2') {
    console.log('외국인임');
    return true;
  }
  return false;
}

async function fetchGaonnuriAuth(stu_number, pw) {
  var url = 'https://gaonnuri.ksain.net/api/PAuth.php';
  var data = new FormData();
  let gaonnuri_id = 'ksa'+stu_number.slice(0,2)+stu_number.slice(3,6);
  let gaonnuri_pw = CryptoJS.MD5(pw);
  console.log(gaonnuri_id, gaonnuri_pw)
  
  data.append('id', gaonnuri_id);
  data.append('pw', gaonnuri_pw);
  
  let response = await fetch(url, {
    method: 'POST', // or 'PUT'
    body: data,
  })
  let result = await response.json();
  console.log(result);
  return result;
}


// reservatoin button
async function reservation() {
  var reserveForm = document.reserveForm;
  var stu_number = reserveForm.number.value;
  var stu_name = reserveForm.name.value;
  var stu_tel = reserveForm.tel.value;
  var stu_pw = reserveForm.pw.value;
  var room = getParameterByName('room');
  var checkList = [];
  reserveList = reserveTime(stu_number);

  for (i = 0; i < 15; i++) {
    var checkbox = document.querySelector('.reserveTable tr:nth-child(' + String(i + 2) + ') td:nth-child(1) input');
    if (checkbox.checked == true) {
      checkList.push([room, i]);
    }
  }

  // if don't input number or name, show modal
  document.querySelector('.modal_close').addEventListener('click', close_modal);
  if (!stu_number || !stu_name) {
    appear_modal('not_info'); 
    return;
  }
  if (!checkList.length) {
    appear_modal('not_check_reserve');  
    return;
  } 

  if (stu_number != 'teacher' || stu_pw != 'teacher1234') {
    if (checkList.length + reserveList.length > 3) {
      appear_modal('over_time');
      return;
    }
    if (!checkMatched(stu_number, stu_name)) {
      appear_modal('wrong_info');
      return;
    }
    result = await fetchGaonnuriAuth(stu_number, stu_pw);
    if (result.result !== 'SUCCESS') {
      appear_modal('gaonnuri_fail');
      return;
    }
  }
  for (i = 0; i < checkList.length; i++) {
    let room = checkList[i][0];
    let index = checkList[i][1];
    data_number[room][index] = 1;
    // saveUserLog('reservation', stu_name, stu_number, stu_tel, checkList[i][0], checkList[i][1]);
  }
  saveDayLogByArray(stu_number, stu_name);
  reserveForm.submit();
}


// cancel reservation functions
async function checkbox_load(e) {
  var form = document.cancelInputForm;
  var stu_number = form.number.value;
  var stu_name = form.name.value;
  var stu_pw = form.pw.value;
  numberValidTest(stu_number);

  document.querySelector('#stu_number').innerText = stu_number;
  document.querySelector('#stu_name').innerText = stu_name;
  document.querySelector('#stu_pw').innerText = stu_pw;
  reserveList = reserveTime(stu_number);
  console.log(reserveList);

  // modal appear
  document.querySelector('.modal_close').addEventListener('click', close_modal);
  if (!stu_number || !stu_name) {
    appear_modal('not_info');
    return;
  }
  if (reserveList.length == 0) {
    appear_modal('not_reserve')
    return;
  }
  if (stu_number != 'teacher' || stu_pw != 'teacher1234') {
    if (!checkMatched(stu_number, stu_name)) {
      appear_modal('wrong_info');
      return;
    }
    result = await fetchGaonnuriAuth(stu_number, stu_pw);
    if (result.result != 'SUCCESS') {
      appear_modal('gaonnuri_fail');
      return;
    }
  }
  e.preventDefault();
  // form.submit();

  document.querySelector('.checkInputForm input[type="button"]').style.display = 'none';
  document.querySelector('.cancelForm').style.display = 'block';
  var checkbox = document.getElementsByName("time");
  // whether visible or unvisible checkbox
  for (var i = 0; i < checkbox.length; i++) {
    if (i < reserveList.length) {
      formLi = document.querySelector('form li:nth-child(' + String(i + 1) + ')')
      formLi.style.display = 'block';
      idx = reserveList[i][1]
      var str = reserveList[i][0].toUpperCase() + ' : ' + classList[idx] + ', ' + timeList[idx];
      formLi.querySelector('label').innerText = str;
    } else {
      document.querySelector('form li:nth-child(' + String(i + 1) + ')').style.display = 'none';
    }
  }
}

function reserve_cancel() {
  var checkbox = document.getElementsByName("time");
  var isCheck = false;

  stu_number = document.querySelector('#stu_number').innerText;
  stu_name = document.querySelector('#stu_name').innerText;
  stu_pw = document.querySelector('#stu_pw').innerText;

  reserveList = reserveTime(stu_number);

  // effectiveness test
  for (var i = 0; i < checkbox.length; i++) {
    if (checkbox[i].checked == true) {
      isCheck = true;
    }
  }

  // modal appear
  document.querySelector('.modal_close').addEventListener('click', close_modal);
  if (!isCheck) {
    appear_modal('not_checkbox');
  } else {
    for (var i = 0; i < checkbox.length; i++) {
      if (checkbox[i].checked == true) {
        let room = reserveList[i][0];
        let index = reserveList[i][1];
        data_number[room][index] = 1;
        // saveUserLog('reservation_cancel', stu_name, stu_number, stu_tel, reserveList[i][0], reserveList[i][1]);
      }
    }

    saveDayLogByArray('00-000', '-');
    document.cancelForm.submit();
  }
}