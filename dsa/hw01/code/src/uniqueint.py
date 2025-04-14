
import os

class UniqueInt:

    OFFSET = 1023
    RANGE = 2047 + 1

    def __init__(self):
        self.seen = [False] * UniqueInt.RANGE

    def processFile(self, inputFilePath, outputFilePath):
        self.seen = [False] * UniqueInt.RANGE

        with open(inputFilePath, 'r') as infile:
            for line in infile:
                item = self.readNextItemFromLine(line)
                if item is not None:
                    index = item + UniqueInt.OFFSET
                    self.seen[index] = True

        with open(outputFilePath, 'w') as outfile:
            for i in range(UniqueInt.RANGE):
                if self.seen[i]:
                    outfile.write(f"{i - UniqueInt.OFFSET}\n")

        print(f"Loaded: {inputFilePath}")
        print(f"Saved to: {outputFilePath}")

    def readNextItemFromLine(self, line):
        stripped = line.strip()
        if stripped == "":
            return None

        parts = stripped.split()
        if len(parts) != 1:
            return None

        try:
            num = int(parts[0])
            if num < -1023 or num > 1023:
                return None
            return num
        except ValueError:
            return None


if __name__ == "__main__":
    input_folder = "../../sample_inputs"
    output_folder = "../../sample_results"

    processor = UniqueInt()

    for file_name in os.listdir(input_folder):
        if file_name.endswith(".txt"):
            input_path = os.path.join(input_folder, file_name)
            output_file = file_name + "_results.txt"
            output_path = os.path.join(output_folder, output_file)
            processor.processFile(input_path, output_path)