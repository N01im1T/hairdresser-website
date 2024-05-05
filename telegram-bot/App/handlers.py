import os
from aiogram import types, F, Router
from aiogram.types import Message
from aiogram.filters import CommandStart, Command
from dotenv import load_dotenv

import app.keyboards as kb
import app.database.requests as rq

router = Router()

load_dotenv()
admin_only = lambda message: message.from_user.id == int(os.getenv("ALLOWED_USERS"))

@router.message(admin_only, CommandStart())
async def cmd_start(message: Message) -> None:
    await message.answer("Привет! Я бот парикмахерской. Чем могу помочь?",
                         reply_markup=kb.get_main_menu_keyboard())

@router.message(admin_only, Command("Показать запись на сегодня"))
async def show_today_handler(message:Message) -> None:
    pass

@router.message(admin_only, Command("Показать запись"))
async def show_appointments_handler(message:Message) -> None:
    pass

# @router.message(admin_only)
# async def show_new_appointments() -> None:
#     records = await rq.check_for_new_records()
#     message_notification = ""
#     if records:
#         for record in records:
#             message_notification = f"У вас новая запись на {record.data} в {record.start_time}\n"
#             message_notification += f"Имя клиента: {record.client_name}\n"
#             message_notification += f"Услуга: {record.service}\n"
#             message_notification += f"Номер телефона: {record.phone_number}\n"

        