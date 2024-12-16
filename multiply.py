def num_to_as(num):
    '''
    Do we know this will end?
    '''
    if num == 0:
        return ""
    return "a" + num_to_as(num - 1)