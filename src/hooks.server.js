export async function handle({ event, resolve }) {
  const response = await resolve(event);
  
  // Add CORS headers to allow all origins
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', '*');
  
  return response;
}