export default () => {
  const {
    PORT,
    CRYPT_SALT,
    JWT_SECRET_KEY,
    JWT_SECRET_REFRESH_KEY,
    TOKEN_EXPIRE_TIME,
    TOKEN_REFRESH_EXPIRE_TIME,
  } = process.env;

  return {
    port: parseInt(PORT, 10) || 4000,
    cryptSalt: parseInt(CRYPT_SALT, 10) || 10,
    jwt: {
      secret: JWT_SECRET_KEY,
      expiresIn: TOKEN_EXPIRE_TIME || '1h',
			refreshSecret: JWT_SECRET_REFRESH_KEY,
			refreshExpiresIn: TOKEN_REFRESH_EXPIRE_TIME || '24h',
    },
  };
};
