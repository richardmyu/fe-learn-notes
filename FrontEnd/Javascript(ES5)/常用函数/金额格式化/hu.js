// from 胡
const moneyString = (num) => {
	num = num || 0
	const str = num.toString()
	let [int, dec] = str.split('.')
	dec = dec || '00'
	const arr = int.split('')
	const temp = []
	for (let i = 1, len = arr.length; i <= len; i++) {
		temp.unshift(arr[len - i])
		if (i % 3 === 0 && i !== len) {
			temp.unshift(',')
		}
	}
	return [temp.join(''), dec].join('.')
}
module.exports = {
	moneyString
}
