#!/usr/bin/env python
# coding: utf-8


import sys
import numpy as np
import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("UserExpenses.csv")
sex_dummy = pd.get_dummies(df['Sex'])
df = pd.concat([df, sex_dummy], axis=1)
df = df.drop(['Sex'], axis=1)
student_dummy = pd.get_dummies(df['Student'])
df = pd.concat([df, student_dummy], axis=1)

df.rename(columns={'No': 'Professional',
             'Yes': 'Students'}, inplace=True)





df = df.drop(['Student'], axis=1)





country_dummy = pd.get_dummies(df['Country'])




df = pd.concat([df, country_dummy], axis=1)





df = df.drop(['Country'], axis=1)




month_dummy = pd.get_dummies(df['Month'])





df = pd.concat([df, month_dummy], axis=1)



df = df.drop(['Month'], axis=1)




from sklearn.model_selection import train_test_split


X = df[['primaryIncome', 'Age', 'female', 'male',
   'Professional','Students','Canada',
   'England','India','United States',
   'April', 'February', 'January', 'June', 'March', 'May']]



y = df['Total_Expenses']



X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4)



from sklearn.linear_model import LinearRegression
lm = LinearRegression()
lm = lm.fit(X_train,y_train)



coeff_df = pd.DataFrame(lm.coef_,X.columns,columns=['Coefficient'])



predictions = lm.predict(X_test)



df["Total_Expenses"]=np.log(df['Total_Expenses'])





coeff_df = pd.DataFrame(lm.coef_,X.columns,columns=['Coefficient'])



y = df['Total_Expenses']





X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.4)




from sklearn.linear_model import LinearRegression
lm = LinearRegression()
lm = lm.fit(X_train,y_train)
coeff_df = pd.DataFrame(lm.coef_,X.columns,columns=['Coefficient'])

predictions = lm.predict(X_test)

dfnew = pd.read_csv(sys.argv[1])
print(sys.argv[1])
TotalExp = lm.predict(dfnew)*100
print(TotalExp)

