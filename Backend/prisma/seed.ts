import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const initialQuestions = [
  {
    id: 'dsa-1',
    title: 'Two Sum (Optimal Hash Map Approach)',
    description: `Given an array of integers \`nums\` and an integer \`target\`, return the indices of the two numbers such that they add up to \`target\`.

You may assume that each input would have exactly one solution, and you may not use the same element twice. Aim for O(N) time complexity using a Hash Map.`,
    roundType: 'dsa',
    difficulty: 'Easy',
    category: 'Arrays & Hashing',
    tags: JSON.stringify(['Arrays', 'Hash Table', 'Two Pointers']),
    companyTags: JSON.stringify(['Google', 'Amazon', 'Meta', 'Microsoft', 'Bloomberg']),
    frequency: 'High',
    acceptanceRate: '54.2%',
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(N)',
    hints: JSON.stringify([
      'A brute force approach scans all pairs in O(N^2). Can you do it in one pass?',
      'As you iterate, compute needed = target - nums[i]. Check if needed exists in a Hash Map.'
    ]),
    starterCode: `function twoSum(nums: number[], target: number): number[] {
  // TODO: Implement solution
  return [];
}`,
    languageStarterCodes: JSON.stringify({
      java: `import java.util.*;\n\nclass Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // TODO: Implement solution\n        return new int[]{};\n    }\n}`,
      python: `class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        # TODO: Implement solution\n        return []\n`,
      cpp: `#include <vector>\n#include <unordered_map>\nusing namespace std;\n\nclass Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // TODO: Implement solution\n        return {};\n    }\n};`
    }),
    functionName: 'twoSum',
    testCases: JSON.stringify([
      { id: 'tc-1', input: 'nums = [2, 7, 11, 15], target = 9', expectedOutput: '[0, 1]', description: 'Basic test case: 2 + 7 = 9' },
      { id: 'tc-2', input: 'nums = [3, 2, 4], target = 6', expectedOutput: '[1, 2]', description: 'Indices not at 0: 2 + 4 = 6' },
      { id: 'tc-3', input: 'nums = [3, 3], target = 6', expectedOutput: '[0, 1]', description: 'Duplicate numbers: 3 + 3 = 6' }
    ]),
    rubricCriteria: JSON.stringify([
      'Identifies optimal O(N) Hash Map approach vs O(N^2) brute force',
      'Handles duplicate numbers and edge cases correctly',
      'Explains Time & Space Complexity clearly'
    ])
  },
  {
    id: 'dsa-2',
    title: 'Reverse Linked List (Iterative & Recursive)',
    description: `Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.

Analyze both the iterative in-place pointer reversal and recursive call-stack approaches.`,
    roundType: 'dsa',
    difficulty: 'Easy',
    category: 'Linked Lists',
    tags: JSON.stringify(['Linked List', 'Recursion', 'Two Pointers']),
    companyTags: JSON.stringify(['Apple', 'Amazon', 'Microsoft', 'Uber']),
    frequency: 'High',
    acceptanceRate: '76.8%',
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(1) iterative / O(N) recursive',
    hints: JSON.stringify([
      'Maintain three pointers: prev (null), curr (head), and nextTemp.',
      'Before advancing curr.next, store the reference to the next node.'
    ]),
    starterCode: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  // TODO: Implement solution
  return null;
}`,
    functionName: 'reverseList',
    testCases: JSON.stringify([
      { id: 'tc-1', input: 'head = [1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]', description: 'Standard 5-node list' },
      { id: 'tc-2', input: 'head = [1,2]', expectedOutput: '[2,1]', description: 'Two-node list' },
      { id: 'tc-3', input: 'head = []', expectedOutput: '[]', description: 'Empty list' }
    ]),
    rubricCriteria: JSON.stringify([
      'Avoids memory leaks and properly manages head and null terminating pointer',
      'Explains difference between O(1) iterative space and O(N) call stack recursion'
    ])
  },
  {
    id: 'dsa-3',
    title: 'Valid Parentheses (Stack Matching)',
    description: `Given a string \`s\` containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.

An input string is valid if:
1. Open brackets must be closed by the same type of brackets.
2. Open brackets must be closed in the correct order.
3. Every close bracket has a corresponding open bracket of the same type.`,
    roundType: 'dsa',
    difficulty: 'Easy',
    category: 'Stack',
    tags: JSON.stringify(['String', 'Stack']),
    companyTags: JSON.stringify(['Meta', 'Google', 'Amazon', 'LinkedIn']),
    frequency: 'High',
    acceptanceRate: '41.1%',
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(N)',
    hints: JSON.stringify([
      'Use a stack to track open brackets.',
      'When encountering a closing bracket, check if the stack top is its matching open bracket.'
    ]),
    starterCode: `function isValidParentheses(s: string): boolean {
  // TODO: Implement solution
  return false;
}`,
    functionName: 'isValidParentheses',
    testCases: JSON.stringify([
      { id: 'tc-1', input: 's = "()"', expectedOutput: 'true', description: 'Simple matching pair' },
      { id: 'tc-2', input: 's = "()[]{}"', expectedOutput: 'true', description: 'Multiple balanced pairs' },
      { id: 'tc-3', input: 's = "(]"', expectedOutput: 'false', description: 'Mismatched bracket types' }
    ]),
    rubricCriteria: JSON.stringify([
      'Uses LIFO Stack data structure efficiently',
      'Handles empty string and unbalanced odd-length strings immediately'
    ])
  },
  {
    id: 'dsa-4',
    title: "Maximum Subarray (Kadane's Algorithm)",
    description: `Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

Aim for an optimal O(N) time solution using dynamic programming / Kadane's algorithm.`,
    roundType: 'dsa',
    difficulty: 'Medium',
    category: 'Dynamic Programming',
    tags: JSON.stringify(['Array', 'Divide and Conquer', 'Dynamic Programming']),
    companyTags: JSON.stringify(['Amazon', 'Microsoft', 'Apple', 'Adobe']),
    frequency: 'High',
    acceptanceRate: '51.5%',
    expectedTimeComplexity: 'O(N)',
    expectedSpaceComplexity: 'O(1)',
    hints: JSON.stringify([
      'At each index i, decide whether to extend the previous subarray or start fresh from nums[i].',
      'currSum = Math.max(nums[i], currSum + nums[i])'
    ]),
    starterCode: `function maxSubArray(nums: number[]): number {
  // TODO: Implement solution
  return 0;
}`,
    functionName: 'maxSubArray',
    testCases: JSON.stringify([
      { id: 'tc-1', input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]', expectedOutput: '6', description: 'Subarray [4,-1,2,1] has the largest sum = 6' },
      { id: 'tc-2', input: 'nums = [1]', expectedOutput: '1', description: 'Single element' },
      { id: 'tc-3', input: 'nums = [5,4,-1,7,8]', expectedOutput: '23', description: 'All positive numbers' }
    ]),
    rubricCriteria: JSON.stringify([
      'Applies Kadane optimal recurrence relation in O(N) time and O(1) space',
      'Properly handles all-negative array inputs without returning 0 incorrectly'
    ])
  }
]

async function main() {
  console.log('🌱 Seeding question bank...')
  for (const q of initialQuestions) {
    await prisma.question.upsert({
      where: { id: q.id },
      update: q,
      create: q,
    })
  }
  console.log(`✅ Seeded ${initialQuestions.length} questions successfully!`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
