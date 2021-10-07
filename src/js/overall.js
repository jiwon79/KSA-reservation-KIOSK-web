// show real time seminar on each table
getTodayLog()
.then(reserveData => {
  console.log(reserveData.data);
  localStorage['data_number'] = JSON.stringify(reserveData.data.number);
  localStorage['data_name'] = JSON.stringify(reserveData.data.name);
})
.then(() => overallTable());