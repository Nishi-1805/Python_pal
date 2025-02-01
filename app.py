from flask import Flask, render_template, request, jsonify
from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

# Initialize the OpenAI client
client = OpenAI(
   organization='org-V3oLOs8VdmdfRokHC9eY49JN',  
    project='proj_iLjAs9zi6OBpPwGCXrPqMysi'  
)

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/submit', methods=['POST'])
def submit_code():
    data = request.json
    code = data['code']  
    response = call_ai_api(code) 
    return jsonify(response)

@app.route('/submit-homework', methods=['POST'])
def submit_homework():
    data = request.json
    answer = data['answer']
    return jsonify({"message": "Great job! Keep practicing!"})

def call_ai_api(code):
    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  
            messages=[
                {"role": "user", "content": code}
            ]
        )
        return {"message": response.choices[0].message.content}
    except Exception as e:
        return {"message": f"Error: {str(e)}"}

if __name__ == '__main__':
    app.run(debug=True)