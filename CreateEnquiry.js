import http from 'k6/http';
import { check,sleep } from 'k6';

export const options = {
    stages:[
        {duration: '1m', target: 10}
    ]
}

export default function (){

    //Define the payload/request body
    const payload = JSON.stringify({
        "name": "John Doe",
        "email": "johndoe@example.com",
        "mobile": "+1234567890",
        "comment": "Please provide more details about your services.",
        "status": "Submitted"
      });

    //Define the params including headers
    const headers = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = http.post('http://localhost:5000/api/enquiry/', payload, headers);

    check(response,{
        'status code 200': (r) => r.status == 200,
        'id and status properties exist': (r) => {
            const body = JSON.parse(r.body);

            return body.hasOwnProperty('_id') && body.hasOwnProperty('status');
        }
    });
    sleep(1);
}