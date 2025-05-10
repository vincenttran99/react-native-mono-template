import fs from "fs";
import path from "path";
import dotenv from "dotenv";

/**
 * Hàm lấy biến môi trường dựa trên APP_ENV
 * @returns {Record<string,string>} Object chứa các biến môi trường
 */
const getEnvVars = () => {
  // 1. read env (APP_ENV or fallback with 'development')
  const ENV = process.env.APP_ENV || "development";

  const envPath = path.resolve(`./.env.${ENV}`);

  // 2. read file and parse into object { KEY: 'value', … }
  const fileBuffer = fs.readFileSync(envPath);
  const parsedEnv = dotenv.parse(fileBuffer); // dotenv.parse từ package dotenv

  // 3. create new object with values from process.env
  const envVars = Object.keys(parsedEnv).reduce(
    (acc, key) => {
      acc[key] = process.env[key];
      return acc;
    },
    /** @type {Record<string,string>} */ {}
  );
  return envVars;
};

// 4. Export hàm để dùng ở bất cứ đâu
export default getEnvVars;
