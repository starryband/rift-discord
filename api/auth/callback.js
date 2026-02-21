import axios from 'axios';

export default async function handler(request, response) {
    const code = request.query.code;
    if (!code) {
        return response.status(400).send('No code provided');
    }

    const data = new URLSearchParams({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: 'authorization_code',
        code,
        redirect_uri: 'https://rift-discord.vercel.app/api/auth/callback',
        scope: 'identify guilds'
    });

    try {
        const token_response = await axios.post(
            'https://discord.com/api/oauth2/token',
            data.toString(),
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        )

        const access_token = token_response.data.access_token;
        const user_response = await axios.get('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        });

        const user = user_response.data;
        const query = new URLSearchParams({
            id: user.id,
            username: user.username,
            discriminator: user.discriminator,
            avatar: user.avatar || ''
        });
    } catch(error) {
        console.error('Error during authentication:', error);
        response.status(500).send('Authentication failed');
    }
}