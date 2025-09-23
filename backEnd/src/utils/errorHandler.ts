import logger from "./logger";

const errorHandler = (error: any): void => {
  if (error instanceof Error) {
    logger.error(`Error: ${error.message}`);
    throw new Error(error.message);
  }
  throw new Error("An unknown error occured");
};

export default errorHandler;
