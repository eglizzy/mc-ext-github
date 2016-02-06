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

    console.log('received github hook')
    console.dir(req)

    if (!githubSignatureIsValid(process.env.GITHUB_WEBHOOK_SECRET, reqBody, providedSignature)) {
      console.log('github sig invalid')
      res.status(403)
      res.send()
      return
    }

    console.log('github sig valid')

    // TODO: check if this pipeline_id has github webhooks enabled
    // let settings = helper.pipelineSettings(pipeline_id, 'mc-ext-github')
    // if (settings.events.whatever === 1)
    // TODO: if not return 403/200/whatever


    // TODO: filter events based on extension/pipeline settings
    // if (req.body.event === 'pull_request.comment')

    try {
      helper.executePipeline(req.params.id, {webhookData: req.body}, () => {
        res.send()
      })

    } catch(err) {
      console.error(err)
      res.status(500)
      res.send()
    }

  }

}
