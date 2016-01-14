'use strict'

function githubSignatureIsValid(secret, blob, signature) {
  let expectedSig = 'sha1=' + require('crypto').createHmac('sha1', secret).update(blob).digest('hex')
  return (signature === expectedSig)
}

module.exports = {

  route: 'execute-pipeline/:id',

  handler: (req, res, helper) => {

    let reqBody = req.rawBody || ''
    let providedSignature = req.headers['x-hub-signature'] || ''

    console.log('received github hook')
    console.dir(req)

    if (!githubSignatureIsValid('abc', reqBody, providedSignature)) {
      console.log('github sig invalid')
      res.status(403)
      res.send()
      return
    }

    console.log('github sig valid')

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
