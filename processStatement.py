import sys
import csv


def processRow(row):
    trans_date = row[0]
    description = row[2]
    amount = row[3]
    category = row[4]
    print(
        f'Date: {trans_date}, Desc: {description}, Amount: {amount}, Category: {category}')


if __name__ == '__main__':
    file_name = sys.argv[1]

    with open(file_name, newline='') as file:
        file_reader = csv.reader(file)
        for row in file_reader:
            processRow(row)
