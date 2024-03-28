import pandas as pd
import datetime
import time
import pickle
import numpy as np
from sqlalchemy import create_engine, inspect

class SQLHelper():
    def __init__(self):
        self.database_path = "titanic.sqlite"
        self.conn_string = f"sqlite:///{self.database_path}"

        # Create an engine that can talk to the database
        self.engine = create_engine(self.conn_string)

    def getDataFromDatabase(self, sex_flag, min_age, max_age):

        query = f"""
                SELECT
                    PassengerId,
                    Survived,
                    Pclass,
                    Name,
                    Sex,
                    Age,
                    SibSp,
                    Parch,
                    Ticket,
                    Fare,
                    Cabin,
                    Embarked
                FROM
                    titanic
                WHERE
                    Age >= {min_age}
                    AND Age <= {max_age}
                    AND Sex in ({sex_flag});
                    """

        print(query)

        df = pd.read_sql(query, con=self.engine)

        return df