'use strict'

function githubSignatureIsValid(secret, blob, signature) {
  let expectedSig = 'sha1=' + require('crypto').createHmac('sha1', secret).update(blob).digest('hex')
  return (signature === expectedSig)
}

module.exports = {
  // https://your-mission-control.com/ext/mc/github/webhooks/execute-pipeline/123
  route: 'execute-pipeline/:id',

  handler: (req, res, helper) => {

    let reqBody = req.rawBody || ''
    let providedSignature = req.headers['x-hub-signature'] || ''

    if (!githubSignatureIsValid(process.env.GITHUB_WEBHOOK_SECRET, reqBody, providedSignature)) {
      console.log('github sig invalid')
      res.status(403)
      res.send()
      return
    }


    const event = req.headers['x-github-event']
    const action = req.body.action || ''

    const settings = helper.pipelineSettings(req.params.id, 'mc', 'github')

    if (settings.hasOwnProperty('webhook')) {
      if (!settings.webhook.enabled) {
        res.status(500)
        return res.send()
      }


      const hooks = settings.webhook;
      const key = event + '_' + action
      if ('pull_request_closed' == key) {
        if (hooks[key] && !payload.merged) {
          res.status(200)
          return res.send()
        }
      }
      if (hooks[key]) {
        try {
          return helper.executePipeline(req.params.id, {webhookData: req.body}, () => {
            res.send()
          })
        } catch (err) {
          console.error(err)
          res.status(500)
          return res.send()
        }
      }

      res.status(422)
      return res.send()
    }

    try {
      return helper.executePipeline(req.params.id, {webhookData: req.body}, () => {
        res.send()
      })
    } catch (err) {
      console.error(err)
      res.status(500)
      returnres.send()
    }
  }

}
