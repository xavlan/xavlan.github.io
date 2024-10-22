document.addEventListener('DOMContentLoaded', function() {      // Manque de Temps, l'inscription ne marche pas.
    // document.getElementById('signup-btn').addEventListener('click', function() {
    //     var username = document.getElementById('signup-username').value;
    //     var email = document.getElementById('signup-email').value;
    //     var mdp = document.getElementById('signup-password').value;

    //     var formData = {};
    //     formData['txt']= username;
    //     formData['email']= email;
    //     formData['pswd']= mdp;
    //     console.log(JSON.stringify(formData));
    //     ajaxRequest('PUT', 'php/request.php/inscription', function(data) {
    //         if(data==true){
    //             window.location.href = 'admin.html';
    //         }else{
    //             alert('vérifier vos identifiant')
    //         }
    //     }, JSON.stringify(formData));
    // });

    document.getElementById('login-btn').addEventListener('click', function() {         //verifie si le login est bon pour acceder a admin
        var email = document.getElementById('login-email').value;
        var mdp = document.getElementById('login-password').value;

        ajaxRequest('GET', 'php/request.php/connexion/?email=' + email + '&mdp=' + mdp, function(data) {
            console.log(data[0]);
            data=Object.entries(data[0])[0][1];
            if(data==1){
                window.location.href = 'admin.html';
            }else{
                alert('vérifier vos identifiant');
            }
        });
    });
});