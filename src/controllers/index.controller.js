const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: '1234',
    database: 'firstapi'
});

const getUsers = async (req, res) => {
    const response = await pool.query('SELECT * from users');
    res.status(200).json(response.rows);
}

const getUserById = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('SELECT * from users where id = $1', [id]);
    res.json(response.rows);
}

const createUser = async (req, res) => {
    const { name, email } = req.body;

    const response = await pool.query('INSERT into users (name, email) values ($1, $2)', [name, email]);
    console.log(response);
    res.json({
        message: 'User Added Succesfully',
        body: {
            user: {name, email}
        }
    })
};

const updateUser = async (req, res) => {
    const id = req.params.id;
    const { name, email } = req.body;
    const response = await pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [
        name, 
        email,
        id
    ]);
    console.log(response);
    res.json('User updated successfully');
};

const deleteUser = async (req, res) => {
    const id = req.params.id;
    const response = await pool.query('DELETE from users where id = $1', [id]);
    console.log(response);
    res.json(`User ${id} deleted succesfully`);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
};


