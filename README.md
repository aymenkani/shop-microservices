# shop-microservices
A  microservices  nodejs app  with micro front-end with reactjs in the front-end

This app uses nats as a streaming server for the backend services.

Each service contain its own database.

In order to start the clusters and run the app I recommend you to install skaffold in your local system and run "skaffold dev",

or you can use kubernetes CLI (kubectl) directly and run each service separately.

All the kubernetes deployment files are in the infra/k8s directory



