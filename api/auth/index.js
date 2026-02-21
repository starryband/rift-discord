export default function handler(request, response) {
    const redirect_uri = encodeURIComponent('https://rift-discord.vercel.app/api/auth/callback');
    const client_id = process.env.DISCORD_CLIENT_ID;
    const scope = encodeURIComponent('identify guilds');
    const discord_auth_url = `https://discord.com/api/oauth2/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&scope=${scope}`;

    response.writeHead(302, { Location: discord_auth_url });
    response.end();
}