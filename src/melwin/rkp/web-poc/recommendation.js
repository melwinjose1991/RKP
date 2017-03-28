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
		{subject : "Q1001", predicate : "P26", object : "Q264908" }
	]
];

var id_name = {
		"Q1001" : "Mahathma Ganhi"
}

var triples_count = [6, 5, 4, 2, 1]

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
	setTimeout(showUserGraph1, 500);
}

// ***	Center Panel	***
function addToUserGraph(content_index){
	addTo(knowledge_profile, content_graphs[content_index])
}

function showContentGraph(content_index){
	var nodes_list = []
	var added_nodes = []
	for(entry of triples[content_index]){
		if(added_nodes.indexOf(entry["subject"])<0){
			nodes_list.push({id: entry["subject"], label: entry["subject"]})
			added_nodes.push(entry["subject"])
		}
		if(added_nodes.indexOf(entry["object"])<0){
			nodes_list.push({id: entry["object"], label: entry["object"]})
			added_nodes.push(entry["object"])
		}
	}
	var nodes = new vis.DataSet(nodes_list);

	var edges_list = []
	for(entry of triples[content_index]){
		edges_list.push({from: entry["subject"], to: entry["object"], label:entry["predicate"]})
	}
	var edges = new vis.DataSet(edges_list);

	var data = {
	    nodes: nodes,
	    edges: edges
	};

	var options = {};
	var container = document.getElementById('article_content_graph_div');
	var network = new vis.Network(container, data, options);
}

function showContentText(content_index){
	document.getElementById("article_content_text_div").innerHTML = contents[content_index];
	showContentGraph(content_index);
}

function initOnLoad(){
	for (i = 0; i < 5; i++) { 
		initGraph(i);
		show_button = "<button type='button' onClick='showContentText("+i+")'> Show >></button>"
		mark_button = "<button type='button' onClick='addToUserGraph("+i+")'> << Add </button>"
		new_element = "<div id='Rank-"+i+"'>"+mark_button+" Article-"+i+" "+show_button+"</div>"
		document.getElementById("articles_recommendations_div").innerHTML += new_element;
	}

	//var container = document.getElementById('users_knowledge_graph_div');
	//var network = new vis.Network(container, data, options);
}

var tmp_triples = [];
function getTriples(graph){
	tmp_triples = []
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
				tmp_triples.push(triple)
			} 
	  }
	 ); 
}

// stores the count of triples of user's knowledge 
// that are present in a content's graph
var triples_found = [];	
function getExistingCount(content_index, content_triples){
	triples_found[content_index]=0
	for(triple of content_triples){
		content_graphs[content_index].search(triple, 
			function(err, results) {
			  for(result of results){
				  console.log(result)
				  triples_found[content_index]++
			  }
		  });
	}
}

// gets the user's triples
function reRank1(){
	getTriples(knowledge_profile)
	setTimeout(reRank2, 500);
}

// gets the triple count existing in content's graph
function reRank2(){
	users_triples = tmp_triples.slice(0)
	for (i = 0; i < 5; i++) { 
		getExistingCount(i, users_triples)
	}
	setTimeout(reRank3, 500)
}

// gets the triple count non-existing in content's graph
var difference_map = {}
function reRank3(){
	for (i = 0; i < 5; i++) { 
		difference_map[i] = triples_count[i] - triples_found[i]
	}
	setTimeout(reRank4,500)
}

function reRank4() {
	var sorted_articles = [];
	for (var key in difference_map) sorted_articles.push([key, difference_map[key]]);
	sorted_articles.sort(function(a, b) {
	    a = a[1];
	    b = b[1];
	    return a < b ? 1 : (a > b ? -1 : 0);
	});
	
	document.getElementById("articles_recommendations_div").innerHTML="";
	for (var i = 0; i < sorted_articles.length; i++) {
	    var key = sorted_articles[i][0];
	    var value = sorted_articles[i][1];
	    console.log(key,value)
	    
	    show_button = "<button type='button' onClick='showContentText("+key+")'> Show >></button>"
		mark_button = "<button type='button' onClick='addToUserGraph("+key+")'> << Add </button>"
		new_element = "<div id='Rank-"+i+"'>"+mark_button+" Article-"+key+" "+show_button+"</div>"
		document.getElementById("articles_recommendations_div").innerHTML += new_element;
	}
}

// ***	Left Panel	***
function showUserGraph1(){
	getTriples(knowledge_profile)
	setTimeout(showUserGraph2, 500);
}

function showUserGraph2(){
	var nodes_list = []
	var added_nodes = []
	for(entry of tmp_triples){
		if(added_nodes.indexOf(entry["subject"])<0){
			nodes_list.push({id: entry["subject"], label: entry["subject"]})
			added_nodes.push(entry["subject"])
		}
		if(added_nodes.indexOf(entry["object"])<0){
			nodes_list.push({id: entry["object"], label: entry["object"]})
			added_nodes.push(entry["object"])
		}
	}
	var nodes = new vis.DataSet(nodes_list);

	var edges_list = []
	for(entry of tmp_triples){
		edges_list.push({from: entry["subject"], to: entry["object"], label:entry["predicate"]})
	}
	var edges = new vis.DataSet(edges_list);

	var data = {
	    nodes: nodes,
	    edges: edges
	};

	var options = {};
	var container = document.getElementById('users_knowledge_graph_div');
	var network = new vis.Network(container, data, options);
	
	tmp_triples = []
	setTimeout(reRank1, 500);
}

// ***	Right Panel	***
