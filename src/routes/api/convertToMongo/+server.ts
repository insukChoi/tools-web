import SQLMongoParser from "@synatic/sql-to-mongo";
import { type RequestHandler } from '@sveltejs/kit'

export const POST: RequestHandler = async (event) => {
    const data = await event.request.formData()
    const mysqlQuery = data.get('mysqlText');
    const mongoQuery = SQLMongoParser.parseSQL(mysqlQuery)
    // const mongoQuery = SQLMongoParser.parseSQL("select id from films")

    return new Response(JSON.stringify({ mongoQuery: mongoQuery }), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}