import unittest
import sys
import answer #import answer.py
#answer.py is user's function

class Module1Test(unittest.TestCase):

    def setUp(self):
        self.test_num=int(sys.argv[1])
        self.tc=[
            {
                "input":[1,2],
                "output":4
            },
            {
                "input":[4,5],
                "output":9
            }
          ]
       #tc will be get from db
    def test(self):
        output_user=answer.answer(self.tc[self.test_num]["input"])
        output_answer=self.tc[self.test_num]["output"]
        
        if self.test_num<2:
            msg="fail, expected answer is "+ str(output_answer)+"\nbut your output is "+str(output_user)
            self.assertEqual(output_user,output_answer,msg)
        else:
            self.assertEqual(output_user,output_answer)

if len(sys.argv)==2:
    unittest.main(argv=['first-arg-is-ignored'],exit=False)
    
#python3 testcase.py {tesecase_index}
