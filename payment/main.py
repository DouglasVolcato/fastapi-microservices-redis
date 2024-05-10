from redis_om import get_redis_connection, HashModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.background import BackgroundTasks
from fastapi import FastAPI
from dotenv import load_dotenv
import requests
import time
import os

load_dotenv()

app = FastAPI(
    title="Payment API",
    description="API for managing products in the payment",
    version="1.0.0",
    docs_url="/docs",
    contact={"name": "Douglas", "email": "douglasvolcato@gmail.com"},
    license_info={"name": "MIT", "url": "https://opensource.org/licenses/MIT"},
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

INVENTORY_SERVICE_URL = os.getenv("INVENTORY_SERVICE_URL")
REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")

redis_cli = get_redis_connection(
    host=REDIS_HOST,
    port=int(REDIS_PORT),
    decode_responses=True,
    charset="utf-8",
)

redis_cli.ping()

class CreateOrder(HashModel):
    id: str
    quantity: int

class Order(HashModel):
    product_id: str
    price: float
    fee: float
    total: float
    quantity: int
    status: str # pending, completed, refunded

    class Meta:
        database = redis_cli

@app.get("/order")
def get():
    return [format(pk) for pk in Order.all_pks()]

def format(pk: str):
    order: Order = Order.get(pk)
    return {
        "id": order.pk,
        "product_id": order.product_id,
        "price": order.price,
        "fee": order.fee,
        "total": order.total,
        "quantity": order.quantity,
        "status": order.status
    }

@app.get("/order/{pk}")
def getOne(pk: str):
    return Order.get(pk)

@app.post("/order")
async def create(body: CreateOrder, background_tasks: BackgroundTasks):
    req = requests.get(f"{INVENTORY_SERVICE_URL}/product/{body.id}")
    product = req.json();

    order = Order(
        product_id=body.id,
        price=product["price"],
        fee=0.2 * product["price"],
        total=1.2 * product["price"],
        quantity=body.quantity,
        status="pending"
    )

    order.save()

    background_tasks.add_task(order_completed, order)

    return order

def order_completed(order: Order):
    time.sleep(5)
    order.status = "completed"
    order.save()
    redis_cli.xadd("order_completed", order.dict(), "*")
