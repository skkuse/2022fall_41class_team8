from unittest import TestCase, main
import sys
sys.path.append('../')
from ans import *
import user1

class MyTests(TestCase):
    def test_open_1(self):
        # pid = sys.argv[1]
        n = 3
        self.assertEqual(user1.main(n),ans1.main(n))

    def test_open_2(self):
        # pid = sys.argv[1]
        self.assertEqual(2,2)


if __name__=='__main__':
    main()