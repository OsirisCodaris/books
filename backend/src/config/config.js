module.exports = {
  db: {
    database: process.env.DB_NAME || 'books_development',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    options: {
      dialect: process.env.DIALECT || 'mysql',
      host: process.env.HOST || 'localhost'
    }

  },
  authentification: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  },
  book: {
    defaultCover: 'cover.png',
    path: 'public/bookpath'
  }
}
