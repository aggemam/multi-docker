export SHA=$(git rev-parse HEAD)
docker build -t nametab/multi-client:latest -t nametab/multi-client:$SHA client
docker build -t nametab/multi-server:latest -t nametab/multi-server:$SHA server
docker build -t nametab/multi-worker:latest -t nametab/multi-worker:$SHA worker
docker push nametab/multi-client:latest
docker push nametab/multi-server:latest
docker push nametab/multi-worker:latest
docker push nametab/multi-client:$SHA
docker push nametab/multi-server:$SHA
docker push nametab/multi-worker:$SHA
kubectl apply -f k8s
kubectl set image deployments/client-deployment client=nametab/multi-client:$SHA
kubectl set image deployments/server-deployment server=nametab/multi-server:$SHA
kubectl set image deployments/worker-deployment worker=nametab/multi-worker:$SHA
