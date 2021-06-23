const Register = ( bcrypt, db ) => (req, res) => {
  const { email, name, password } = req.body;
  if (!email || !name || !password ) {
   return res.status(400).json('incorrect form submission');
  }
  const saltRounds = 10;
  bcrypt.hash(password, saltRounds, (err, hash) => {
    db.transaction((trx) => {
      trx
        .insert({
          hash: hash,
          email: email,
        })
        .into('login')
        .returning('email')
        .then((loginEmail) => {
          return trx('users')
            .returning('*')
            .insert({
              name: name,
              email: loginEmail[0],
              joined: new Date(),
            })
            .then((user) => {
              res.json(user[0]);
            });
        })
        .then(trx.commit)
        .catch(trx.rollback);
    }).catch((err) => res.status(400).json('something went wrong'));
  });
};
export default Register;
