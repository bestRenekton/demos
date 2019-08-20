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
# class Student(object):
#     def __init__(self, name, score):
#         self.name = name
#         self.score = score

#     def print_score(self):
#         print('%s: %s' % (self.name, self.score))


# bart = Student('Bart Simpson', 59)
# lisa = Student('Lisa Simpson', 87)
# bart.print_score()
# lisa.print_score()

# print(bart)
# print(Student)
# print(dir('asdf'))

#===========================__call__============================

# class Student(object):
#     def __init__(self, name):
#         self.name = name
#     def __str__(self):
#         return 'Student object (name=%s)' % self.name
#     __repr__ = __str__
#     def __call__(self):
#         print('12312312')

# s=Student('aaa')
# s()
# print(callable(s))


#===========================枚举============================
# from enum import Enum
# Month = Enum('Month', ('Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'))
# print(Month)


#===========================错误处理============================
# try:
#     print('try...')
#     r = 10 / 0
#     print('result:', r)
# except ZeroDivisionError as e:
#     print('except:', e)
# finally:
#     print('finally...')
# print('END')


#===========================调试============================
# def foo(s):
#     n = int(s)
#     assert n != 0, 'n is zero!'
#     return 10 / n
# print(foo('0'))    




# import logging
# logging.basicConfig(level=logging.INFO)
# s = '0'
# n = int(s)
# logging.info('n = %d' % n)
# print(10 / n)

#===========================读取文件============================
# try:
#     f=open('./test.txt','r')
#     str=f.read()
#     print(str)
# finally:
#     if f:
#         f.close()
        
# # 等价
# with open('./test.txt', 'r') as f:
#     print(f.read())
#     # for line in f.readlines():
#     #     print(line.strip()) # 把末尾的'\n'删掉

# with open('./bus.png', 'rb') as f:
#     print(f.read())
    
# with open('./test.txt', 'a+') as f:
#     str=f.read()
#     str=str+'\nHello, world!'
#     f.write(str)

#===========================StringIO============================

# from io import StringIO
# f=StringIO()
# f.write('aaaa')
# print(f.getvalue())

#===========================操作文件，目录============================
# import os
# print(os.name) # 如果是posix，说明系统是Linux、Unix或Mac OS X，如果是nt，就是Windows系统。
# print(os.uname()) # 详细，uname()函数在Windows上不提供
# print(os.environ) # 环境变量
# print(os.path.abspath('.')) # 查看当前目录的绝对路径

# os.mkdir('./testdir') #创建文件夹
# os.rmdir('./testdir') #删除文件夹
# os.rename('test.txt', 'test.py') #重命名

# #把两个路径合成一个时，不要直接拼字符串，而要通过os.path.join()函数，这样可以正确处理不同操作系统的路径分隔符
# os.path.join('/Users/michael', 'testdir') 

# # 同样的道理，要拆分路径时，也不要直接去拆字符串，而要通过os.path.split()函数；后一部分总是最后级别的目录或文件名
# os.path.split('/Users/michael/testdir/file.txt')
# # ('/Users/michael/testdir', 'file.txt')

# # os.path.splitext()可以直接让你得到文件扩展名，很多时候非常方便：
# os.path.splitext('/path/to/file.txt')
# # ('/path/to/file', '.txt')

# # 列出当前目录下的所有目录
# [x for x in os.listdir('.') if os.path.isdir(x)]

# # 列出.py文件
# [x for x in os.listdir('.') if os.path.isfile(x) and os.path.splitext(x)[1]=='.py']



#===========================进程============================
# import os
# print('Process (%s) start...' % os.getpid())# 20042
# # Only works on Unix/Linux/Mac:
# pid = os.fork() # 20043 和  0
# if pid == 0: #子
#     print('I am child process (%s) and my parent is %s.' % (os.getpid(), os.getppid()))
# else:# 父
#     print('I (%s) just created a child process (%s).' % (os.getpid(), pid))



