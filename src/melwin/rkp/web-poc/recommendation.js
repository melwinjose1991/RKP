var DEBUG = true

var contents = [
	`Mohandas Karamchand Gandhi was born on 2 October 1869 in Porbandar. His father, 
	Karamchand Uttamchand Gandhi (1822–1885), served as the diwan (chief minister) 
	of Porbandar state`, 
	
	`Mahatma Gandhi was assassinated in 1948 on 30th of January by the Nathuram Godse, 
	a Hindu activist. His body was cremated at Raj Ghat, New Delhi`, 
	
	`Mohandas Karamchand Gandhi</br>
	Born: October 2, 1869, Porbandar</br>
	Died: 30 January 1948</br>
	Father: Karamchand Gandhi</br>
	Spouse: Kasturba Gandhi</br>`, 
	
	`Mohandas Karamchand Gandhi</br>
	Born: October 2, 1869, Porbandar</br>
	Died: 30 January 1948</br>`, 
	
	`Name: Mohandas Karamchand Gandhi</br>
	Father: Karamchand Gandhi</br>
	Spouse: Kasturba Gandhi</br>`
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

// Graph Initialization Functions
function initGraph(content_index){
	content_graphs[content_index].put(triples[content_index], function(err) {
		if(DEBUG) console.log("inserted triples into graph-", content_index);
		if(DEBUG) displayAll(content_graphs[content_index]);
	});
}

// Display Functions
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

// Graph Difference Functions
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

// Graph add Functions
function add(graph, triple){
	graph.put(triple, function(err) {
		console.log("Added ", triple, err)
	});
}

function addTo(graph1, graph2){
	// graph1 = graph1 + graph2
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

// Center Panel Functions
function addToUserGraph(content_index){
	addTo(knowledge_profile, content_graphs[content_index])
	showUserGraph()
}

function showContentText(content_index){
	document.getElementById("article_content_text_div").innerHTML = contents[content_index];
}

function initOnLoad(){
	for (i = 0; i < 5; i++) { 
		initGraph(i);
		show_button = "<button type='button' onClick='showContentText("+i+")'> Show >></button>"
		mark_button = "<button type='button' onClick='addToUserGraph("+i+")'> << Add </button>"
		new_element = "<div id='Rank-"+i+"'>"+mark_button+" Article-"+i+" "+show_button+"</div>"
		document.getElementById("articles_recommendations_div").innerHTML += new_element;
	}
}

// Left Panel Functions
function showUserGraph(){
	document.getElementById("users_knowledge_graph_div").innerHTML = knowledge_profile;
}
