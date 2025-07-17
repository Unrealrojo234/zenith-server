import pb from '$lib/PocketBase';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
    const data = await request.json();

    if (!data.uid || !data.amount || !data.processing || !data.disbursed || !data.declined || !data.mpesa_ref || !data.level ) {
        return new Response(
            JSON.stringify({
                success: false,
                info: 'Missing required fields i.e uid, amount, processing, disbursed, declined'
            })
        );
    }

    try {
        const record = await pb.collection('registration').create(data);

        if (record) {
            return new Response(
                JSON.stringify({
                    success: true,
                    info: 'Record was successful'
                })
            );
        } else {
            return new Response(
                JSON.stringify({
                    success: false,
                    info: 'An error occured'
                })
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                error: error.message
            })
        );
    }
}

export async function GET() {
    try {
        const records = await pb.collection('registration').getFullList({
            sort: '-created'
        });

        if (records) {
            return new Response(
                JSON.stringify({
                    success: true,
                    data: records
                })
            );
        }

        return new Response(
            JSON.stringify({
                success: false,
                info: 'Error fetch`ing records'
            })
        );
    } catch (error) {
        
        return new Response(JSON.stringify({
            success:false,
            error:error.mess
        }))
    }
}
