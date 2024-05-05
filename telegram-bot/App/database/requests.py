from apscheduler.schedulers.asyncio import AsyncIOScheduler
from app.database.models import async_session
from app.database.models import Appointments
from sqlalchemy import select, update, delete
from datetime import datetime

# async def check_for_new_records() -> list:
#     async with async_session() as session:
#         records = session.query(Appointments).filter(Appointments.created_at >=
#             datetime.utcnow() - timedelta(minutes=1)).all()
#     return records

scheduler = AsyncIOScheduler()

async def delete_old_appointments():
    async with async_session() as session:
        async with session.begin():
            old_appointments = await session.execute(
                select(Appointments).where(Appointments.data < datetime.now().date())
            )
            for appointment in old_appointments.scalars():
                await session.delete(appointment)


scheduler.add_job(delete_old_appointments, "cron", hour=0)