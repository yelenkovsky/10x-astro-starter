import type { APIRoute } from "astro";

export const GET: APIRoute = async ({ locals }) => {
  try {
    // Access Supabase client from context.locals
    const { supabase } = locals;

    // Example: Fetch data from a table (replace 'your_table' with actual table name)
    // const { data, error } = await supabase
    //   .from('your_table')
    //   .select('*')
    //   .limit(10);

    // For now, just return a success message
    return new Response(
      JSON.stringify({
        message: "Supabase client is working!",
        timestamp: new Date().toISOString(),
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("API Error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
};
