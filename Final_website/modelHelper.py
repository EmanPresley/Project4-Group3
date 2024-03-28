import pandas as pd
import datetime
import time
import pickle
import numpy as np

class ModelHelper():
    def __init__(self):
        pass

    def makePredictions(self, inp_row):

        input_pred = [inp_row]


        filename = 'final_model_lr.h5'
        final_model = pickle.load(open(filename, 'rb'))

        X = pd.DataFrame(input_pred)
        preds = final_model.predict_proba(X)
        preds_singular = final_model.predict(X)
        
        rtn_data = dict(zip(final_model.classes_, preds[0]))
        
        rtn_data = list(sorted(rtn_data.items(), key=lambda item: item[1], reverse = True))

        return rtn_data