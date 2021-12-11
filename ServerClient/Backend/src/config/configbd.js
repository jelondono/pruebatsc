const oracledb = require('oracledb');

cns = {
    user: "PRUEBAT",
    password: "12345678",
    connectString: "localhost:1521/orcl"
}


async function Open(sql, binds, autoCommit) {
    let cnn = await oracledb.getConnection(cns);
    let result = await cnn.execute(sql, binds, { autoCommit });
    cnn.release();
    return result;
}

exports.Open = Open;