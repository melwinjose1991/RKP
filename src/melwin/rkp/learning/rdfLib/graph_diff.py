from rdflib import Namespace, term, Literal
from rdflib.namespace import RDF, FOAF
from rdflib import Graph

n = Namespace("http://example.org/people/")
n.bob = term.URIRef(u'http://example.org/people/bob')
n.linda = term.URIRef(u'http://example.org/people/linda')

# g1 is the knowledge profile of the user
g1 = Graph()
g1.add( (n.bob, RDF.type, FOAF.Person) )
g1.add( (n.bob, FOAF.name, Literal('bob')) )
g1.add( (n.bob, FOAF.knows, n.linda) )
g1.add( (n.bob, FOAF.title, Literal('Mr')) )
g1.add( (n.linda, FOAF.age, Literal(30)) )
g1.add( (n.linda, FOAF.name, Literal('Linda') ) )
print "=== G1:Knoledge Profile of User ===\n",g1.serialize(format='turtle')


# g2 is the knowledge contained in a article
g2 = Graph()
g2.add( (n.linda, RDF.type, FOAF.Person) ) 
g2.add( (n.linda, FOAF.title, Literal('Mrs') ) )
g2.add( (n.linda, FOAF.name, Literal('Linda') ) )
g2.add( (n.linda, FOAF.taught, n.bob) )
print "=== G2:Knowledge Contained in an article ===\n",g2.serialize(format='turtle')


# To find nodes/edges present in G2 but not in G1
g5 = g2-g1
print "=== G2-G1:find out nodes/edges in G2 but not in G1 ===\n",g5.serialize(format='n3')

