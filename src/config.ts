import dotenv from "dotenv";

dotenv.config();

const checkEnv = (envVar: string, defaultValue?: string) => {
  if (!process.env[envVar]) {
    if (defaultValue) {
      return defaultValue;
    }
    throw new Error(`Please define the Enviroment variable"${envVar}"`);
  } else {
    return process.env[envVar] as string;
  }
};
export const PORT: number = parseInt(checkEnv("PORT"), 10);
export const DBURL: string = checkEnv("DBURL");
export const APP_URL: string = checkEnv("APP_URL");
export const CORS_ORIGINS = [`${APP_URL}:${PORT}`];
