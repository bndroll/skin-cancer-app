import tensorflow as tf
import keras
import numpy as np
from PIL import Image
from flask import Flask, request
from skimage import transform
import requests
from io import BytesIO

app = Flask(__name__)

global model
model = keras.models.load_model('model')


def load(filename):
    np_image = Image.open(filename)
    np_image = np.array(np_image).astype('float32') / 255
    np_image = transform.resize(np_image, (80, 80, 3))
    np_image = np.expand_dims(np_image, axis=0)
    return np_image


@app.route('/predict', methods=['POST'])
def predict():
    input_json = request.get_json(force=True)
    response = requests.get(input_json['url'])
    image = load(BytesIO(response.content))
    res = model.predict(image)
    list = res.tolist()[0]
    maxEl = max(list)

    return {
               "max": maxEl,
               "index": list.index(maxEl)
           }, 200


if __name__ == '__main__':
    app.run(host='0.0.0.0')