# from multiprocessing import Process
# import os
# # 子进程要执行的代码
# def run_proc(name):
#     print('Run child process %s (%s)...' % (name, os.getpid()))
# if __name__=='__main__':
#     print('Parent process %s.' % os.getpid())
#     p = Process(target=run_proc, args=('test',))
#     print('Child process will start.')
#     p.start()# 子进程开始
#     p.join()# 等待子进程结束后再继续往下运行
#     print('Child process end.')



# from multiprocessing import Pool
# import os, time, random
# def long_time_task(name):
#     print('Run task %s (%s)...' % (name, os.getpid()))
#     start = time.time()
#     time.sleep(random.random() * 3)
#     end = time.time()
#     print('Task %s runs %0.2f seconds.' % (name, (end - start)))

# if __name__=='__main__':
#     print('Parent process %s.' % os.getpid())
#     p = Pool(4)
#     for i in range(5):
#         p.apply_async(long_time_task, args=(i,))
#     print('Waiting for all subprocesses done...')
#     p.close()
#     p.join()
#     print('All subprocesses done.')


# import subprocess

# print('$ nslookup www.python.org')
# r = subprocess.call(['nslookup', 'www.python.org'])
# print('Exit code:', r)
# # 等价 nslookup www.python.org



# from multiprocessing import Process, Queue
# import os, time, random
# # 写数据进程执行的代码:
# def write(q):
#     print('Process to write: %s' % os.getpid())
#     for value in ['A', 'B', 'C']:
#         print('Put %s to queue...' % value)
#         q.put(value)
#         time.sleep(random.random())
# # 读数据进程执行的代码:
# def read(q):
#     print('Process to read: %s' % os.getpid())
#     while True:
#         value = q.get(True)
#         print('Get %s from queue.' % value)
# if __name__=='__main__':
#     # 父进程创建Queue，并传给各个子进程：
#     q = Queue()
#     pw = Process(target=write, args=(q,))
#     pr = Process(target=read, args=(q,))
#     # 启动子进程pw，写入:
#     pw.start()
#     # 启动子进程pr，读取:
#     pr.start()
#     # 等待pw结束:
#     pw.join()
#     # pr进程里是死循环，无法等待其结束，只能强行终止:
#     pr.terminate()




#===========================线程============================
# import time, threading
# # 新线程执行的代码:
# def loop():
#     print('thread %s is running...' % threading.current_thread().name)
#     n = 0
#     while n < 5:
#         n = n + 1
#         print('thread %s >>> %s' % (threading.current_thread().name, n))
#         time.sleep(1)
#     print('thread %s ended.' % threading.current_thread().name)
# print('thread %s is running...' % threading.current_thread().name) # 永远返回当前线程的实例
# t = threading.Thread(target=loop, name='LoopThread') #不起名字就自动给线程命名为Thread-1，Thread-2
# t.start()
# t.join()
# print('thread %s ended.' % threading.current_thread().name)




# import time, threading
# # 假定这是你的银行存款:
# balance = 0
# def change_it(n):
#     # 先存后取，结果应该为0:
#     global balance
#     balance = balance + n
#     balance = balance - n
# def run_thread(n):
#     for i in range(100000):
#         change_it(n)
        
# # 使用threading.Lock
# lock = threading.Lock()
# def run_thread(n):
#     for i in range(100000):
#         # 先要获取锁:
#         lock.acquire()
#         try:
#             # 放心地改吧:
#             change_it(n)
#         finally:
#             # 改完了一定要释放锁:
#             lock.release()

# t1 = threading.Thread(target=run_thread, args=(5,))
# t2 = threading.Thread(target=run_thread, args=(8,))
# t1.start()
# t2.start()
# t1.join()
# t2.join()
# print(balance)




# import threading, multiprocessing
# def loop():
#     x = 0
#     while True:
#         x = x ^ 1

# for i in range(multiprocessing.cpu_count()):
#     t = threading.Thread(target=loop)
#     t.start()



#===========================datetime============================
# from datetime import datetime
# print(datetime.now()) #当前日期
# print(datetime(2015, 4, 19, 12, 20)) #指定日期
# print(datetime.now().strftime('%Y-%m-%d %H:%M:%S')) #格式
# print(datetime.now().timestamp()) #时间戳

