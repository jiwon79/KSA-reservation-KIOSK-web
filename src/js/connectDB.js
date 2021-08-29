var roomList = {'a': Array('00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000'), 
                'b': Array('00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000'), 
                'c': Array('00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000'), 
                'd': Array('00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000'), 
                'e': Array('00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000', '00-000')};

var timeList = Array('8:50 ~ 9:40', '9:40 ~ 10:40', '10:40 ~ 11:40', '11:40 ~ 12:40', '	12:40 ~ 1:30', '1:30 ~ 2:30', '2:30 ~ 3:30', '3:30 ~ 4:30', '4:30 ~ 5:30', '5:30 ~ 6:30', '6:30 ~ 7:30', '7:30 ~ 8:30', '8:30 ~ 9:30', '9:30 ~ 10:30', '10:30 ~ 11:30');
var classList = Array('1교시', '2교시', '3교시', '4교시', '점심시간', '5교시', '6교시', '7교시', '8교시', '9교시', '저녁시간', '10교시', '11교시', '12교시', '13교시');

d = getTodayDate();
var dayLog_exists = fs.existsSync(rootPath+'/log/day_log/'+d+'.txt');
var userLog_exists = fs.existsSync(rootPath+'/log/user_log/'+d+'.txt');

// day log file
if(dayLog_exists){ // if exist file, load day log
    console.log("exist :",dayLog_exists);
    loadDayLog();
} else { // if not exist file, create empty log file
    console.log("no exists :",dayLog_exists);
    createDayLogFile();
}

//user log file
if(userLog_exists){
    console.log("exist : ", userLog_exists);
} else {
    createUserLogFile();
}

// student excel data
var studentList = {}
xlsxFile(rootPath+'/src/students.xlsx').then((rows) => {
    for (i=0; i<rows.length; i++) {
        s = String(rows[i][0]);
        number = s.slice(0,2) + '-' + s.slice(2,5);
        studentList[number] = rows[i][1];
    }
})