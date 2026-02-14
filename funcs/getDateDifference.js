const getDateDifference = (start, end) => {
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

export default getDateDifference