const Sequelize = require('sequelize');
const bCrypt = require("bcrypt");
//const db ={database:'db_bn',user:'root',password:''};
/*const sequelize = new Sequelize(db.database, db.user, null, {
    host: 'localhost',
    dialect: 'mysql'
});


let pg = require('pg');
if (process.env.DATABASE_URL) {
  pg.defaults.ssl = true;
}

let connString = process.env.DATABASE_URL 
const { Pool } = require('pg');

const pool = new Pool({
  connectionString : connString
});
pool.query('SELECT * FROM player', (err, res) => {
  console.log(err, res)
  pool.end()
})
*/

// Option 2: Passing a connection URI
const sequelize = new Sequelize(process.env.DATABASE_URL,{
    dialect:"postges"
});
const User = sequelize.define('play', {
    //nom: Sequelize.STRING,
    //prenom: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    //win:Sequelize.INTEGER,
    //lose:Sequelize.INTEGER
});
User.sync().then(()=>{
    return User.create( {
        email:"bilala@gmail.com",
        password:"hololooo"
    })
});
sequelize.authenticate()
    .then(()=> console.log('database connected'))
    .catch(err =>console.log('error'+err))
const  hashPassword = async (password)=>{
    let passHash;
    try {
        passHash = await bCrypt.hashSync(password, 10)
    }
    catch (e) {
        return null;
    }
    return passHash;
};
const addUser = async (user)=>{
    let newUser = await User.findOne({ where: {email:user.email} }).catch(()=> {return null});
    if (newUser)
        return false;
    const genPass = await hashPassword(user.password);
    if (genPass === null)
        return null;
    user.password=genPass;
    return User.create(user).catch(()=>{return null});
};
const checkUser = async (email, password) =>{
    //... fetch user from a db etc.
    let user = await User.findOne({ where: {email:email} }).catch(()=> {return null});
    if (user===null)
        return false;
    return  bCrypt.compareSync(password, user.password) === true ? user : false;
};
module.exports = {User,hashPassword,checkUser,addUser};
