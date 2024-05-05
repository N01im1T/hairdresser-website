from typing import Any
from app.database.models import async_session
from app.database.models import Appointments
from sqlalchemy import select, update, delete
from datetime import datetime, timedelta

async def check_for_new_records() -> Any:
    async with async_session() as session:
        records = session.query(Appointments).filter(Appointments.created_at >=
            datetime.utcnow() - timedelta(minutes=5)).all()
    return records