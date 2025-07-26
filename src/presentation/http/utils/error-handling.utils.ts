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
