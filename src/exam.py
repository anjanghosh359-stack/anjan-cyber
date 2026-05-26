# n1=int(input("enter a number:"))
# n2=int(input("enter a number:"))
# n3=int(input("enter a number:"))
# if n1>n2 and n1>n3:
#     print("highst number is",n1)
# elif n2>n1 and  n2>n3:
#     print("highst number is ",n2)
# else:
#     print ("highst number is",n3)


student_total = int(input("Student total number of classes: "))
student_present = int(input("Student total days present: "))

if student_total == 0:
    print("Total classes cannot be zero")
else:
    percentage = (student_present / student_total) * 100
    print("Attendance:", percentage, "%")

    if percentage >= 75:
        print("You are eligible")
    else:
        print("Not eligible")

