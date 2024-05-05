import os
import asyncio
from aiogram import types, F, Router, Bot
from aiogram.types import Message
from aiogram.filters import CommandStart, Command
from dotenv import load_dotenv

import app.keyboards as kb
import app.database.requests as rq

router = Router()

admin_only = lambda message: message.from_user.id in os.getenv("ALLOWED_USERS")

@router.message(admin_only, CommandStart())
async def cmd_start(message: Message) -> None:
    await message.answer("Привет! Я бот парикмахерской. Чем могу помочь?",
                         reply_markup=kb.get_main_menu_keyboard())

@router.message(admin_only, Command("Показать запись на сегодня"))
async def show_today_handler(message:Message) -> None:
    pass

@router.callback_query(admin_only, F.text == "show_appointments")
async def show_appointments_handler(callback_query: types.CallbackQuery) -> None:
    pass

@router.message(admin_only)
async def send_notification() -> None:
    records = await rq.check_for_new_records()
    message_notification = ""
    if records:
        for record in records:
            message_notification = f"У вас новая запись на {record.data} в {record.start_time}\n"
            message_notification += f"Имя клиента: {record.client_name}\n"
            message_notification += f"Услуга: {record.service}\n"
            message_notification += f"Номер телефона: {record.phone_number}\n"
                 
@router.message(admin_only)
async def check_records_periodically() -> None:    
    while True:
        await send_notification()
        await asyncio.sleep(300)
        