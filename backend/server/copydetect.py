#must pip install copydetect
#from copydetect import CopyDetector, CodeFingerprint,compare_files

def copyrate(filename):
  test_dir="./"
  fp1 = CodeFingerprint(test_dir+filename, 25, 1)
  ##example answer code "sample.py"
  fp2 = CodeFingerprint(test_dir+"sample.py", 25, 1)
  token_overlap, similarities, slices = compare_files(fp1, fp2)
  #print percentage of similarities
  return int(similarities[0]*100)
  