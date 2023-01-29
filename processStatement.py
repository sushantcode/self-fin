import sys
import csv

if __name__ == '__main__':
    file_name = sys.argv[1]

    with open(file_name, newline='') as file:
        file_reader = csv.reader(file)
        for row in file_reader:
            print(row[0])
