import os
import json

stream=os.popen("multimetric answer.py")
output=stream.read()
output_json=json.loads(output)



def count_line():
  answer_file=open('answer.py','r')
  #-2 means definition of function and return of function in skeleton code
  line_count=len(answer_file.readlines())-2
  return line_count


def halstead():
  #print(output_json)
  hs={}
  hs["hs_effort"]=output_json["overall"]["halstead_effort"]
  hs["hs_difficulty"]=output_json["overall"]["halstead_difficulty"]
  hs["hs_timerequired"]=output_json["overall"]["halstead_timerequired"]
  hs["hs_volume"]=output_json["overall"]["halstead_volume"]
  
  #I think halstead volume is metric for program volume that is program vocabulary
  return hs["hs_volume"]
  
  
def control_flow():
  #I think cyclematic_complexity is metric for data flow complexity
  #smaller is good
  return output_json["overall"]["cyclomatic_complexity"]


def data_flow():
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

	with open("answer.py","r") as answer:
		lines=answer.readlines()
		for line in lines:
			f.write(line)
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


print(count_line())
print(halstead())
print(control_flow())
print(data_flow())
