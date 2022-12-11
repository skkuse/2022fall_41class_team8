import sys
import dummy_one
import json

args=[]

for i in range(int(sys.argv[1])):
    args.append(json.loads(sys.argv[i+2]))

print(dummy_one.main(*args))

