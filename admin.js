let button = document.querySelector("button");
button.addEventListener('click', async () => {
    let date = prompt("чё за день то сёднь?")
    let subject = prompt("ну и чё ботал?")
    let time = prompt("и скок ты этим занимался?")
    // Отправляем get-запрос на jsonbin 
    const res = await fetch('https://api.jsonbin.io/v3/b/6988ea6eae596e708f1b11e4', {
        method: "PUT",
        headers: {
            "X-MASTER-KEY": ""
        },
        body: {"date": date, "subject": subject, "time": time}
    })
    await console.log(res.status)
})