import os
import json
import csv
import argparse
from datetime import date


class StatementProcessor:
    def __init__(self, mapper_file, input_file):
        self.table = "expense"
        self.payment_method = "Discover"
        with open(mapper_file) as file:
            self.mapper = json.load(file)

        with open(input_file, newline='') as file:
            try:
                csv_reader = csv.reader(file)
                records = []
                for row in csv_reader:
                    records.append(row)
                self.records = records[1:]
            except Exception as e:
                raise e

    def format_record(self, category, date, location, amount, remarks):
        return {
            "category": category,
            "date": date,
            "location": location,
            "amount": amount,
            "payment_method": self.payment_method,
            "remarks": remarks
        }

    def format_date(self, date):
        date_parts = date.split("/")
        formated_date = date_parts[2] + "-" + \
            date_parts[0] + "-" + date_parts[1]
        return formated_date

    def is_valid_record(self, amount):
        amount = float(amount)
        if amount < 0:
            return False
        return True

    def map_category(self, category):
        if category in self.mapper["category"]:
            return self.mapper["category"][category]
        else:
            return "Others"

    def map_description(self, description):
        for key in self.mapper["description"]:
            if description.startswith(key):
                return self.mapper["description"][key]["location"], self.mapper["description"][key]["remarks"]
        return description, ""

    def add_item(self, data, item):
        existing_keys = list(data["items"].keys())
        item_key = item["date"][:7]
        if item_key in existing_keys:
            data["items"][item_key].append(item)
        else:
            data["items"][item_key] = []
            data["items"][item_key].append(item)
        return data

    def process_records(self):
        processed_data = {
            "table": self.table,
            "items": {}
        }
        for record in self.records:
            try:
                trans_date = self.format_date(record[0])
                description = record[2]
                amount = record[3]
                category = self.map_category(record[4])

                if self.is_valid_record(amount):
                    location, remarks = self.map_description(description)
                    formatted_item = self.format_record(
                        category, trans_date, location, amount, remarks)
                    processed_data = self.add_item(
                        processed_data, formatted_item)
            except Exception as e:
                raise e

        return processed_data

    def write_output_to_file(self, data):
        relative_path = "../public/statement_output/"
        output_path = os.path.abspath(relative_path)
        curr_date = str(date.today())
        filename = f'{curr_date}.json'
        full_path = os.path.join(output_path, filename)

        with open(full_path, 'w') as output_file:
            json.dump(data, output_file)


if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument("-mf", "--mapper_file",
                        default="mapper.json",
                        required=False,
                        help="Mapper json file to parse and map description from statement.")
    parser.add_argument("-if", "--input_file", required=True,
                        help="Input csv statement file.")
    args = parser.parse_args()
    mapper_file = args.mapper_file
    input_file = args.input_file
    statementProcessor = StatementProcessor(mapper_file, input_file)
    data = statementProcessor.process_records()
    statementProcessor.write_output_to_file(data)
