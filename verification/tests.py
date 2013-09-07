"""
TESTS is a dict with all you tests.
Keys for this will be categories' names.
Each test is dict with
    "input" -- input data for user function
    "answer" -- your right answer
    "explanation" -- not necessary key, it's using for additional info in animation.
"""

TESTS = {
    "Basics": [
        {
            "input": [120, [10, 20, 30]],
            "answer": 57,
            "explanation": [
                [120, 10, 1, 109],
                [109, 20, 1, 88],
                [88, 30, 1, 57],
                [57, "", "", ""]
            ]
        },
        {
            "input": [120, [200, 10]],
            "answer": 109,
            "explanation": [
                [120, 200, "", "not enough money"],
                [120, 10, 1, 109],
                [109, "", "", ""]
            ]
        },
        {
            "input": [100, [90, 3]],
            "answer": 9,
            "explanation": [
                [100, 90, 1, 9],
                [9, 3, "", "withdrawal must be divisible by 5"],
                [9, "", "", ""]
            ]
        },
        {
            "input": [100, [100, -10]],
            "answer": 100,
            "explanation": [
                [100, 100, "", "not enough money to cover banks commission"],
                [100, -10, "", "withdrawal must be positive"],
                [100, "", "", ""]
            ]
        },
        {
            "input": [100, [20, 20, 20, 20, 15]],
            "answer": 0,
            "explanation": [
                [100, 20, 1, 79],
                [79, 20, 1, 58],
                [58, 20, 1, 37],
                [37, 20, 1, 16],
                [16, 15, 1, 0],
                [0, "", "", ""]
            ]
        }

    ]
}
