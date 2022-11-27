import os
import openai
import re

openai.api_key = "API_KEY"

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
  )
  return response["choices"][0].text
