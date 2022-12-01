import os
import openai
import re

openai.api_key = "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"

code_tail = " \n\n\"\"\" Explanation of what the code does"

def get_explanation(file_name):
  with open(file_name, 'r') as f:
      input_code = f.read() + code_tail

  response = openai.Completion.create(
    model="code-davinci-002",
    prompt=input_code,
    temperature=0,
    max_tokens=64,
    top_p=1.0,
    frequency_penalty=0.0,
    presence_penalty=0.0,
    stop=["\"\"\""]
  )
  print(response["choices"][0].text)
  return response["choices"][0].text
