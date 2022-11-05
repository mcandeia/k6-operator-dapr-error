# k6-operator-dapr-error

Prerequisites:

1. kind
2. helm
3. kubectl
4. docker
5. git

## Running

```sh
git clone github.com/mcandeia/k6-operator-dapr-error
cd k6-operator-dapr-error
./setup.sh
```

You should be able to see something like this:

```
2022-11-05T00:47:43.891Z        ERROR   controllers.K6  unable to stream logs from the pod      {"k6": "default/k6-sample", "error": "a container name must be specified for pod k6-sample-initializer-cqs8s, choose one of: [k6 daprd]"}
github.com/go-logr/zapr.(*zapLogger).Error
        /go/pkg/mod/github.com/go-logr/zapr@v0.1.0/zapr.go:128
github.com/grafana/k6-operator/controllers.InitializeJobs.func1
        /workspace/controllers/k6_initialize.go:116
k8s.io/apimachinery/pkg/util/wait.runConditionWithCrashProtection
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:211
k8s.io/apimachinery/pkg/util/wait.WaitFor
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:541
k8s.io/apimachinery/pkg/util/wait.pollInternal
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:427
k8s.io/apimachinery/pkg/util/wait.pollImmediateInternal
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:452
k8s.io/apimachinery/pkg/util/wait.PollImmediate
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:441
github.com/grafana/k6-operator/controllers.InitializeJobs
        /workspace/controllers/k6_initialize.go:64
github.com/grafana/k6-operator/controllers.(*K6Reconciler).Reconcile
        /workspace/controllers/k6_controller.go:63
sigs.k8s.io/controller-runtime/pkg/internal/controller.(*Controller).reconcileHandler
        /go/pkg/mod/sigs.k8s.io/controller-runtime@v0.6.2/pkg/internal/controller/controller.go:235
sigs.k8s.io/controller-runtime/pkg/internal/controller.(*Controller).processNextWorkItem
        /go/pkg/mod/sigs.k8s.io/controller-runtime@v0.6.2/pkg/internal/controller/controller.go:209
sigs.k8s.io/controller-runtime/pkg/internal/controller.(*Controller).worker
        /go/pkg/mod/sigs.k8s.io/controller-runtime@v0.6.2/pkg/internal/controller/controller.go:188
k8s.io/apimachinery/pkg/util/wait.BackoffUntil.func1
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:155
k8s.io/apimachinery/pkg/util/wait.BackoffUntil
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:156
k8s.io/apimachinery/pkg/util/wait.JitterUntil
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:133
k8s.io/apimachinery/pkg/util/wait.Until
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:90
2022-11-05T00:47:49.010Z        ERROR   controllers.K6  unable to stream logs from the pod      {"k6": "default/k6-sample", "error": "a container name must be specified for pod k6-sample-initializer-cqs8s, choose one of: [k6 daprd]"}
github.com/go-logr/zapr.(*zapLogger).Error
        /go/pkg/mod/github.com/go-logr/zapr@v0.1.0/zapr.go:128
github.com/grafana/k6-operator/controllers.InitializeJobs.func1
        /workspace/controllers/k6_initialize.go:116
k8s.io/apimachinery/pkg/util/wait.runConditionWithCrashProtection
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:211
k8s.io/apimachinery/pkg/util/wait.WaitFor
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:541
k8s.io/apimachinery/pkg/util/wait.pollInternal
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:427
k8s.io/apimachinery/pkg/util/wait.pollImmediateInternal
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:452
k8s.io/apimachinery/pkg/util/wait.PollImmediate
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:441
github.com/grafana/k6-operator/controllers.InitializeJobs
        /workspace/controllers/k6_initialize.go:64
github.com/grafana/k6-operator/controllers.(*K6Reconciler).Reconcile
        /workspace/controllers/k6_controller.go:63
sigs.k8s.io/controller-runtime/pkg/internal/controller.(*Controller).reconcileHandler
        /go/pkg/mod/sigs.k8s.io/controller-runtime@v0.6.2/pkg/internal/controller/controller.go:235
sigs.k8s.io/controller-runtime/pkg/internal/controller.(*Controller).processNextWorkItem
        /go/pkg/mod/sigs.k8s.io/controller-runtime@v0.6.2/pkg/internal/controller/controller.go:209
sigs.k8s.io/controller-runtime/pkg/internal/controller.(*Controller).worker
        /go/pkg/mod/sigs.k8s.io/controller-runtime@v0.6.2/pkg/internal/controller/controller.go:188
k8s.io/apimachinery/pkg/util/wait.BackoffUntil.func1
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:155
k8s.io/apimachinery/pkg/util/wait.BackoffUntil
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:156
k8s.io/apimachinery/pkg/util/wait.JitterUntil
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:133
k8s.io/apimachinery/pkg/util/wait.Until
        /go/pkg/mod/k8s.io/apimachinery@v0.18.6/pkg/util/wait/wait.go:90
```
