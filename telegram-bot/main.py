import os
import asyncio
import aiohttp
import logging
from quart import Quart, request
from aiogram import Bot, Dispatcher, types
import logging
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

@app.route('/submit-form', methods=['POST'])
async def submit_form() -> str:
    data = request.form
    if 'name' in data and 'phone-number' in data:
        name = data['name']
        phone_number = data['phone-number']
        await send_to_telegram(name, phone_number)
        return "Данные успешно отправлены!"
    else:
        return "Произошла ошибка, проверьте введенные данные."
    
    
async def send_to_telegram(name, phone_number) -> None:
    async with aiohttp.ClientSession() as session:
        async with session.post(
            f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
            json={
                "chat_id": CHAT_ID,
                "text": f"Новая заявка!\nИмя: {name}\nНомер телефона: {phone_number}"
            }
        ) as resp:
            print(await resp.text())
    

async def main() -> None:
    await asyncio.gather(bot_polling(), app.run_task(debug=True))


async def bot_polling() -> None:
    await dp.start_polling(bot)
    
    
if __name__ == '__main__':
    logging.basicConfig(level=logging.INFO)
    asyncio.run(main())