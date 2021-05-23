const { MONGO_HOST, MONGO_PORT, MONGO_DATABASE, MONGO_CON_STR } = process.env;

export const dbConnection = {
  url: MONGO_CON_STR, // `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
};
