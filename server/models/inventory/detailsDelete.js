const detailsDelete = async function (req, res) {
   const {dbId} = req.body;

   const db = await req.app.get('db');

   db.delete_item(dbId)

   res.status(200).send('Successfully deleted database entry');
}

module.exports = detailsDelete;