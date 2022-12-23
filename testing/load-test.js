import http from 'k6/http';
import { check } from 'k6';

export let options = {
  stages: [
    { duration: '10s', target: 1000 }
  ],
};

export default function() {
  let res = http.get('http://localhost:3000/products');
  check(res, {
    'status was 200': (r) => r.status == 200,
    'transaction time OK': (r) => r.timings.duration < 2000,
  });
}
