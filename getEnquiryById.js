import http from 'k6/http';
import { check,sleep } from 'k6';

export const options = {
    stages: [
        {duration:'30s', target:10},
        {duration: '1m', target:10},
        {duration: '10s', target: 0}
    ]
}

export default function (){
    const response = http.get('http://localhost:5000/api/enquiry/674f421899ec09eac82fbe5d');

    check(response, {
        'status code 200': (r) => r.status == 200,
        'id and status fields exist': (r) => {
            const body = JSON.parse(r.body);
            return body.hasOwnProperty('_id') && body.hasOwnProperty('status');
        }
    });
    sleep(1);
}