import { redirect, LOGIN_URL } from './helper.js'


document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();

    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;


    let body = {
        "email": email,
        "password": password
    };

    login(LOGIN_URL, body)
        .then((response)=>{
            if (response.error) {
                document.getElementById('error').innerText = response.error;
            }else{
                localStorage.setItem('token', response.user.access);
                return redirect('todos');
            };
        })
        .catch((error)=>{
            console.log(error);
        })

});


const login = async (url, body) => {
    let response = await fetch(url, {
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    });

    return response.json();
}

