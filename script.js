const initial_date = new Date(2023, 10, 12).getTime()
const now_date = new Date().getTime()


const get_date_difference = (start, end) => {
	const total_months = (start - end) / (1000*60*60*24*30.4167)
	const years = Math.floor(total_months / 12)
	const months = Math.floor(total_months % 12)

	return [years.toString(), months.toString()]
}

const result_date_object = get_date_difference(now_date, initial_date)

let years = [
	Number(result_date_object[0]),
	Number(result_date_object[0].slice(-1)),
	Number(result_date_object[0].slice(-2,-1))
	]
let months = Number(result_date_object[1])

let result = ''

result += years[0]

if (years[2] == 0 || years[2] >= 2) { 
	years[1] == 0 
		? result += " лет, "
		: years[1] == 1 
			? result += " год, "
			: years[1] >= 2 && years[1] <= 4
				? result += " года, "
				: result += " лет, "
} else if (years[2] == 1) {
	result += " лет, "
}

result += result_date_object[1]
months == 0 
	? result += " месяцев "
	: months == 1 
		? result += " месяц "
		: (months => 2) && (months <= 4)
			? result += " месяца "
			: result += " месяцев "

let passed_time_h2 = document.querySelector('#passed_time');
passed_time_h2.innerHTML = result;

const get_data = async () => {
	const response = await fetch('https://api.github.com/users/rodionmern/events/public')
		.then((response) => {return response})
		.catch((error) => console.log(error))
	const data = response.json()

	return(data)
}

const response = await get_data()
	.then((res) => {return res})
	.catch((err) => console.log(err))

let commit_message = response[0].payload.commits[0].message.split('\n')
let result_message_commit = ''

commit_message.map((line, index, arr) => (
	arr[index] !== arr[-1] ? result_message_commit+=`${line}<br>` : result_message_commit+=line
))

let commit_splited_url = response[0].payload.commits[0].url.split('/')

let commit_information_h3 = document.querySelector('#commit_info');
commit_information_h3.innerHTML = `
	Мой последний коммит:<br><br>
	<a href="https://github.com/${commit_splited_url[4]}/${commit_splited_url[5]}/commit/${commit_splited_url[7]}">${result_message_commit}</a><br>
	 в <a href="https://github.com/${commit_splited_url[4]}/${commit_splited_url[5]}">${commit_splited_url[4]}/${commit_splited_url[5]}</a>`;