#===========================collections============================
from collections import namedtuple,deque,defaultdict,OrderedDict
# Point=namedtuple('Point',['x','y'])
# p1=Point(1,2)
# print(p1.x)


# q=deque(['x','y'])
# q.append('z')
# q.appendleft('a')
# print(q) # deque(['a', 'x', 'y', 'z'])

# a=defaultdict(lambda:'a',{'key1':1})
# print(a["key1"])
# print(a["key2"])


# a=dict([('a',1),('b',2),('c',3)])
# b=OrderedDict([('a',1),('b',2),('c',3)])
# print(a,b) # ({'a': 1, 'c': 3, 'b': 2}, OrderedDict([('a', 1), ('b', 2), ('c', 3)]))

#===========================base64============================
# import base64
# b1=base64.b64encode(b'binary\x00string')
# b2=base64.b64encode('adsb')
# s=base64.b64decode(b'YmluYXJ5AHN0cmluZw==')
# print(b1,b2,s)# ('YmluYXJ5AHN0cmluZw==', 'YWRzYg==', 'binary\x00string')

# # 由于标准的Base64编码后可能出现字符+和/，在URL中就不能直接作为参数，所以又有一种"url safe"的base64编码，其实就是把字符+和/分别变成-和_：
# sb1=base64.urlsafe_b64encode(b'i\xb7\x1d\xfb\xef\xff')
# sb2=base64.urlsafe_b64decode('abcd--__')
# print(sb1,sb2) # ('abcd--__', 'i\xb7\x1d\xfb\xef\xff')



#===========================pillow============================

# from PIL import Image, ImageFilter

# im = Image.open('bus.png')
# # 获得图像尺寸:
# w, h = im.size
# print('Original image size: %sx%s' % (w, h))
# # 缩放到50%:
# im.thumbnail((w//2, h//2))
# print('Resize image to: %sx%s' % (w//2, h//2))
# # 把缩放后的图像用jpeg格式保存:
# im.save('thumbnail.png', 'png')

# # # 应用模糊滤镜:
# im2 = im.filter(ImageFilter.BLUR)
# im2.save('blur.png', 'png')

#===========================requests============================
# import requests
# r=requests.get('https://www.douban.com/')
# status=r.status_code
# text=r.text
# url=r.url
# print(url,status,text)

# # 带参数
# r=requests.get('https://www.douban.com/',params={'q': 'python', 'cat': '1001'})
# # 需要传入HTTP Header时，我们传入一个dict作为headers参数：
# r = requests.get('https://www.douban.com/', headers={'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_0 like Mac OS X) AppleWebKit'})
# # requests的方便之处还在于，对于特定类型的响应，例如JSON，可以直接获取：
# r=requests.get('https://xxxx.json/')
# print(r.json())
# # 要发送POST请求，只需要把get()方法变成post()，然后传入data参数作为POST请求的数据：
# r = requests.post('https://accounts.douban.com/login', data={'form_email': 'abc@example.com', 'form_password': '123456'})
# # 要在请求中传入Cookie，只需准备一个dict传入cookies参数：
# r = requests.get(url, cookies=cs)

#===========================chardet============================
# import chardet
# # 检测编码
# d1=chardet.detect(b'Hello, world!')
# d2=chardet.detect('离离原上草，一岁一枯荣'.encode('gbk'))
# print(d2,d2)
#  # {'confidence': 1.0, 'language': '', 'encoding': 'ascii'}
#  # confidence是正确率

#===========================psutil============================
# import psutil
# cpu=psutil.cpu_count() # CPU逻辑数量
# time=psutil.cpu_times() #统计CPU的用户／系统／空闲时间：
# # psutil.cpu_count(logical=False) # CPU物理核心
# # 2说明是双核超线程, 4则是4核非超线程
# print(cpu,time) # (4, scputimes(user=77064.97, nice=0.0, system=50409.65, idle=867724.4))


