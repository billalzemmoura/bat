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
const User = sequelize.define('user', {
    //nom: Sequelize.STRING,
    //prenom: Sequelize.STRING,
    email: Sequelize.STRING,
    mdp: Sequelize.STRING,
    //win:Sequelize.INTEGER,
    //lose:Sequelize.INTEGER
});
User.sync().then(()=>{
    return User.create( {
        email:"bilala@gmail.com",
        mdp:hashPassword("hololo")
    })
});
sequelize.authenticate()
    .then(()=> console.log('database connected'))
    .catch(err =>console.log('error'+err))
const  hashPassword = async (mdp)=>{
    let passHash;
    try {
        passHash = await bCrypt.hashSync(mdp, 10)
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
    const genPass = await hashPassword(user.mdp);
    if (genPass === null)
        return null;
    user.mdp=genPass;
    return User.create(user).catch(()=>{return null});
};
const checkUser = async (email, password) =>{
    //... fetch user from a db etc.
    let user = await User.findOne({ where: {email:email} }).catch(()=> {return null});
    if (user===null)
        return false;
    return  bCrypt.compareSync(password, user.mdp) === true ? user : false;
};
module.exports = {User,hashPassword,checkUser,addUser};
