https://pypi.org/project/multimetric/
pip3 install multimetric

https://pypi.org/project/memory-profiler/
pip install -U memory_profiler

https://pypi.org/project/copydetect/
pip install copydetect

https://github.com/klen/pylama
pip install pylama

https://docs.python.org/ko/3/library/unittest.html

## -Answer.py 
store user’s code here. The file name must be “answer.py” and function name will be “def answer”

## -Execute.py 
this code is for “실행” button. We run answer.py with first tc input. User can debug or print something with this.

## -Testcase.py 
this code is for “test” button. Python3 testcase.py 0 means return result of 0th testcase. This function should take 1 element as argv

## -Codedetect.py 
표절검사 return 표절률

## -Efficiency.py 
효율검사 includes 4 function about count of lines, halstead, control flow, data flow 

## -Readable.py 
가독성검사 return dictionary 
 dicts:{
        'pyflakes':[], 'pycodestyle':[], 'mypy':[],'pylint':[],'radon':[] //each value of keys are list of string
        }
