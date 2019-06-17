# Build production docker images
docker build -t dennisjs/blog-client:latest -t dennisjs/blog-client:$SHA -f ./client/Dockerfile ./client
docker build -t dennisjs/blog-server:latest -t dennisjs/blog-server:$SHA -f ./server/Dockerfile ./server
# Push to docker hub with latest tag
docker push dennisjs/blog-client:latest
docker push dennisjs/blog-server:latest
# Push to docker hub with unique tag
docker push dennisjs/blog-client:$SHA
docker push dennisjs/blog-server:$SHA
# apply all kubernetes config file
kubectl apply -f k8s/
# set kubernetes node images to update
kubectl set image deployments/client-deployment client=dennisjs/blog-client:$SHA
kubectl set image deployments/server-deployment server=dennisjs/blog-server:$SHA