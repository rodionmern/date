import updateBackground from "./funcs/backgroundUpdate.js"

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
}


let nerdBtn = document.querySelector(".nerd-btn");
nerdBtn.addEventListener('click', async () => {
    // Получаем старые данные
    const oldData = await fetch('https://api.jsonbin.io/v3/b/6988ea6eae596e708f1b11e4', {
        method: "GET",
        headers: {
            "X-Access-Key": "$2a$10$cePzaqK901otAz/hMGUwoud45khTSnrDHEdlE5qKalb6JQ74tM5m2"
        }
    })
    
    // Парсим запрос
    let parsedRes = await oldData.json()
    var oldDataMassive = []

    // Все прошлые записи добавляем в массив
    for (let i = 0; i < parsedRes.record.days.length; i++) {
        oldDataMassive.push({
            "date": parsedRes.record.days[i].date,
            "subject": parsedRes.record.days[i].subject,
            "time": parsedRes.record.days[i].time
        })
    }

    // Промптим данные для новой записи
    let date = prompt("чё за день то сёднь?")
    let subject = prompt("ну и чё ботал?")
    let time = prompt("и скок ты этим занимался?")
    
    // Добавляем новую запись в массив
    oldDataMassive.push({"date": date.toString(), "subject": subject.toString(), "time": time.toString()})

    // // Отправляем put-запрос на jsonbin 
    const res = await fetch('https://api.jsonbin.io/v3/b/6988ea6eae596e708f1b11e4', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': localStorage.getItem('key')
        },
        body: JSON.stringify({days: oldDataMassive})
    })
})

let backgroundBtn = document.querySelector(".bg-btn");
backgroundBtn.addEventListener('click', async () => {
    // Промптим ссылку на картинку
    let bgLink = prompt("ссылочку на фотокарточку?")

    // Отправляем put-запрос на jsonbin 
    const res = await fetch('https://api.jsonbin.io/v3/b/698c41f943b1c97be9763425', {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': localStorage.getItem('key')
        },
        body: JSON.stringify({link: bgLink})
    })
    
    // Обновляем фон
    updateBackground()
})