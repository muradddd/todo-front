import {redirect} from './helper.js'

document.getElementById('register').addEventListener('click', function(event){
    event.preventDefault();
    return redirect('register');
});
