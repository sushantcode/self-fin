# Statement Processor Script

A python script that can take properly formatted CSV credit/debit card statement and parse them into the expense model used by the Sel-Fin app, which will then be easily uploaded in batch.

## How to use this?

```
python3 statementProcessor.py -i <path/to/input/file/.csv> -m <path/to/mapper/file/.json> -o <path/to/output/file/.json> -b <Bank_Name>
```
