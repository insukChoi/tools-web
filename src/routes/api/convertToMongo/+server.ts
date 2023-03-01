import SQLMongoParser from "@synatic/sql-to-mongo";
import { type RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async (event) => {
    const data = await event.request.formData()
    const mysqlQuery = data.get('mysqlText');
    let mongoQuery;
    try {
        mongoQuery = SQLMongoParser.canQuery(mysqlQuery) ?
            SQLMongoParser.makeMongoQuery(mysqlQuery) :
            SQLMongoParser.makeMongoAggregate(mysqlQuery);
    } catch (e) {
        mongoQuery = e.message
    }

    return new Response(JSON.stringify({ mongoQuery: mongoQuery }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}