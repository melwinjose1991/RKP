from rdflib import Namespace, term, Literal
from rdflib.namespace import RDF, FOAF
from rdflib import Graph

n = Namespace("http://example.org/people/")
n.bob = term.URIRef(u'http://example.org/people/bob')
n.linda = term.URIRef(u'http://example.org/people/linda')

RDF.type = term.URIRef(u'http://www.w3.org/1999/02/22-rdf-syntax-ns#type')
FOAF.knows = term.URIRef(u'http://xmlns.com/foaf/0.1/knows')


g1 = Graph()
g1.add( (n.bob, RDF.type, FOAF.Person) )
g1.add( (n.bob, FOAF.name, Literal('bob')) )
g1.add( (n.bob, FOAF.knows, n.linda) )
g1.add( (n.bob, FOAF.title, Literal('Mr')) )
g1.add( (n.linda, FOAF.age, Literal(30)) )
g1.add( (n.linda, FOAF.name, Literal('Linda') ) )
print "G1:",g1.serialize(format='turtle')


g2 = Graph()
g2.add( (n.linda, RDF.type, FOAF.Person) ) 
g2.add( (n.linda, FOAF.title, Literal('Mrs') ) )
g2.add( (n.linda, FOAF.name, Literal('Linda') ) )
g2.add( (n.linda, FOAF.taught, n.bob) )
print "G2:",g2.serialize(format='turtle')


#g3 = g1+g2
#print "G1+G2",g3.serialize(format='turtle')

#g4 = g1^g2
#print "G1^G2",g4.serialize(format='n3')

g5 = g2-g1
print "G2-G1",g5.serialize(format='n3')

