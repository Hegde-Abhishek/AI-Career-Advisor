import pandas as pd
from surprise import SVD, Dataset, Reader
from surprise.model_selection import train_test_split

# Load interactions from a CSV file or a database
df = pd.read_csv('C:\Users\Abhishek\Downloads\interaction.py')

# Load the dataset
reader = Reader(rating_scale=(1, 5))
data = Dataset.load_from_df(df[['userId', 'jobId', 'interaction']], reader)

# Split the dataset for training and testing
trainset, testset = train_test_split(data, test_size=0.25)

# Use SVD algorithm
algo = SVD()
algo.fit(trainset)

# Save the trained model
import pickle
with open('svd_model.pkl', 'wb') as file:
    pickle.dump(algo, file)
