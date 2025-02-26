## GOKITE AI AUTOMATE BOT

A Node.js bot for interacting with the KiteAI testnet platform, featuring a clean terminal user interface and automated interactions with AI agents.

## Features

- Interactive terminal dashboard using blessed/blessed-contrib
- Multiple wallet support
- Automated interactions with AI agents (Professor, Crypto Buddy, Sherlock)
- Real-time statistics and progress tracking
- Rate limiting and error handling
- Groq AI integration for dynamic question generation

## Prerequisites

- Node.js v16 or higher
- A KiteAI testnet account [Register](https://testnet.gokite.ai/)
- A Groq API key Get it from https://console.groq.com

## Installation

1. Clone the repository:

```bash
git clone https://github.com/Rambeboy/kite-ai-bot.git && cd kite-ai-bot
```

2. Install dependencies & setup accounts

```bash
npm install && npm run setup
```

3. Configure your accounts:
```bash
nano accounts/accounts.js
```

4. Update your Groq API key in `config`
```bash
nano config/config.js
```

## Usage

Start the bot:

```bash
npm run start
```

### Controls

- Press `Ctrl+C` or `q` to exit
- The dashboard will show:
- Current wallet and cycle status
- Agent interactions log
- Statistics (total requests, success rate)
- Progress indicator

## Dashboard Components

- **Banner**: Shows project information and links
- **Agent Interactions**: Real-time log of questions and answers
- **Status**: Shows active wallet, current cycle, and running time
- **Statistics**: Displays request counts and success rate
- **Progress**: Visual indicator of cycle progress (resets every 10 cycles)

## Error Handling

The bot includes robust error handling for:

- Network timeouts
- Rate limiting
- Invalid responses
- API errors

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for more details.
