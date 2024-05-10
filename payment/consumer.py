import time
from main import redis_cli, Order

key = 'refund_order'
group = 'payment-group'

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
                order = Order.get(obj['pk'])
                order.status = 'refunded'
                order.save()
    except Exception as e:
        print(str(e))

    time.sleep(1)