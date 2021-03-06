var express = require('express');
var router = express.Router();
var db = require('../db');
var axios = require('axios');
var config = require('config')
var redashConf = config.get('redash');

/* GET home page. */
router.get('/api/:keyword', function(req, res, next) {
  var keyword = req.params.keyword;
  var query = "SELECT * FROM map WHERE keyword = ?";
  var outputJson = {
    status: "err",
    result: {
      data : []
    }
  };
  db.query(query, keyword, function(err, rows){
    var idQuery;
    if(rows.lenght == 0){
      return;
    }
    try{
      idQuery = rows[0].id_query;
      var redashUrl = "https://dashboard.bazarafra.com/api/queries/"+idQuery+"/results.json?api_key="+redashConf.userKey;
      axios.get(redashUrl).
      then(function(response){
        outputJson.status = "ok";
        outputJson.result.data = response.data.query_result.data.rows;
        res.json(outputJson);
      }).
      catch(function(err){
        res.json(outputJson);
      });
    } catch(err){
      res.json(outputJson);
    }
  });

});


module.exports = router;
