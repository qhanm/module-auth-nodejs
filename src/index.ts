import "es6-shim";
import "reflect-metadata";
import { createExpressServer } from "routing-controllers";
import { AppDataSource } from "./data-source";
import { CustomErrorHandler } from "./traits/CustomErrorHandler";

const port = 3002;

AppDataSource.initialize()
  .then(() => {
    const app = createExpressServer({
      routePrefix: "/api",
      controllers: [__dirname + "/controllers/*.ts"],
      middlewares: [CustomErrorHandler],
      defaultErrorHandler: false,
      development: false,
    });

    // app.use(CustomErrorHandler);

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.log("Data Source initialization error:", err);
  });
