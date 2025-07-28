export function formatErrorResponse(error: unknown) {
  let errorMessage = "Unknown error";

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return {
    data: { error: errorMessage },
    success: false,
  };
}

import { ZodError } from "zod";

/**
 * Extracts the first validation error message from a ZodError
 */
export const extractFirstZodMessage = (error: ZodError): string | undefined => {
  const fieldErrors = error.flatten().fieldErrors;
  return Object.values(fieldErrors)
    .flat()
    .find((msg) => msg); // Returns the first non-empty error message
};

// export const extractAllZodMessages = (
//   error: ZodError
// ): string[] => {
//   const fieldErrors = error.flatten().fieldErrors;
//   return Object.values(fieldErrors).flat().filter(Boolean);
// };
