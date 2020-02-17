from flask import Flask, request, jsonify, render_template
from fastai.vision import *

app = Flask(__name__,
    static_folder='client/build/static',
    template_folder='client/build')

learn = None

@app.before_first_request
def _load_model():
    global learn
    learn = load_learner('.')

@app.route('/')
def hello():
    return render_template('index.html')

@app.route('/classify', methods=['POST'])
def classify():
    file = request.files['file'] 
    img = open_image(file)
    pred_class, pred_idx, outputs = learn.predict(img)
    return jsonify({
        'prediction': str(pred_class)
    })