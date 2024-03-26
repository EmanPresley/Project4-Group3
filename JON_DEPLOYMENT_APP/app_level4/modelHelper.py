import pandas as pd
import datetime
import time
import pickle
import numpy as np

class ModelHelper():
    def __init__(self):
        pass

    def makePredictions(self, sex_flag, age, fare, familySize, pclass, embarked):
        pclass_1 = 0
        pclass_2 = 0
        pclass_3 = 0

        embarked_c = 0
        embarked_q = 0
        embarked_s = 0

        # parse pclass
        if (pclass == 1):
            pclass_1 = 1
        elif (pclass == 2):
            pclass_2 = 1
        elif (pclass == 3):
            pclass_3 = 1
        else:
            pass

        # parse embarked
        if (embarked == "C"):
            embarked_c = 1
        elif (embarked == "Q"):
            embarked_q = 1
        elif (embarked == "S"):
            embarked_s = 1
        else:
            pass

        input_pred = [[sex_flag, age, fare, familySize, pclass_1, pclass_2, pclass_3, embarked_c, embarked_q, embarked_s]]


        filename = 'finalized_model.sav'
        ada_load = pickle.load(open(filename, 'rb'))

        X = np.array(input_pred)
        preds = ada_load.predict_proba(X)
        preds_singular = ada_load.predict(X)

        return preds_singular[0]