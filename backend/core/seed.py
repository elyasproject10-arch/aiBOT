import json
from sqlalchemy.orm import Session
from backend.models.database_models import Product, Plan

def seed_initial_data(db: Session):
    # Check if products already exist
    existing = db.query(Product).count()
    if existing > 0:
        return

    # Product 1: ChatGPT Enterprise
    chatgpt = Product(
        name="اشتراک ChatGPT سازمانی",
        slug="chatgpt",
        description="دسترسی سازمانی به جدیدترین مدل‌های GPT-4o، Canvas، و پروژه بدون محدودیت، تضمین عدم قطع اکانت و حریم خصوصی کامل سازمانی",
        is_active=True,
        required_fields=json.dumps([
            {"key": "name", "label": "نام و نام خانوادگی", "type": "text", "required": True},
            {"key": "phone", "label": "شماره موبایل فعال", "type": "phone", "required": True}
        ], ensure_ascii=False)
    )
    db.add(chatgpt)
    db.flush()

    # Plans for ChatGPT
    db.add_all([
        Plan(product_id=chatgpt.id, name="پلن یک‌ماهه استاندارد", duration_days=30, price=390000, display_order=1),
        Plan(product_id=chatgpt.id, name="پلن سه‌ماهه تخفیف‌دار", duration_days=90, price=1050000, display_order=2),
        Plan(product_id=chatgpt.id, name="پلن شش‌ماهه طلایی", duration_days=180, price=1980000, display_order=3),
    ])

    # Product 2: Gemini Advanced
    gemini = Product(
        name="اشتراک Gemini Advanced",
        slug="gemini",
        description="اشتراک گوگل وان ۲ ترابایت و دسترسی کامل به مدل Gemini Ultra و Gemini Pro در جیمیل و داکس",
        is_active=True,
        required_fields=json.dumps([
            {"key": "name", "label": "نام و نام خانوادگی", "type": "text", "required": True},
            {"key": "email", "label": "ایمیل گوگل (Gmail)", "type": "email", "required": True},
            {"key": "phone", "label": "شماره تماس پشتیبانی", "type": "phone", "required": False}
        ], ensure_ascii=False)
    )
    db.add(gemini)
    db.flush()

    # Plans for Gemini
    db.add_all([
        Plan(product_id=gemini.id, name="پلن یک‌ماهه اختصاصی", duration_days=30, price=350000, display_order=1),
        Plan(product_id=gemini.id, name="پلن سه‌ماهه اختصاصی", duration_days=90, price=950000, display_order=2),
    ])

    db.commit()
    print("Initial products and plans seeded successfully.")
