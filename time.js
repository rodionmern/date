var Today, Days, Years, paragraphTimeOut;

paragraphTimeOut = document.getElementById("timeOut").innerHTML = "Дата создания сайта";

const fromTime = new Date(2023, 10, 12),
	fromDate = fromTime.getDate(),
	fromFullYear = fromTime.getFullYear(),
	fromMonth = fromTime.getMonth();

var Today = new Date(),
    todayDate = Today.getDate(),
    todayFullYear = Today.getFullYear();
    todayMonth = Today.getMonth();

console.log(Today, todayDate, todayMonth, todayFullYear);
console.log(fromTime, fromDate, fromMonth, fromFullYear);

var Month = todayDate - fromDate;
var Days = todayDate - fromDate;

if (Days => 0) {
		var Days = Date ;
		console.log(Years)
}

var Years = todayFullYear - fromFullYear;

if (Years == 0) {
		var Years = Years + " лет";
		console.log(Years)
} else if (Years == 1) {
		var Years = Years + " год";
		console.log(Years)
} else if (Years < 5) {
		var Years = Years + " года";
		console.log(Years)
} else if (Years > 4) {
		var Years = Years + " лет";
		console.log(Years)
}

var Months = todayMonth - fromMonth;

if (Months > 4) {
	var Months = Months + " месяцев";
	console.log(Months)
} else if (Months > 1) {
	var Months = Months + " месяца";
	console.log(Months)
} else if (Months == 1) {
	var Months = Months + " месяц";
	console.log(Months)
} else if (Months == 0) {
	var Months = Months + " месяцев";
	console.log(Months)
}

paragraphTimeOut = document.getElementById("timeOut").innerHTML = "Дата создания сайта: " + Years + ", " + Months;

/* function DaysSite() {

	if (todayFullYear - fromFullYear = 1) {
		var Years = todayFullYear - fromFullYear, "год";
	}

	console.log(todayFullYear - fromFullYear)

} */

console.log(/*todayFullYear - fromFullYear,*/ todayMonth - fromMonth, todayDate - fromDate)