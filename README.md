# Django-Microservices-with-Flask

To being able to contact another container (created with another docker compose file) with http url, you MUST need a shared network.
read here: https://accesto.com/blog/docker-networks-explained-part-2/ 

After you defined a shared network, 
For example, let's say you have two containers, service1 and service2, running on the same network. 
You can make an HTTP request from service1 to service2 by using the URL ```http://service2:<port>/``` where <port> is the port number on which service2 is listening.
Here's an example of how you could use this in your code:
```
import requests

response = requests.get('http://service2:8080/')
print(response.content)
```
In this example, we are making an HTTP GET request to http://service2:8080/ from service1 and printing the response content.
Make sure that the port number you use in the URL matches the port number on which service2 is listening. Also, make sure that the container name you use in the URL matches the name of the container as defined in the Docker Compose file.
