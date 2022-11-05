#!/bin/bash

kind delete cluster

### Local registry setup
set -o errexit

# create registry container unless it already exists
reg_name='kind-registry'
reg_port='5001'
if [ "$(docker inspect -f '{{.State.Running}}' "${reg_name}" 2>/dev/null || true)" != 'true' ]; then
  docker run \
    -d --restart=always -p "127.0.0.1:${reg_port}:5000" --name "${reg_name}" \
    registry:2
fi

# create a cluster with the local registry enabled in containerd
cat <<EOF | kind create cluster --config=-
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
containerdConfigPatches:
- |-
  [plugins."io.containerd.grpc.v1.cri".registry.mirrors."localhost:${reg_port}"]
    endpoint = ["http://${reg_name}:5000"]
EOF

# connect the registry to the cluster network if not already connected
if [ "$(docker inspect -f='{{json .NetworkSettings.Networks.kind}}' "${reg_name}")" = 'null' ]; then
  docker network connect "kind" "${reg_name}"
fi

# Document the local registry
# https://github.com/kubernetes/enhancements/tree/master/keps/sig-cluster-lifecycle/generic/1755-communicating-a-local-registry
cat <<EOF | kubectl apply -f -
apiVersion: v1
kind: ConfigMap
metadata:
  name: local-registry-hosting
  namespace: kube-public
data:
  localRegistryHosting.v1: |
    host: "localhost:${reg_port}"
    help: "https://kind.sigs.k8s.io/docs/user/local-registry/"
EOF

IMAGE_NAME=k6-custom

docker build -t "$IMAGE_NAME" -f "$IMAGE_NAME"/Dockerfile "$IMAGE_NAME"
docker tag "$IMAGE_NAME" localhost:5001/"$IMAGE_NAME":latest
docker push localhost:5001/"$IMAGE_NAME":latest

rm -rf .k6-operator >/dev/null
git clone https://github.com/grafana/k6-operator .k6-operator && cd .k6-operator
make deploy && cd ..

helm repo add dapr https://dapr.github.io/helm-charts/
helm repo update
helm upgrade --install dapr dapr/dapr \
--version=1.9 \
--namespace dapr-system \
--create-namespace \
--wait

kubectl delete configmap/tests --ignore-not-found=true
kubectl create configmap tests --from-file test.js
kubectl apply -f test.yaml


MANAGER=$(kubectl get pods -n k6-operator-system| grep -Ei -o 'k6-operator-controller-manager-.*'| cut -d " " -f 1)
kubectl logs $MANAGER -n k6-operator-system -c manager -f