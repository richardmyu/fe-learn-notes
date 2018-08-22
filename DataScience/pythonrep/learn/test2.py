print("input height")
height = input()
print("input weight")
weight = input()
bmi = weight/(height*height)
bmi = int(bmi)
if bmi < 18.5:
    print("过轻")
elif bmi >= 18.5 and bmi > 25:
    print("正常")
elif bmi >= 25 and bmi < 28:
    print("过重")
elif bmi >= 28 and bmi < 32:
    print("肥胖")
elif bmi >= 32:
    print("严重肥胖")
