import adminController from "./controllers/admin.js"

import updateRecords from "./funcs/updateRecords.js"
import updateBackground from "./funcs/updateBackground.js"
import getDateDifference from "./funcs/getDateDifference.js"

// Задаём разметку для div'а.
document.querySelector('.content').innerHTML =
	`	
		<p>Прошло времени с создания этого сайта:</p>
		<h2 id="passed_time"></h2>
		<hr>
		<div class="nerd_block">
		</div>
		<hr>
		<div class="commit_block">
			<h3 id="commit_info"></h3>
		</div>
	`

// Устанавливаем фон и парсим записи
updateBackground()
updateRecords()

// Указываем дату создания сайта и нынешнюю.
const initial_date = new Date(2023, 10, 12).getTime()
const now_date = new Date().getTime()

// Получаем результат из функции. 
const result = getDateDifference(now_date, initial_date)

// Вставляем результат в разметку.
document.querySelector('#passed_time').innerHTML = result;

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
	// Инициализируем ссылку из запроса, и разделяем её, для удобства составления других ссылок.
	let commit_splited_url = response[0].repo.url.split('/')
	let commit_created_at = response[0].created_at

	// Вставляем всё что получили в вёрстку.
	commit_information_h3.innerHTML = `
		Последний коммит/пул-реквест/деплой<br><br>
		был ${new Date(commit_created_at).getDate()}.${new Date(commit_created_at).getMonth()+1}.${new Date(commit_created_at).getFullYear()} в <a href="https://github.com/${commit_splited_url[4]}/${commit_splited_url[5]}">${commit_splited_url[4]}/${commit_splited_url[5]}</a>`;
} else {
	// Отдаём в вёрстку информацию о том что последнее событие не связано с коммитами.
	commit_information_h3.innerHTML = `Последнее событие не связано с коммитами. - ${response[0].type}`
}

// Вставляем "админку", если в локалсторейже есть мастер-ключик
if (localStorage.getItem('key') !== null) {
    document.querySelector('.content').innerHTML += 
        `
            <hr>
            <div class="admin-block">
                <h2>админ-функшнс</h2>
                <div class="admin-btns">
                    <button class="nerd-btn">Добавить запись</button>
                    <button class="bg-btn">Поменять фон</button>
                </div>
            </div>
        `
	
	adminController()
}