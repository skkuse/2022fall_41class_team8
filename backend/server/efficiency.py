import os
import json

def count_line(filename):
  answer_file=open(filename,'r')
  #-2 means definition of function and return of function in skeleton code
  line_count=len(answer_file.readlines())-2
  return line_count


def halstead(filename):
  #print(output_json)
  query="multimetric.exe "+filename
#   query="python3 -m multimetric "+filename
  #stream=os.popen("multimetric answer.py")
  stream=os.popen(query)
  output=stream.read()
  output_json=json.loads(output)
  hs={}
  hs["hs_effort"]=output_json["overall"]["halstead_effort"]
  hs["hs_difficulty"]=output_json["overall"]["halstead_difficulty"]
  hs["hs_timerequired"]=output_json["overall"]["halstead_timerequired"]
  hs["hs_volume"]=output_json["overall"]["halstead_volume"]
  
  #I think halstead volume is metric for program volume that is program vocabulary
  return hs["hs_volume"]
  
  
def control_flow(filename):
  #I think cyclematic_complexity is metric for data flow complexity
  #smaller is good
#   query="python3 -m multimetric "+filename
#   query="python3 -m multimetric "+filename
  query="multimetric.exe "+filename
  #stream=os.popen("multimetric answer.py")
  stream=os.popen(query)
  output=stream.read()
  output_json=json.loads(output)
  return output_json["overall"]["cyclomatic_complexity"]


def data_flow(filename):
	#tc will be get in db
	tc=[
	      {
		  "input":[1,2],
		  "output":4
	      },
	      {
		  "input":[4,5],
		  "output":9
	      }
	    ]
	    
	last_line="\nanswer("+str(tc[0]["input"])+")"


	f =open("answer_copy.py",'w',encoding="utf8")
	f.write("import memory_profiler\n")
	f.write("\n@profile\n")

	with open(filename,"r") as answer:
		lines=answer.read()
		f.write(lines)
		f.write(last_line)

	f.close()
	stream=os.popen("python3 -m memory_profiler answer_copy.py")
	output=stream.read()
	output_voca=output.split()
	#print(output)
	byte_index=[]
	for i in range(len(output_voca)):
		if output_voca[i]=='MiB':
			byte_index.append(i-1)
	maximum_memory=0.0
	for index in byte_index:
		if float(output_voca[index])>maximum_memory:
			maximum_memory=float(output_voca[index])


	return maximum_memory


