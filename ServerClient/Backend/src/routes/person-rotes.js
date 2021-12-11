const { Router } = require('express');
const router = Router();
const BD = require('../config/configbd');

//READ
router.get('/obtenerIdConsecutivo', async (req, res) => {


 

    res.json(result);
})
//READ
router.get('/getUsers', async (req, res) => {
    sql = "select * from person where estado = 0";

    let result = await BD.Open(sql, [], false);
    Users = [];

    result.rows.map(user => {
        let userSchema = {
            "nombre": user[0],
            "apellido": user[1],
            "usuario": user[2],
            "estado": user[3],
            "tipoidentificacion": user[4],
            "numeroidentificacion": user[5],
            "pais": user[6],
            "correo": user[7],
        }

        Users.push(userSchema);
    })

    res.json(Users);
})

//CREATE

router.post('/addUser', async (req, res) => {
    const {nombre,apellido,usuario,estado,tipoidentificacion,numeroidentificacion,pais,correo } = req.body;

 

    sql = "insert into person(nombre,apellido,usuario,estado,tipoidentificacion,numeroidentificacion,pais,correo) values (:nombre,:apellido,:usuario,:estado,:tipoidentificacion,:numeroidentificacion,:pais,:correo)";

    await BD.Open(sql, [nombre,apellido,usuario,estado,tipoidentificacion,numeroidentificacion,pais,correo], true);

    res.status(200).json({
        status:200
    })
})

//UPDATE
router.put("/updateUser", async (req, res) => {
    const { nombre,apellido,usuario,estado,tipoidentificacion,numeroidentificacion,pais,correo } = req.body;

    sql = "update person set nombre=:nombre,apellido=:apellido,usuario=:usuario,estado=:estado,tipoidentificacion=:tipoidentificacion,numeroidentificacion=:numeroidentificacion,pais=:pais,correo=:correo where numeroidentificacion=:numeroidentificacion";

    await BD.Open(sql, [nombre,apellido,usuario,estado,tipoidentificacion,numeroidentificacion,pais,correo], true);

    res.status(200).json({
        status:200
    })
})


//DELETE
router.delete("/deleteUser/:numeroidentificacion", async (req, res) => {
    const { numeroidentificacion } = req.params;

    sql = "update person set estado=1 where numeroidentificacion=:numeroidentificacion";

    await BD.Open(sql, [numeroidentificacion], true);

    res.status(200).json({
        status:200
    })
})


module.exports = router;