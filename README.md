## Joonsuk Dennis Yi's Personal Website
Personal website to showcase project and resume </br>

Pull request is currently managed through Trello.

### Environment
- Kubernetes
- Docker
- Back end: Node.js + Express.js
- Front end: React + Redux
- Build Automation: Travis CI
- Server host: GCP, GKE

### Release Version
Currently in development for version 0.1.0

**0.1.0**
``` markdown
Release will include functionalities such as:
1. Create, Read, Update, Delete a blog with an image and description.
  - (Cloudinary API reconfiguration for production).
2. User sign up and login
2. Deployment to GKE with 2 nodes each with 2 pods.
3. Dockerized container.
```

**0.1.1**
``` markdown
Future Release will include functionalities such as:
TBD
```

### How to run the program.

Option 1. Using docker-compose
``` markdown
First: Register an account with cloudinary and create an .env file. Add the following values:
1) CLOUDINARY_CLOUDNAME
2) CLOUDINARY_API_KEY
3) CLOUDINARY_API_SECRET
```

Make sure you have docker and docker-compose.
  - At the root of the project.
``` bash
docker-compose up --build
```

Option 2. Using minikube
Make sure you have kubectl and minikube installed
  - At the root of the project.
``` bash
minikube start
```
After minikube has started:

``` markdown
Register an account with cloudinary and generate kubectl secrets
   [secretKeyRef name]     [name, secretKeyRef key]
1) cloudinarycloudname  :  CLOUDINARY_CLOUDNAME
2) cloudinaryapikey     :  CLOUDINARY_API_KEY
3) cloudinaryapisecret  :  CLOUDINARY_API_SECRET
```

``` bash
kubectl apply -f k8s/
kubectl delete ingress ingress-service
```
The ingress-service-dev will take over and port 80 should available. If the browser says unsafe, go to advance and proceed into the ip address.
