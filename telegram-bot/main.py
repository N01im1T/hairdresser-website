import os
import asyncio
import aiohttp
import logging
from quart import Quart, request, jsonify
from aiogram import Bot, Dispatcher, types
from quart_cors import cors
from dotenv import load_dotenv


load_dotenv()


BOT_TOKEN = os.getenv("TOKEN")
CHAT_ID = os.getenv("ALLOWED_USERS")


bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()


@dp.message()
async def cmd_start(message: types.Message) -> None:
    await message.answer("Бот работает в штатном режиме, ждите уведомлений.")


app = Quart(__name__)
app = cors(app, allow_origin="http://127.0.0.1:5500")

@app.route('/submit-form', methods=['POST'])
async def submit_form() -> str:
    data = await request.form
    
    if data:
        if 'name' in data and 'phone-number' in data:
            name = data['name']
            phone_number = data['phone-number']
            await send_to_telegram(name, phone_number)
            return jsonify({"message":"Данные успешно отправлены!"})
        else:
            return jsonify({"error":"Произошла ошибка, проверьте введенные данные."})
    else:
        return jsonify({"error":"Данные не были отправлены."})
    
    
async def send_to_telegram(name, phone_number) -> None:
    async with aiohttp.ClientSession() as session:
        async with session.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
            json={
                "chat_id": CHAT_ID,
                "text": f"Новая заявка!\nИмя: {name}\nНомер телефона: {phone_number}"
            }
        ) as resp:
            response_text = await resp.text()
            print(response_text)  # Log the response from Telegram
            if resp.status != 200:
                logging.error(f"Failed to send message to Telegram: {response_text}")
    

async def main() -> None:
    bot_task = asyncio.create_task(bot_polling())
    app_task = asyncio.create_task(app.run_task(debug=True, port=5000))
    await asyncio.gather(bot_task, app_task)


async def bot_polling() -> None:
    await dp.start_polling(bot)
    
    
if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())