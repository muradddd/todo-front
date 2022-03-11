import { redirect, REGISTER_URL } from './helper.js'


document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    let body = {
        "email": email,
        "password": password,
        "username": username
    };

    register(REGISTER_URL, body)
        .then((response)=>{
            if (response.error) {
                document.getElementById('error').innerText = response.error;
            }else{
                return redirect('login');
            }
        })
        .catch((error)=>{
            console.log(error);
        })

});


const register = async (url, body) => {
    let response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return response.json();
}

