# Mission Control GitHub Extension

[![Build Status](https://travis-ci.org/space-race/mc-ext-github.svg?branch=master)](https://travis-ci.org/space-race/mc-ext-github)

This is an extension for [Mission Control](https://github.com/space-race/mission-control) to use GitHub webhooks, and other features (in the future).

## Setup

Install the extension in your mission control project.

```
cd /path/to/mission-control
npm install --save mc-ext-github
```

Add `GITHUB_WEBHOOK_SECRET=a_securely_generated_random_string` (and input a random key which will be used later to configure webhooks)

A quick method for generating an alphanumeric string:

```
openssl rand -hex 24
```

## Configuring a webhook with GitHub

1. Go to your repository on GitHub.

2. Click on "Settings".

3. Click on "Webhooks & services"

4. Click on Add Webhook

    ![adding a webhook](https://cloud.githubusercontent.com/assets/721038/12319535/d3c9e34e-ba57-11e5-8651-f4d4f8353c68.png)

5. Enter the URL of your Mission Control with the extension webhook endpoint included `http://your-host-name/ext/mc/github/webhooks/execute-pipeline/1234`. Replace `1234` with your pipeline configuration id to trigger. (Note: It is highly recommended to use HTTPS.)

6. Enter the `GITHUB_WEBHOOK_SECRET` from your .env file.

7. Choose "Let me select individual events".

8. Check the events that you want to trigger a build. You may want to check "push" and "pull request".

    ![configuring a webhook](https://cloud.githubusercontent.com/assets/721038/12319544/e612d3b2-ba57-11e5-8518-29e1805417c8.png)
    
9. Click "Add webhook"

## Using data from GitHub webhook payloads in pipelines

You can access properties a github webhook payload with `{[ mc.webhook.example ]}`. For example, if you wanted the commit to build for a push event, you might access `{[ mc.webhook.after ]}` (which is the sha of the commit).
