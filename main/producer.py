# amqps://actfwcmb:IZXnikOdMWIZEXGB19jxYJ22Q0etSMVR@beaver.rmq.cloudamqp.com/actfwcmb
import json

import pika


params = pika.URLParameters('amqps://actfwcmb:IZXnikOdMWIZEXGB19jxYJ22Q0etSMVR@beaver.rmq.cloudamqp.com/actfwcmb')

connection  = pika.BlockingConnection(params)
channel = connection.channel()


def publish(method, body):
    properties = pika.BasicProperties(method)
    channel.basic_publish(exchange='', routing_key='admin',body=json.dumps(body), properties=properties)
