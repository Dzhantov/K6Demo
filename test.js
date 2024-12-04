import http from 'k6/http';
import { check,sleep } from 'k6';

export const options = {
    stages: [
        {duration:'30s', target:10},
        {duration: '1m', target:10},
        {duration: '10s', target: 0}
    ]
}

export default function(){
    const response = http.get('http://localhost:5000/api/enquiry/');

    check(response, {
        'status code is 200': (r)=> r.status == 200,
    });

    sleep(1);
}