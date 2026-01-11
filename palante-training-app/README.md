# Palante Advisor Training System

An AI-powered training system for financial advisors and estate planning attorneys at Palante Wealth Advisors.

## Features

- **Teaching Mode**: Learn methodology, frameworks, and best practices
- **Scenario Mode**: Practice with realistic client simulations at three difficulty levels
- **Evaluation Mode**: Get feedback on your plans and presentations
- **Palante Voice**: Built-in standards for how Palante advisors communicate

## Quick Start

### Prerequisites

- Node.js 18+ installed
- An Anthropic API key (get one at [console.anthropic.com](https://console.anthropic.com))

### Local Development

1. **Clone or download this folder**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up your environment**
   ```bash
   cp .env.example .env.local
   ```
   Then edit `.env.local` and add your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-...your-key-here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Deploying to Vercel (Recommended)

Vercel offers the easiest deployment experience for Next.js apps.

### Step-by-Step Deployment

1. **Create a Vercel account**
   Go to [vercel.com](https://vercel.com) and sign up (free tier works fine)

2. **Install Vercel CLI** (optional, for command-line deployment)
   ```bash
   npm install -g vercel
   ```

3. **Deploy**
   
   **Option A: Via GitHub**
   - Push this code to a GitHub repository
   - Connect your GitHub account to Vercel
   - Import the repository
   - Vercel will auto-detect Next.js and configure everything

   **Option B: Via CLI**
   ```bash
   vercel
   ```
   Follow the prompts.

4. **Add your API key**
   - Go to your project in the Vercel dashboard
   - Navigate to Settings → Environment Variables
   - Add: `ANTHROPIC_API_KEY` = your API key
   - Redeploy for changes to take effect

5. **Custom Domain (Optional)**
   - In Vercel dashboard, go to Settings → Domains
   - Add your domain (e.g., `train.palantewealth.com`)
   - Follow DNS instructions

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `ANTHROPIC_API_KEY` | Your Anthropic API key | Yes |

## Usage Guide

### For Trainees

1. **Start with Teaching Mode** if you're new
   - Ask about the Three-Pillar Framework
   - Learn about discovery techniques
   - Understand the Palante voice

2. **Progress through Scenario Levels**
   - Level 1: Guided practice with full support
   - Level 2: Discovery-focused challenges
   - Level 3: Complex, realistic scenarios

3. **Use Evaluation Mode** to get feedback
   - Submit client plans for review
   - Get scored on the rubric
   - Receive specific improvement suggestions

### Key Concepts

- **Three-Pillar Framework**: Income Confidence, Smart Investment Strategy, Tax Efficiency
- **Discovery**: Uncovering hidden information clients don't volunteer
- **Palante Voice**: How we communicate—calm, confident, human

## Cost Estimates

| Usage | Approximate Cost |
|-------|-----------------|
| 100 conversations/month | $3-5/month |
| 500 conversations/month | $15-25/month |
| 1,000 conversations/month | $30-50/month |

Costs depend on conversation length. The app uses Claude Sonnet for optimal balance of quality and cost.

## Customization

### Updating the System Prompt

Edit `src/lib/system-prompt.ts` to modify:
- Training methodology
- Personas and scenarios
- Grading rubrics
- Quality standards

### Changing the Model

Edit `src/app/api/chat/route.ts` and change the model parameter:
- `claude-sonnet-4-20250514` (default, balanced)
- `claude-opus-4-20250514` (most capable, higher cost)

### Styling

Edit the CSS files to adjust branding:
- `src/app/globals.css` - Global styles and colors
- `src/app/page.module.css` - Page-specific styles

## Troubleshooting

**"Failed to get response from Claude"**
- Check that your API key is correct in `.env.local` or Vercel environment variables
- Ensure you have API credits available at console.anthropic.com

**Styling looks wrong**
- Clear your browser cache
- Run `npm run build` to rebuild

**Changes not appearing after deploy**
- Trigger a redeploy in Vercel dashboard
- Check that environment variables are set correctly

## Support

For issues with the training content, contact Victor Medina.

For technical issues, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Anthropic API Documentation](https://docs.anthropic.com)
- [Vercel Documentation](https://vercel.com/docs)
