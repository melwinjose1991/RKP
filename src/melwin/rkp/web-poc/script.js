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
		console.log("Removed ", triple, err)
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
				console.log("Entry", entry)
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

var triples = []
function getTriples(graph){
	graph.search({
	    subject: graph.v("x"),
	    predicate: graph.v("y"),
	    object: graph.v("z")
	  }, function(err, list) {
			for(entry of list){
				console.log("Entry", entry)
				triple = {
					subject : entry["x"],
					predicate : entry["y"],
					object : entry["z"]
				}
				triples.push(triple)
			} 
	  }
	 ); 
}

var count = 0
function getNonExistingCount(graph, triples){
	count = 0
	for(entry of triples){
		graph.search(entry, 
			function(err, list) {
			  for(entry of list){
				  console.log(entry)
			  }
		  });
	}
}

g2.put(t1, function(err) {
	console.log("inserted triple1 into graph2", err);
	displayAll(g2)
});


g1.put([t1,t2], function(err) {
	console.log("inserted triple1,2 into graph1", err);
	displayAll(g1)
});

