const getCategoryProducts = async function (req, res) {
   const {category} = req.params;

   const db = req.app.get('db');
   const fetchedProducts = await db.get_category_products(category);

   res.status(200).json(fetchedProducts)

};

module.exports = getCategoryProducts;