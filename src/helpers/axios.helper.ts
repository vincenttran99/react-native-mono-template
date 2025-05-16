import { parseJSONHelper } from "./object.helper";
/**
 * @param errorData
 * @returns
 */
export function getAxiosErrorMessageHelper(errorData: any) {
  let message = errorData.message;
  if (errorData.fieldErrors) {
    errorData.fieldErrors.forEach((fErr: any) => {
      message += `\nfield: ${fErr.field},  Object: ${fErr.objectName}, message: ${fErr.message}\n`;
    });
  }
  return message;
}

// Middleware function definition
export function errorMiddlewareHelper() {
  // Returns the next middleware function
  return (next: any) => {
    // Returns the actual middleware function that handles the action
    return (action: any) => {
      /**
       * The error middleware serves to log error messages from dispatch.
       * It need not run in production.
       */

      // Only run this middleware in development mode
      if (__DEV__) {
        try {
          // Attempt to execute any code within this block (currently empty)
        } catch (e) {
          // Handle any errors thrown in the try block (currently empty)
        }

        // Destructure error from the action object
        const { error } = action;

        // If there is an error, handle it
        if (error) {
          console.log(
            `${action.type} caught at middleware with reason: ${JSON.stringify(
              error.message
            )}.`
          );

          try {
            // Attempt to parse the error message as JSON and extract the first message
            action.error.message = parseJSONHelper(
              error?.message
            )?.[0]?.message;
          } catch (e) {
            // If parsing fails, use the original error message
            action.error.message = error.message;
          }

          // Assign the message back to the error object
          action.error.message = action.error.message;

          // Further check if the error has a response and extract a detailed message
          if (error && typeof error.response !== "undefined") {
            if (typeof error.response.data !== "undefined") {
              const message = getAxiosErrorMessageHelper(error.response.data);
              action.error.message = message || "";
            }
          }
        }
      }

      // Pass the action to the next middleware or reducer
      return next(action);
    };
  };
}
