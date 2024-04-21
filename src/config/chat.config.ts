export namespace ConfiguracionChat {
  export const claveJWT = process.env.SECRET_PASSWORD_JWT;
  export const mongobdConnectionString = process.env.CONNECTION_STRING_MONGODB;
}
