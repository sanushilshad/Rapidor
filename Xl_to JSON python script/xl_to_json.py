import pandas as pd
import json
import sys
args=sys.argv
def xl_json():
    print(args[1])
    df=pd.read_excel(args[1])
    dict_1={}

    for index, data in df.iterrows():
        dict_1[(data['Primary Key'])] = data['Rapidor']
    
    with open('mapping.json', 'w') as fp:
        json.dump(dict_1, fp,  indent=4)
xl_json()
    
