
import { PodDisruptor } from 'k6/x/disruptor';
import http from 'k6/http';

export function setup() {
  // pass service ip to scenarios
  return {
    srv_ip: "10.96.77.112:80",
  }
}

export default function (data) {
  http.get(`http://${data.srv_ip}/delay/0.1`);
}

export function disrupt(_) {
  const selector = {
    namespace: "httpbin-ns",
    select: {
      labels: {
        app: "httpbin"
      }
    }
  }
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