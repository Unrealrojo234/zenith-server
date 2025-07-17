import pb from '$lib/PocketBase';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const data = await request.json();

	try {
		const record = await pb.collection('withdrawal').create(data);

		if (record) {
			return new Response(
				JSON.stringify({
					success: true,
					info: 'Record was successful',
					data:record
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


export async function PUT({ request }) {
    const data = await request.json();

    // Check if ID is provided (required for updates)
    if (!data.id) {
        return new Response(
            JSON.stringify({
                success: false,
                info: 'ID is required for updating a record'
            }),
            { status: 400 }
        );
    }

    try {
        // Extract ID from data to avoid sending it as a field to update
        const { id, ...updateData } = data;
        
        const record = await pb.collection('withdrawal').update(id, updateData);

        if (record) {
            return new Response(
                JSON.stringify({
                    success: true,
                    info: 'Record was updated successfully',
                    data: record
                })
            );
        } else {
            return new Response(
                JSON.stringify({
                    success: false,
                    info: 'Record not found or update failed'
                }),
                { status: 404 }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                error: error.message
            }),
            { status: 500 }
        );
    }
}




export async function GET() {
	try {
		const records = await pb.collection('withdrawal').getFullList({
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
            error:error.message
        }))
    }
}
