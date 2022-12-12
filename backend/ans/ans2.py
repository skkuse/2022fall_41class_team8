def main(arr):
    answer = [0,0]
    for idx,i in enumerate(arr):
        if answer[0]<i:
            answer[0]=i
            answer[1]=idx+1

            
    return answer