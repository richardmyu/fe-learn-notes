def t(str, n):
    if n > 0:
        if str[:n] is " ":
            n = n+1
            t(str, n)
        else:
            return n
    else:
        if str[:n] is " ":
            n = n-1
            t(str, n)
        else:
            return n


def trim(str):
    h = t(str, 2)
    f = t(str, -2)
    return str[h:f]


trim("  z xc  ")
