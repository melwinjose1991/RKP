var db = levelgraph(level("yourdb"));

var triple1 = {
	subject : "a",
	predicate : "b",
	object : "c"
};

var triple2 = {
	subject : "a",
	predicate : "d",
	object : "e"
};

function display(subject_id) {
	db.get({
		subject : subject_id
	}, function(err, list) {
		for(object of list){
			console.log(object)
		} 
	});

}

db.put(triple1, function(err) {
	console.log("inserted triple1");
});

db.put(triple2, function(err) {
	console.log("inserted triple2");
	display("a");
});
