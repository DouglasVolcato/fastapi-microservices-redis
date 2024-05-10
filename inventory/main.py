from redis_om import get_redis_connection, HashModel
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from fastapi import FastAPI
import os

load_dotenv()

app = FastAPI(
    title="Inventory API",
    description="API for managing products in the inventory",
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

REDIS_HOST = os.getenv("REDIS_HOST")
REDIS_PORT = os.getenv("REDIS_PORT")

redis_cli = get_redis_connection(
    host=REDIS_HOST,
    port=int(REDIS_PORT),
    decode_responses=True,
    charset="utf-8",
)

redis_cli.ping()

class Product(HashModel):
    name: str
    price: float
    quantity: int

    class Meta:
        database = redis_cli

@app.get("/product")
def all():
    return [format(pk) for pk in Product.all_pks()]

def format(pk: str):
    product: Product = Product.get(pk)
    return {
        "id": product.pk,
        "name": product.name,
        "price": product.price,
        "quantity": product.quantity
    }

@app.get("/product/{pk}")
def get(pk: str):
    return format(pk)

@app.post("/product")
def create(product: Product):
    return product.save()

@app.delete("/product/{pk}")
def delete(pk: str):
    return Product.delete(pk)

@app.put("/product/{pk}")
def update(pk: str, product_update: Product):
    product = Product.get(pk)
    if product_update.name:
        product.name = product_update.name
    if product_update.price:
        product.price = product_update.price
    if product_update.quantity:
        product.quantity = product_update.quantity
    return product.save()
