# amqps://actfwcmb:IZXnikOdMWIZEXGB19jxYJ22Q0etSMVR@beaver.rmq.cloudamqp.com/actfwcmb
import json, os, django
os.environ.setdefault("DJANGO_SETTINGS_MODULE","admin.settings")
django.setup()
import pika

from products.models import Product

# this is rabbitmq ampq url
params = pika.URLParameters('amqps://actfwcmb:IZXnikOdMWIZEXGB19jxYJ22Q0etSMVR@beaver.rmq.cloudamqp.com/actfwcmb')

connection  = pika.BlockingConnection(params)

channel = connection.channel()

channel.queue_declare(queue='admin')

def callback(ch, method, properties,body):
    print('Received in admin')
    id = json.loads(body)
    print(id)
    product = Product.objects.get(id=id)
    product.likes = product.likes + 1
    product.save()
    print('Product likes increased!')

channel.basic_consume(queue='admin', on_message_callback=callback, auto_ack=True)
print('Started consuming')

channel.start_consuming()

channel.close()
