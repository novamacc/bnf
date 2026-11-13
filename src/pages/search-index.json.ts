import { buildIndex } from '../lib/search';
export const GET = () => new Response(JSON.stringify(buildIndex('en')), { headers: { 'Content-Type': 'application/json' } });
