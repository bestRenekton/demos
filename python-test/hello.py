#!/usr/bin/env python3
# -*- coding: utf-8 -*-

__doc__=' a test module '

__author__ = 'hahaha'

import sys

a=11
_b=22
def test():
    args = sys.argv
    if len(args)==1:
        print('Hello, world!')
    elif len(args)==2:
        print('Hello, %s!' % args[1])
    else:
        print('Too many arguments!')

if __name__=='__main__':
    test()