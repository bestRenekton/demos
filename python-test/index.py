#!/usr/bin/env python3
# -*- coding: utf-8 -*-

# num1 =input('num1=')
# num2=input('num2=')
# num3=int(num1)*int(num2)


# # dfsff
# if num3>=0:
#     print('num1*num2=',num3)
# else:
#     print('num1*num2=',-num3)

# a=ord('啊')
# print(a)

# s1=72
# s2=85
# r = (s2-s1)/s1*100
# print('小明成绩提升了%.1f %%' % r)

# L = [
#    ['Apple', 'Google', 'Microsoft'],
#     ['Java', 'Python', 'Ruby', 'PHP'],
#     ['Adam', 'Bart', 'Lisa']
#     ]
# print(L[0][0])
# print(L[1][1])
# print(L[2][2])
# print('\n')
# for list in L:
#     for item in list:
#         print(item)

# weight=67
# height=1.85
# bmi=weight/(height*height)
# print('bmi=%.1f' % bmi)

# arr=range(101)
# all=0
# for item in arr:
#     all=all+item
# print(all)

# while True:
#     print('aa')


# n = 0
# while n < 10:
#     n = n + 1
#     if n % 2 == 0: # 如果n是偶数，执行continue语句
#         pass
#     else:
#         print(n)


# dic={'a':1,'b':2}
# print (dic.get('c',-99))


# s = set(1, 2, 3)
# print (s)


# print(hex(1000))
# def add(a,b):
#     if not isinstance(a,(int,float)):
#         raise TypeError('bad type')
#     else:
#         return a+b
# a=input('a=')
# b=input('b=')
# print('a+b=',add(a,b))


# import math
# def quadratic(a,b,c):
#     if not isinstance(a,(int,float)) and isinstance(b,(int,float)) and isinstance(c,(int,float)):
#         raise TypeError('bad type')
#     else:
#         if(b*b<4*a*c):
#             return '该方程无解'
#         else:
#             x1=(-b+math.sqrt(b*b-4*a*c))/(2*a)
#             x2=(-b-math.sqrt(b*b-4*a*c))/(2*a)
#             return x1,x2

# print('quadratic(2, 3, 1) =', quadratic(2, 3, 1))
# print('quadratic(1, 3, -4) =', quadratic(1, 3, -4))

# if quadratic(2, 3, 1) != (-0.5, -1.0):
#     print('测试失败')
# elif quadratic(1, 3, -4) != (1.0, -4.0):
#     print('测试失败')
# else:
#     print('测试成功')



# def calc(*numbers):
#     sum = 0
#     for n in numbers:
#         sum = sum + n * n
#     return sum
# arr=[1,2,3,4,5]
# print(calc(*arr))

def person(name, age, **kw):
    print('name:', name, 'age:', age, 'other:', kw)
person(1,2,ty=1)