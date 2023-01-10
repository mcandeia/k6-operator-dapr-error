
import { PodDisruptor } from 'k6/x/disruptor';
import http from 'k6/http';

export default function () {
  http.get(`http://httpbin.httpbin-ns.svc.cluster.local:80/delay/0.1`);
}
const selector = {
  namespace: "httpbin-ns",
  select: {
    labels: {
      app: "httpbin"
    }
  }
}

export function disrupt() {
  const podDisruptor = new PodDisruptor(selector)

  // delay traffic from one random replica of the deployment
  const fault = {
    averageDelay: 50,
    errorCode: 500,
    errorRate: 0.1
  }
  podDisruptor.injectHTTPFaults(fault, 30)
}

export const options = {
  setupTimeout: '90s',
  scenarios: {
    base: {
      executor: 'constant-arrival-rate',
      rate: 100,
      preAllocatedVUs: 10,
      maxVUs: 100,
      exec: "default",
      startTime: '0s',
      duration: "30s",
    },
    disrupt: {
      executor: 'shared-iterations',
      iterations: 1,
      vus: 1,
      exec: "disrupt",
      startTime: "30s",
    },
    faults: {
      executor: 'constant-arrival-rate',
      rate: 100,
      preAllocatedVUs: 10,
      maxVUs: 100,
      exec: "default",
      startTime: '30s',
      duration: "30s",
    }
  },
  thresholds: {
    'http_req_duration{scenario:base}': [],
    'http_req_duration{scenario:faults}': [],
    'http_req_failed{scenario:base}': [],
    'http_req_failed{scenario:faults}': [],
  },
}