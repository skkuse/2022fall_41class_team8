import sys

def main(n): 
    a=1
    b=1
    for i in range(3,n+1):
        ans = a+b
        a=b
        b=ans
    
    return b

