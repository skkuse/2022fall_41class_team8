
##must "pip install pylama" first
import os

#os.system("pylama > output_file.txt")
def readability(filename):
  query="pylama ./"+filename
  stream=os.popen("pylama ./answer.py")
  stream=os.popen(query)
  output=stream.read()
  
  dicts={'pyflakes':[],'pycodestyle':[],'mypy':[],'pylint':[],'radon':[]}
  output_line=output.split("\n")
  
  output_tokens=[]
  for i in output_line:
  	output_tokens.append(i.split())
  #print(output_tokens)
  
  for tokens in output_tokens:
  	if len(tokens)>0:
  		if	tokens[-1]=='[pyflakes]':
  			dicts['pyflakes'].append(" ".join(tokens[2:-1]))
  		elif tokens[-1]=='[pycodestyle]':
  			dicts['pycodestyle'].append(" ".join(tokens[2:-1]))
  		elif tokens[-1]=='[mypy]':
  			dicts['mypy'].append(" ".join(tokens[2:-1]))
  		elif tokens[-1]=='[pylint]':
  			dicts['pylint'].append(" ".join(tokens[2:-1]))
  		elif tokens[-1]=='[radon]':
  			dicts['radon'].append(" ".join(tokens[2:-1]))
  
  return dicts
#####
#  dicts:{
#         'pyflakes':[], 'pycodestyle':[], 'mypy':[],'pylint':[],'radon':[] //each value of keys are list of string
#        }