def move(n, a, b, c):
    if n == 1:
        print("#1", a, b, c, n)
        print(a, "-->", c, n)
    else:
        print("#2", a, b, c, n)
        move(n-1, a, c, b)
        print("#3", a, b, c, n)
        print(a, "-->", c, n)
        move(n-1, b, a, c)
        print("#4", a, b, c, n)


move(3, 'A', 'B', 'C')

''' #2 A B C 3
#2 A C B 2
#1 A B C 1
A --> C 1
#3 A C B 2
A --> B 2
#1 C A B 1
C --> B 1
#4 A C B 2
#3 A B C 3
A --> C 3
#2 B A C 2
#1 B C A 1
B --> A 1
#3 B A C 2
B --> C 2
#1 A B C 1
A --> C 1
#4 B A C 2
#4 A B C 3 '''