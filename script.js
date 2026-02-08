//
// Высчитывалка времени
//

// Задаём разметку для div'а.
document.querySelector('.content').innerHTML =
	`	
		<p>Прошло времени с создания этого сайта:</p>
		<h2 id="passed_time"></h2>
		<hr>
		<div class="nerd_block">
		</div>
		<button>+</button>
		<hr>
		<div class="commit_block">
			<h3 id="commit_info"></h3>
		</div>

	`

// Указываем дату создания сайта и нынешнюю.
const initial_date = new Date(2023, 10, 12).getTime()
const now_date = new Date().getTime()

const get_date_difference = (start, end) => {
	// В начале получаем полное количество месяцев, а потом в переменных years и months 
	// задаём кол-во лет и месяцев отдельно.
	const total_months = (start - end) / (1000*60*60*24*30.4167)
	const years = Math.floor(total_months / 12)
	const months = Math.floor(total_months % 12)

	// Задаём спомогательные переменные для махинаций с числовыми, а не строковыми значениями лет
	// и месяцев для того чтобы легче было указать год и месяц в нужном падеже.
	let years_obj = [
		Number(years),
		Number(years.toString().slice(-1)),
		Number(years.toString().slice(-2,-1))
		]
	let months_to_num = Number(months)
	
	// Создаём пустую строку, в которую будем записывать результат.
	let result = ''
	
	// Прибавляем к возращаемой строчке число лет и слово "год" в правильном падеже или форме слова.
	result += years_obj[0]
	if (years_obj[2] == 0 || years_obj[2] >= 2) { 
		years_obj[1] == 0 
			? result += " лет, "
			: years_obj[1] == 1 
				? result += " год, "
				: years_obj[1] >= 2 && years_obj[1] <= 4
					? result += " года, "
					: result += " лет, "
	} else if (years_obj[2] == 1) {
		result += " лет, "
	}
	
	// Прибавляем к возращаемой строчке число месяцев и слово "месяц" в правильном падеже.
	result += months_to_num
	months_to_num == 0 
		? result += " месяцев "
		: months_to_num == 1 
			? result += " месяц "
			: (months_to_num => 2) && (months_to_num <= 4)
				? result += " месяца "
				: result += " месяцев "

	// Возращаем результат
	return result
}

// Получаем результат из функции. 
const result = get_date_difference(now_date, initial_date)

// Вставляем результат в разметку.
document.querySelector('#passed_time').innerHTML = result;

//
// Nerd-блок
//

// Задаём селектор для нёрд-блока и сразу выставляем статус
var nerd_block = document.querySelector('.nerd_block');
nerd_block.innerHTML = "Загрузка..."

// Отправляем get-запрос на jsonbin 
const res = await fetch('https://api.jsonbin.io/v3/b/6988ea6eae596e708f1b11e4', {
	method: "GET",
	headers: {
		"X-Access-Key": "$2a$10$cePzaqK901otAz/hMGUwoud45khTSnrDHEdlE5qKalb6JQ74tM5m2"
	}
})

// Парсим запрос
let parsedRes = await res.json()

// Цикл отвечает за хайп, ой в целом за то чтобы посчитать полное время и установить за текущий день
for (let i = 0; i < parsedRes.record.days.length; i++) {
	if (i == 0) {
		var all = 0
		all += parseInt(parsedRes.record.days[i].time)
	} else {
		all += parseInt(parsedRes.record.days[i].time)
	}
	// Задаём разметку если элемент - последний
	if (i == parsedRes.record.days.length-1) {
		nerd_block.innerHTML = 
			`
				<h3>Подготовка к экзаменам за сегодня:</h3>
				<br>Предметы - <strong>${parsedRes.record.days[i].subject}</strong>;
				 время - <strong>${parsedRes.record.days[i].time}</strong>мин
				<br><br><h2>Всего: ${Math.floor(parseInt(all)/60)}ч, ${all%60}м</h2>
			`
	}
}

//
// Github-блок
//

const get_data = async () => {
	// Запрашиваем дату с api github'а, и потом сохраняем её в переменную data.
	const response = await fetch(`https://api.github.com/users/rodionmern/events/public?_=${Date.now}`)
		.then((res) => {return res})
		.catch((err) => console.log(err))
	const data = response.json()

	// Возращаем дату.
	return data
}

// Получаем дату.
const response = await get_data()
	.then((res) => {return res})
	.catch((err) => console.log(err))

let commit_information_h3 = document.querySelector('#commit_info');

// Проверяем тип запроса последнего действия аккаунта, если он равен == "PushEvent", то отдаём информацию о последнем коммите, если нет,
// то отдаём информацию о том какого типа последнее действие.
if (response[0].type == 'PushEvent') {
	// Разделяем текст коммита, чтобы многострочные коммиты позже можно было отображать нормально, а не одной строкой.
	let commit_message = response[0].payload.commits[0].message.split('\n')
	// Создаём вспомогательную переменную.
	let result_commit_message = ''

	// Обрабатываем разделённые строки, если находится /n, то в конце строки прибавляется тег <br>, если не находится просто возращается строка.
	commit_message.map((line, index, arr) => (
		arr[index] !== arr[-1] ? result_commit_message+=`${line}<br>` : result_commit_message+=line
	))

	// Инициализируем ссылку из запроса, и разделяем её, для удобства составления других ссылок.
	let commit_splited_url = response[0].payload.commits[0].url.split('/')

	// Вставляем всё что получили в вёрстку.
	commit_information_h3.innerHTML = `
		Мой последний коммит/пул-реквест/деплой:<br><br>
		<a href="https://github.com/${commit_splited_url[4]}/${commit_splited_url[5]}/commit/${commit_splited_url[7]}">${result_commit_message}</a><br>
		в <a href="https://github.com/${commit_splited_url[4]}/${commit_splited_url[5]}">${commit_splited_url[4]}/${commit_splited_url[5]}</a>`;
} else {
	// Отдаём в вёрстку информацию о том что последнее событие не связано с коммитами.
	commit_information_h3.innerHTML = `Последнее событие не связано с коммитами. - ${response[0].type}`
}