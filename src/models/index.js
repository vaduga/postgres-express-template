import Sequelize from "sequelize";

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    host: "ec2-34-252-251-16.eu-west-1.compute.amazonaws.com",
    dialect: "postgres",
    dialectOptions: {
      ssl: { rejectUnauthorized: false }
    }
  }
);

const models = {
  User: sequelize.import("./user"),
  Message: sequelize.import("./message")
};

Object.keys(models).forEach((key) => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;
