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
    const action = req.body.action || null

    const executePipelineAndRespond = () => {
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

    helper.pipelineSettings(req.params.id, 'mc', 'github', 'webhook')
      .then(settings => {

        if (Object.keys(settings).length && settings.enabled) {

          const key = action ? (event + '_' + action) : event
          if ('pull_request_closed' == key) {
            if (settings.pull_request_closed_merged && payload.merged) {
              return executePipelineAndRespond()
            }
            res.status(200)
            return res.send()
          }
          if (settings[key]) {
            return executePipelineAndRespond()
          }
        }

        res.status(422)
        return res.send()
      })

  }

}
