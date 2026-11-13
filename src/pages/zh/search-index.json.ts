import { buildIndex } from '../../lib/search';
export const GET = () => new Response(JSON.stringify(buildIndex('zh')), { headers: { 'Content-Type': 'application/json' } });
