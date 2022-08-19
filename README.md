#ENDPOINTS

[GET] /user/users -> devuelve un array con todos los usuarios de la BD

[GET] /user/users/:idUser -> devuelve un usuario de la BD por id

[GET] /user/friends -> devuelve un array con todos los usuarios amigos del usuario

[GET] /user/enemies -> devuelve un array con todos los usuarios enemigos del usuario

[POST*] /register -> el usuario se registra

[POST*] /login -> el usuario entra dentro del espacio privado

[PUT*] /user/update -> el usuario registrado edita su perfil
