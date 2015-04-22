'use strict';

module.exports = {
  db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/mean-dev',
  debug: true,
  logging: {
    format: 'tiny'
  },
  //  aggregate: 'whatever that is not false, because boolean false value turns aggregation off', //false
  aggregate: false,
  mongoose: {
    debug: false
  },
  app: {
    name: 'Sharity'
  },
  facebook: {
    clientID: '1595291077350487',
    clientSecret: '8d4d1a894571ab473dc579cba1b94020',
    callbackURL: 'http://benoitguina.fr:3000/auth/facebook/callback'
  },
  twitter: {
    clientID: 'DEFAULT_CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  github: {
    clientID: '68f76a3d6c42cb58960e',
    clientSecret: '9fb4751324924ab758b0892d0f532190d9053f68',
    callbackURL: 'http://benoitguina.fr:3000/auth/github/callback'
  },
  google: {
    clientID: '1009945487166-oe160sdr9va1rohetcr1i49uj5i913c9.apps.googleusercontent.com',
    clientSecret: 'RB659G30SZrSFxgSSnG8cQrh',
    callbackURL: 'http://benoitguina.fr:3000/auth/google/callback'
  },
  linkedin: {
    clientID: 'DEFAULT_API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/auth/linkedin/callback'
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER', // Gmail, SMTP
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  }
};
