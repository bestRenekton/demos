#!/usr/bin/env python3
# -*- coding: utf-8 -*-



# =============================输入，输出========================================

# python 2.x才存在这个问题,用raw_input才可以输入中文，python 3合并了raw_input功能到到input，删去了raw_input
# name=raw_input('your name:')
# print(name)



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
# ==============================list=======================================
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
#================================循环=====================================
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

#=================================dict,set====================================
# dic={'a':1,'b':2}
# print (dic.get('c',-99))


# s = set([11, 22, 33,22,11])
# print(s) # set([33, 11, 22])
# print (list(s)[1]) # 11




# print(hex(1000))
# def add(a,b):
#     if not isinstance(a,(int,float)):
#         raise TypeError('bad type')
#     else:
#         return a+b
# a=input('a=')
# b=input('b=')
# print('a+b=',add(a,b))

#=============================函数========================================
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


#===============================参数======================================

# def calc(*numbers):
#     sum = 0
#     for n in numbers:
#         sum = sum + n * n
#     return sum
# arr=[1,2,3,4,5]
# print(calc(*arr))

# def person(name, age, **kw):
#     print('name:', name, 'age:', age, 'other:', kw)
# person(1,2,ty=1)


# def f1(a, b, c=0, *args,city=1, **kw):
#     print('a =', a, 'b =', b, 'c =', c, 'args =', args, 'kw =', kw)
# f1(1, 2, 3,4, num=99)

# def f2(a, b, c=0, *, d, **kw):
#     print('a =', a, 'b =', b, 'c =', c, 'd =', d, 'kw =', kw)
# f2(1, 2, d=99, ext=None,haha=2)

# def product(x,*arg):
#     for i in arg:
#         x=x*i
#     return x

# print('product(5) =', product(5))
# print('product(5, 6) =', product(5, 6))
# print('product(5, 6, 7) =', product(5, 6, 7))
# print('product(5, 6, 7, 9) =', product(5, 6, 7, 9))
# if product(5) != 5:
#     print('测试失败!')
# elif product(5, 6) != 30:
#     print('测试失败!')
# elif product(5, 6, 7) != 210:
#     print('测试失败!')
# elif product(5, 6, 7, 9) != 1890:
#     print('测试失败!')
# else:
#     try:
#         product()
#         print('测试失败!')
#     except TypeError:
#         print('测试成功!')

# ============================递归=========================================
# def fact(n):
#     if n==1:
#         return 1
#     return n * fact(n - 1)
# print(fact(10))
#============================汉诺塔============================
# def move(n, a, b, c): 
#     if n == 1:   # 如果a只有1盘子
#         print(a, '-->', c);   # 直接把盘子从a移到c
#     else:   # 如果a有n个盘子(n > 1)，那么分三步
#         move(n-1, a, c, b)   # 先把上面n-1个盘子，借助c，从a移到b
#         move(1, a, b, c)   # 再把最下面的1个盘子，借助b，从a移到c
#         move(n-1, b, a, c)   # 最后把n-1个盘子，借助a，从b移到c

# move(3,'A','B','C')  # 测试
#===========================切片============================
# def trim(s):
#     while s!='' and s[0]==' ':
#         s=s[1:]
#     while s!='' and s[-1]==' ':
#         s=s[:-1]
#     return s
# # 测试:
# if trim('hello  ') != 'hello':
#     print('测试失败!')
# elif trim('  hello') != 'hello':
#     print('测试失败!')
# elif trim('  hello  ') != 'hello':
#     print('测试失败!')
# elif trim('  hello  world  ') != 'hello  world':
#     print('测试失败!')
# elif trim('') != '':
#     print('测试失败!')
# elif trim('    ') != '':
#     print('测试失败!')
# else:
#     print('测试成功!')
#===========================迭代============================
# from collections import Iterable
# print( isinstance('abc', Iterable))

# for i,v in enumerate([4,4,5,4]):
#     print(i,v)

# for i,v in {'a':2,'b':4}.items():
#     print(i,v)

# def findMinAndMax(L):
#     if L==[]:
#         return (None,None)
#     min=L[0]
#     max=L[0]
#     for i in L:
#         if min>i:
#             min=i
#         elif max<i:
#             max=i
#     return (min,max)
# # 测试
# if findMinAndMax([]) != (None, None):
#     print('测试失败!')
# elif findMinAndMax([7]) != (7, 7):
#     print('测试失败!')
# elif findMinAndMax([7, 1]) != (1, 7):
#     print('测试失败!')
# elif findMinAndMax([7, 1, 3, 9, 5]) != (1, 9):
#     print('测试失败!')
# else:
#     print('测试成功!')



#===========================列表生成式============================
# import os # 导入os模块，模块的概念后面讲到
# print([d for d in os.listdir('.')])  # 遍历出当前目录下的所有文件和目录名

#===========================生成器============================
# g = (x * x for x in range(10))
# for i,e in enumerate(g):
#     print(i,e)


#===========================map,reduce,filter============================
# r=map(str,[1,2,2,3])
# print(r)

# def add(x,y):
#     return x+y
# r=reduce(add,[11,2,3])
# print(r)

# def is_odd(n):
#     return n % 2 == 1
# r=filter(is_odd, [1, 2, 4, 5, 6, 9, 10, 15])
# print(r)


#===========================装饰器============================
# def log(func):
#     def wrapper(*args, **kw):
#         print('call %s():' % func.__name__) # 函数名
#         return func(*args, **kw)
#     return wrapper

# @log
# def now():
#     print('aaaaa')
    
# now()

#===========================偏函数============================
# import functools
# int2 = functools.partial(int, base=2)
# print(int2('1000000'))
# # 等价于
# print(int('1000000',base=2))


#===========================面向对象============================
class Student(object):
    def __init__(self, name, score):
        self.name = name
        self.score = score

    def print_score(self):
        print('%s: %s' % (self.name, self.score))


bart = Student('Bart Simpson', 59)
lisa = Student('Lisa Simpson', 87)
bart.print_score()
lisa.print_score()

print(bart)
print(Student)