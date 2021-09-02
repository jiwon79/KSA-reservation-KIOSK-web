// modal
function appear_modal(option) {
  document.querySelector('.modal_wrap').style.display = 'block';
  document.querySelector('.black_bg').style.display = 'block';
  var modal = document.querySelector('.modal_content');
  if (option == 'not_info') modal.innerText = '학번, 이름을 입력해주세요';
  if (option == 'over_time') modal.innerText = '세미나실을 최대 3시간 이용 가능합니다';
  if (option == 'not_check_reserve') modal.innerText = '예약할 시간을 선택해 주세요.';
  if (option == 'not_reserve') modal.innerText = '예약을 하지 않았습니다.';
  if (option == 'not_checkbox') modal.innerText = '취소할 시간을 선택해주세요';
  if (option == 'wrong_info') modal.innerText = '학번과 이름을 정확히 입력해주세요';
  if (option == 'gaonnuri_fail')  modal.innerText = '가온누리 비밀번호를 정확히 입력해주세요';
}

function close_modal() {
  document.querySelector('.modal_wrap').style.display = 'none';
  document.querySelector('.black_bg').style.display = 'none';
}

// main modal
function appear_mainModal() {
  document.querySelector('.mainModal_close').addEventListener('click', close_mainModal);
  document.querySelector('.mainModal_wrap').style.display = 'block';
  document.querySelector('.black_bg').style.display = 'block';
}

function close_mainModal() {
  document.querySelector('.mainModal_wrap').style.display = 'none';
  document.querySelector('.black_bg').style.display = 'none';
}