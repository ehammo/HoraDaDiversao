var config = {
development: {
  url:'http://localhost:3000',
  database: {
      host: 'localhost',
      port: '5432',
      db: 'horadiversao',
      user: 'postgres',
      password: 'admin',
      dialect: 'postgres',
      dialectOptions: {
          ssl: false
      }
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
        dialect: 'postgres',
        dialectOptions: {
            ssl: true
        }
    }
}
};

module.exports = config;
