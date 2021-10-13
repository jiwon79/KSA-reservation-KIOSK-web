const option = 'product' // product or develop
const BASE_URL = option == 'product' ? 'https://ksa-seminar-res-backend.herokuapp.com/' : 'http://127.0.0.1:3000/';

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

async function updateTodayLog() {
  var name = localStorage['data_name'];
  var number = localStorage['data_number'];

  let result = await fetch(BASE_URL+'log/seminar', {
    method: 'put',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({'name': name, 'number': number}),
  })
  .then(res => res.json())
  .then(data => {
    return data
  });

  return result;
}

async function getTodayLog() {
  let fetchData = await fetch(BASE_URL+'log/seminar');
  let reserverData = await fetchData.json();

  return reserverData;
}

async function saveUserLog(option, name, number, tel, room, time) {
  let fetchData = await fetch(BASE_URL+'log/user', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'option': option, 
      'name': name, 
      'number': number, 
      'tel': tel, 
      'room': room,
      'time': time
    })
  });
  let userLogData = await fetchData.json();
  console.log(userLogData);
}