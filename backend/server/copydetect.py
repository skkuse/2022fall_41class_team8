#must pip install copydetect
import os
from copydetect import CopyDetector, CodeFingerprint,compare_files

def copyrate(filename):
  test_dir="./"
  fp1 = CodeFingerprint(os.path.join(test_dir,filename), 25, 1)
  ##example answer code "sample.py"
  # fp2 = CodeFingerprint(test_dir+"sample.py", 25, 1)
  pid = filename.split('user')[1].split('.py')[0]
  fp2 = CodeFingerprint(os.path.join("ans","ans"+pid+'.py'), 25, 1)
  token_overlap, similarities, slices = compare_files(fp1, fp2)
  #print percentage of similarities
  return int(similarities[0]*100)
  
