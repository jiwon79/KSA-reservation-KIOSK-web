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