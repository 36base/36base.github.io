import os

data = open('result.txt', 'w')
css=''

for i in range(1, 211):
	css = '.doll-link a#number' + str(i) + """ {
 background-image: url(../images/portrait/""" + str(i) + """.png);
}

"""
	data.write(css)