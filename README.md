
This Project is for crawling web resource open as jsonp.

When you want to collect your facebook data into your website and save it for statistics... 
then this crawler could be helper to do the job.



Usage
-----------------------------------------------
===
var crawler = require(./jsonpcrawler);

...

	var jsonpCrawler = new crawler({
		host:'www.sample.site',
		port:80,
		path:'/path-to-list-service?_id=aaaa',
		params:'',
		pageParam:'page',
		callback:function(data){
			.... 
			// insert data to mongodb
			....
			// if you can continue....
			jsonpCrawler.next();
		}
	});

===

