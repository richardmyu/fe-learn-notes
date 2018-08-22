#!/usr/bin/env python3
# -*- coding: utf-8 -*-

print("is less 20")
y1 = input()
if y1:
    print("is less 10")
    y2 = input()
    if y2:
        print("is less 5")
        y3 = input()
        print (y3)
        if y3:
            print("is less 3")
            y4 = input()
            if y4:
                print("is less 2")
                y5 = input()
                if y5:
                    print("1")
                else:
                    print("2")
            if not y4:
                print("is more 3")
                y6 = input()
                if y6:
                    print("4")
                else:
                    print("3")
        if not y3:
            print("is more 7")
            y7 = input()
            if y7:
                print("is more 9")
                y8 = input()
                if y8:
                    print("10")
                if not y8:
                    print("is 9")
                    y9 = input()
                    if y9:
                        print("9")
                    else:
                        print("8")
            if not y7:
                print("is less 7")
                y10 = input()
                if y10:
                    print("6")
                else:
                    print("7")
    if not y2:
        print("is less 15")
        y11 = input()
        if y11:
            print("is less 12")
            y12 = input()
            if y12:
                print("is 11")
                y13 = input()
                if y13:
                    print("11")
                else:
                    print("10")
            if not y12:
                print("is less 13")
                y14 = input()
                if y14:
                    print("12")
                if not y14:
                    print("is more 13")
                    y15 = input()
                    if y15:
                        print("14")
                    else:
                        print("13")
        if not y11:
            print("is less 17")
            y16 = input()
            if y16:
                print("is 16")
                y17 = input()
                if y17:
                    print("16")
                else:
                    print("15")
            if not y16:
                print("is less 18")
                y18 = input()
                if y18:
                    print("17")
                if not y18:
                    print("is more 18")
                    y19 = input()
                    if y19:
                        print("19")
                    else:
                        print("20")
