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
	
	`Mohandas Karamchand Gandhi
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