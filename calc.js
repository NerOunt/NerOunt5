function updatePrice() {
	let price = 0
	let prices = {
		prodOptions: {
			item_1: 1000,
			item_2: 2000,
			item_3: 200,
		},
		prodProperties: {
			prop1: 320,
			prop2: 200,
			prop3: 250,
		},
		prodTypes: [0, 1000, 5000, 3000],
	}

	let radios = document.getElementsByName('prodOptions')

	radios.forEach(function (radio) {
		if (radio.checked) {
			let optionPrice = prices.prodOptions[radio.value]
			if (optionPrice !== undefined) {
				price += optionPrice
			}
		}
	})

	if (radios[1].checked) {
		deleteCheck()
		insertSelect()
		let select = document.getElementById('select')
		let priceIndex = parseInt(select.value)
		price += prices.prodTypes[priceIndex]
	} else if (radios[2].checked) {
		deleteSelect()
		insertCheck()

		let checkboxes = document.querySelectorAll('#check input')

		checkboxes.forEach(function (checkbox) {
			if (checkbox.checked) {
				let propPrice = prices.prodProperties[checkbox.name]
				if (propPrice !== undefined) {
					price += propPrice
				}
			}
		})
	} else {
		deleteSelect()
		deleteCheck()
	}

	let amount = document.getElementById('amount').value


	let res = document.getElementById('result')
	res.innerHTML = price * amount + ' рублей'
}

function insertCheck() {
	if (document.getElementById('check') === null) {
		let checkboxes = document.createElement('div')
		checkboxes.id = 'check'

		let checkbox1 = document.createElement('input')
		checkbox1.type = 'checkbox'
		checkbox1.name = 'prop1'

		let label1 = document.createElement('label')

		label1.appendChild(checkbox1)
		label1.innerHTML += 'Скепасти'

		let checkbox2 = document.createElement('input')
		checkbox2.type = 'checkbox'
		checkbox2.name = 'prop2'

		let label2 = document.createElement('label')

		label2.appendChild(checkbox2)
		label2.innerHTML += 'Шаурма'

		let checkbox3 = document.createElement('input')
		checkbox3.type = 'checkbox'

		let label3 = document.createElement('label')
		checkbox3.name = 'prop3'

		label3.appendChild(checkbox3)
		label3.innerHTML += 'Донар'

		checkboxes.appendChild(label1)
		checkboxes.appendChild(label2)
		checkboxes.appendChild(label3)

		checkboxes.addEventListener('change', function () {
			updatePrice()
		})

		let form = document.getElementById('form')
		form.appendChild(checkboxes)

		checkboxes.querySelectorAll('label input').forEach(function () {
			updatePrice()
		})
	}
}

function deleteCheck() {
	if (document.getElementById('check') !== null) {
		document.getElementById('check').remove()
	}
}

function insertSelect() {
	if (document.getElementById('select') === null) {
		let select = document.createElement('select')
		select.id = 'select'

		let option1 = document.createElement('option')
		option1.text = 'косметический ремонт'
		option1.value = '1'

		let option2 = document.createElement('option')
		option2.text = 'Капитальный ремонт'
		option2.value = '2'

		select.add(option1)
		select.add(option2)

		select.addEventListener('change', function () {
			updatePrice()
		})

		let form = document.getElementById('form')
		form.appendChild(select)
	}
}

function deleteSelect() {
	if (document.getElementById('select') !== null) {
		document.getElementById('select').remove()
	}
}

window.addEventListener('DOMContentLoaded', function () {
	let radios = document.getElementsByName('prodOptions')
	radios.forEach(function (radio) {
		radio.addEventListener('change', function () {
			updatePrice()
		})
	})

	let amount = document.getElementById('amount')
	amount.addEventListener('change', updatePrice)
   

	updatePrice()
})