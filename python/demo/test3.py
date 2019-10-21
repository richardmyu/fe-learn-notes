def m_quadratic(a, b, c):
  if not isinstance(a, (int, float)):
    raise TypeError('bad operand type')
  if not isinstance(b, (int, float)):
    raise TypeError('bad operand type')
  if not isinstance(c, (int, float)):
    raise TypeError('bad operand type')
  if a == 0:
    raise TypeError('方程不成立')
  sq = b*b-4*a*c
  if sq >= 0:
    num1 = ((-b) + math.sqrt(sq))/(2*a)
    num2 = ((-b) - math.sqrt(sq))/(2*a)
    return num1, num2
  else:
    raise TypeError('方程没有实根')


x, y = m_quadratic(1, 2, 3)
print(x, y)
