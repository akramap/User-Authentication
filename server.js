// config should be imported before importing any other file
import config from "@config";
import app from "@config/express";
import logger from "utils/logger";

if (!module.parent) {
  // listen on port config.port
  app.listen(config.port, () => {
    logger.info(`server started on port ${config.port} (${config.env})`);
  });
}

export default app;
