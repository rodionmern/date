const updateRecords = async () => {
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
            document.querySelector('.nerd_block').innerHTML = 
                `
                    <h3>Подготовка к экзаменам за ${parsedRes.record.days[i].date}:</h3>
                    <br>Предметы - <strong>${parsedRes.record.days[i].subject}</strong>;
                    время - <strong>${parsedRes.record.days[i].time}</strong>мин
                    <br><br><h2>Всего: ${Math.floor(parseInt(all)/60)}ч, ${all%60}м</h2>
                `
        }
    }
}

export default updateRecords