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

    // Potential extension data structure
    //config.extension_settings = {
    //  mc: {
    //    github: {
    //      webhook_enabled: 1,
    //      event_watch_started_enabled: 1
    //    }
    //  }
    //}


    // - Event types ----------------------------

    // Event Name
    //    Webhook event name
    //        Action

    // CreateEvent
    //    commit_comment
    //        created

    // DeleteEvent
    //    delete

    // DeploymentEvent
    //    deployment

    // DeploymentStatusEvent
    //    deployment_status

    // DownloadEvent
    //    download

    // FollowEvent
    //    follow

    // ForkEvent
    //    fork

    // ForkApplyEvent
    //    fork_apply

    // GistEvent
    //    gist

    // GollumEvent
    //    gollum

    // IssueCommentEvent
    //    issue_comment
    //        created

    // IssuesEvent
    //    issues
    //        assigned
    //        unassigned
    //        labeled
    //        unlabeled
    //        opened
    //        closed
    //        reopened

    // MemberEvent
    //    member
    //        added

    // MembershipEvent
    //    membership
    //        added
    //        removed

    // PageBuildEvent
    //    page_build

    // PublicEvent
    //    public

    // PullRequestEvent
    //    action
    //        assigned
    //        unassigned
    //        labeled
    //        unlabeled
    //        opened
    //        closed
    //        reopened
    //        synchronize
    //
    // If the action is "closed" and the merged key is false, the pull request was closed with unmerged commits.
    // If the action is "closed" and the merged key is true, the pull request was merged.

    // PullRequestReviewCommentEvent
    //    pull_request_review_comment
    //       created

    // PushEvent
    //    push

    // ReleaseEvent
    //    release
    //        published

    // RepositoryEvent
    //    repository
    //        created

    // StatusEvent
    //    status

    // TeamAddEvent
    //    team_add

    // WatchEvent
    //    watch
    //        started



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
