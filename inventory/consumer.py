import time
from main import redis_cli, Product

key = 'order_completed'
group = 'inventory-group'

try:
    redis_cli.xgroup_create(key, group, mkstream=True)
except Exception:
    print("Group already exists")

while True:
    try:
        results = redis_cli.xreadgroup(
            group,
            key,
            {key: ">"},
            None
        )

        if results != []:
            for result in results:
                obj = result[1][0][1]
                pk = obj['product_id']
                quantity = obj['quantity']
                
                product = Product.get(pk)
                product.quantity -= int(quantity)

                print(product.quantity, int(product.quantity) <= 0, product.quantity <= 0)

                if int(product.quantity) < 0:
                    redis_cli.xadd("refund_order", obj, '*')
                    continue;

                product.save()
    except Exception as e:
        print(str(e))

    time.sleep(1)