var level = require("level-browserify");
var levelgraph = require("levelgraph");

var g1 = levelgraph(level("G1"));
var g2 = levelgraph(level("G2"));

var t1 = {
	subject : "a",
	predicate : "b",
	object : "c"
};

var t2 = {
	subject : "c",
	predicate : "d",
	object : "e"
};

function display(graph, subject_id) {
	graph.get({
		subject : subject_id
	}, function(err, list) {
		for(object of list){
			console.log(object)
		} 
	});
}

function displayAll(graph){
	graph.search({
	    subject: graph.v("x"),
	    predicate: graph.v("y"),
	    object: graph.v("z")
	  }, function(err, list) {
			for(object of list){
				console.log(object)
			} 
	  }
	); 
}

function remove(graph, triple){
	graph.del(triple, function(err) {
		console.log("@remove :: Removed ", triple)
	});
}

function graphDifference(graph1, graph2){
	// graph1 - graph2
	graph2.search({
	    subject: graph2.v("x"),
	    predicate: graph2.v("y"),
	    object: graph2.v("z")
	  }, function(err, list) {
			for(entry of list){
				console.log("@graphDifference :: Entry", entry)
				triple = {
					subject : entry["x"],
					predicate : entry["y"],
					object : entry["z"]
				}
				remove(graph1, triple)
			} 
	  }
	 ); 
	displayAll(graph1)
}

var triples = ""
function getTriples(graph){
	graph.search({
	    subject: graph.v("x"),
	    predicate: graph.v("y"),
	    object: graph.v("z")
	  }, function(err, list) {
			for(entry of list){
				console.log("@getTriples :: Entry", entry)
				triple = {
					subject : entry["x"],
					predicate : entry["y"],
					object : entry["z"]
				}
				triples += entry["x"]+"::"+entry["y"]+"::"+entry["z"]+"\n"
			} 
	  }
	 ); 
}

g2.put(t1, function(err) {
	console.log("inserted triple1 into graph2", err);
	//displayAll(g2)
});


g1.put([t1,t2], function(err) {
	console.log("inserted triple1,2 into graph1", err);
	//displayAll(g1)
});


function doDifference(){
	graphDifference(g1,g2)
	console.log("Done Differencing")
}
setTimeout(doDifference, 1000)


function doGetTriples(){
	getTriples(g1)
	console.log("Done getting triples")
}
setTimeout(doGetTriples, 2000)



var http = require('http');
http.createServer(function (req, res) {
      
	  res.writeHead(200, {'Content-Type': 'text/plain'});
	  res.end(triples);
}).listen(1337, "127.0.0.1");
	
console.log('Server running at http://127.0.0.1:1337/');
