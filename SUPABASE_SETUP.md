# Supabase Integration Setup

This project has been configured with Supabase integration following the best practices for Astro applications.

## What's Been Set Up

### 1. Supabase Client (`src/db/supabase.client.ts`)

- Initializes the Supabase client with proper TypeScript types
- Uses environment variables `SUPABASE_URL` and `SUPABASE_KEY`

### 2. Middleware (`src/middleware/index.ts`)

- Adds the Supabase client to `context.locals.supabase`
- Makes Supabase available throughout your application

### 3. TypeScript Types (`src/env.d.ts`)

- Extends Astro's global types to include Supabase client
- Provides proper typing for `context.locals.supabase`

## Environment Variables

Make sure you have these environment variables set in your `.env` file:

```bash
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key
```

## Usage Examples

### In API Routes

```typescript
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ locals }) => {
  const { supabase } = locals;
  
  // Example: Fetch data from a table
  const { data, error } = await supabase
    .from('your_table')
    .select('*');
    
  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
  
  return new Response(JSON.stringify({ data }), { status: 200 });
};
```

### In Astro Pages

```astro
---
// Access Supabase client from context.locals
const { supabase } = Astro.locals;

// Example: Fetch data
const { data, error } = await supabase
  .from('your_table')
  .select('*');
---

<html>
  <body>
    {data && data.map(item => (
      <div>{item.name}</div>
    ))}
  </body>
</html>
```

### In React Components

```tsx
import { useEffect, useState } from 'react';

export default function MyComponent() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    // Note: In React components, you'll need to make API calls
    // to your Astro API routes since you can't access context.locals directly
    fetch('/api/example')
      .then(res => res.json())
      .then(setData);
  }, []);
  
  return <div>{/* Your component JSX */}</div>;
}
```

## Best Practices

1. **Always use `context.locals.supabase`** instead of importing the client directly
2. **Handle errors properly** - Supabase operations return `{ data, error }` objects
3. **Use TypeScript types** from your database schema for type safety
4. **Implement proper error handling** in your API routes
5. **Use environment variables** for sensitive configuration

## Testing the Setup

1. Start your development server: `npm run dev`
2. Visit `/api/example` to test the Supabase integration
3. Check the browser console for any errors

## Next Steps

1. Create your database tables in Supabase
2. Generate updated types: `supabase gen types typescript --local > src/db/database.types.ts`
3. Create API routes for your specific use cases
4. Implement authentication if needed
5. Add data validation with Zod schemas
