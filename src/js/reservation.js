// if already reserve student, change background color
reservationTable();

var room = getParameterByName('room');
document.querySelector('.center h3').innerText = 'SEMINAR ' + room.toUpperCase() + ' 예약 상태';