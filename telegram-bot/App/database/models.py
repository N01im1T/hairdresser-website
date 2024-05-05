from sqlalchemy import String, Date
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column
from sqlalchemy.ext.asyncio import AsyncAttrs, async_sessionmaker, create_async_engine
from dotenv import load_dotenv

import os
import datetime

load_dotenv()
engine = create_async_engine(url=os.getenv("POSTGRESQL_URL"))

async_session = async_sessionmaker(engine)


class Base(AsyncAttrs, DeclarativeBase):
    pass


class Appointments(Base):
    __tablename__ = "appointments"
    
    id: Mapped[int] = mapped_column(primary_key=True)
    data: Mapped[datetime.date] = mapped_column(Date)
    start_time: Mapped[datetime.time] = mapped_column()
    end_time: Mapped[datetime.time] = mapped_column()
    client_name: Mapped[str] = mapped_column(String)
    service_type: Mapped[str] = mapped_column(String)
    phone_number: Mapped[str] = mapped_column(String)
    notes: Mapped[str] = mapped_column(String(120))



async def async_main() -> None:
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)