import discord
import os

from dotenv import load_dotenv
from discord.ext import commands

load_dotenv()

intents = discord.Intents.all()
bot = commands.Bot(command_prefix='!', intents=intents)

TOKEN = os.getenv('DISCORD_BOT_TOKEN')

ROOT_DIR = os.path.dirname(__file__)
COGS_DIR = os.path.join(ROOT_DIR, 'commands')

@bot.event
async def on_ready():
    print(f"Logged in as {bot.user}")
    await bot.tree.sync()

async def load_extensions():
    for filename in os.listdir(COGS_DIR):
        if filename.endswith('.py') and filename != '__init__.py':
            await bot.load_extension(f'commands.{filename[:-3]}')

@bot.event
async def setup_hook():
    await load_extensions()

bot.run(TOKEN)