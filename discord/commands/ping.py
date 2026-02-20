import discord
from discord.ext import commands

class Ping(commands.Cog):
    def __init__(self, bot):
        self.bot = bot

    @commands.command(name='ping', description='Check the bot\'s latency')
    async def ping(self, ctx):
        latency = self.bot.latency * 1000
        await ctx.send(f'Pong! Latency: {latency:.2f} ms')

async def setup(bot):
    await bot.add_cog(Ping(bot))