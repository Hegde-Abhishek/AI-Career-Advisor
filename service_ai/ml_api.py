from flask import Flask, request, jsonify
import pickle

app = Flask(__name__)
model = pickle.load(open('svd_model.pkl', 'rb'))

@app.route('/predict', methods=['POST'])
def predict():
    user_id = request.json['userId']
    job_id = request.json['jobId']
    pred = model.predict(user_id, job_id)
    return jsonify({'score': pred.est})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
