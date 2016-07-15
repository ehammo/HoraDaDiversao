var config = {
development: {
  url:'http://localhost:3000',
  database: {
      host: 'localhost',
      port: '3306',
      db: 'horadiversaotests',
      user: 'root',
      password: 'adminadmin',
      dialect: 'postgres'
  }
},
production: {
    url:'https://horadiversao.herokuapp.com/',
    database: {
        host: 'ec2-54-221-201-244.compute-1.amazonaws.com',
        port: '5432',
        db: 'dat2hi7sqoj2a',
        user: 'gnsesdgeqyxwlz',
        password: 'ZPitUSahyyI-yXgSWEhVGQMb7Y',
        dialect: 'postgres'
    }
}
};

module.exports = config;
