var DEBUG = true

var contents = [
	`Mohandas Karamchand Gandhi was born on 2 October 1869 in Porbandar. His father, 
	Karamchand Uttamchand Gandhi (1822–1885), served as the diwan (chief minister) 
	of Porbandar state`, 
	
	`Mahatma Gandhi was assassinated in 1948 on 30th of January by the Nathuram Godse, 
	a Hindu activist. His body was cremated at Raj Ghat, New Delhi`, 
	
	`Mohandas Karamchand Gandhi
	Born: October 2, 1869, Porbandar
	Died: 30 January 1948
	Father: Karamchand Gandhi
	Spouse: Kasturba Gandhi`, 
	
	`Mohandas Karamchand Gandhi
	Born: October 2, 1869, Porbandar
	Died: 30 January 1948`, 
	
	`Name: Mohandas Karamchand Gandhi
	Father: Karamchand Gandhi
	Spouse: Kasturba Gandhi`
];

var triples = [
	[
		{subject : "Q1001", predicate : "P569", object : "2 October 1869" },
		{subject : "Q1001", predicate : "P19", object : "Q6419912" },
		{subject : "Q1001", predicate : "P22", object : "Q11735530" },
		{subject : "Q11735530", predicate : "P569", object : "1822" },
		{subject : "Q11735530", predicate : "P570", object : "1885" },
		{subject : "Q11735530", predicate : "P106", object : "Q82955" }
	],
	[	
		{subject : "Q1001", predicate : "P157", object : "Q312553" },
		{subject : "Q312553", predicate : "P106", object : "Q82955" },
		{subject : "Q1001", predicate : "P570", object : "30 January 1948" },
		{subject : "Q1001", predicate : "P119", object : "Q1210083" },
		{subject : "Q1210083", predicate : "P131", object : "Q987" }
	],
	[
		{subject : "Q1001", predicate : "P569", object : "2 October 1869" },
		{subject : "Q1001", predicate : "P570", object : "30 January 1948" },
		{subject : "Q1001", predicate : "P22", object : "Q11735530" },
		{subject : "Q1001", predicate : "P26", object : "Q264908" }
	],
	[
		{subject : "Q1001", predicate : "P569", object : "2 October 1869" },
		{subject : "Q1001", predicate : "P570", object : "30 January 1948" }
	],
	[
		{subject : "Q1001", predicate : "P22", object : "Q11735530" },
		{subject : "Q1001", predicate : "P26", object : "Q264908" }
	]
];

var knowledge_profile = levelgraph(level("user-graph"));

var content_graphs = [];
content_graphs[0] = levelgraph(level("content-0"));
content_graphs[1] = levelgraph(level("content-1"));
content_graphs[2] = levelgraph(level("content-2"));
content_graphs[3] = levelgraph(level("content-3"));
content_graphs[4] = levelgraph(level("content-4"));

function initGraph(content_index){
	content_graphs[content_index].put(triples[content_index], function(err) {
		if(DEBUG) console.log("inserted triples into graph-", content_index);
		if(DEBUG) displayAll(content_graphs[content_index]);
	});
}

function displayAll(graph){
	graph.search({
	    subject: graph.v("x"),
	    predicate: graph.v("y"),
	    object: graph.v("z")
	  }, function(err, list) {
			for(object of list){
				if(DEBUG) console.log(object)
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
				if(DEBUG) console.log("graph-2", entry)
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

function add(graph, triple){
	graph.put(triple, function(err) {
		console.log("Added ", triple, err)
	});
}

function addTo(graph1, graph2){
	// graph1 =  graph1 + graph2
	graph2.search({
	    subject: graph2.v("x"),
	    predicate: graph2.v("y"),
	    object: graph2.v("z")
	  }, function(err, list) {
			for(entry of list){
				if(DEBUG) console.log("graph-2", entry)
				triple = {
					subject : entry["x"],
					predicate : entry["y"],
					object : entry["z"]
				}
				add(graph1, triple)
			} 
	  }
	 ); 
	displayAll(graph1)
}

function initOnLoad(){
	for (i = 0; i < 5; i++) { 
		initGraph(0);
		new_element = "<div id='Rank-"+i+"'>Article-"+i+" <button type='button'>Show >></button></div>"
		document.getElementById("articles_recommendations_div").innerHTML += new_element;
	}
}