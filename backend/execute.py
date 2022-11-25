#exec function will be used for execute button
#user can print something for debug
file_name = "answer.py"
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
#tc will be get in db
content = open(file_name).read()
#exec function must have argv that is input value of first test case

exec(content,{'argv':tc[0]["input"]})
