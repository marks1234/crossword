# **Crossword Solver**

This solution is for the `crosswordSolver` function, a challenge to solve an empty crossword puzzle based on specific rules. The goal is to fill in the crossword puzzle with a given list of words while adhering to the constraints provided.

---

## **Problem Statement**
The `crosswordSolver` function takes:
1. **An empty puzzle** (string format):  
   - `numbers` represent the number of words starting at specific positions.  
   - `.` (dots) represent spaces that do not need to be filled.  
   - `\n` represents newlines, indicating rows in the puzzle.

2. **A list of words** to fill the crossword puzzle.

### **Function Behavior**
- The function attempts to fill the crossword with the provided words while meeting the constraints:
  - All numbered slots must be filled exactly.
  - Words cannot overlap incorrectly.
  - Words cannot be repeated.
- If the input puzzle or word list does not lead to a unique solution, the function prints **`Error`**.

---

## **Usage**
Example input and output for the function:

### **Input**
```javascript
const emptyPuzzle = `2001
0..0
1000
0..0`;

const words = ['casa', 'alan', 'ciao', 'anta'];

crosswordSolver(emptyPuzzle, words);
```

### **Output**
```text
casa
i..l
anta
o..n
```

---

## **Key Features**
1. **Validates Input**:
   - Ensures the puzzle structure and word list comply with the problem requirements.
   - Handles edge cases where no unique solution exists.

2. **Filling Logic**:
   - Identifies slots (rows and columns) to fill words based on the numbering.
   - Ensures that the words fit without conflicts.

3. **Error Handling**:
   - Detects invalid puzzles or ambiguous solutions and prints **`Error`**.

---

## **Learning Objectives**
This exercise focuses on:
- Parsing and validating structured input data.
- Solving constraint-based problems programmatically.
- Implementing backtracking or similar algorithms to ensure correct placement.
- Error handling for invalid or ambiguous scenarios.

---

This solution provides a robust approach to filling crossword puzzles programmatically. Happy solving! 😊