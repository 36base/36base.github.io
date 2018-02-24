import os

data = open('result1.txt', 'w')
css=''

for i in range(1001, 1009):
	css = '.doll-link a#number' + str(i) + """ {
 background-image: url(../images/dolls/""" + str(i) + """.png);
  background-position: 54% 4%;
}

.doll-link a#number""" + str(i) + """:hover {
  background-image: url(..//images/dolls/""" + str(i) + """_1.png);
}

"""
	data.write(css)