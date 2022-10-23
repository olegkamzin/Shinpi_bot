import axios from 'axios'
import TelegramBot from 'node-telegram-bot-api'
import dotenv from 'dotenv'
dotenv.config()
// import axios from 'axios'

const token = process.env.TOKEN
const bot = new TelegramBot(token, { polling: true })
const quantityButton = {
	inline_keyboard: [
		[{ text: '1', callback_data: 'resolve_1' }, { text: '2', callback_data: 'resolve_2' }, { text: '3', callback_data: 'resolve_3' }, { text: '4', callback_data: 'resolve_4' }],
		[{ text: '❌', callback_data: 'close' }]
	]
}
let productID = ''
let productInfo = ''
const chatID = new Map()

bot.setMyCommands([
	{ command: '/start', description: 'Начать работу!' },
])

bot.on('message', async (msg) => {
	const chatId = msg.chat.id;
	const text = msg.text

	if (text === '/start') {
		return await bot.sendMessage(chatId, 'Привет! Я бот для работы с заказами 🤖. Для заказа мне нужен ID товара.')
	}

	if (text.length === 24) {
		return await axios.get('https://api.shinpi.ru/kolobox/products/', {
			params: { id: text },
			headers: { token: 'zXHSPq96upy9bS2JoIDAbrGJwyoygSXZYSqcVERd' }
		}).then(async res => {
			productID = text
			productInfo = `Артикул: <code>${res.data.articul}</code>\r\n<b>${res.data.mark} ${res.data.model} ${res.data.tread_width}/${res.data.profile_height} R${res.data.diameter} ${res.data.load_index}${res.data.speed_index}</b>\r\n`

			await bot.sendMessage(chatId, `<b>${res.data.mark} ${res.data.model} ${res.data.tread_width}/${res.data.profile_height} R${res.data.diameter} ${res.data.load_index}${res.data.speed_index}</b>\r\n------\r\nкол-во: ${res.data.count_local} | артикул: <code>${res.data.articul}</code>\r\n\r\nСколько зарезервировать?`, { parse_mode: 'HTML', reply_markup: JSON.stringify(quantityButton) })
				.then(message => chatID.set(chatId, message.message_id))
		}).catch(async error => await bot.sendMessage(chatId, '🤯 Не нашел этот товар или я упал...'))
	}

	return await bot.sendMessage(chatId, 'Я не понял...')
})

bot.on('callback_query', async msg => {
	const text = msg.data
	const chatId = msg.message.chat.id
	const messageId = msg.message.message_id
	const userName = msg.message.chat.username

	if (text.includes('resolve_1')) {
		return await axios.post('https://api.shinpi.ru/kolobox/orders/', null, {
			params: { id: productID, quantity: 1 },
			headers: { token: 'zXHSPq96upy9bS2JoIDAbrGJwyoygSXZYSqcVERd' }
		}).then(async res => {
			if (res.data.errors[0] !== undefined) {
				await bot.sendMessage(chatId, res.data.errors[0])
				return await bot.deleteMessage(chatId, productMessageID).then(() => productMessageID = '').catch(() => null)
			}
			await bot.sendMessage(chatId, `✅ Успешно! Номер резерва: <code>${res.data.orders[0]}</code>\r\n\r\n${productInfo} - 1 шт.`, { parse_mode: 'HTML' }).then(() => {
				productID = ''
				productInfo = ''
			}).catch(() => null)
			return await bot.deleteMessage(chatId, productMessageID).then(() => productMessageID = '').catch(() => null)
		}).catch(async error => {
			return await bot.sendMessage(chatId, 'Что то пошло не так.')
		})
	}

	if (text.includes('resolve_2')) {
		return await axios.post('https://api.shinpi.ru/kolobox/orders/', null, {
			params: { id: productID, quantity: 2 },
			headers: { token: 'zXHSPq96upy9bS2JoIDAbrGJwyoygSXZYSqcVERd' }
		}).then(async res => {
			if (res.data.errors[0] !== undefined) {
				await bot.sendMessage(chatId, res.data.errors[0])
				return await bot.deleteMessage(chatId, productMessageID).then(() => productMessageID = '').catch(() => null)
			}
			await bot.sendMessage(chatId, `✅ Успешно! Номер резерва: <code>${res.data.orders[0]}</code>\r\n\r\n${productInfo} - 2 шт.`, { parse_mode: 'HTML' }).then(() => {
				productID = ''
				productInfo = ''
			}).catch(() => null)
			return await bot.deleteMessage(chatId, productMessageID).then(() => productMessageID = '').catch(() => null)
		}).catch(async error => {
			return await bot.sendMessage(chatId, 'Что то пошло не так.')
		})
	}

	if (text.includes('resolve_3')) {
		return await axios.post('https://api.shinpi.ru/kolobox/orders/', null, {
			params: { id: productID, quantity: 3 },
			headers: { token: 'zXHSPq96upy9bS2JoIDAbrGJwyoygSXZYSqcVERd' }
		}).then(async res => {
			if (res.data.errors[0] !== undefined) {
				await bot.sendMessage(chatId, res.data.errors[0])
				return await bot.deleteMessage(chatId, productMessageID).then(() => productMessageID = '').catch(() => null)
			}
			await bot.sendMessage(chatId, `✅ Успешно! Номер резерва: <code>${res.data.orders[0]}</code>\r\n\r\n${productInfo} - 3 шт.`, { parse_mode: 'HTML' }).then(() => {
				productID = ''
				productInfo = ''
			}).catch(() => null)
			return await bot.deleteMessage(chatId, productMessageID).then(() => productMessageID = '').catch(() => null)
		}).catch(async error => {
			return await bot.sendMessage(chatId, 'Что то пошло не так.')
		})
	}

	if (text.includes('resolve_4')) {
		return await axios.post('https://api.shinpi.ru/kolobox/orders/', null, {
			params: { id: productID, quantity: 4 },
			headers: { token: 'zXHSPq96upy9bS2JoIDAbrGJwyoygSXZYSqcVERd' }
		}).then(async res => {
			if (res.data.errors[0] !== undefined) {
				await bot.sendMessage(chatId, res.data.errors[0])
				return await bot.deleteMessage(chatId, productMessageID).then(() => productMessageID = '').catch(() => null)
			}
			await bot.sendMessage(chatId, `✅ Успешно! Номер резерва: <code>${res.data.orders[0]}</code>\r\n\r\n${productInfo} - 4 шт.`, { parse_mode: 'HTML' }).then(() => {
				productID = ''
				productInfo = ''
			}).catch(() => null)
			return await bot.deleteMessage(chatId, productMessageID).then(() => productMessageID = '').catch(() => null)
		}).catch(async error => {
			return await bot.sendMessage(chatId, 'Что то пошло не так.')
		})
	}

	if (text.includes('close')) {
		return await bot.deleteMessage(chatId, chatID.get(chatId)).then(() => chatID.delete(chatId)).catch(() => null)
	}
})

bot.on('polling_error', (msg) => console.log(msg))

bot.off()
