

$('#user_login_btn').click(function(){
    // window.location.replace("ownership.html")
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    if ((username == 'user123@hotmail.com' && password == 'learn') || (username == 'user456@hotmail.com' && password == 'learn1'))
    {
        document.cookie = "username=" + username;

        window.location.href = 'ownership.html';
        return false;    
    }
    else {
        alert('Login failed');
    }


    
  });