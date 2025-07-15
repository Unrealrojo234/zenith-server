let onlineUsers = [];

setInterval(()=>{
        onlineUsers = [];
},10000);

export async function POST({ request }) {
    try {
        const data = await request.json();
        
        if (data.online !== undefined) {

            if(!onlineUsers.includes(data.online)){

                onlineUsers.push(data.online);

                return new Response(
                    JSON.stringify({
                        success: true,
                        online: onlineUsers,
                    }),
                    {
                        status: 200,
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
            }

            else{

                return new Response(
                    JSON.stringify({
                        success:false,
                        info:"User already added to the list"
                    })
                )
            }

            
        } else {
            return new Response(
                JSON.stringify({
                    success: false,
                    error: "Missing 'online' field in request"
                }),
                {
                    status: 400,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({
                success: false,
                error: "Invalid JSON format"
            }),
            {
                status: 400,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
    }
}

export function GET() {
    return new Response(
        JSON.stringify({
            success: true,
            online: onlineUsers,
            count: onlineUsers.length
        }),
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
}