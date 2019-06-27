const offerCreate = async function(req, res) {
   const {offerStatus, primaryUserId, secondaryUserId, primaryItemsIds, secondaryItemId, userMessage, userMessageRemark} = req.body
   console.log(req.body)
   
}

module.exports = offerCreate;