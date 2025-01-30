export function handleError(error: unknown) {
    console.error(error);
  
    return new Response(
      JSON.stringify({ error: "Internal Server Error", details: (error as Error).message }),
      { status: 500 }
    );
  }