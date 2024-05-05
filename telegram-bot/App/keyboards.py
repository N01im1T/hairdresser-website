from aiogram.types import (InlineKeyboardMarkup, InlineKeyboardButton,
                           ReplyKeyboardMarkup, KeyboardButton)

# Main menu keyboard
def get_main_menu_keyboard() -> ReplyKeyboardMarkup:
    main_keyboard = ReplyKeyboardMarkup(
        keyboard=[[
            KeyboardButton(text="Показать запись на сегодня"),
            KeyboardButton(text="Показать запись")]],
        resize_keyboard=True)
    return main_keyboard

# Return to main menu keyboard
def get_return_to_main():
    return_to_main_keyboard = ReplyKeyboardMarkup(
        keyboard=[KeyboardButton(text="Вернуться в главное меню")],
        resize_keyboard=True)
    return return_to_main_keyboard

# Edit appointments
def get_edit_appointment() -> InlineKeyboardMarkup:
    edit_appointment = InlineKeyboardMarkup(
        inline_keyboard=[
            InlineKeyboardButton(text="Добавить запись",
                                callback_data="add_appointment"),
            InlineKeyboardButton(text="Удалить запись",
                                callback_data="remove_appointment"),
            InlineKeyboardButton(text="Редактировать запись",
                                сallback_data="edit_appontment")])
    return edit_appointment

# Data picker keyboard
def get_dates_keyboard() -> InlineKeyboardMarkup:
    keyboard = InlineKeyboardMarkup()
    # Здесь генерируем кнопки для выбора даты
    # Пример:
    # keyboard.add(InlineKeyboardButton(text="Выбрать 1 января", callback_data="date_2024-01-01"))
    # keyboard.add(InlineKeyboardButton(text="Выбрать 2 января", callback_data="date_2024-01-02"))
    return keyboard