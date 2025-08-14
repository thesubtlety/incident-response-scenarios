# Incident Response Scenario Library

An independently created resource for security teams to practice incident response using scenarios from @badthingsdaily. Site author has no affiliation with scenario author.

## Overview

This application provides a searchable, filterable collection of security incident scenarios designed for tabletop exercises and team training. Each scenario presents a realistic security situation that teams can use to practice their incident response procedures.

**Attribution:** All scenarios in this collection were created by Ryan McGeehan ([@m4goo](https://www.linkedin.com/in/m4goo/)) and originally shared on [x.com/badthingsdaily](https://x.com/badthingsdaily). This application was created independently to make these valuable scenarios more accessible for security training purposes.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

### Deploying to GitHub Pages

1. The `homepage` field in `package.json` should be configured for your organization:
   ```json
   "homepage": "https://<orgname>.github.io/incident-response-scenarios"
   ```

2. Install the gh-pages dependency (if not already installed):
   ```bash
   npm install --save-dev gh-pages
   ```

3. Deploy to GitHub Pages:
   ```bash
   npm run deploy
   ```

4. Go to your repository Settings → Pages and ensure the source is set to "Deploy from a branch" and the branch is `gh-pages`

The app will be available at the URL specified in your homepage field.

## Adding More Scenarios

Scenarios are stored in `src/scenarios.json`. To add new scenarios, edit this file and follow the format:

```json
  {
      "id": 494,
      "title": "Worst Case Scenario",
      "description": "What's the worst that can happen?"
  }
```

## Attribution & Credits

**All scenarios are the original work the author**
- LinkedIn: [Ryan McGeehan](https://www.linkedin.com/in/m4goo/)
- Original source: [x.com/badthingsdaily](https://x.com/badthingsdaily)

The scenarios themselves remain the intellectual property of Ryan McGeehan.

## Usage

- This application is intended for educational and training purposes only
- The scenario content is used with attribution to the original author
- For any commercial use or redistribution of the scenarios, please contact the author directly
- This is an unofficial viewer created for the security community's benefit
