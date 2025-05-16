import fs from "fs";
import path from "path";
import dotenv from "dotenv";

/**
 * Function to get environment variables based on APP_ENV
 * This utility loads and processes environment variables from the appropriate .env file
 * 
 * @returns {Record<string,string>} Object containing environment variables
 */
const getEnvVars = () => {
  // 1. Determine which environment to use (APP_ENV or fallback to 'development')
  // This allows different configurations for development, staging, production, etc.
  const ENV = process.env.APP_ENV || "development";

  // Resolve the path to the appropriate .env file based on the environment
  // Example: ./.env.development, ./.env.production, etc.
  const envPath = path.resolve(`./.env.${ENV}`);

  // 2. Read the .env file and parse its contents into a key-value object
  // This reads the raw file content as a buffer and converts it to environment variables
  const fileBuffer = fs.readFileSync(envPath);
  const parsedEnv = dotenv.parse(fileBuffer); // Using dotenv.parse from the dotenv package

  // 3. Create a new object with values from process.env
  // This ensures we get the actual values from the environment, which may have been
  // modified by other processes or overridden by system environment variables
  const envVars = Object.keys(parsedEnv).reduce(
    (acc, key) => {
      acc[key] = process.env[key];
      return acc;
    },
    /** @type {Record<string,string>} */ {}
  );
  return envVars;
};

// 4. Export the function for use anywhere in the application
// This allows other modules to access environment variables consistently
export default getEnvVars;
