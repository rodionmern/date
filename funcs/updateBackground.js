const updateBackground = async () => {
    // Получаем линку на картинку
    const backgroundResponse = await fetch('https://api.jsonbin.io/v3/b/698c41f943b1c97be9763425', {
        method: "GET",
        headers: {
            "X-Access-Key": "$2a$10$cePzaqK901otAz/hMGUwoud45khTSnrDHEdlE5qKalb6JQ74tM5m2"
        }
    })
    let backgroundLink = await backgroundResponse.json();

    // Убираем статус загрузки
    let status = document.querySelector('.status');
    status.innerHTML = "";

    // Устанавливаем саму картинку
    document.body.style.transition = `5s`;
    document.body.style.backgroundImage = `url(${backgroundLink.record.link})`;
    setTimeout(() => {document.body.style.backgroundPosition = "center"}, 50)
}

export default updateBackground