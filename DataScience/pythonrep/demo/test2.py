print("input height cm")
height = input()
print("input weight kg")
weight = input()
height = int(height)/100
weight = int(weight)
bmi = weight/(height*height)
print(bmi)

if bmi < 18.5:
    print("过轻")
elif bmi >= 18.5 and bmi < 25:
    print("正常")
elif bmi >= 25 and bmi < 28:
    print("过重")
elif bmi >= 28 and bmi < 32:
    print("肥胖")
else:
    print("严重肥胖")
