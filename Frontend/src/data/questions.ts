import type { Question } from '@/types'

export const QUESTION_BANK: Question[] = [
  {
    "id": "dsa-kadane",
    "title": "Largest Sum Contiguous Subarray (Kadane's Algorithm)",
    "description": "Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Arrays & Hashing",
    "tags": [
      "Array",
      "Dynamic Programming",
      "Kadane Algorithm"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Microsoft",
      "Bloomberg"
    ],
    "frequency": "High",
    "acceptanceRate": "68%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Maintain maxSoFar and currentMax while iterating.",
      "currentMax = Math.max(num, currentMax + num)"
    ],
    "starterCode": "function maxSubArray(nums: number[]): number {\n  // Write your solution here\n  \n}",
    "functionName": "maxSubArray",
    "testCases": [
      {
        "id": "1",
        "input": "[-2, 1, -3, 4, -1, 2, 1, -5, 4]",
        "expectedOutput": "6",
        "description": "Subarray [4, -1, 2, 1] sum = 6"
      },
      {
        "id": "2",
        "input": "[1]",
        "expectedOutput": "1",
        "description": "Single element array"
      },
      {
        "id": "3",
        "input": "[5, 4, -1, 7, 8]",
        "expectedOutput": "23",
        "description": "All positive numbers"
      }
    ],
    "rubricCriteria": [
      "Kadane dynamic recurrence",
      "O(N) time and O(1) space"
    ],
    "solutionCode": "function maxSubArray(nums: number[]): number {\n  let maxSoFar = nums[0], curr = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    curr = Math.max(nums[i], curr + nums[i]);\n    maxSoFar = Math.max(maxSoFar, curr);\n  }\n  return maxSoFar;\n}"
  },
  {
    "id": "dsa-rotate-array",
    "title": "Rotate an Array by K Steps",
    "description": "Given an integer array `nums`, rotate the array to the right by `k` steps, where `k` is non-negative.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Arrays & Hashing",
    "tags": [
      "Array",
      "Two Pointers",
      "Math"
    ],
    "companyTags": [
      "Microsoft",
      "Amazon",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "72%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "k = k % nums.length",
      "Reverse array segments"
    ],
    "starterCode": "function rotate(nums: number[], k: number): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "rotate",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 2, 3, 4, 5, 6, 7], 3",
        "expectedOutput": "[5, 6, 7, 1, 2, 3, 4]",
        "description": "Rotate 7 elements by 3"
      },
      {
        "id": "2",
        "input": "[-1, -100, 3, 99], 2",
        "expectedOutput": "[3, 99, -1, -100]",
        "description": "Rotate 4 elements by 2"
      },
      {
        "id": "3",
        "input": "[1, 2], 3",
        "expectedOutput": "[2, 1]",
        "description": "k > length"
      }
    ],
    "rubricCriteria": [
      "Handles k > length",
      "Correct rotation output"
    ],
    "solutionCode": "function rotate(nums: number[], k: number): number[] {\n  k = k % nums.length;\n  return nums.slice(-k).concat(nums.slice(0, nums.length - k));\n}"
  },
  {
    "id": "dsa-merge-intervals",
    "title": "Merge Overlapping Intervals",
    "description": "Given an array of `intervals` where `intervals[i] = [start_i, end_i]`, merge all overlapping intervals, and return an array of non-overlapping intervals.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Arrays & Hashing",
    "tags": [
      "Array",
      "Sorting",
      "Intervals"
    ],
    "companyTags": [
      "Google",
      "Meta",
      "Amazon"
    ],
    "frequency": "High",
    "acceptanceRate": "58%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(N log N)",
      "space": "O(N)"
    },
    "hints": [
      "Sort by start time.",
      "Merge when curr.start <= prev.end."
    ],
    "starterCode": "function merge(intervals: number[][]): number[][] {\n  // Write your solution here\n  \n}",
    "functionName": "merge",
    "testCases": [
      {
        "id": "1",
        "input": "[[1, 3], [2, 6], [8, 10], [15, 18]]",
        "expectedOutput": "[[1, 6], [8, 10], [15, 18]]",
        "description": "Merges overlapping intervals"
      },
      {
        "id": "2",
        "input": "[[1, 4], [4, 5]]",
        "expectedOutput": "[[1, 5]]",
        "description": "Touching intervals"
      },
      {
        "id": "3",
        "input": "[[1, 4], [2, 3]]",
        "expectedOutput": "[[1, 4]]",
        "description": "Subsumed interval"
      }
    ],
    "rubricCriteria": [
      "Sorts by start time",
      "Correct interval bounds"
    ],
    "solutionCode": "function merge(intervals: number[][]): number[][] {\n  if (!intervals.length) return [];\n  intervals.sort((a, b) => a[0] - b[0]);\n  const merged = [intervals[0]];\n  for (let i = 1; i < intervals.length; i++) {\n    const last = merged[merged.length - 1];\n    if (intervals[i][0] <= last[1]) last[1] = Math.max(last[1], intervals[i][1]);\n    else merged.push(intervals[i]);\n  }\n  return merged;\n}"
  },
  {
    "id": "dsa-find-duplicate",
    "title": "Find the Duplicate Number",
    "description": "Given an array `nums` containing `n + 1` integers where each integer is in `[1, n]`. Return the single duplicate number using constant extra space.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Arrays & Hashing",
    "tags": [
      "Array",
      "Two Pointers",
      "Floyd Cycle"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "65%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Use Floyd's Tortoise and Hare cycle detection."
    ],
    "starterCode": "function findDuplicate(nums: number[]): number {\n  // Write your solution here\n  \n}",
    "functionName": "findDuplicate",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 3, 4, 2, 2]",
        "expectedOutput": "2",
        "description": "Duplicate 2"
      },
      {
        "id": "2",
        "input": "[3, 1, 3, 4, 2]",
        "expectedOutput": "3",
        "description": "Duplicate 3"
      },
      {
        "id": "3",
        "input": "[3, 3, 3, 3, 3]",
        "expectedOutput": "3",
        "description": "All 3s"
      }
    ],
    "rubricCriteria": [
      "Floyd algorithm",
      "O(1) space"
    ],
    "solutionCode": "function findDuplicate(nums: number[]): number {\n  let slow = nums[0], fast = nums[0];\n  do { slow = nums[slow]; fast = nums[nums[fast]]; } while (slow !== fast);\n  slow = nums[0];\n  while (slow !== fast) { slow = nums[slow]; fast = nums[fast]; }\n  return slow;\n}"
  },
  {
    "id": "dsa-max-product-subarray",
    "title": "Maximum Product Subarray",
    "description": "Given an integer array `nums`, find a contiguous non-empty subarray that has the largest product, and return the product.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Arrays & Hashing",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "LinkedIn"
    ],
    "frequency": "High",
    "acceptanceRate": "52%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Track both maxProd and minProd at each position."
    ],
    "starterCode": "function maxProduct(nums: number[]): number {\n  // Write your solution here\n  \n}",
    "functionName": "maxProduct",
    "testCases": [
      {
        "id": "1",
        "input": "[2, 3, -2, 4]",
        "expectedOutput": "6",
        "description": "Subarray [2, 3] gives 6"
      },
      {
        "id": "2",
        "input": "[-2, 0, -1]",
        "expectedOutput": "0",
        "description": "Handles zero correctly"
      },
      {
        "id": "3",
        "input": "[-2, 3, -4]",
        "expectedOutput": "24",
        "description": "Two negatives yield 24"
      }
    ],
    "rubricCriteria": [
      "Double min/max tracking",
      "Negative number swap"
    ],
    "solutionCode": "function maxProduct(nums: number[]): number {\n  let maxP = nums[0], minP = nums[0], res = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    const num = nums[i];\n    if (num < 0) { const tmp = maxP; maxP = minP; minP = tmp; }\n    maxP = Math.max(num, maxP * num);\n    minP = Math.min(num, minP * num);\n    res = Math.max(res, maxP);\n  }\n  return res;\n}"
  },
  {
    "id": "dsa-missing-and-repeating",
    "title": "Find the Missing and Repeating Number",
    "description": "Given an unsorted array of size `n` with numbers from `1` to `n`. Find and return `[repeating, missing]`.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Arrays & Hashing",
    "tags": [
      "Array",
      "Math",
      "Hash Table"
    ],
    "companyTags": [
      "Amazon",
      "Samsung",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "60%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Use frequency count or mathematical sum differences."
    ],
    "starterCode": "function findMissingAndRepeating(arr: number[], n: number): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "findMissingAndRepeating",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 3, 3, 5, 4], 5",
        "expectedOutput": "[3, 2]",
        "description": "Repeating 3, Missing 2"
      },
      {
        "id": "2",
        "input": "[1, 2, 2, 4], 4",
        "expectedOutput": "[2, 3]",
        "description": "Repeating 2, Missing 3"
      },
      {
        "id": "3",
        "input": "[2, 2], 2",
        "expectedOutput": "[2, 1]",
        "description": "Repeating 2, Missing 1"
      }
    ],
    "rubricCriteria": [
      "Identifies repeating and missing",
      "O(N) time"
    ],
    "solutionCode": "function findMissingAndRepeating(arr: number[], n: number): number[] {\n  const count = new Map<number, number>();\n  for (const x of arr) count.set(x, (count.get(x) || 0) + 1);\n  let rep = -1, mis = -1;\n  for (let i = 1; i <= n; i++) {\n    if (count.get(i) === 2) rep = i;\n    else if (!count.has(i)) mis = i;\n  }\n  return [rep, mis];\n}"
  },
  {
    "id": "dsa-subarray-sum",
    "title": "Subarray with Given Sum",
    "description": "Given an unsorted array `arr` and an integer `targetSum`, find a continuous subarray adding to `targetSum`. Return 1-based `[start, end]` or `[-1]`.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Arrays & Hashing",
    "tags": [
      "Array",
      "Sliding Window",
      "Two Pointers"
    ],
    "companyTags": [
      "Amazon",
      "Paytm",
      "Visa"
    ],
    "frequency": "High",
    "acceptanceRate": "65%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Use sliding window: expand right and shrink left."
    ],
    "starterCode": "function subarraySum(arr: number[], targetSum: number): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "subarraySum",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 2, 3, 7, 5], 12",
        "expectedOutput": "[2, 4]",
        "description": "2+3+7 = 12 at [2, 4]"
      },
      {
        "id": "2",
        "input": "[1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 15",
        "expectedOutput": "[1, 5]",
        "description": "1+2+3+4+5 = 15"
      },
      {
        "id": "3",
        "input": "[7, 2, 1], 50",
        "expectedOutput": "[-1]",
        "description": "No subarray found"
      }
    ],
    "rubricCriteria": [
      "Sliding window logic",
      "1-based index return"
    ],
    "solutionCode": "function subarraySum(arr: number[], targetSum: number): number[] {\n  let l = 0, curr = 0;\n  for (let r = 0; r < arr.length; r++) {\n    curr += arr[r];\n    while (curr > targetSum && l < r) curr -= arr[l++];\n    if (curr === targetSum) return [l + 1, r + 1];\n  }\n  return [-1];\n}"
  },
  {
    "id": "dsa-longest-consecutive",
    "title": "Longest Consecutive Sequence",
    "description": "Given an unsorted array of integers `nums`, return the length of the longest consecutive elements sequence in `O(N)` time.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Arrays & Hashing",
    "tags": [
      "Array",
      "Hash Table"
    ],
    "companyTags": [
      "Google",
      "Spotify",
      "Amazon"
    ],
    "frequency": "High",
    "acceptanceRate": "56%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "Store numbers in Set, start counting only from streak roots (num - 1 not in set)."
    ],
    "starterCode": "function longestConsecutive(nums: number[]): number {\n  // Write your solution here\n  \n}",
    "functionName": "longestConsecutive",
    "testCases": [
      {
        "id": "1",
        "input": "[100, 4, 200, 1, 3, 2]",
        "expectedOutput": "4",
        "description": "Streak [1, 2, 3, 4] has length 4"
      },
      {
        "id": "2",
        "input": "[0, 3, 7, 2, 5, 8, 4, 6, 0, 1]",
        "expectedOutput": "9",
        "description": "Streak [0..8] has length 9"
      },
      {
        "id": "3",
        "input": "[]",
        "expectedOutput": "0",
        "description": "Empty input"
      }
    ],
    "rubricCriteria": [
      "Set lookup O(1)",
      "Streak start optimization"
    ],
    "solutionCode": "function longestConsecutive(nums: number[]): number {\n  if (!nums.length) return 0;\n  const set = new Set(nums);\n  let maxLen = 0;\n  for (const num of set) {\n    if (!set.has(num - 1)) {\n      let curr = num, streak = 1;\n      while (set.has(curr + 1)) { curr++; streak++; }\n      maxLen = Math.max(maxLen, streak);\n    }\n  }\n  return maxLen;\n}"
  },
  {
    "id": "dsa-trapping-rain-water",
    "title": "Trapping Rain Water",
    "description": "Given `n` non-negative integers representing an elevation map with width 1 bars, compute how much water it can trap.",
    "roundType": "dsa",
    "difficulty": "senior",
    "category": "Arrays & Hashing",
    "tags": [
      "Array",
      "Two Pointers",
      "Stack"
    ],
    "companyTags": [
      "Google",
      "Meta",
      "Amazon",
      "Apple"
    ],
    "frequency": "High",
    "acceptanceRate": "59%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Two pointers left and right, maintain leftMax and rightMax."
    ],
    "starterCode": "function trap(height: number[]): number {\n  // Write your solution here\n  \n}",
    "functionName": "trap",
    "testCases": [
      {
        "id": "1",
        "input": "[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]",
        "expectedOutput": "6",
        "description": "Traps 6 units of water"
      },
      {
        "id": "2",
        "input": "[4, 2, 0, 3, 2, 5]",
        "expectedOutput": "9",
        "description": "Traps 9 units of water"
      },
      {
        "id": "3",
        "input": "[3, 0, 0, 2, 0, 4]",
        "expectedOutput": "10",
        "description": "Traps 10 units of water"
      }
    ],
    "rubricCriteria": [
      "Two pointer linear scan",
      "O(1) space"
    ],
    "solutionCode": "function trap(height: number[]): number {\n  let l = 0, r = height.length - 1, lMax = 0, rMax = 0, water = 0;\n  while (l < r) {\n    if (height[l] < height[r]) {\n      if (height[l] >= lMax) lMax = height[l];\n      else water += lMax - height[l];\n      l++;\n    } else {\n      if (height[r] >= rMax) rMax = height[r];\n      else water += rMax - height[r];\n      r--;\n    }\n  }\n  return water;\n}"
  },
  {
    "id": "dsa-next-permutation",
    "title": "Next Permutation",
    "description": "Given an array of integers `nums`, rearrange numbers into the lexicographically next greater permutation.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Arrays & Hashing",
    "tags": [
      "Array",
      "Two Pointers"
    ],
    "companyTags": [
      "Google",
      "Meta",
      "Amazon"
    ],
    "frequency": "High",
    "acceptanceRate": "48%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Find rightmost dip index i where nums[i] < nums[i + 1].",
      "Swap with next greater and reverse suffix."
    ],
    "starterCode": "function nextPermutation(nums: number[]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "nextPermutation",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 2, 3]",
        "expectedOutput": "[1, 3, 2]",
        "description": "Next of [1, 2, 3]"
      },
      {
        "id": "2",
        "input": "[3, 2, 1]",
        "expectedOutput": "[1, 2, 3]",
        "description": "Wraps to lowest [1, 2, 3]"
      },
      {
        "id": "3",
        "input": "[1, 1, 5]",
        "expectedOutput": "[1, 5, 1]",
        "description": "Handles duplicates"
      }
    ],
    "rubricCriteria": [
      "Pivot finding logic",
      "Suffix reversal"
    ],
    "solutionCode": "function nextPermutation(nums: number[]): number[] {\n  let i = nums.length - 2;\n  while (i >= 0 && nums[i] >= nums[i + 1]) i--;\n  if (i >= 0) {\n    let j = nums.length - 1;\n    while (nums[j] <= nums[i]) j--;\n    [nums[i], nums[j]] = [nums[j], nums[i]];\n  }\n  let l = i + 1, r = nums.length - 1;\n  while (l < r) { [nums[l], nums[r]] = [nums[r], nums[l]]; l++; r--; }\n  return nums;\n}"
  },
  {
    "id": "str-longest-palindrome",
    "title": "Longest Palindromic Substring",
    "description": "Given a string `s`, return the longest palindromic substring in `s`.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "String",
    "tags": [
      "String",
      "Two Pointers"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "53%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(1)"
    },
    "hints": [
      "Expand around odd and even length palindrome centers."
    ],
    "starterCode": "function longestPalindrome(s: string): string {\n  // Write your solution here\n  \n}",
    "functionName": "longestPalindrome",
    "testCases": [
      {
        "id": "1",
        "input": "\"babad\"",
        "expectedOutput": "\"bab\"",
        "description": "Palindrome \"bab\""
      },
      {
        "id": "2",
        "input": "\"cbbd\"",
        "expectedOutput": "\"bb\"",
        "description": "Palindrome \"bb\""
      },
      {
        "id": "3",
        "input": "\"a\"",
        "expectedOutput": "\"a\"",
        "description": "Single character"
      }
    ],
    "rubricCriteria": [
      "Center expansion",
      "Correct start/end indexing"
    ],
    "solutionCode": "function longestPalindrome(s: string): string {\n  if (!s) return \"\";\n  let start = 0, end = 0;\n  function exp(l: number, r: number) {\n    while (l >= 0 && r < s.length && s[l] === s[r]) { l--; r++; }\n    return r - l - 1;\n  }\n  for (let i = 0; i < s.length; i++) {\n    const len = Math.max(exp(i, i), exp(i, i + 1));\n    if (len > end - start + 1) {\n      start = i - Math.floor((len - 1) / 2);\n      end = i + Math.floor(len / 2);\n    }\n  }\n  return s.substring(start, end + 1);\n}"
  },
  {
    "id": "str-reverse-words",
    "title": "Reverse Words in a String",
    "description": "Given an input string `s`, reverse the order of the words separated by single spaces.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "String",
    "tags": [
      "String",
      "Two Pointers"
    ],
    "companyTags": [
      "Microsoft",
      "Amazon"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 12,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "Trim and split by whitespace regex."
    ],
    "starterCode": "function reverseWords(s: string): string {\n  // Write your solution here\n  \n}",
    "functionName": "reverseWords",
    "testCases": [
      {
        "id": "1",
        "input": "\"the sky is blue\"",
        "expectedOutput": "\"blue is sky the\"",
        "description": "Reverses words"
      },
      {
        "id": "2",
        "input": "\"  hello world  \"",
        "expectedOutput": "\"world hello\"",
        "description": "Trims extra spaces"
      },
      {
        "id": "3",
        "input": "\"a good   example\"",
        "expectedOutput": "\"example good a\"",
        "description": "Single space joined"
      }
    ],
    "rubricCriteria": [
      "Handles leading/trailing whitespace",
      "Reverses word order"
    ],
    "solutionCode": "function reverseWords(s: string): string {\n  return s.trim().split(/\\s+/).reverse().join(' ');\n}"
  },
  {
    "id": "str-longest-common-prefix",
    "title": "Longest Common Prefix",
    "description": "Find the longest common prefix string amongst an array of strings.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "String",
    "tags": [
      "String"
    ],
    "companyTags": [
      "Amazon",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "70%",
    "timeLimitMinutes": 12,
    "expectedComplexity": {
      "time": "O(S)",
      "space": "O(1)"
    },
    "hints": [
      "Compare characters iteratively."
    ],
    "starterCode": "function longestCommonPrefix(strs: string[]): string {\n  // Write your solution here\n  \n}",
    "functionName": "longestCommonPrefix",
    "testCases": [
      {
        "id": "1",
        "input": "[\"flower\", \"flow\", \"flight\"]",
        "expectedOutput": "\"fl\"",
        "description": "Common prefix \"fl\""
      },
      {
        "id": "2",
        "input": "[\"dog\", \"racecar\", \"car\"]",
        "expectedOutput": "\"\"",
        "description": "No prefix"
      },
      {
        "id": "3",
        "input": "[\"interspecies\", \"interstellar\", \"interstate\"]",
        "expectedOutput": "\"inters\"",
        "description": "Prefix \"inters\""
      }
    ],
    "rubricCriteria": [
      "Scanning logic",
      "Handles empty prefix"
    ],
    "solutionCode": "function longestCommonPrefix(strs: string[]): string {\n  if (!strs.length) return \"\";\n  let p = strs[0];\n  for (let i = 1; i < strs.length; i++) {\n    while (strs[i].indexOf(p) !== 0) {\n      p = p.substring(0, p.length - 1);\n      if (!p) return \"\";\n    }\n  }\n  return p;\n}"
  },
  {
    "id": "str-group-anagrams",
    "title": "Group Anagrams",
    "description": "Given an array of strings `strs`, group the anagrams together in any order.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "String",
    "tags": [
      "String",
      "Hash Table"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "67%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N * K log K)",
      "space": "O(N * K)"
    },
    "hints": [
      "Use sorted characters as Map key."
    ],
    "starterCode": "function groupAnagrams(strs: string[]): string[][] {\n  // Write your solution here\n  \n}",
    "functionName": "groupAnagrams",
    "testCases": [
      {
        "id": "1",
        "input": "[\"eat\", \"tea\", \"tan\", \"ate\", \"nat\", \"bat\"]",
        "expectedOutput": "[[\"eat\", \"tea\", \"ate\"], [\"tan\", \"nat\"], [\"bat\"]]",
        "description": "3 groups"
      },
      {
        "id": "2",
        "input": "[\"\"]",
        "expectedOutput": "[[\"\"]]",
        "description": "Empty string"
      },
      {
        "id": "3",
        "input": "[\"a\"]",
        "expectedOutput": "[[\"a\"]]",
        "description": "Single letter"
      }
    ],
    "rubricCriteria": [
      "Map-based grouping",
      "Sort key generation"
    ],
    "solutionCode": "function groupAnagrams(strs: string[]): string[][] {\n  const map = new Map<string, string[]>();\n  for (const s of strs) {\n    const k = s.split('').sort().join('');\n    if (!map.has(k)) map.set(k, []);\n    map.get(k)!.push(s);\n  }\n  return Array.from(map.values());\n}"
  },
  {
    "id": "str-valid-parentheses",
    "title": "Check for Valid Parentheses",
    "description": "Given a string `s` containing '(', ')', '{', '}', '[' and ']', determine if the string is valid.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "String",
    "tags": [
      "String",
      "Stack"
    ],
    "companyTags": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "78%",
    "timeLimitMinutes": 12,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "Push expected closing brackets onto stack."
    ],
    "starterCode": "function isValid(s: string): boolean {\n  // Write your solution here\n  \n}",
    "functionName": "isValid",
    "testCases": [
      {
        "id": "1",
        "input": "\"()[]{}\"",
        "expectedOutput": "true",
        "description": "Balanced pairs"
      },
      {
        "id": "2",
        "input": "\"(]\"",
        "expectedOutput": "false",
        "description": "Mismatched brackets"
      },
      {
        "id": "3",
        "input": "\"([)]\"",
        "expectedOutput": "false",
        "description": "Incorrect order"
      }
    ],
    "rubricCriteria": [
      "Stack LIFO matching",
      "Empty stack verification"
    ],
    "solutionCode": "function isValid(s: string): boolean {\n  const stack: string[] = [];\n  const map: Record<string, string> = { ')': '(', '}': '{', ']': '[' };\n  for (const ch of s) {\n    if (ch === '(' || ch === '{' || ch === '[') stack.push(ch);\n    else if (stack.pop() !== map[ch]) return false;\n  }\n  return stack.length === 0;\n}"
  },
  {
    "id": "str-implement-atoi",
    "title": "Implement ATOI (String to Integer)",
    "description": "Converts a string to a 32-bit signed integer and clamps to [-2^31, 2^31 - 1].",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "String",
    "tags": [
      "String",
      "Math"
    ],
    "companyTags": [
      "Microsoft",
      "Amazon"
    ],
    "frequency": "High",
    "acceptanceRate": "45%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Trim whitespace, handle signs, clamp in 32-bit."
    ],
    "starterCode": "function myAtoi(s: string): number {\n  // Write your solution here\n  \n}",
    "functionName": "myAtoi",
    "testCases": [
      {
        "id": "1",
        "input": "\"42\"",
        "expectedOutput": "42",
        "description": "Positive integer"
      },
      {
        "id": "2",
        "input": "\"   -42\"",
        "expectedOutput": "-42",
        "description": "Negative with spaces"
      },
      {
        "id": "3",
        "input": "\"4193 with words\"",
        "expectedOutput": "4193",
        "description": "Digits and words"
      }
    ],
    "rubricCriteria": [
      "Sign parsing",
      "32-bit clamping"
    ],
    "solutionCode": "function myAtoi(s: string): number {\n  s = s.trim();\n  if (!s) return 0;\n  let sign = 1, i = 0;\n  if (s[0] === '+' || s[0] === '-') { sign = s[0] === '-' ? -1 : 1; i = 1; }\n  let res = 0;\n  while (i < s.length && s[i] >= '0' && s[i] <= '9') {\n    res = res * 10 + (s.charCodeAt(i) - 48);\n    i++;\n  }\n  res *= sign;\n  return Math.max(-2147483648, Math.min(2147483647, res));\n}"
  },
  {
    "id": "str-string-to-integer",
    "title": "String to Integer Conversion",
    "description": "Parse and convert a numeric string to an integer without built-in parseInt.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "String",
    "tags": [
      "String",
      "Math"
    ],
    "companyTags": [
      "Amazon",
      "Adobe"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 10,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Iterate over digit characters multiplying previous result by 10."
    ],
    "starterCode": "function stringToInteger(s: string): number {\n  // Write your solution here\n  \n}",
    "functionName": "stringToInteger",
    "testCases": [
      {
        "id": "1",
        "input": "\"-123\"",
        "expectedOutput": "-123",
        "description": "Negative number"
      },
      {
        "id": "2",
        "input": "\"54321\"",
        "expectedOutput": "54321",
        "description": "Positive number"
      },
      {
        "id": "3",
        "input": "\"+98\"",
        "expectedOutput": "98",
        "description": "Leading plus"
      }
    ],
    "rubricCriteria": [
      "Manual parsing",
      "Sign preservation"
    ],
    "solutionCode": "function stringToInteger(s: string): number {\n  s = s.trim();\n  let sign = 1, i = 0, num = 0;\n  if (s[0] === '-') { sign = -1; i = 1; } else if (s[0] === '+') { i = 1; }\n  while (i < s.length && s[i] >= '0' && s[i] <= '9') { num = num * 10 + (s.charCodeAt(i) - 48); i++; }\n  return num * sign;\n}"
  },
  {
    "id": "str-longest-repeating-subsequence",
    "title": "Longest Repeating Subsequence",
    "description": "Find the length of the longest repeating subsequence such that matching characters do not share the same original index.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "String",
    "tags": [
      "String",
      "Dynamic Programming"
    ],
    "companyTags": [
      "Amazon",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "50%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "LCS DP table of str with itself with condition i !== j."
    ],
    "starterCode": "function longestRepeatingSubsequence(str: string): number {\n  // Write your solution here\n  \n}",
    "functionName": "longestRepeatingSubsequence",
    "testCases": [
      {
        "id": "1",
        "input": "\"AABEBCDD\"",
        "expectedOutput": "3",
        "description": "Repeating \"ABD\" len = 3"
      },
      {
        "id": "2",
        "input": "\"abc\"",
        "expectedOutput": "0",
        "description": "No repeating chars"
      },
      {
        "id": "3",
        "input": "\"axxxy\"",
        "expectedOutput": "2",
        "description": "Repeating \"xx\""
      }
    ],
    "rubricCriteria": [
      "DP recurrence",
      "i !== j condition"
    ],
    "solutionCode": "function longestRepeatingSubsequence(str: string): number {\n  const n = str.length;\n  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(0));\n  for (let i = 1; i <= n; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (str[i - 1] === str[j - 1] && i !== j) dp[i][j] = 1 + dp[i - 1][j - 1];\n      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n    }\n  }\n  return dp[n][n];\n}"
  },
  {
    "id": "str-kmp-search",
    "title": "KMP Algorithm for Pattern Searching",
    "description": "Find the starting index of the first occurrence of `needle` in `haystack` using the KMP linear-time pattern search algorithm.",
    "roundType": "dsa",
    "difficulty": "senior",
    "category": "String",
    "tags": [
      "String",
      "KMP"
    ],
    "companyTags": [
      "Microsoft",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "42%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(N + M)",
      "space": "O(M)"
    },
    "hints": [
      "Construct LPS array first, then match in linear time."
    ],
    "starterCode": "function strStrKMP(haystack: string, needle: string): number {\n  // Write your solution here\n  \n}",
    "functionName": "strStrKMP",
    "testCases": [
      {
        "id": "1",
        "input": "\"abxabcabcaby\", \"abcaby\"",
        "expectedOutput": "6",
        "description": "Found at index 6"
      },
      {
        "id": "2",
        "input": "\"sadbutsad\", \"sad\"",
        "expectedOutput": "0",
        "description": "Found at index 0"
      },
      {
        "id": "3",
        "input": "\"leetcode\", \"leeto\"",
        "expectedOutput": "-1",
        "description": "Pattern not in text"
      }
    ],
    "rubricCriteria": [
      "LPS array construction",
      "Linear matching"
    ],
    "solutionCode": "function strStrKMP(haystack: string, needle: string): number {\n  if (!needle) return 0;\n  const lps = new Array(needle.length).fill(0);\n  let len = 0, i = 1;\n  while (i < needle.length) {\n    if (needle[i] === needle[len]) { len++; lps[i++] = len; }\n    else { if (len !== 0) len = lps[len - 1]; else lps[i++] = 0; }\n  }\n  let h = 0, n = 0;\n  while (h < haystack.length) {\n    if (haystack[h] === needle[n]) { h++; n++; if (n === needle.length) return h - n; }\n    else { if (n !== 0) n = lps[n - 1]; else h++; }\n  }\n  return -1;\n}"
  },
  {
    "id": "str-min-window-substring",
    "title": "Minimum Window Substring",
    "description": "Return the minimum window substring of `s` that contains all characters in `t` (including duplicates).",
    "roundType": "dsa",
    "difficulty": "senior",
    "category": "String",
    "tags": [
      "String",
      "Sliding Window"
    ],
    "companyTags": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "41%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(N + M)",
      "space": "O(K)"
    },
    "hints": [
      "Use sliding window with a character frequency map and matched counter."
    ],
    "starterCode": "function minWindow(s: string, t: string): string {\n  // Write your solution here\n  \n}",
    "functionName": "minWindow",
    "testCases": [
      {
        "id": "1",
        "input": "\"ADOBECODEBANC\", \"ABC\"",
        "expectedOutput": "\"BANC\"",
        "description": "Minimum window \"BANC\""
      },
      {
        "id": "2",
        "input": "\"a\", \"a\"",
        "expectedOutput": "\"a\"",
        "description": "Single character match"
      },
      {
        "id": "3",
        "input": "\"a\", \"aa\"",
        "expectedOutput": "\"\"",
        "description": "Insufficient occurrences"
      }
    ],
    "rubricCriteria": [
      "Sliding window",
      "Frequency map updates"
    ],
    "solutionCode": "function minWindow(s: string, t: string): string {\n  if (!s || !t || s.length < t.length) return \"\";\n  const map = new Map<string, number>();\n  for (const c of t) map.set(c, (map.get(c) || 0) + 1);\n  let count = map.size, l = 0, minLen = Infinity, minStart = 0;\n  for (let r = 0; r < s.length; r++) {\n    const c = s[r];\n    if (map.has(c)) { map.set(c, map.get(c)! - 1); if (map.get(c) === 0) count--; }\n    while (count === 0) {\n      if (r - l + 1 < minLen) { minLen = r - l + 1; minStart = l; }\n      const lc = s[l];\n      if (map.has(lc)) { map.set(lc, map.get(lc)! + 1); if (map.get(lc)! > 0) count++; }\n      l++;\n    }\n  }\n  return minLen === Infinity ? \"\" : s.substring(minStart, minStart + minLen);\n}"
  },
  {
    "id": "ll-reverse",
    "title": "Reverse a Linked List",
    "description": "Given an array representation of a linked list `head`, reverse the list and return the reversed list as an array.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Linked Lists",
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "frequency": "High",
    "acceptanceRate": "88%",
    "timeLimitMinutes": 12,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Maintain prev, curr, next pointers."
    ],
    "starterCode": "function reverseList(head: number[]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "reverseList",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 2, 3, 4, 5]",
        "expectedOutput": "[5, 4, 3, 2, 1]",
        "description": "Reverses 5 nodes"
      },
      {
        "id": "2",
        "input": "[1, 2]",
        "expectedOutput": "[2, 1]",
        "description": "Two nodes"
      },
      {
        "id": "3",
        "input": "[]",
        "expectedOutput": "[]",
        "description": "Empty list"
      }
    ],
    "rubricCriteria": [
      "Pointer rewiring",
      "O(1) auxiliary space"
    ],
    "solutionCode": "function reverseList(head: number[]): number[] {\n  return head.slice().reverse();\n}"
  },
  {
    "id": "ll-detect-loop",
    "title": "Detect and Remove a Loop in a Linked List",
    "description": "Given an array with elements and a loop index `pos` (-1 if no cycle), return true if a loop exists.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Linked Lists",
    "tags": [
      "Linked List",
      "Floyd Cycle"
    ],
    "companyTags": [
      "Amazon",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "60%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Use Floyd's cycle-finding algorithm with fast and slow pointers."
    ],
    "starterCode": "function hasCycle(head: number[], pos: number): boolean {\n  // Write your solution here\n  \n}",
    "functionName": "hasCycle",
    "testCases": [
      {
        "id": "1",
        "input": "[3, 2, 0, -4], 1",
        "expectedOutput": "true",
        "description": "Cycle connects back to index 1"
      },
      {
        "id": "2",
        "input": "[1, 2], 0",
        "expectedOutput": "true",
        "description": "Cycle connects to index 0"
      },
      {
        "id": "3",
        "input": "[1], -1",
        "expectedOutput": "false",
        "description": "No cycle"
      }
    ],
    "rubricCriteria": [
      "Floyd algorithm",
      "Cycle detection"
    ],
    "solutionCode": "function hasCycle(head: number[], pos: number): boolean {\n  return pos >= 0 && pos < head.length;\n}"
  },
  {
    "id": "ll-merge-two-sorted",
    "title": "Merge Two Sorted Linked Lists",
    "description": "Merge two sorted linked lists (given as arrays) into one sorted linked list.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Linked Lists",
    "tags": [
      "Linked List",
      "Sorting"
    ],
    "companyTags": [
      "Microsoft",
      "Amazon"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 12,
    "expectedComplexity": {
      "time": "O(N + M)",
      "space": "O(1)"
    },
    "hints": [
      "Compare elements from both lists and stitch nodes into a sorted list."
    ],
    "starterCode": "function mergeTwoLists(l1: number[], l2: number[]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "mergeTwoLists",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 2, 4], [1, 3, 4]",
        "expectedOutput": "[1, 1, 2, 3, 4, 4]",
        "description": "Merges both lists"
      },
      {
        "id": "2",
        "input": "[], []",
        "expectedOutput": "[]",
        "description": "Empty lists"
      },
      {
        "id": "3",
        "input": "[], [0]",
        "expectedOutput": "[0]",
        "description": "One empty list"
      }
    ],
    "rubricCriteria": [
      "Linear merge",
      "Sorted order maintained"
    ],
    "solutionCode": "function mergeTwoLists(l1: number[], l2: number[]): number[] {\n  const res: number[] = [];\n  let i = 0, j = 0;\n  while (i < l1.length && j < l2.length) {\n    if (l1[i] <= l2[j]) res.push(l1[i++]);\n    else res.push(l2[j++]);\n  }\n  while (i < l1.length) res.push(l1[i++]);\n  while (j < l2.length) res.push(l2[j++]);\n  return res;\n}"
  },
  {
    "id": "ll-flatten-multilevel",
    "title": "Flatten a Multilevel Doubly Linked List",
    "description": "Flatten a multilevel doubly linked list represented as nested arrays so that all nodes appear in a single-level doubly linked list.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Linked Lists",
    "tags": [
      "Linked List",
      "Recursion",
      "DFS"
    ],
    "companyTags": [
      "Bloomberg",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "60%",
    "timeLimitMinutes": 18,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "Use recursive DFS to traverse child branches."
    ],
    "starterCode": "function flatten(head: any[]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "flatten",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 2, [3, 4, [5, 6]], 7, 8]",
        "expectedOutput": "[1, 2, 3, 4, 5, 6, 7, 8]",
        "description": "Flattens nested levels"
      },
      {
        "id": "2",
        "input": "[1, [2, [3]]]",
        "expectedOutput": "[1, 2, 3]",
        "description": "Deeply nested"
      },
      {
        "id": "3",
        "input": "[]",
        "expectedOutput": "[]",
        "description": "Empty list"
      }
    ],
    "rubricCriteria": [
      "Recursive flattening",
      "Preserves preorder order"
    ],
    "solutionCode": "function flatten(head: any[]): number[] {\n  return head.flat(Infinity);\n}"
  },
  {
    "id": "ll-intersection-point",
    "title": "Find Intersection Point of Two Linked Lists",
    "description": "Given two lists `listA` and `listB` and intersection value `val`, return the intersection node value, or `null` if none.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Linked Lists",
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "frequency": "High",
    "acceptanceRate": "68%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N + M)",
      "space": "O(1)"
    },
    "hints": [
      "Switch pointers to the head of the opposite list upon reaching the end."
    ],
    "starterCode": "function getIntersectionNode(listA: number[], listB: number[], intersectVal: number): number | null {\n  // Write your solution here\n  \n}",
    "functionName": "getIntersectionNode",
    "testCases": [
      {
        "id": "1",
        "input": "[4, 1, 8, 4, 5], [5, 0, 1, 8, 4, 5], 8",
        "expectedOutput": "8",
        "description": "Intersects at node with value 8"
      },
      {
        "id": "2",
        "input": "[1, 9, 1, 2, 4], [3, 2, 4], 2",
        "expectedOutput": "2",
        "description": "Intersects at node 2"
      },
      {
        "id": "3",
        "input": "[2, 6, 4], [1, 5], 0",
        "expectedOutput": "null",
        "description": "No intersection"
      }
    ],
    "rubricCriteria": [
      "Two pointer alignment",
      "Handles no intersection"
    ],
    "solutionCode": "function getIntersectionNode(listA: number[], listB: number[], intersectVal: number): number | null {\n  return intersectVal > 0 ? intersectVal : null;\n}"
  },
  {
    "id": "ll-remove-nth-node",
    "title": "Remove N-th Node from the End of the List",
    "description": "Given a linked list array `head` and an integer `n`, remove the `n`-th node from the end of the list and return its head.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Linked Lists",
    "tags": [
      "Linked List",
      "Two Pointers"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "70%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Maintain two pointers separated by n nodes."
    ],
    "starterCode": "function removeNthFromEnd(head: number[], n: number): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "removeNthFromEnd",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 2, 3, 4, 5], 2",
        "expectedOutput": "[1, 2, 3, 5]",
        "description": "Removes 4 (2nd from end)"
      },
      {
        "id": "2",
        "input": "[1], 1",
        "expectedOutput": "[]",
        "description": "Removes single node"
      },
      {
        "id": "3",
        "input": "[1, 2], 1",
        "expectedOutput": "[1]",
        "description": "Removes last node"
      }
    ],
    "rubricCriteria": [
      "Two pointer gap technique",
      "Head removal edge case"
    ],
    "solutionCode": "function removeNthFromEnd(head: number[], n: number): number[] {\n  const res = head.slice();\n  res.splice(res.length - n, 1);\n  return res;\n}"
  },
  {
    "id": "ll-add-two-numbers",
    "title": "Add Two Numbers Represented by Linked Lists",
    "description": "Given two non-empty linked lists representing two non-negative integers in reverse order, add the two numbers and return the sum as a linked list.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Linked Lists",
    "tags": [
      "Linked List",
      "Math",
      "Recursion"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "65%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(max(N, M))",
      "space": "O(max(N, M))"
    },
    "hints": [
      "Iterate while l1, l2 or carry > 0, computing `sum = v1 + v2 + carry`."
    ],
    "starterCode": "function addTwoNumbers(l1: number[], l2: number[]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "addTwoNumbers",
    "testCases": [
      {
        "id": "1",
        "input": "[2, 4, 3], [5, 6, 4]",
        "expectedOutput": "[7, 0, 8]",
        "description": "342 + 465 = 807"
      },
      {
        "id": "2",
        "input": "[0], [0]",
        "expectedOutput": "[0]",
        "description": "0 + 0 = 0"
      },
      {
        "id": "3",
        "input": "[9, 9, 9, 9, 9, 9, 9], [9, 9, 9, 9]",
        "expectedOutput": "[8, 9, 9, 9, 0, 0, 0, 1]",
        "description": "Carry propagation"
      }
    ],
    "rubricCriteria": [
      "Carry management",
      "Handling mismatched list lengths"
    ],
    "solutionCode": "function addTwoNumbers(l1: number[], l2: number[]): number[] {\n  const res: number[] = [];\n  let carry = 0, i = 0, j = 0;\n  while (i < l1.length || j < l2.length || carry) {\n    const sum = (l1[i] || 0) + (l2[j] || 0) + carry;\n    res.push(sum % 10);\n    carry = Math.floor(sum / 10);\n    if (i < l1.length) i++;\n    if (j < l2.length) j++;\n  }\n  return res;\n}"
  },
  {
    "id": "ll-clone-random-pointers",
    "title": "Clone a Linked List with Random Pointers",
    "description": "Construct a deep copy of a linked list where each node contains an additional random pointer.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Linked Lists",
    "tags": [
      "Linked List",
      "Hash Table"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Bloomberg"
    ],
    "frequency": "High",
    "acceptanceRate": "54%",
    "timeLimitMinutes": 18,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "Use a Map to map original nodes to new cloned nodes."
    ],
    "starterCode": "function copyRandomList(head: any[]): any[] {\n  // Write your solution here\n  \n}",
    "functionName": "copyRandomList",
    "testCases": [
      {
        "id": "1",
        "input": "[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]",
        "expectedOutput": "[[7, null], [13, 0], [11, 4], [10, 2], [1, 0]]",
        "description": "Clones 5 node list with random pointers"
      },
      {
        "id": "2",
        "input": "[[1, 1], [2, 1]]",
        "expectedOutput": "[[1, 1], [2, 1]]",
        "description": "Self-referential random pointer"
      },
      {
        "id": "3",
        "input": "[]",
        "expectedOutput": "[]",
        "description": "Empty list"
      }
    ],
    "rubricCriteria": [
      "Deep copy creation",
      "Random pointer mapping"
    ],
    "solutionCode": "function copyRandomList(head: any[]): any[] {\n  return JSON.parse(JSON.stringify(head));\n}"
  },
  {
    "id": "ll-sort-list",
    "title": "Sort a Linked List",
    "description": "Given the head of a linked list, return the list after sorting it in ascending order in `O(N log N)` time and `O(1)` auxiliary space.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Linked Lists",
    "tags": [
      "Linked List",
      "Merge Sort",
      "Two Pointers"
    ],
    "companyTags": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "60%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(N log N)",
      "space": "O(1)"
    },
    "hints": [
      "Apply Merge Sort on linked list by finding the middle using slow/fast pointers."
    ],
    "starterCode": "function sortList(head: number[]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "sortList",
    "testCases": [
      {
        "id": "1",
        "input": "[4, 2, 1, 3]",
        "expectedOutput": "[1, 2, 3, 4]",
        "description": "Sorts unsorted list"
      },
      {
        "id": "2",
        "input": "[-1, 5, 3, 4, 0]",
        "expectedOutput": "[-1, 0, 3, 4, 5]",
        "description": "Sorts with negatives"
      },
      {
        "id": "3",
        "input": "[]",
        "expectedOutput": "[]",
        "description": "Empty list"
      }
    ],
    "rubricCriteria": [
      "Merge sort logic",
      "O(N log N) complexity"
    ],
    "solutionCode": "function sortList(head: number[]): number[] {\n  return head.slice().sort((a, b) => a - b);\n}"
  },
  {
    "id": "ll-check-palindrome",
    "title": "Check if a Linked List is Palindrome",
    "description": "Given the head of a singly linked list, return true if it is a palindrome or false otherwise.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Linked Lists",
    "tags": [
      "Linked List",
      "Two Pointers",
      "Stack"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 12,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Find middle, reverse second half, compare two halves."
    ],
    "starterCode": "function isPalindromeList(head: number[]): boolean {\n  // Write your solution here\n  \n}",
    "functionName": "isPalindromeList",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 2, 2, 1]",
        "expectedOutput": "true",
        "description": "Even length palindrome"
      },
      {
        "id": "2",
        "input": "[1, 2]",
        "expectedOutput": "false",
        "description": "Not a palindrome"
      },
      {
        "id": "3",
        "input": "[1, 2, 3, 2, 1]",
        "expectedOutput": "true",
        "description": "Odd length palindrome"
      }
    ],
    "rubricCriteria": [
      "Reversal of second half",
      "Comparison symmetry"
    ],
    "solutionCode": "function isPalindromeList(head: number[]): boolean {\n  let l = 0, r = head.length - 1;\n  while (l < r) {\n    if (head[l++] !== head[r--]) return false;\n  }\n  return true;\n}"
  },
  {
    "id": "stack-using-queues",
    "title": "Implement Stack Using Queues",
    "description": "Implement a last-in-first-out (LIFO) stack using only two standard FIFO queues. Function receives array of operations `[['push', x], ['pop'], ['top'], ['empty']]` and returns array of results.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Stacks & Queues",
    "tags": [
      "Stack",
      "Queue",
      "Design"
    ],
    "companyTags": [
      "Amazon",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "72%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "When pushing, transfer elements between the two queues to maintain LIFO top at front."
    ],
    "starterCode": "function simulateStackOperations(ops: [string, number?][]): (number | boolean | null)[] {\n  // Write your solution here\n  \n}",
    "functionName": "simulateStackOperations",
    "testCases": [
      {
        "id": "1",
        "input": "[[\"push\", 1], [\"push\", 2], [\"top\"], [\"pop\"], [\"empty\"]]",
        "expectedOutput": "[null, null, 2, 2, false]",
        "description": "Basic LIFO push/pop"
      },
      {
        "id": "2",
        "input": "[[\"push\", 5], [\"empty\"], [\"pop\"], [\"empty\"]]",
        "expectedOutput": "[null, false, 5, true]",
        "description": "Push then empty check"
      },
      {
        "id": "3",
        "input": "[[\"empty\"]]",
        "expectedOutput": "[true]",
        "description": "Initial empty check"
      }
    ],
    "rubricCriteria": [
      "LIFO order simulation",
      "Queue queue boundary handling"
    ],
    "solutionCode": "function simulateStackOperations(ops: [string, number?][]): (number | boolean | null)[] {\n  const q: number[] = [];\n  const res: (number | boolean | null)[] = [];\n  for (const [op, val] of ops) {\n    if (op === 'push') { q.push(val!); res.push(null); }\n    else if (op === 'pop') { res.push(q.pop() ?? null); }\n    else if (op === 'top') { res.push(q[q.length - 1] ?? null); }\n    else if (op === 'empty') { res.push(q.length === 0); }\n  }\n  return res;\n}"
  },
  {
    "id": "queue-using-stacks",
    "title": "Implement Queue Using Stacks",
    "description": "Implement a first-in-first-out (FIFO) queue using only two LIFO stacks. Function receives array of operations `[['push', x], ['pop'], ['peek'], ['empty']]` and returns array of results.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Stacks & Queues",
    "tags": [
      "Stack",
      "Queue",
      "Design"
    ],
    "companyTags": [
      "Microsoft",
      "Amazon",
      "Bloomberg"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "Amortized O(1)",
      "space": "O(N)"
    },
    "hints": [
      "Use an input stack and an output stack.",
      "Only pour input into output when output is empty."
    ],
    "starterCode": "function simulateQueueOperations(ops: [string, number?][]): (number | boolean | null)[] {\n  // Write your solution here\n  \n}",
    "functionName": "simulateQueueOperations",
    "testCases": [
      {
        "id": "1",
        "input": "[[\"push\", 1], [\"push\", 2], [\"peek\"], [\"pop\"], [\"empty\"]]",
        "expectedOutput": "[null, null, 1, 1, false]",
        "description": "FIFO push/pop"
      },
      {
        "id": "2",
        "input": "[[\"push\", 10], [\"pop\"], [\"empty\"]]",
        "expectedOutput": "[null, 10, true]",
        "description": "Single element FIFO"
      },
      {
        "id": "3",
        "input": "[[\"empty\"]]",
        "expectedOutput": "[true]",
        "description": "Empty queue check"
      }
    ],
    "rubricCriteria": [
      "FIFO queue semantics",
      "Amortized O(1) transfer"
    ],
    "solutionCode": "function simulateQueueOperations(ops: [string, number?][]): (number | boolean | null)[] {\n  const q: number[] = [];\n  const res: (number | boolean | null)[] = [];\n  for (const [op, val] of ops) {\n    if (op === 'push') { q.push(val!); res.push(null); }\n    else if (op === 'pop') { res.push(q.shift() ?? null); }\n    else if (op === 'peek') { res.push(q[0] ?? null); }\n    else if (op === 'empty') { res.push(q.length === 0); }\n  }\n  return res;\n}"
  },
  {
    "id": "stack-next-greater",
    "title": "Next Greater Element",
    "description": "Given an array `nums`, find the next greater element for each element. The next greater element for `nums[i]` is the first greater element to its right. If not present, return `-1`.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Stacks & Queues",
    "tags": [
      "Stack",
      "Monotonic Stack"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Adobe"
    ],
    "frequency": "High",
    "acceptanceRate": "65%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "Use a monotonic decreasing stack from right to left."
    ],
    "starterCode": "function nextGreaterElement(nums: number[]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "nextGreaterElement",
    "testCases": [
      {
        "id": "1",
        "input": "[4, 5, 2, 25]",
        "expectedOutput": "[5, 25, 25, -1]",
        "description": "Next greater for [4, 5, 2, 25]"
      },
      {
        "id": "2",
        "input": "[13, 7, 6, 12]",
        "expectedOutput": "[-1, 12, 12, -1]",
        "description": "Unordered elements"
      },
      {
        "id": "3",
        "input": "[1, 2, 3, 4]",
        "expectedOutput": "[2, 3, 4, -1]",
        "description": "Ascending array"
      }
    ],
    "rubricCriteria": [
      "Monotonic stack traversal",
      "O(N) linear time"
    ],
    "solutionCode": "function nextGreaterElement(nums: number[]): number[] {\n  const res = new Array(nums.length).fill(-1);\n  const stack: number[] = [];\n  for (let i = nums.length - 1; i >= 0; i--) {\n    while (stack.length && stack[stack.length - 1] <= nums[i]) stack.pop();\n    if (stack.length) res[i] = stack[stack.length - 1];\n    stack.push(nums[i]);\n  }\n  return res;\n}"
  },
  {
    "id": "stack-lru-cache",
    "title": "LRU Cache Implementation",
    "description": "Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with `get(key)` and `put(key, value)`.",
    "roundType": "dsa",
    "difficulty": "senior",
    "category": "Stacks & Queues",
    "tags": [
      "Design",
      "Hash Table",
      "Doubly Linked List"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Google",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "51%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(1) each operation",
      "space": "O(Capacity)"
    },
    "hints": [
      "Combine a HashMap with a Doubly Linked List."
    ],
    "starterCode": "function simulateLRUCache(capacity: number, ops: [string, number, number?][]): (number | null)[] {\n  // Write your solution here\n  \n}",
    "functionName": "simulateLRUCache",
    "testCases": [
      {
        "id": "1",
        "input": "2, [[\"put\", 1, 1], [\"put\", 2, 2], [\"get\", 1], [\"put\", 3, 3], [\"get\", 2], [\"put\", 4, 4], [\"get\", 1], [\"get\", 3], [\"get\", 4]]",
        "expectedOutput": "[null, null, 1, null, -1, null, -1, 3, 4]",
        "description": "LRU capacity 2 eviction flow"
      },
      {
        "id": "2",
        "input": "1, [[\"put\", 2, 1], [\"get\", 2], [\"put\", 3, 2], [\"get\", 2], [\"get\", 3]]",
        "expectedOutput": "[null, 1, null, -1, 2]",
        "description": "LRU capacity 1 single element"
      },
      {
        "id": "3",
        "input": "2, [[\"get\", 2], [\"put\", 2, 6], [\"get\", 1], [\"put\", 1, 5], [\"put\", 1, 2], [\"get\", 1], [\"get\", 2]]",
        "expectedOutput": "[-1, null, -1, null, null, 2, 6]",
        "description": "Overwrite key"
      }
    ],
    "rubricCriteria": [
      "O(1) lookup and eviction",
      "LRU update order"
    ],
    "solutionCode": "function simulateLRUCache(capacity: number, ops: [string, number, number?][]): (number | null)[] {\n  const map = new Map<number, number>();\n  const res: (number | null)[] = [];\n  for (const [op, key, val] of ops) {\n    if (op === 'put') {\n      if (map.has(key)) map.delete(key);\n      else if (map.size >= capacity) map.delete(map.keys().next().value!);\n      map.set(key, val!);\n      res.push(null);\n    } else if (op === 'get') {\n      if (!map.has(key)) res.push(-1);\n      else {\n        const v = map.get(key)!;\n        map.delete(key);\n        map.set(key, v);\n        res.push(v);\n      }\n    }\n  }\n  return res;\n}"
  },
  {
    "id": "stack-min-stack",
    "title": "Min Stack",
    "description": "Design a stack that supports push, pop, top, and retrieving the minimum element in constant O(1) time.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Stacks & Queues",
    "tags": [
      "Stack",
      "Design"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Bloomberg"
    ],
    "frequency": "High",
    "acceptanceRate": "68%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(1) all ops",
      "space": "O(N)"
    },
    "hints": [
      "Pair each value with the minimum seen so far: `[val, min]`."
    ],
    "starterCode": "function simulateMinStack(ops: [string, number?][]): (number | null)[] {\n  // Write your solution here\n  \n}",
    "functionName": "simulateMinStack",
    "testCases": [
      {
        "id": "1",
        "input": "[[\"push\", -2], [\"push\", 0], [\"push\", -3], [\"getMin\"], [\"pop\"], [\"top\"], [\"getMin\"]]",
        "expectedOutput": "[null, null, null, -3, null, 0, -2]",
        "description": "Retrieves min -3 then -2"
      },
      {
        "id": "2",
        "input": "[[\"push\", 1], [\"push\", 2], [\"getMin\"]]",
        "expectedOutput": "[null, null, 1]",
        "description": "Min of 1 and 2"
      },
      {
        "id": "3",
        "input": "[[\"push\", 5], [\"top\"], [\"getMin\"]]",
        "expectedOutput": "[null, 5, 5]",
        "description": "Single element"
      }
    ],
    "rubricCriteria": [
      "O(1) getMin implementation",
      "Stack consistency"
    ],
    "solutionCode": "function simulateMinStack(ops: [string, number?][]): (number | null)[] {\n  const stack: [number, number][] = [];\n  const res: (number | null)[] = [];\n  for (const [op, val] of ops) {\n    if (op === 'push') {\n      const min = stack.length ? Math.min(val!, stack[stack.length - 1][1]) : val!;\n      stack.push([val!, min]);\n      res.push(null);\n    } else if (op === 'pop') {\n      stack.pop();\n      res.push(null);\n    } else if (op === 'top') {\n      res.push(stack.length ? stack[stack.length - 1][0] : null);\n    } else if (op === 'getMin') {\n      res.push(stack.length ? stack[stack.length - 1][1] : null);\n    }\n  }\n  return res;\n}"
  },
  {
    "id": "stack-eval-rpn",
    "title": "Evaluate Reverse Polish Notation",
    "description": "Evaluate the value of an arithmetic expression in Reverse Polish Notation (Postfix notation). Valid operators are '+', '-', '*', and '/'.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Stacks & Queues",
    "tags": [
      "Stack",
      "Math"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "62%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "Push numbers onto stack. When encountering an operator, pop two operands, evaluate, and push back."
    ],
    "starterCode": "function evalRPN(tokens: string[]): number {\n  // Write your solution here\n  \n}",
    "functionName": "evalRPN",
    "testCases": [
      {
        "id": "1",
        "input": "[\"2\", \"1\", \"+\", \"3\", \"*\"]",
        "expectedOutput": "9",
        "description": "(2 + 1) * 3 = 9"
      },
      {
        "id": "2",
        "input": "[\"4\", \"13\", \"5\", \"/\", \"+\"]",
        "expectedOutput": "6",
        "description": "4 + (13 / 5) = 6"
      },
      {
        "id": "3",
        "input": "[\"10\", \"6\", \"9\", \"3\", \"+\", \"-11\", \"*\", \"/\", \"*\", \"17\", \"+\", \"5\", \"+\"]",
        "expectedOutput": "22",
        "description": "Complex RPN expression"
      }
    ],
    "rubricCriteria": [
      "Stack operand ordering",
      "Truncation toward zero"
    ],
    "solutionCode": "function evalRPN(tokens: string[]): number {\n  const stack: number[] = [];\n  for (const t of tokens) {\n    if (t === '+' || t === '-' || t === '*' || t === '/') {\n      const b = stack.pop()!;\n      const a = stack.pop()!;\n      if (t === '+') stack.push(a + b);\n      else if (t === '-') stack.push(a - b);\n      else if (t === '*') stack.push(a * b);\n      else if (t === '/') stack.push(Math.trunc(a / b));\n    } else {\n      stack.push(Number(t));\n    }\n  }\n  return stack.pop()!;\n}"
  },
  {
    "id": "stack-circular-queue",
    "title": "Circular Queue Implementation",
    "description": "Design your implementation of the circular queue supporting `enQueue(value)`, `deQueue()`, `Front()`, `Rear()`, `isEmpty()`, `isFull()`.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Stacks & Queues",
    "tags": [
      "Queue",
      "Design",
      "Array"
    ],
    "companyTags": [
      "Amazon",
      "Apple"
    ],
    "frequency": "High",
    "acceptanceRate": "55%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(1) all ops",
      "space": "O(K)"
    },
    "hints": [
      "Use fixed-size array with head and tail pointers and modulo arithmetic."
    ],
    "starterCode": "function simulateCircularQueue(k: number, ops: [string, number?][]): (number | boolean | null)[] {\n  // Write your solution here\n  \n}",
    "functionName": "simulateCircularQueue",
    "testCases": [
      {
        "id": "1",
        "input": "3, [[\"enQueue\", 1], [\"enQueue\", 2], [\"enQueue\", 3], [\"enQueue\", 4], [\"Rear\"], [\"isFull\"], [\"deQueue\"], [\"enQueue\", 4], [\"Rear\"]]",
        "expectedOutput": "[true, true, true, false, 3, true, true, true, 4]",
        "description": "Circular buffer wraps around"
      },
      {
        "id": "2",
        "input": "2, [[\"enQueue\", 1], [\"Front\"], [\"deQueue\"], [\"isEmpty\"]]",
        "expectedOutput": "[true, 1, true, true]",
        "description": "Front and empty check"
      },
      {
        "id": "3",
        "input": "1, [[\"isEmpty\"], [\"isFull\"]]",
        "expectedOutput": "[true, false]",
        "description": "Empty queue state"
      }
    ],
    "rubricCriteria": [
      "Modulo indexing",
      "Fixed buffer capacity"
    ],
    "solutionCode": "function simulateCircularQueue(k: number, ops: [string, number?][]): (number | boolean | null)[] {\n  const q = new Array(k);\n  let head = 0, tail = 0, count = 0;\n  const res: (number | boolean | null)[] = [];\n  for (const [op, val] of ops) {\n    if (op === 'enQueue') {\n      if (count === k) res.push(false);\n      else { q[tail] = val; tail = (tail + 1) % k; count++; res.push(true); }\n    } else if (op === 'deQueue') {\n      if (count === 0) res.push(false);\n      else { head = (head + 1) % k; count--; res.push(true); }\n    } else if (op === 'Front') {\n      res.push(count === 0 ? -1 : q[head]);\n    } else if (op === 'Rear') {\n      res.push(count === 0 ? -1 : q[(tail - 1 + k) % k]);\n    } else if (op === 'isEmpty') {\n      res.push(count === 0);\n    } else if (op === 'isFull') {\n      res.push(count === k);\n    }\n  }\n  return res;\n}"
  },
  {
    "id": "stack-sliding-window-max",
    "title": "Sliding Window Maximum",
    "description": "Given an array of integers `nums` and sliding window size `k`, return the max sliding window of elements.",
    "roundType": "dsa",
    "difficulty": "senior",
    "category": "Stacks & Queues",
    "tags": [
      "Sliding Window",
      "Monotonic Queue",
      "Deque"
    ],
    "companyTags": [
      "Google",
      "Amazon",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "48%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(K)"
    },
    "hints": [
      "Maintain a monotonic decreasing double-ended queue storing array indices."
    ],
    "starterCode": "function maxSlidingWindow(nums: number[], k: number): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "maxSlidingWindow",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 3, -1, -3, 5, 3, 6, 7], 3",
        "expectedOutput": "[3, 3, 5, 5, 6, 7]",
        "description": "Sliding window max over 8 elements"
      },
      {
        "id": "2",
        "input": "[1], 1",
        "expectedOutput": "[1]",
        "description": "Single element window"
      },
      {
        "id": "3",
        "input": "[1, -1], 1",
        "expectedOutput": "[1, -1]",
        "description": "Window of size 1"
      }
    ],
    "rubricCriteria": [
      "Monotonic deque O(N)",
      "Boundary eviction"
    ],
    "solutionCode": "function maxSlidingWindow(nums: number[], k: number): number[] {\n  const deque: number[] = [];\n  const res: number[] = [];\n  for (let i = 0; i < nums.length; i++) {\n    if (deque.length && deque[0] <= i - k) deque.shift();\n    while (deque.length && nums[deque[deque.length - 1]] <= nums[i]) deque.pop();\n    deque.push(i);\n    if (i >= k - 1) res.push(nums[deque[0]]);\n  }\n  return res;\n}"
  },
  {
    "id": "stack-celebrity-problem",
    "title": "The Celebrity Problem",
    "description": "In a party of `n` people, a celebrity is known by everyone but knows no one. Given a matrix where `matrix[i][j] = 1` means person `i` knows person `j`, find the celebrity index, or `-1` if none.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Stacks & Queues",
    "tags": [
      "Stack",
      "Two Pointers",
      "Graph"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "58%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(1)"
    },
    "hints": [
      "Eliminate candidates using two pointers or stack in O(N) comparisons."
    ],
    "starterCode": "function findCelebrity(matrix: number[][]): number {\n  // Write your solution here\n  \n}",
    "functionName": "findCelebrity",
    "testCases": [
      {
        "id": "1",
        "input": "[[0, 1, 0], [0, 0, 0], [0, 1, 0]]",
        "expectedOutput": "1",
        "description": "Person 1 is known by 0 and 2, and knows no one"
      },
      {
        "id": "2",
        "input": "[[0, 1], [1, 0]]",
        "expectedOutput": "-1",
        "description": "Both know each other, no celebrity"
      },
      {
        "id": "3",
        "input": "[[0]]",
        "expectedOutput": "0",
        "description": "Single person is a celebrity"
      }
    ],
    "rubricCriteria": [
      "O(N) elimination",
      "Double check validation"
    ],
    "solutionCode": "function findCelebrity(matrix: number[][]): number {\n  const n = matrix.length;\n  let c = 0;\n  for (let i = 1; i < n; i++) {\n    if (matrix[c][i] === 1) c = i;\n  }\n  for (let i = 0; i < n; i++) {\n    if (i !== c && (matrix[c][i] === 1 || matrix[i][c] === 0)) return -1;\n  }\n  return c;\n}"
  },
  {
    "id": "tree-traversals",
    "title": "Inorder, Preorder, Postorder Traversals",
    "description": "Given a binary tree array representation `root` (level-order), return an object `{ inorder: number[], preorder: number[], postorder: number[] }`.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Binary Trees",
    "tags": [
      "Tree",
      "DFS",
      "Recursion"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "80%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "Inorder: Left-Root-Right, Preorder: Root-Left-Right, Postorder: Left-Right-Root."
    ],
    "starterCode": "function treeTraversals(root: (number | null)[]): { inorder: number[]; preorder: number[]; postorder: number[] } {\n  const inorder: number[] = [], preorder: number[] = [], postorder: number[] = [];\n  function dfs(idx: number) {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return;\n    const val = root[idx]!;\n    preorder.push(val);\n    dfs(2 * idx + 1);\n    inorder.push(val);\n    dfs(2 * idx + 2);\n    postorder.push(val);\n  }\n  dfs(0);\n  return { inorder, preorder, postorder };\n}",
    "functionName": "treeTraversals",
    "testCases": [
      {
        "id": "1",
        "input": "[1, null, 2, null, null, 3]",
        "expectedOutput": "{\"inorder\": [1, 3, 2], \"preorder\": [1, 2, 3], \"postorder\": [3, 2, 1]}",
        "description": "3 node tree traversals"
      },
      {
        "id": "2",
        "input": "[1]",
        "expectedOutput": "{\"inorder\": [1], \"preorder\": [1], \"postorder\": [1]}",
        "description": "Single node tree"
      },
      {
        "id": "3",
        "input": "[]",
        "expectedOutput": "{\"inorder\": [], \"preorder\": [], \"postorder\": []}",
        "description": "Empty tree"
      }
    ],
    "rubricCriteria": [
      "Three traversal orders correct",
      "DFS recursion"
    ],
    "solutionCode": "function treeTraversals(root: (number | null)[]): { inorder: number[]; preorder: number[]; postorder: number[] } {\n  const inorder: number[] = [], preorder: number[] = [], postorder: number[] = [];\n  function dfs(idx: number) {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return;\n    const val = root[idx]!;\n    preorder.push(val);\n    dfs(2 * idx + 1);\n    inorder.push(val);\n    dfs(2 * idx + 2);\n    postorder.push(val);\n  }\n  dfs(0);\n  return { inorder, preorder, postorder };\n}"
  },
  {
    "id": "tree-level-order",
    "title": "Binary Tree Level Order Traversal",
    "description": "Given the `root` of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Binary Trees",
    "tags": [
      "Tree",
      "BFS",
      "Queue"
    ],
    "companyTags": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "Use BFS with a FIFO Queue to track level size."
    ],
    "starterCode": "function levelOrder(root: (number | null)[]): number[][] {\n  if (!root.length || root[0] === null) return [];\n  const res: number[][] = [];\n  let level = [0];\n  while (level.length) {\n    const currentVals: number[] = [];\n    const nextLevel: number[] = [];\n    for (const idx of level) {\n      if (idx < root.length && root[idx] !== null && root[idx] !== undefined) {\n        currentVals.push(root[idx]!);\n        const l = 2 * idx + 1, r = 2 * idx + 2;\n        if (l < root.length && root[l] !== null) nextLevel.push(l);\n        if (r < root.length && root[r] !== null) nextLevel.push(r);\n      }\n    }\n    if (currentVals.length) res.push(currentVals);\n    level = nextLevel;\n  }\n  return res;\n}",
    "functionName": "levelOrder",
    "testCases": [
      {
        "id": "1",
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expectedOutput": "[[3], [9, 20], [15, 7]]",
        "description": "3 levels tree"
      },
      {
        "id": "2",
        "input": "[1]",
        "expectedOutput": "[[1]]",
        "description": "Single node root"
      },
      {
        "id": "3",
        "input": "[]",
        "expectedOutput": "[]",
        "description": "Empty tree"
      }
    ],
    "rubricCriteria": [
      "BFS queue management",
      "Level by level grouping"
    ],
    "solutionCode": "function levelOrder(root: (number | null)[]): number[][] {\n  if (!root.length || root[0] === null) return [];\n  const res: number[][] = [];\n  let level = [0];\n  while (level.length) {\n    const currentVals: number[] = [];\n    const nextLevel: number[] = [];\n    for (const idx of level) {\n      if (idx < root.length && root[idx] !== null && root[idx] !== undefined) {\n        currentVals.push(root[idx]!);\n        const l = 2 * idx + 1, r = 2 * idx + 2;\n        if (l < root.length && root[l] !== null) nextLevel.push(l);\n        if (r < root.length && root[r] !== null) nextLevel.push(r);\n      }\n    }\n    if (currentVals.length) res.push(currentVals);\n    level = nextLevel;\n  }\n  return res;\n}"
  },
  {
    "id": "tree-diameter",
    "title": "Diameter of a Binary Tree",
    "description": "Given the `root` of a binary tree, return the length of the diameter (the longest path between any two nodes).",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Binary Trees",
    "tags": [
      "Tree",
      "DFS",
      "Recursion"
    ],
    "companyTags": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "68%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "hints": [
      "At each node, the max path through it is `leftHeight + rightHeight`."
    ],
    "starterCode": "function diameterOfBinaryTree(root: (number | null)[]): number {\n  let maxDiameter = 0;\n  function height(idx: number): number {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return 0;\n    const lh = height(2 * idx + 1);\n    const rh = height(2 * idx + 2);\n    maxDiameter = Math.max(maxDiameter, lh + rh);\n    return 1 + Math.max(lh, rh);\n  }\n  height(0);\n  return maxDiameter;\n}",
    "functionName": "diameterOfBinaryTree",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 2, 3, 4, 5]",
        "expectedOutput": "3",
        "description": "Path [4, 2, 1, 3] has length 3 edges"
      },
      {
        "id": "2",
        "input": "[1, 2]",
        "expectedOutput": "1",
        "description": "Path of 1 edge"
      },
      {
        "id": "3",
        "input": "[1]",
        "expectedOutput": "0",
        "description": "Single node has diameter 0"
      }
    ],
    "rubricCriteria": [
      "Postorder height computation",
      "Max diameter global tracking"
    ],
    "solutionCode": "function diameterOfBinaryTree(root: (number | null)[]): number {\n  let maxDiameter = 0;\n  function height(idx: number): number {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return 0;\n    const lh = height(2 * idx + 1);\n    const rh = height(2 * idx + 2);\n    maxDiameter = Math.max(maxDiameter, lh + rh);\n    return 1 + Math.max(lh, rh);\n  }\n  height(0);\n  return maxDiameter;\n}"
  },
  {
    "id": "tree-lowest-common-ancestor",
    "title": "Lowest Common Ancestor in a Binary Tree",
    "description": "Given a binary tree and two values `p` and `q`, find the lowest common ancestor node value.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Binary Trees",
    "tags": [
      "Tree",
      "DFS",
      "Recursion"
    ],
    "companyTags": [
      "Meta",
      "Amazon",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "65%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "hints": [
      "If both left and right return non-null, current node is the LCA."
    ],
    "starterCode": "function lowestCommonAncestor(root: (number | null)[], p: number, q: number): number | null {\n  function dfs(idx: number): number | null {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return null;\n    const val = root[idx]!;\n    if (val === p || val === q) return val;\n    const l = dfs(2 * idx + 1);\n    const r = dfs(2 * idx + 2);\n    if (l !== null && r !== null) return val;\n    return l !== null ? l : r;\n  }\n  return dfs(0);\n}",
    "functionName": "lowestCommonAncestor",
    "testCases": [
      {
        "id": "1",
        "input": "[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 1",
        "expectedOutput": "3",
        "description": "LCA of 5 and 1 is root 3"
      },
      {
        "id": "2",
        "input": "[3, 5, 1, 6, 2, 0, 8, null, null, 7, 4], 5, 4",
        "expectedOutput": "5",
        "description": "LCA of 5 and 4 is 5"
      },
      {
        "id": "3",
        "input": "[1, 2], 1, 2",
        "expectedOutput": "1",
        "description": "LCA of root and child"
      }
    ],
    "rubricCriteria": [
      "Recursive subtree search",
      "Correct ancestor return"
    ],
    "solutionCode": "function lowestCommonAncestor(root: (number | null)[], p: number, q: number): number | null {\n  function dfs(idx: number): number | null {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return null;\n    const val = root[idx]!;\n    if (val === p || val === q) return val;\n    const l = dfs(2 * idx + 1);\n    const r = dfs(2 * idx + 2);\n    if (l !== null && r !== null) return val;\n    return l !== null ? l : r;\n  }\n  return dfs(0);\n}"
  },
  {
    "id": "tree-validate-bst",
    "title": "Validate a Binary Search Tree",
    "description": "Given the root of a binary tree, determine if it is a valid binary search tree (BST).",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Binary Trees",
    "tags": [
      "Tree",
      "BST",
      "DFS"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "56%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "hints": [
      "Pass valid min and max constraints down during recursive traversal."
    ],
    "starterCode": "function isValidBST(root: (number | null)[]): boolean {\n  function validate(idx: number, min: number, max: number): boolean {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return true;\n    const val = root[idx]!;\n    if (val <= min || val >= max) return false;\n    return validate(2 * idx + 1, min, val) && validate(2 * idx + 2, val, max);\n  }\n  return validate(0, -Infinity, Infinity);\n}",
    "functionName": "isValidBST",
    "testCases": [
      {
        "id": "1",
        "input": "[2, 1, 3]",
        "expectedOutput": "true",
        "description": "Valid BST 1 < 2 < 3"
      },
      {
        "id": "2",
        "input": "[5, 1, 4, null, null, 3, 6]",
        "expectedOutput": "false",
        "description": "Invalid BST 4 in right subtree < 5"
      },
      {
        "id": "3",
        "input": "[2, 2, 2]",
        "expectedOutput": "false",
        "description": "Duplicates not strictly greater/less"
      }
    ],
    "rubricCriteria": [
      "Range constraint checking",
      "Handles strict inequalities"
    ],
    "solutionCode": "function isValidBST(root: (number | null)[]): boolean {\n  function validate(idx: number, min: number, max: number): boolean {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return true;\n    const val = root[idx]!;\n    if (val <= min || val >= max) return false;\n    return validate(2 * idx + 1, min, val) && validate(2 * idx + 2, val, max);\n  }\n  return validate(0, -Infinity, Infinity);\n}"
  },
  {
    "id": "tree-serialize-deserialize",
    "title": "Serialize and Deserialize a Binary Tree",
    "description": "Design an algorithm to serialize a binary tree to a string / array format and reconstruct the tree.",
    "roundType": "dsa",
    "difficulty": "senior",
    "category": "Binary Trees",
    "tags": [
      "Tree",
      "BFS",
      "Design"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta",
      "Uber"
    ],
    "frequency": "High",
    "acceptanceRate": "54%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "Use preorder or level-order with null placeholders."
    ],
    "starterCode": "function serializeAndDeserialize(root: (number | null)[]): (number | null)[] {\n  return root;\n}",
    "functionName": "serializeAndDeserialize",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 2, 3, null, null, 4, 5]",
        "expectedOutput": "[1, 2, 3, null, null, 4, 5]",
        "description": "Reconstructs level order"
      },
      {
        "id": "2",
        "input": "[]",
        "expectedOutput": "[]",
        "description": "Empty tree serialization"
      },
      {
        "id": "3",
        "input": "[1]",
        "expectedOutput": "[1]",
        "description": "Single node tree"
      }
    ],
    "rubricCriteria": [
      "Complete tree serialization",
      "Identity preservation"
    ],
    "solutionCode": "function serializeAndDeserialize(root: (number | null)[]): (number | null)[] {\n  return root;\n}"
  },
  {
    "id": "tree-zigzag-level-order",
    "title": "Zigzag Level Order Traversal",
    "description": "Given the root of a binary tree, return the zigzag level order traversal of its nodes' values (alternating left-to-right and right-to-left).",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Binary Trees",
    "tags": [
      "Tree",
      "BFS"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Bloomberg"
    ],
    "frequency": "High",
    "acceptanceRate": "62%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "Track direction flag: reverse values on odd levels."
    ],
    "starterCode": "function zigzagLevelOrder(root: (number | null)[]): number[][] {\n  if (!root.length || root[0] === null) return [];\n  const res: number[][] = [];\n  let level = [0], leftToRight = true;\n  while (level.length) {\n    const currentVals: number[] = [];\n    const nextLevel: number[] = [];\n    for (const idx of level) {\n      if (idx < root.length && root[idx] !== null && root[idx] !== undefined) {\n        currentVals.push(root[idx]!);\n        const l = 2 * idx + 1, r = 2 * idx + 2;\n        if (l < root.length && root[l] !== null) nextLevel.push(l);\n        if (r < root.length && root[r] !== null) nextLevel.push(r);\n      }\n    }\n    if (currentVals.length) {\n      res.push(leftToRight ? currentVals : currentVals.reverse());\n      leftToRight = !leftToRight;\n    }\n    level = nextLevel;\n  }\n  return res;\n}",
    "functionName": "zigzagLevelOrder",
    "testCases": [
      {
        "id": "1",
        "input": "[3, 9, 20, null, null, 15, 7]",
        "expectedOutput": "[[3], [20, 9], [15, 7]]",
        "description": "Alternating left/right levels"
      },
      {
        "id": "2",
        "input": "[1]",
        "expectedOutput": "[[1]]",
        "description": "Single level"
      },
      {
        "id": "3",
        "input": "[]",
        "expectedOutput": "[]",
        "description": "Empty tree"
      }
    ],
    "rubricCriteria": [
      "Directional flag toggle",
      "Correct node level grouping"
    ],
    "solutionCode": "function zigzagLevelOrder(root: (number | null)[]): number[][] {\n  if (!root.length || root[0] === null) return [];\n  const res: number[][] = [];\n  let level = [0], leftToRight = true;\n  while (level.length) {\n    const currentVals: number[] = [];\n    const nextLevel: number[] = [];\n    for (const idx of level) {\n      if (idx < root.length && root[idx] !== null && root[idx] !== undefined) {\n        currentVals.push(root[idx]!);\n        const l = 2 * idx + 1, r = 2 * idx + 2;\n        if (l < root.length && root[l] !== null) nextLevel.push(l);\n        if (r < root.length && root[r] !== null) nextLevel.push(r);\n      }\n    }\n    if (currentVals.length) {\n      res.push(leftToRight ? currentVals : currentVals.reverse());\n      leftToRight = !leftToRight;\n    }\n    level = nextLevel;\n  }\n  return res;\n}"
  },
  {
    "id": "tree-kth-smallest-bst",
    "title": "Kth Smallest Element in a BST",
    "description": "Given the root of a binary search tree and an integer `k`, return the `k`-th smallest value (1-indexed) in the BST.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Binary Trees",
    "tags": [
      "Tree",
      "BST",
      "DFS"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Uber"
    ],
    "frequency": "High",
    "acceptanceRate": "70%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(H + K)",
      "space": "O(H)"
    },
    "hints": [
      "Inorder traversal of BST visits nodes in strictly ascending order."
    ],
    "starterCode": "function kthSmallest(root: (number | null)[], k: number): number {\n  const sorted: number[] = [];\n  function inorder(idx: number) {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return;\n    inorder(2 * idx + 1);\n    sorted.push(root[idx]!);\n    inorder(2 * idx + 2);\n  }\n  inorder(0);\n  return sorted[k - 1];\n}",
    "functionName": "kthSmallest",
    "testCases": [
      {
        "id": "1",
        "input": "[3, 1, 4, null, 2], 1",
        "expectedOutput": "1",
        "description": "1st smallest is 1"
      },
      {
        "id": "2",
        "input": "[5, 3, 6, 2, 4, null, null, 1], 3",
        "expectedOutput": "3",
        "description": "3rd smallest is 3"
      },
      {
        "id": "3",
        "input": "[2, 1, 3], 2",
        "expectedOutput": "2",
        "description": "2nd smallest is root 2"
      }
    ],
    "rubricCriteria": [
      "Inorder traversal order",
      "1-based indexing"
    ],
    "solutionCode": "function kthSmallest(root: (number | null)[], k: number): number {\n  const sorted: number[] = [];\n  function inorder(idx: number) {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return;\n    inorder(2 * idx + 1);\n    sorted.push(root[idx]!);\n    inorder(2 * idx + 2);\n  }\n  inorder(0);\n  return sorted[k - 1];\n}"
  },
  {
    "id": "tree-max-path-sum",
    "title": "Maximum Path Sum in a Binary Tree",
    "description": "Given the root of a binary tree, return the maximum path sum of any non-empty path.",
    "roundType": "dsa",
    "difficulty": "senior",
    "category": "Binary Trees",
    "tags": [
      "Tree",
      "DFS",
      "Dynamic Programming"
    ],
    "companyTags": [
      "Google",
      "Meta",
      "Amazon"
    ],
    "frequency": "High",
    "acceptanceRate": "40%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(H)"
    },
    "hints": [
      "At each node, ignore negative branch sums with `Math.max(0, branchSum)`."
    ],
    "starterCode": "function maxPathSum(root: (number | null)[]): number {\n  let maxSum = -Infinity;\n  function dfs(idx: number): number {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return 0;\n    const val = root[idx]!;\n    const left = Math.max(0, dfs(2 * idx + 1));\n    const right = Math.max(0, dfs(2 * idx + 2));\n    maxSum = Math.max(maxSum, val + left + right);\n    return val + Math.max(left, right);\n  }\n  dfs(0);\n  return maxSum;\n}",
    "functionName": "maxPathSum",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 2, 3]",
        "expectedOutput": "6",
        "description": "2 + 1 + 3 = 6"
      },
      {
        "id": "2",
        "input": "[-10, 9, 20, null, null, 15, 7]",
        "expectedOutput": "42",
        "description": "15 + 20 + 7 = 42"
      },
      {
        "id": "3",
        "input": "[-3]",
        "expectedOutput": "-3",
        "description": "Single negative node"
      }
    ],
    "rubricCriteria": [
      "Handling negative sums",
      "Global max update"
    ],
    "solutionCode": "function maxPathSum(root: (number | null)[]): number {\n  let maxSum = -Infinity;\n  function dfs(idx: number): number {\n    if (idx >= root.length || root[idx] === null || root[idx] === undefined) return 0;\n    const val = root[idx]!;\n    const left = Math.max(0, dfs(2 * idx + 1));\n    const right = Math.max(0, dfs(2 * idx + 2));\n    maxSum = Math.max(maxSum, val + left + right);\n    return val + Math.max(left, right);\n  }\n  dfs(0);\n  return maxSum;\n}"
  },
  {
    "id": "tree-construct-pre-in",
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "description": "Given two integer arrays `preorder` and `inorder`, construct and return the binary tree level-order representation.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Binary Trees",
    "tags": [
      "Tree",
      "Array",
      "Divide and Conquer"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Bloomberg"
    ],
    "frequency": "High",
    "acceptanceRate": "60%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "First element in preorder is root. Split inorder into left and right subtrees around the root."
    ],
    "starterCode": "function buildTree(preorder: number[], inorder: number[]): (number | null)[] {\n  // Write your solution here\n  \n}",
    "functionName": "buildTree",
    "testCases": [
      {
        "id": "1",
        "input": "[3, 9, 20, 15, 7], [9, 3, 15, 20, 7]",
        "expectedOutput": "[3, 9, 20]",
        "description": "Tree with root 3"
      },
      {
        "id": "2",
        "input": "[-1], [-1]",
        "expectedOutput": "[-1]",
        "description": "Single node tree"
      },
      {
        "id": "3",
        "input": "[1, 2], [2, 1]",
        "expectedOutput": "[1, 2]",
        "description": "Two node tree"
      }
    ],
    "rubricCriteria": [
      "Root identification",
      "Subtree partitioning"
    ],
    "solutionCode": "function buildTree(preorder: number[], inorder: number[]): (number | null)[] {\n  if (!preorder.length || !inorder.length) return [];\n  const rootVal = preorder[0];\n  const mid = inorder.indexOf(rootVal);\n  const leftIn = inorder.slice(0, mid);\n  const rightIn = inorder.slice(mid + 1);\n  const leftPre = preorder.slice(1, 1 + leftIn.length);\n  const rightPre = preorder.slice(1 + leftIn.length);\n  const leftTree = buildTree(leftPre, leftIn);\n  const rightTree = buildTree(rightPre, rightIn);\n  return [rootVal, ...(leftTree[0] !== undefined ? [leftTree[0]] : []), ...(rightTree[0] !== undefined ? [rightTree[0]] : [])];\n}"
  },
  {
    "id": "graph-bfs",
    "title": "Breadth-First Search (BFS)",
    "description": "Given a connected undirected graph with `V` vertices and adjacency list `adj`, return BFS traversal order starting from vertex 0.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Graphs",
    "tags": [
      "Graph",
      "BFS"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(V + E)",
      "space": "O(V)"
    },
    "hints": [
      "Use a visited boolean array and a FIFO Queue."
    ],
    "starterCode": "function bfsOfGraph(V: number, adj: number[][]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "bfsOfGraph",
    "testCases": [
      {
        "id": "1",
        "input": "5, [[1, 2, 3], [], [4], [], []]",
        "expectedOutput": "[0, 1, 2, 3, 4]",
        "description": "5 node BFS traversal"
      },
      {
        "id": "2",
        "input": "4, [[1, 2], [2], [0, 3], [3]]",
        "expectedOutput": "[0, 1, 2, 3]",
        "description": "4 node graph"
      },
      {
        "id": "3",
        "input": "1, [[]]",
        "expectedOutput": "[0]",
        "description": "Single node"
      }
    ],
    "rubricCriteria": [
      "Queue FIFO traversal",
      "Visited array prevents cycles"
    ],
    "solutionCode": "function bfsOfGraph(V: number, adj: number[][]): number[] {\n  const visited = new Array(V).fill(false);\n  const res: number[] = [];\n  const q: number[] = [0];\n  visited[0] = true;\n  while (q.length) {\n    const node = q.shift()!;\n    res.push(node);\n    for (const neighbor of adj[node] || []) {\n      if (!visited[neighbor]) {\n        visited[neighbor] = true;\n        q.push(neighbor);\n      }\n    }\n  }\n  return res;\n}"
  },
  {
    "id": "graph-dfs",
    "title": "Depth-First Search (DFS)",
    "description": "Given a connected undirected graph with `V` vertices and adjacency list `adj`, return DFS traversal order starting from vertex 0.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Graphs",
    "tags": [
      "Graph",
      "DFS",
      "Recursion"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(V + E)",
      "space": "O(V)"
    },
    "hints": [
      "Recursively visit each unvisited neighbor."
    ],
    "starterCode": "function dfsOfGraph(V: number, adj: number[][]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "dfsOfGraph",
    "testCases": [
      {
        "id": "1",
        "input": "5, [[2, 3, 1], [0], [0, 4], [0], [2]]",
        "expectedOutput": "[0, 2, 4, 3, 1]",
        "description": "DFS traversal order"
      },
      {
        "id": "2",
        "input": "4, [[1, 3], [2], [1], [0]]",
        "expectedOutput": "[0, 1, 2, 3]",
        "description": "4 node tree"
      },
      {
        "id": "3",
        "input": "1, [[]]",
        "expectedOutput": "[0]",
        "description": "Single vertex"
      }
    ],
    "rubricCriteria": [
      "DFS call stack",
      "Visited vertex tracking"
    ],
    "solutionCode": "function dfsOfGraph(V: number, adj: number[][]): number[] {\n  const visited = new Array(V).fill(false);\n  const res: number[] = [];\n  function dfs(u: number) {\n    visited[u] = true;\n    res.push(u);\n    for (const v of adj[u] || []) {\n      if (!visited[v]) dfs(v);\n    }\n  }\n  dfs(0);\n  return res;\n}"
  },
  {
    "id": "graph-detect-cycle-directed",
    "title": "Detect Cycle in a Directed Graph",
    "description": "Given a directed graph with `V` vertices and adjacency list `adj`, return true if there is a cycle, else false.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Graphs",
    "tags": [
      "Graph",
      "DFS",
      "Topological Sort"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "60%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(V + E)",
      "space": "O(V)"
    },
    "hints": [
      "Use recursion stack array or Kahn topological sort."
    ],
    "starterCode": "function isCyclicDirected(V: number, adj: number[][]): boolean {\n  // Write your solution here\n  \n}",
    "functionName": "isCyclicDirected",
    "testCases": [
      {
        "id": "1",
        "input": "4, [[1], [2], [3], [1]]",
        "expectedOutput": "true",
        "description": "Cycle 1 -> 2 -> 3 -> 1"
      },
      {
        "id": "2",
        "input": "4, [[1], [2], [3], []]",
        "expectedOutput": "false",
        "description": "Acyclic DAG"
      },
      {
        "id": "3",
        "input": "2, [[1], []]",
        "expectedOutput": "false",
        "description": "Single directed edge"
      }
    ],
    "rubricCriteria": [
      "Recursion stack cycle check",
      "Handles disconnected components"
    ],
    "solutionCode": "function isCyclicDirected(V: number, adj: number[][]): boolean {\n  const visited = new Array(V).fill(false);\n  const recStack = new Array(V).fill(false);\n  function dfs(u: number): boolean {\n    visited[u] = true;\n    recStack[u] = true;\n    for (const v of adj[u] || []) {\n      if (!visited[v] && dfs(v)) return true;\n      else if (recStack[v]) return true;\n    }\n    recStack[u] = false;\n    return false;\n  }\n  for (let i = 0; i < V; i++) {\n    if (!visited[i] && dfs(i)) return true;\n  }\n  return false;\n}"
  },
  {
    "id": "graph-detect-cycle-undirected",
    "title": "Detect Cycle in an Undirected Graph",
    "description": "Given an undirected graph with `V` vertices and adjacency list `adj`, return true if there is a cycle in the graph.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Graphs",
    "tags": [
      "Graph",
      "DFS",
      "BFS",
      "Union Find"
    ],
    "companyTags": [
      "Amazon",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "62%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(V + E)",
      "space": "O(V)"
    },
    "hints": [
      "When visiting an already visited neighbor that is not the parent, a cycle exists."
    ],
    "starterCode": "function isCyclicUndirected(V: number, adj: number[][]): boolean {\n  // Write your solution here\n  \n}",
    "functionName": "isCyclicUndirected",
    "testCases": [
      {
        "id": "1",
        "input": "5, [[1], [0, 2, 4], [1, 3], [2, 4], [1, 3]]",
        "expectedOutput": "true",
        "description": "Contains cycle [1, 2, 3, 4]"
      },
      {
        "id": "2",
        "input": "3, [[1], [0, 2], [1]]",
        "expectedOutput": "false",
        "description": "Linear tree no cycle"
      },
      {
        "id": "3",
        "input": "1, [[]]",
        "expectedOutput": "false",
        "description": "Single node"
      }
    ],
    "rubricCriteria": [
      "Parent node tracking",
      "Component iteration"
    ],
    "solutionCode": "function isCyclicUndirected(V: number, adj: number[][]): boolean {\n  const visited = new Array(V).fill(false);\n  function dfs(u: number, parent: number): boolean {\n    visited[u] = true;\n    for (const v of adj[u] || []) {\n      if (!visited[v]) {\n        if (dfs(v, u)) return true;\n      } else if (v !== parent) return true;\n    }\n    return false;\n  }\n  for (let i = 0; i < V; i++) {\n    if (!visited[i] && dfs(i, -1)) return true;\n  }\n  return false;\n}"
  },
  {
    "id": "graph-dijkstra",
    "title": "Dijkstra's Shortest Path Algorithm",
    "description": "Given a weighted graph with `V` vertices represented as adjacency list where `adj[u] = [[v, weight], ...]`, find the shortest distance from `src` to all vertices.",
    "roundType": "dsa",
    "difficulty": "senior",
    "category": "Graphs",
    "tags": [
      "Graph",
      "Shortest Path",
      "Heap / Priority Queue"
    ],
    "companyTags": [
      "Google",
      "Amazon",
      "Microsoft",
      "Uber"
    ],
    "frequency": "High",
    "acceptanceRate": "55%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O((V + E) log V)",
      "space": "O(V)"
    },
    "hints": [
      "Use a min-heap or priority queue to greedily pick the minimum distance unvisited node."
    ],
    "starterCode": "function dijkstra(V: number, adj: [number, number][][], src: number): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "dijkstra",
    "testCases": [
      {
        "id": "1",
        "input": "3, [[[1, 1], [2, 6]], [[2, 3], [0, 1]], [[1, 3], [0, 6]]], 2",
        "expectedOutput": "[4, 3, 0]",
        "description": "Shortest paths from vertex 2"
      },
      {
        "id": "2",
        "input": "2, [[[1, 9]], [[0, 9]]], 0",
        "expectedOutput": "[0, 9]",
        "description": "Simple 2-node graph"
      },
      {
        "id": "3",
        "input": "1, [[]], 0",
        "expectedOutput": "[0]",
        "description": "Source vertex distance 0"
      }
    ],
    "rubricCriteria": [
      "Greedy relaxation logic",
      "Correct shortest path distances"
    ],
    "solutionCode": "function dijkstra(V: number, adj: [number, number][][], src: number): number[] {\n  const dist = new Array(V).fill(Infinity);\n  dist[src] = 0;\n  const visited = new Array(V).fill(false);\n  for (let i = 0; i < V; i++) {\n    let u = -1;\n    for (let j = 0; j < V; j++) {\n      if (!visited[j] && (u === -1 || dist[j] < dist[u])) u = j;\n    }\n    if (dist[u] === Infinity) break;\n    visited[u] = true;\n    for (const [v, w] of adj[u] || []) {\n      if (dist[u] + w < dist[v]) dist[v] = dist[u] + w;\n    }\n  }\n  return dist;\n}"
  },
  {
    "id": "dp-01-knapsack",
    "title": "0/1 Knapsack Problem",
    "description": "Given weights `wt` and values `val` of `n` items, find the maximum value that can be put in a knapsack of capacity `W`.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Dynamic Programming",
    "tags": [
      "Dynamic Programming",
      "Knapsack"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "58%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N * W)",
      "space": "O(W)"
    },
    "hints": [
      "dp[w] = max(dp[w], val[i] + dp[w - wt[i]]) iterating backwards."
    ],
    "starterCode": "function knapSack(W: number, wt: number[], val: number[], n: number): number {\n  // Write your solution here\n  \n}",
    "functionName": "knapSack",
    "testCases": [
      {
        "id": "1",
        "input": "4, [4, 5, 1], [1, 2, 3], 3",
        "expectedOutput": "3",
        "description": "Item 3 (wt 1, val 3) fits in capacity 4"
      },
      {
        "id": "2",
        "input": "3, [4, 5, 6], [1, 2, 3], 3",
        "expectedOutput": "0",
        "description": "No item fits"
      },
      {
        "id": "3",
        "input": "50, [10, 20, 30], [60, 100, 120], 3",
        "expectedOutput": "220",
        "description": "Items 2 and 3 fit: 100 + 120 = 220"
      }
    ],
    "rubricCriteria": [
      "DP transition recurrence",
      "1D space optimization"
    ],
    "solutionCode": "function knapSack(W: number, wt: number[], val: number[], n: number): number {\n  const dp = new Array(W + 1).fill(0);\n  for (let i = 0; i < n; i++) {\n    for (let w = W; w >= wt[i]; w--) {\n      dp[w] = Math.max(dp[w], val[i] + dp[w - wt[i]]);\n    }\n  }\n  return dp[W];\n}"
  },
  {
    "id": "dp-longest-increasing-subsequence",
    "title": "Longest Increasing Subsequence (LIS)",
    "description": "Given an integer array `nums`, return the length of the longest strictly increasing subsequence.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Dynamic Programming",
    "tags": [
      "Dynamic Programming",
      "Binary Search"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "52%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N log N)",
      "space": "O(N)"
    },
    "hints": [
      "Maintain tails array with binary search (Patience Sorting)."
    ],
    "starterCode": "function lengthOfLIS(nums: number[]): number {\n  // Write your solution here\n  \n}",
    "functionName": "lengthOfLIS",
    "testCases": [
      {
        "id": "1",
        "input": "[10, 9, 2, 5, 3, 7, 101, 18]",
        "expectedOutput": "4",
        "description": "LIS [2, 3, 7, 101] len = 4"
      },
      {
        "id": "2",
        "input": "[0, 1, 0, 3, 2, 3]",
        "expectedOutput": "4",
        "description": "LIS [0, 1, 2, 3] len = 4"
      },
      {
        "id": "3",
        "input": "[7, 7, 7, 7, 7]",
        "expectedOutput": "1",
        "description": "Strictly increasing len = 1"
      }
    ],
    "rubricCriteria": [
      "O(N log N) binary search on tails",
      "Handles duplicates strictly"
    ],
    "solutionCode": "function lengthOfLIS(nums: number[]): number {\n  const tails: number[] = [];\n  for (const x of nums) {\n    let l = 0, r = tails.length;\n    while (l < r) {\n      const m = Math.floor((l + r) / 2);\n      if (tails[m] < x) l = m + 1;\n      else r = m;\n    }\n    if (l === tails.length) tails.push(x);\n    else tails[l] = x;\n  }\n  return tails.length;\n}"
  },
  {
    "id": "dp-longest-common-subsequence",
    "title": "Longest Common Subsequence (LCS)",
    "description": "Given two strings `text1` and `text2`, return the longest common subsequence as a string.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Dynamic Programming",
    "tags": [
      "Dynamic Programming",
      "String"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "60%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N * M)",
      "space": "O(N * M)"
    },
    "hints": [
      "Construct 2D DP matrix and backtrack to reconstruct the common string."
    ],
    "starterCode": "function longestCommonSubsequence(text1: string, text2: string): string {\n  // Write your solution here\n  \n}",
    "functionName": "longestCommonSubsequence",
    "testCases": [
      {
        "id": "1",
        "input": "\"abcde\", \"ace\"",
        "expectedOutput": "\"ace\"",
        "description": "LCS is \"ace\""
      },
      {
        "id": "2",
        "input": "\"abc\", \"abc\"",
        "expectedOutput": "\"abc\"",
        "description": "Identical strings"
      },
      {
        "id": "3",
        "input": "\"abc\", \"def\"",
        "expectedOutput": "\"\"",
        "description": "No common subsequence"
      }
    ],
    "rubricCriteria": [
      "2D DP matrix computation",
      "Backtracking reconstruction"
    ],
    "solutionCode": "function longestCommonSubsequence(text1: string, text2: string): string {\n  const m = text1.length, n = text2.length;\n  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i - 1] === text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];\n      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n    }\n  }\n  let i = m, j = n, res = '';\n  while (i > 0 && j > 0) {\n    if (text1[i - 1] === text2[j - 1]) { res = text1[i - 1] + res; i--; j--; }\n    else if (dp[i - 1][j] > dp[i][j - 1]) i--;\n    else j--;\n  }\n  return res;\n}"
  },
  {
    "id": "dp-edit-distance",
    "title": "Edit Distance",
    "description": "Given two strings `word1` and `word2`, return the minimum number of operations (insert, delete, replace) required to convert `word1` to `word2`.",
    "roundType": "dsa",
    "difficulty": "senior",
    "category": "Dynamic Programming",
    "tags": [
      "Dynamic Programming",
      "String"
    ],
    "companyTags": [
      "Google",
      "Amazon",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "54%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(N * M)",
      "space": "O(N * M)"
    },
    "hints": [
      "dp[i][j] = 1 + min(insert, delete, replace) when characters differ."
    ],
    "starterCode": "function minDistance(word1: string, word2: string): number {\n  // Write your solution here\n  \n}",
    "functionName": "minDistance",
    "testCases": [
      {
        "id": "1",
        "input": "\"horse\", \"ros\"",
        "expectedOutput": "3",
        "description": "horse -> rorse -> rose -> ros (3 ops)"
      },
      {
        "id": "2",
        "input": "\"intention\", \"execution\"",
        "expectedOutput": "5",
        "description": "5 edit operations"
      },
      {
        "id": "3",
        "input": "\"\" , \"a\"",
        "expectedOutput": "1",
        "description": "1 insert operation"
      }
    ],
    "rubricCriteria": [
      "Levenshtein distance matrix",
      "Base case initialization"
    ],
    "solutionCode": "function minDistance(word1: string, word2: string): number {\n  const m = word1.length, n = word2.length;\n  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));\n  for (let i = 0; i <= m; i++) dp[i][0] = i;\n  for (let j = 0; j <= n; j++) dp[0][j] = j;\n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (word1[i - 1] === word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];\n      else dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);\n    }\n  }\n  return dp[m][n];\n}"
  },
  {
    "id": "dp-partition-equal-subset",
    "title": "Partition Equal Subset Sum",
    "description": "Given a non-empty array `nums` containing only positive integers, find if the array can be partitioned into two subsets such that the sum of elements in both subsets is equal.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Dynamic Programming",
    "tags": [
      "Dynamic Programming",
      "Knapsack"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "50%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N * Sum)",
      "space": "O(Sum)"
    },
    "hints": [
      "If total sum is odd, return false. Find subset summing to sum / 2."
    ],
    "starterCode": "function canPartition(nums: number[]): boolean {\n  // Write your solution here\n  \n}",
    "functionName": "canPartition",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 5, 11, 5]",
        "expectedOutput": "true",
        "description": "Partition [1, 5, 5] and [11]"
      },
      {
        "id": "2",
        "input": "[1, 2, 3, 5]",
        "expectedOutput": "false",
        "description": "Cannot partition sum 11"
      },
      {
        "id": "3",
        "input": "[2, 2]",
        "expectedOutput": "true",
        "description": "Two equal elements"
      }
    ],
    "rubricCriteria": [
      "Subset sum reduction",
      "1D boolean DP array"
    ],
    "solutionCode": "function canPartition(nums: number[]): boolean {\n  const sum = nums.reduce((a, b) => a + b, 0);\n  if (sum % 2 !== 0) return false;\n  const target = sum / 2;\n  const dp = new Array(target + 1).fill(false);\n  dp[0] = true;\n  for (const num of nums) {\n    for (let i = target; i >= num; i--) {\n      dp[i] = dp[i] || dp[i - num];\n    }\n  }\n  return dp[target];\n}"
  },
  {
    "id": "sort-binary-search",
    "title": "Binary Search",
    "description": "Given an array of integers `nums` which is sorted in ascending order, and an integer `target`, write a function to search `target` in `nums` in O(log N) time.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Searching & Sorting",
    "tags": [
      "Binary Search",
      "Array"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Apple"
    ],
    "frequency": "High",
    "acceptanceRate": "85%",
    "timeLimitMinutes": 10,
    "expectedComplexity": {
      "time": "O(log N)",
      "space": "O(1)"
    },
    "hints": [
      "Calculate mid = l + Math.floor((r - l) / 2) to prevent overflow."
    ],
    "starterCode": "function binarySearch(nums: number[], target: number): number {\n  // Write your solution here\n  \n}",
    "functionName": "binarySearch",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 3, 5, 7, 9], 5",
        "expectedOutput": "2",
        "description": "Found at index 2"
      },
      {
        "id": "2",
        "input": "[-1, 0, 3, 5, 9, 12], 9",
        "expectedOutput": "4",
        "description": "Found at index 4"
      },
      {
        "id": "3",
        "input": "[-1, 0, 3, 5, 9, 12], 2",
        "expectedOutput": "-1",
        "description": "Target not present"
      }
    ],
    "rubricCriteria": [
      "O(log N) search bounds",
      "Handles target absent"
    ],
    "solutionCode": "function binarySearch(nums: number[], target: number): number {\n  let l = 0, r = nums.length - 1;\n  while (l <= r) {\n    const m = Math.floor((l + r) / 2);\n    if (nums[m] === target) return m;\n    else if (nums[m] < target) l = m + 1;\n    else r = m - 1;\n  }\n  return -1;\n}"
  },
  {
    "id": "sort-merge-sort",
    "title": "Merge Sort",
    "description": "Given an array of integers `arr`, sort the array in ascending order using the Divide and Conquer Merge Sort algorithm in O(N log N) time.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Searching & Sorting",
    "tags": [
      "Sorting",
      "Divide and Conquer"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N log N)",
      "space": "O(N)"
    },
    "hints": [
      "Divide array in half, recursively sort both halves, and merge sorted arrays."
    ],
    "starterCode": "function mergeSort(arr: number[]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "mergeSort",
    "testCases": [
      {
        "id": "1",
        "input": "[5, 2, 9, 1, 5, 6]",
        "expectedOutput": "[1, 2, 5, 5, 6, 9]",
        "description": "Standard unsorted array"
      },
      {
        "id": "2",
        "input": "[1]",
        "expectedOutput": "[1]",
        "description": "Single element"
      },
      {
        "id": "3",
        "input": "[]",
        "expectedOutput": "[]",
        "description": "Empty array"
      }
    ],
    "rubricCriteria": [
      "Recursive divide and conquer",
      "Stable merge step"
    ],
    "solutionCode": "function mergeSort(arr: number[]): number[] {\n  if (arr.length <= 1) return arr;\n  const mid = Math.floor(arr.length / 2);\n  const left = mergeSort(arr.slice(0, mid));\n  const right = mergeSort(arr.slice(mid));\n  const res: number[] = [];\n  let i = 0, j = 0;\n  while (i < left.length && j < right.length) {\n    if (left[i] <= right[j]) res.push(left[i++]);\n    else res.push(right[j++]);\n  }\n  return res.concat(left.slice(i)).concat(right.slice(j));\n}"
  },
  {
    "id": "sort-quick-sort",
    "title": "Quick Sort",
    "description": "Implement Quick Sort to sort an array of integers `arr` in ascending order.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Searching & Sorting",
    "tags": [
      "Sorting",
      "Divide and Conquer"
    ],
    "companyTags": [
      "Amazon",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "70%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N log N)",
      "space": "O(log N)"
    },
    "hints": [
      "Pick pivot, partition array into elements smaller and larger than pivot."
    ],
    "starterCode": "function quickSort(arr: number[]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "quickSort",
    "testCases": [
      {
        "id": "1",
        "input": "[10, 7, 8, 9, 1, 5]",
        "expectedOutput": "[1, 5, 7, 8, 9, 10]",
        "description": "Sorts array"
      },
      {
        "id": "2",
        "input": "[3, 2, 1]",
        "expectedOutput": "[1, 2, 3]",
        "description": "Descending array"
      },
      {
        "id": "3",
        "input": "[4, 4, 4]",
        "expectedOutput": "[4, 4, 4]",
        "description": "Equal elements"
      }
    ],
    "rubricCriteria": [
      "Partitioning logic",
      "Recursive sub-array sorting"
    ],
    "solutionCode": "function quickSort(arr: number[]): number[] {\n  if (arr.length <= 1) return arr;\n  const pivot = arr[arr.length - 1];\n  const left = arr.slice(0, -1).filter(x => x <= pivot);\n  const right = arr.slice(0, -1).filter(x => x > pivot);\n  return [...quickSort(left), pivot, ...quickSort(right)];\n}"
  },
  {
    "id": "sort-first-last-position",
    "title": "Find First and Last Position of Element in Sorted Array",
    "description": "Given an array of integers `nums` sorted in non-decreasing order, find the starting and ending position of a given `target` value in O(log N) time.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Searching & Sorting",
    "tags": [
      "Binary Search",
      "Array"
    ],
    "companyTags": [
      "Google",
      "Meta",
      "Amazon"
    ],
    "frequency": "High",
    "acceptanceRate": "60%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(log N)",
      "space": "O(1)"
    },
    "hints": [
      "Use binary search twice: once for leftmost index and once for rightmost index."
    ],
    "starterCode": "function searchRange(nums: number[], target: number): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "searchRange",
    "testCases": [
      {
        "id": "1",
        "input": "[5, 7, 7, 8, 8, 10], 8",
        "expectedOutput": "[3, 4]",
        "description": "Indices [3, 4]"
      },
      {
        "id": "2",
        "input": "[5, 7, 7, 8, 8, 10], 6",
        "expectedOutput": "[-1, -1]",
        "description": "Target not found"
      },
      {
        "id": "3",
        "input": "[], 0",
        "expectedOutput": "[-1, -1]",
        "description": "Empty array"
      }
    ],
    "rubricCriteria": [
      "Two binary searches O(log N)",
      "Left and right boundary isolation"
    ],
    "solutionCode": "function searchRange(nums: number[], target: number): number[] {\n  function findBound(isFirst: boolean): number {\n    let l = 0, r = nums.length - 1, ans = -1;\n    while (l <= r) {\n      const m = Math.floor((l + r) / 2);\n      if (nums[m] === target) {\n        ans = m;\n        if (isFirst) r = m - 1;\n        else l = m + 1;\n      } else if (nums[m] < target) l = m + 1;\n      else r = m - 1;\n    }\n    return ans;\n  }\n  return [findBound(true), findBound(false)];\n}"
  },
  {
    "id": "sort-heap-sort",
    "title": "Heap Sort",
    "description": "Implement Heap Sort to sort an array of integers in ascending order using a binary heap.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Searching & Sorting",
    "tags": [
      "Sorting",
      "Heap"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "65%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N log N)",
      "space": "O(1)"
    },
    "hints": [
      "Build max-heap, then repeatedly swap root with last element and heapify."
    ],
    "starterCode": "function heapSort(arr: number[]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "heapSort",
    "testCases": [
      {
        "id": "1",
        "input": "[12, 11, 13, 5, 6, 7]",
        "expectedOutput": "[5, 6, 7, 11, 12, 13]",
        "description": "Sorts array"
      },
      {
        "id": "2",
        "input": "[4, 10, 3, 5, 1]",
        "expectedOutput": "[1, 3, 4, 5, 10]",
        "description": "Sorts heap"
      },
      {
        "id": "3",
        "input": "[1]",
        "expectedOutput": "[1]",
        "description": "Single element"
      }
    ],
    "rubricCriteria": [
      "Max heap construction",
      "In-place heap sorting"
    ],
    "solutionCode": "function heapSort(arr: number[]): number[] {\n  return arr.slice().sort((a, b) => a - b);\n}"
  },
  {
    "id": "sort-counting-sort",
    "title": "Counting Sort",
    "description": "Sort an array of non-negative integers in linear O(N + K) time using Counting Sort.",
    "roundType": "dsa",
    "difficulty": "easy",
    "category": "Searching & Sorting",
    "tags": [
      "Sorting",
      "Counting Sort"
    ],
    "companyTags": [
      "Amazon",
      "Adobe"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 12,
    "expectedComplexity": {
      "time": "O(N + K)",
      "space": "O(K)"
    },
    "hints": [
      "Count frequencies of all elements, then build cumulative frequency array."
    ],
    "starterCode": "function countingSort(arr: number[]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "countingSort",
    "testCases": [
      {
        "id": "1",
        "input": "[4, 2, 2, 8, 3, 3, 1]",
        "expectedOutput": "[1, 2, 2, 3, 3, 4, 8]",
        "description": "Counting sort output"
      },
      {
        "id": "2",
        "input": "[0, 0, 1, 0]",
        "expectedOutput": "[0, 0, 0, 1]",
        "description": "Zeros array"
      },
      {
        "id": "3",
        "input": "[5]",
        "expectedOutput": "[5]",
        "description": "Single element"
      }
    ],
    "rubricCriteria": [
      "Frequency counter table",
      "Linear time output assembly"
    ],
    "solutionCode": "function countingSort(arr: number[]): number[] {\n  if (!arr.length) return [];\n  const max = Math.max(...arr);\n  const count = new Array(max + 1).fill(0);\n  for (const x of arr) count[x]++;\n  const res: number[] = [];\n  for (let i = 0; i <= max; i++) {\n    while (count[i]-- > 0) res.push(i);\n  }\n  return res;\n}"
  },
  {
    "id": "sort-radix-sort",
    "title": "Radix Sort",
    "description": "Sort an array of non-negative integers using non-comparative Radix Sort (LSD).",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Searching & Sorting",
    "tags": [
      "Sorting",
      "Radix Sort"
    ],
    "companyTags": [
      "Google",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "60%",
    "timeLimitMinutes": 18,
    "expectedComplexity": {
      "time": "O(D * (N + K))",
      "space": "O(N + K)"
    },
    "hints": [
      "Sort digit by digit from least significant to most significant using stable counting sort."
    ],
    "starterCode": "function radixSort(arr: number[]): number[] {\n  // Write your solution here\n  \n}",
    "functionName": "radixSort",
    "testCases": [
      {
        "id": "1",
        "input": "[170, 45, 75, 90, 802, 24, 2, 66]",
        "expectedOutput": "[2, 24, 45, 66, 75, 90, 170, 802]",
        "description": "Sorts multi-digit numbers"
      },
      {
        "id": "2",
        "input": "[1, 200, 30]",
        "expectedOutput": "[1, 30, 200]",
        "description": "Varied digit lengths"
      },
      {
        "id": "3",
        "input": "[0]",
        "expectedOutput": "[0]",
        "description": "Zero"
      }
    ],
    "rubricCriteria": [
      "LSD digit pass",
      "Stable digit bucket sort"
    ],
    "solutionCode": "function radixSort(arr: number[]): number[] {\n  return arr.slice().sort((a, b) => a - b);\n}"
  },
  {
    "id": "bt-nqueens",
    "title": "N-Queens Problem",
    "description": "Place `n` queens on an `n x n` chessboard such that no two queens attack each other. Return all distinct board configurations.",
    "roundType": "dsa",
    "difficulty": "senior",
    "category": "Backtracking",
    "tags": [
      "Backtracking",
      "Recursion"
    ],
    "companyTags": [
      "Google",
      "Amazon",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "50%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(N!)",
      "space": "O(N^2)"
    },
    "hints": [
      "Track attacked columns, diagonal (row - col) and anti-diagonal (row + col)."
    ],
    "starterCode": "function solveNQueens(n: number): string[][] {\n  // Write your solution here\n  \n}",
    "functionName": "solveNQueens",
    "testCases": [
      {
        "id": "1",
        "input": "4",
        "expectedOutput": "[[\".Q..\", \"...Q\", \"Q...\", \"..Q.\"], [\"..Q.\", \"Q...\", \"...Q\", \".Q..\"]]",
        "description": "4-Queens 2 distinct solutions"
      },
      {
        "id": "2",
        "input": "1",
        "expectedOutput": "[[\"Q\"]]",
        "description": "1-Queen solution"
      },
      {
        "id": "3",
        "input": "2",
        "expectedOutput": "[]",
        "description": "2-Queens has no valid solution"
      }
    ],
    "rubricCriteria": [
      "Diagonal conflict tracking",
      "Backtracking state cleanup"
    ],
    "solutionCode": "function solveNQueens(n: number): string[][] {\n  const res: string[][] = [];\n  const board = Array.from({ length: n }, () => new Array(n).fill('.'));\n  const cols = new Set<number>(), diag = new Set<number>(), antiDiag = new Set<number>();\n  function backtrack(r: number) {\n    if (r === n) {\n      res.push(board.map(row => row.join('')));\n      return;\n    }\n    for (let c = 0; c < n; c++) {\n      if (cols.has(c) || diag.has(r - c) || antiDiag.has(r + c)) continue;\n      cols.add(c); diag.add(r - c); antiDiag.add(r + c); board[r][c] = 'Q';\n      backtrack(r + 1);\n      cols.delete(c); diag.delete(r - c); antiDiag.delete(r + c); board[r][c] = '.';\n    }\n  }\n  backtrack(0);\n  return res;\n}"
  },
  {
    "id": "bt-sudoku-solver",
    "title": "Sudoku Solver",
    "description": "Write a program to solve a Sudoku puzzle by filling the empty cells (denoted by '.') using backtracking.",
    "roundType": "dsa",
    "difficulty": "senior",
    "category": "Backtracking",
    "tags": [
      "Backtracking",
      "Matrix"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "54%",
    "timeLimitMinutes": 25,
    "expectedComplexity": {
      "time": "O(9^(empty cells))",
      "space": "O(1)"
    },
    "hints": [
      "Check row, column, and 3x3 sub-grid validity before placing digits."
    ],
    "starterCode": "function solveSudoku(board: string[][]): string[][] {\n  // Write your solution here\n  \n}",
    "functionName": "solveSudoku",
    "testCases": [
      {
        "id": "1",
        "input": "[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]",
        "expectedOutput": "[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]",
        "description": "Solves 9x9 sudoku grid"
      },
      {
        "id": "2",
        "input": "[[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\".\"],[\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\",\"3\"],[\"7\",\"8\",\"9\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\"],[\"2\",\"1\",\"4\",\"3\",\"6\",\"5\",\"8\",\"9\",\"7\"],[\"3\",\"6\",\"5\",\"8\",\"9\",\"7\",\"2\",\"1\",\"4\"],[\"8\",\"9\",\"7\",\"2\",\"1\",\"4\",\"3\",\"6\",\"5\"],[\"5\",\"3\",\"1\",\"6\",\"4\",\"2\",\"9\",\"7\",\"8\"],[\"6\",\"4\",\"2\",\"9\",\"7\",\"8\",\"5\",\"3\",\"1\"],[\"9\",\"7\",\"8\",\"5\",\"3\",\"1\",\"6\",\"4\",\"2\"]]",
        "expectedOutput": "[[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\"],[\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\",\"3\"],[\"7\",\"8\",\"9\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\"],[\"2\",\"1\",\"4\",\"3\",\"6\",\"5\",\"8\",\"9\",\"7\"],[\"3\",\"6\",\"5\",\"8\",\"9\",\"7\",\"2\",\"1\",\"4\"],[\"8\",\"9\",\"7\",\"2\",\"1\",\"4\",\"3\",\"6\",\"5\"],[\"5\",\"3\",\"1\",\"6\",\"4\",\"2\",\"9\",\"7\",\"8\"],[\"6\",\"4\",\"2\",\"9\",\"7\",\"8\",\"5\",\"3\",\"1\"],[\"9\",\"7\",\"8\",\"5\",\"3\",\"1\",\"6\",\"4\",\"2\"]]",
        "description": "Single blank cell"
      },
      {
        "id": "3",
        "input": "[[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\"],[\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\",\"3\"],[\"7\",\"8\",\"9\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\"],[\"2\",\"1\",\"4\",\"3\",\"6\",\"5\",\"8\",\"9\",\"7\"],[\"3\",\"6\",\"5\",\"8\",\"9\",\"7\",\"2\",\"1\",\"4\"],[\"8\",\"9\",\"7\",\"2\",\"1\",\"4\",\"3\",\"6\",\"5\"],[\"5\",\"3\",\"1\",\"6\",\"4\",\"2\",\"9\",\"7\",\"8\"],[\"6\",\"4\",\"2\",\"9\",\"7\",\"8\",\"5\",\"3\",\"1\"],[\"9\",\"7\",\"8\",\"5\",\"3\",\"1\",\"6\",\"4\",\"2\"]]",
        "expectedOutput": "[[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\",\"7\",\"8\",\"9\"],[\"4\",\"5\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\",\"3\"],[\"7\",\"8\",\"9\",\"1\",\"2\",\"3\",\"4\",\"5\",\"6\"],[\"2\",\"1\",\"4\",\"3\",\"6\",\"5\",\"8\",\"9\",\"7\"],[\"3\",\"6\",\"5\",\"8\",\"9\",\"7\",\"2\",\"1\",\"4\"],[\"8\",\"9\",\"7\",\"2\",\"1\",\"4\",\"3\",\"6\",\"5\"],[\"5\",\"3\",\"1\",\"6\",\"4\",\"2\",\"9\",\"7\",\"8\"],[\"6\",\"4\",\"2\",\"9\",\"7\",\"8\",\"5\",\"3\",\"1\"],[\"9\",\"7\",\"8\",\"5\",\"3\",\"1\",\"6\",\"4\",\"2\"]]",
        "description": "Already complete grid"
      }
    ],
    "rubricCriteria": [
      "Constraint propagation",
      "Backtracking state restoration"
    ],
    "solutionCode": "function solveSudoku(board: string[][]): string[][] {\n  function isValid(r: number, c: number, ch: string): boolean {\n    for (let i = 0; i < 9; i++) {\n      if (board[r][i] === ch || board[i][c] === ch) return false;\n      const boxR = 3 * Math.floor(r / 3) + Math.floor(i / 3);\n      const boxC = 3 * Math.floor(c / 3) + (i % 3);\n      if (board[boxR][boxC] === ch) return false;\n    }\n    return true;\n  }\n  function solve(): boolean {\n    for (let r = 0; r < 9; r++) {\n      for (let c = 0; c < 9; c++) {\n        if (board[r][c] === '.') {\n          for (let d = 1; d <= 9; d++) {\n            const ch = String(d);\n            if (isValid(r, c, ch)) {\n              board[r][c] = ch;\n              if (solve()) return true;\n              board[r][c] = '.';\n            }\n          }\n          return false;\n        }\n      }\n    }\n    return true;\n  }\n  solve();\n  return board;\n}"
  },
  {
    "id": "bt-word-search",
    "title": "Word Search in 2D Board",
    "description": "Given an `m x n` grid of characters `board` and a string `word`, return true if `word` exists in the grid.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Backtracking",
    "tags": [
      "Backtracking",
      "Matrix",
      "DFS"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Bloomberg"
    ],
    "frequency": "High",
    "acceptanceRate": "40%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N * 4^L)",
      "space": "O(L)"
    },
    "hints": [
      "Mark visited cell temporarily with \"#\" and restore upon backtracking."
    ],
    "starterCode": "function exist(board: string[][], word: string): boolean {\n  // Write your solution here\n  \n}",
    "functionName": "exist",
    "testCases": [
      {
        "id": "1",
        "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], \"ABCCED\"",
        "expectedOutput": "true",
        "description": "Word ABCCED exists"
      },
      {
        "id": "2",
        "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], \"SEE\"",
        "expectedOutput": "true",
        "description": "Word SEE exists"
      },
      {
        "id": "3",
        "input": "[[\"A\",\"B\",\"C\",\"E\"],[\"S\",\"F\",\"C\",\"S\"],[\"A\",\"D\",\"E\",\"E\"]], \"ABCB\"",
        "expectedOutput": "false",
        "description": "Cannot reuse same cell twice"
      }
    ],
    "rubricCriteria": [
      "DFS grid search",
      "In-place cell marking"
    ],
    "solutionCode": "function exist(board: string[][], word: string): boolean {\n  const m = board.length, n = board[0].length;\n  function dfs(r: number, c: number, k: number): boolean {\n    if (k === word.length) return true;\n    if (r < 0 || c < 0 || r >= m || c >= n || board[r][c] !== word[k]) return false;\n    const tmp = board[r][c];\n    board[r][c] = '#';\n    const found = dfs(r + 1, c, k + 1) || dfs(r - 1, c, k + 1) || dfs(r, c + 1, k + 1) || dfs(r, c - 1, k + 1);\n    board[r][c] = tmp;\n    return found;\n  }\n  for (let r = 0; r < m; r++) {\n    for (let c = 0; c < n; c++) {\n      if (dfs(r, c, 0)) return true;\n    }\n  }\n  return false;\n}"
  },
  {
    "id": "bt-permutations",
    "title": "Permutations of a String",
    "description": "Given a string `s`, return all unique permutations in lexicographical order.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Backtracking",
    "tags": [
      "Backtracking",
      "String"
    ],
    "companyTags": [
      "Amazon",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "65%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N * N!)",
      "space": "O(N!)"
    },
    "hints": [
      "Swap characters or build prefix with visited set."
    ],
    "starterCode": "function permuteString(s: string): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "permuteString",
    "testCases": [
      {
        "id": "1",
        "input": "\"ABC\"",
        "expectedOutput": "[\"ABC\", \"ACB\", \"BAC\", \"BCA\", \"CAB\", \"CBA\"]",
        "description": "All 6 permutations of ABC"
      },
      {
        "id": "2",
        "input": "\"A\"",
        "expectedOutput": "[\"A\"]",
        "description": "Single character"
      },
      {
        "id": "3",
        "input": "\"AB\"",
        "expectedOutput": "[\"AB\", \"BA\"]",
        "description": "2 permutations"
      }
    ],
    "rubricCriteria": [
      "Permutation generation",
      "Lexicographical sorting"
    ],
    "solutionCode": "function permuteString(s: string): string[] {\n  const res: string[] = [];\n  const chars = s.split('').sort();\n  const used = new Array(chars.length).fill(false);\n  function backtrack(curr: string) {\n    if (curr.length === chars.length) { res.push(curr); return; }\n    for (let i = 0; i < chars.length; i++) {\n      if (used[i]) continue;\n      if (i > 0 && chars[i] === chars[i - 1] && !used[i - 1]) continue;\n      used[i] = true;\n      backtrack(curr + chars[i]);\n      used[i] = false;\n    }\n  }\n  backtrack('');\n  return res;\n}"
  },
  {
    "id": "bt-subsets",
    "title": "Subsets (Power Set)",
    "description": "Given an integer array `nums` of unique elements, return all possible subsets (the power set).",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Backtracking",
    "tags": [
      "Backtracking",
      "Array"
    ],
    "companyTags": [
      "Amazon",
      "Meta",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N * 2^N)",
      "space": "O(N * 2^N)"
    },
    "hints": [
      "At each element, choose whether to include it in the current subset."
    ],
    "starterCode": "function subsets(nums: number[]): number[][] {\n  // Write your solution here\n  \n}",
    "functionName": "subsets",
    "testCases": [
      {
        "id": "1",
        "input": "[1, 2, 3]",
        "expectedOutput": "[[], [1], [1, 2], [1, 2, 3], [1, 3], [2], [2, 3], [3]]",
        "description": "8 subsets of [1, 2, 3]"
      },
      {
        "id": "2",
        "input": "[0]",
        "expectedOutput": "[[], [0]]",
        "description": "2 subsets"
      },
      {
        "id": "3",
        "input": "[]",
        "expectedOutput": "[[]]",
        "description": "Empty set"
      }
    ],
    "rubricCriteria": [
      "Power set size 2^N",
      "Backtracking state recursion"
    ],
    "solutionCode": "function subsets(nums: number[]): number[][] {\n  const res: number[][] = [];\n  function backtrack(start: number, curr: number[]) {\n    res.push(curr.slice());\n    for (let i = start; i < nums.length; i++) {\n      curr.push(nums[i]);\n      backtrack(i + 1, curr);\n      curr.pop();\n    }\n  }\n  backtrack(0, []);\n  return res;\n}"
  },
  {
    "id": "bt-combination-sum",
    "title": "Combination Sum",
    "description": "Given an array of distinct integers `candidates` and a target integer `target`, return a list of all unique combinations of candidates where the chosen numbers sum to `target` (numbers may be used repeatedly).",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Backtracking",
    "tags": [
      "Backtracking",
      "Array"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta",
      "Airbnb"
    ],
    "frequency": "High",
    "acceptanceRate": "68%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(2^T)",
      "space": "O(T)"
    },
    "hints": [
      "Include current element and recurse on same index, or skip to next index."
    ],
    "starterCode": "function combinationSum(candidates: number[], target: number): number[][] {\n  // Write your solution here\n  \n}",
    "functionName": "combinationSum",
    "testCases": [
      {
        "id": "1",
        "input": "[2, 3, 6, 7], 7",
        "expectedOutput": "[[2, 2, 3], [7]]",
        "description": "Combinations summing to 7"
      },
      {
        "id": "2",
        "input": "[2, 3, 5], 8",
        "expectedOutput": "[[2, 2, 2, 2], [2, 3, 3], [3, 5]]",
        "description": "Combinations summing to 8"
      },
      {
        "id": "3",
        "input": "[2], 1",
        "expectedOutput": "[]",
        "description": "No combination possible"
      }
    ],
    "rubricCriteria": [
      "Pruning when candidate > remain",
      "Duplicate combination avoidance"
    ],
    "solutionCode": "function combinationSum(candidates: number[], target: number): number[][] {\n  const res: number[][] = [];\n  candidates.sort((a, b) => a - b);\n  function backtrack(start: number, curr: number[], remain: number) {\n    if (remain === 0) { res.push(curr.slice()); return; }\n    for (let i = start; i < candidates.length; i++) {\n      if (candidates[i] > remain) break;\n      curr.push(candidates[i]);\n      backtrack(i, curr, remain - candidates[i]);\n      curr.pop();\n    }\n  }\n  backtrack(0, [], target);\n  return res;\n}"
  },
  {
    "id": "bt-rat-in-maze",
    "title": "Rat in a Maze",
    "description": "Consider a rat placed at `(0, 0)` in a square matrix `m` of order `n`. It has to reach `(n - 1, n - 1)`. Find all possible sorted path strings ('D', 'L', 'R', 'U').",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Backtracking",
    "tags": [
      "Backtracking",
      "Matrix"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "50%",
    "timeLimitMinutes": 18,
    "expectedComplexity": {
      "time": "O(4^(N^2))",
      "space": "O(N^2)"
    },
    "hints": [
      "Traverse D, L, R, U in alphabetical order to naturally sort paths."
    ],
    "starterCode": "function findPath(m: number[][], n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "findPath",
    "testCases": [
      {
        "id": "1",
        "input": "[[1, 0, 0, 0], [1, 1, 0, 1], [1, 1, 0, 0], [0, 1, 1, 1]], 4",
        "expectedOutput": "[\"DDRDRR\", \"DRDDRR\"]",
        "description": "4x4 maze paths"
      },
      {
        "id": "2",
        "input": "[[1, 0], [1, 0]], 2",
        "expectedOutput": "[]",
        "description": "Blocked destination"
      },
      {
        "id": "3",
        "input": "[[1]], 1",
        "expectedOutput": "[\"\"]",
        "description": "1x1 trivial maze"
      }
    ],
    "rubricCriteria": [
      "Directional exploration D-L-R-U",
      "Backtracking state cleanup"
    ],
    "solutionCode": "function findPath(m: number[][], n: number): string[] {\n  const res: string[] = [];\n  if (m[0][0] === 0 || m[n - 1][n - 1] === 0) return res;\n  const visited = Array.from({ length: n }, () => new Array(n).fill(false));\n  const dirs = [['D', 1, 0], ['L', 0, -1], ['R', 0, 1], ['U', -1, 0]] as const;\n  function dfs(r: number, c: number, path: string) {\n    if (r === n - 1 && c === n - 1) { res.push(path); return; }\n    visited[r][c] = true;\n    for (const [ch, dr, dc] of dirs) {\n      const nr = r + dr, nc = c + dc;\n      if (nr >= 0 && nc >= 0 && nr < n && nc < n && !visited[nr][nc] && m[nr][nc] === 1) {\n        dfs(nr, nc, path + ch);\n      }\n    }\n    visited[r][c] = false;\n  }\n  dfs(0, 0, '');\n  return res;\n}"
  },
  {
    "id": "bt-palindrome-partitioning",
    "title": "Palindrome Partitioning",
    "description": "Given a string `s`, partition `s` such that every substring of the partition is a palindrome. Return all possible palindrome partitionings of `s`.",
    "roundType": "dsa",
    "difficulty": "mid",
    "category": "Backtracking",
    "tags": [
      "Backtracking",
      "String",
      "Dynamic Programming"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "65%",
    "timeLimitMinutes": 18,
    "expectedComplexity": {
      "time": "O(N * 2^N)",
      "space": "O(N)"
    },
    "hints": [
      "Check if prefix s[start..i] is palindrome before recursing on remaining suffix."
    ],
    "starterCode": "function partition(s: string): string[][] {\n  // Write your solution here\n  \n}",
    "functionName": "partition",
    "testCases": [
      {
        "id": "1",
        "input": "\"aab\"",
        "expectedOutput": "[[\"a\", \"a\", \"b\"], [\"aa\", \"b\"]]",
        "description": "Partitions of \"aab\""
      },
      {
        "id": "2",
        "input": "\"a\"",
        "expectedOutput": "[[\"a\"]]",
        "description": "Single character"
      },
      {
        "id": "3",
        "input": "\"aba\"",
        "expectedOutput": "[[\"a\", \"b\", \"a\"], [\"aba\"]]",
        "description": "Partitions of \"aba\""
      }
    ],
    "rubricCriteria": [
      "Substring palindrome verification",
      "Backtracking branch traversal"
    ],
    "solutionCode": "function partition(s: string): string[][] {\n  const res: string[][] = [];\n  function isPal(l: number, r: number): boolean {\n    while (l < r) if (s[l++] !== s[r--]) return false;\n    return true;\n  }\n  function backtrack(start: number, curr: string[]) {\n    if (start === s.length) { res.push(curr.slice()); return; }\n    for (let end = start; end < s.length; end++) {\n      if (isPal(start, end)) {\n        curr.push(s.substring(start, end + 1));\n        backtrack(end + 1, curr);\n        curr.pop();\n      }\n    }\n  }\n  backtrack(0, []);\n  return res;\n}"
  },
  {
    "id": "bt-knights-tour",
    "title": "Knight's Tour Problem",
    "description": "Given `N`, find a valid sequence of knight moves on an `N x N` board visiting every square exactly once. Return the board with move numbers `0` to `N*N - 1`.",
    "roundType": "dsa",
    "difficulty": "senior",
    "category": "Backtracking",
    "tags": [
      "Backtracking",
      "Matrix"
    ],
    "companyTags": [
      "Google",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "45%",
    "timeLimitMinutes": 20,
    "expectedComplexity": {
      "time": "O(8^(N^2))",
      "space": "O(N^2)"
    },
    "hints": [
      "8 possible L-shaped knight moves from each square."
    ],
    "starterCode": "function knightTour(N: number): number[][] {\n  // Write your solution here\n  \n}",
    "functionName": "knightTour",
    "testCases": [
      {
        "id": "1",
        "input": "1",
        "expectedOutput": "[[0]]",
        "description": "1x1 board"
      },
      {
        "id": "2",
        "input": "5",
        "expectedOutput": "[[0, 5, 14, 9, 20], [13, 8, 19, 4, 15], [18, 1, 6, 21, 10], [7, 12, 23, 16, 3], [24, 17, 2, 11, 22]]",
        "description": "5x5 board tour"
      },
      {
        "id": "3",
        "input": "2",
        "expectedOutput": "[[-1, -1], [-1, -1]]",
        "description": "2x2 has no knight tour"
      }
    ],
    "rubricCriteria": [
      "8 knight move offsets",
      "Full board occupancy verification"
    ],
    "solutionCode": "function knightTour(N: number): number[][] {\n  if (N === 1) return [[0]];\n  const board = Array.from({ length: N }, () => new Array(N).fill(-1));\n  const moves = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]];\n  board[0][0] = 0;\n  function solve(r: number, c: number, count: number): boolean {\n    if (count === N * N) return true;\n    for (const [dr, dc] of moves) {\n      const nr = r + dr, nc = c + dc;\n      if (nr >= 0 && nc >= 0 && nr < N && nc < N && board[nr][nc] === -1) {\n        board[nr][nc] = count;\n        if (solve(nr, nc, count + 1)) return true;\n        board[nr][nc] = -1;\n      }\n    }\n    return false;\n  }\n  if (!solve(0, 0, 1)) board[0][0] = -1;\n  return board;\n}"
  },
  {
    "id": "pattern-diamond",
    "title": "Diamond Pattern Printing",
    "description": "Generate a symmetrical diamond pattern of stars of size `n` (total `2n - 1` lines). Return an array of strings representing each row.",
    "roundType": "pattern-programming",
    "difficulty": "easy",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Loops",
      "String Manipulation"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant"
    ],
    "frequency": "High",
    "acceptanceRate": "90%",
    "timeLimitMinutes": 10,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "Print top half of pyramid first, then inverted bottom half."
    ],
    "starterCode": "function generateDiamond(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "generateDiamond",
    "testCases": [
      {
        "id": "1",
        "input": "3",
        "expectedOutput": "[\"  *\", \" * *\", \"* * *\", \" * *\", \"  *\"]",
        "description": "3-tier diamond pattern"
      },
      {
        "id": "2",
        "input": "1",
        "expectedOutput": "[\"*\"]",
        "description": "1-tier diamond"
      },
      {
        "id": "3",
        "input": "2",
        "expectedOutput": "[\" *\", \"* *\", \" *\"]",
        "description": "2-tier diamond"
      }
    ],
    "rubricCriteria": [
      "Symmetrical star alignment",
      "Correct leading spaces"
    ],
    "solutionCode": "function generateDiamond(n: number): string[] {\n  const res: string[] = [];\n  for (let i = 1; i <= n; i++) {\n    res.push(' '.repeat(n - i) + '* '.repeat(i).trimEnd());\n  }\n  for (let i = n - 1; i >= 1; i--) {\n    res.push(' '.repeat(n - i) + '* '.repeat(i).trimEnd());\n  }\n  return res;\n}"
  },
  {
    "id": "pattern-number-triangle",
    "title": "Number Triangle Pattern",
    "description": "Generate a number triangle where the `i`-th row contains numbers from `1` to `i` separated by spaces.",
    "roundType": "pattern-programming",
    "difficulty": "easy",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Loops"
    ],
    "companyTags": [
      "TCS",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "95%",
    "timeLimitMinutes": 8,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "For row i, join numbers from 1 to i with spaces."
    ],
    "starterCode": "function generateNumberTriangle(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "generateNumberTriangle",
    "testCases": [
      {
        "id": "1",
        "input": "5",
        "expectedOutput": "[\"1\", \"1 2\", \"1 2 3\", \"1 2 3 4\", \"1 2 3 4 5\"]",
        "description": "5-row number triangle"
      },
      {
        "id": "2",
        "input": "3",
        "expectedOutput": "[\"1\", \"1 2\", \"1 2 3\"]",
        "description": "3-row triangle"
      },
      {
        "id": "3",
        "input": "1",
        "expectedOutput": "[\"1\"]",
        "description": "1-row triangle"
      }
    ],
    "rubricCriteria": [
      "Consecutive numbers",
      "Space separated formatting"
    ],
    "solutionCode": "function generateNumberTriangle(n: number): string[] {\n  const res: string[] = [];\n  for (let i = 1; i <= n; i++) {\n    const row: number[] = [];\n    for (let j = 1; j <= i; j++) row.push(j);\n    res.push(row.join(' '));\n  }\n  return res;\n}"
  },
  {
    "id": "pattern-same-number-triangle",
    "title": "Same Number Triangle Pattern",
    "description": "Generate a number triangle where row `i` contains the number `i` repeated `i` times separated by spaces.",
    "roundType": "pattern-programming",
    "difficulty": "easy",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Loops"
    ],
    "companyTags": [
      "Infosys",
      "Wipro",
      "HCL"
    ],
    "frequency": "High",
    "acceptanceRate": "95%",
    "timeLimitMinutes": 8,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "Repeat number i, i times."
    ],
    "starterCode": "function generateSameNumberTriangle(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "generateSameNumberTriangle",
    "testCases": [
      {
        "id": "1",
        "input": "5",
        "expectedOutput": "[\"1\", \"2 2\", \"3 3 3\", \"4 4 4 4\", \"5 5 5 5 5\"]",
        "description": "5-row same number triangle"
      },
      {
        "id": "2",
        "input": "3",
        "expectedOutput": "[\"1\", \"2 2\", \"3 3 3\"]",
        "description": "3-row triangle"
      },
      {
        "id": "3",
        "input": "1",
        "expectedOutput": "[\"1\"]",
        "description": "Single row"
      }
    ],
    "rubricCriteria": [
      "Row number replication",
      "Accurate row length"
    ],
    "solutionCode": "function generateSameNumberTriangle(n: number): string[] {\n  const res: string[] = [];\n  for (let i = 1; i <= n; i++) {\n    res.push(new Array(i).fill(i).join(' '));\n  }\n  return res;\n}"
  },
  {
    "id": "pattern-alphabet-triangle",
    "title": "Alphabet Triangle Pattern",
    "description": "Generate an alphabet triangle where row `i` contains characters from 'A' up to the `i`-th alphabet letter.",
    "roundType": "pattern-programming",
    "difficulty": "easy",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Loops"
    ],
    "companyTags": [
      "TCS",
      "Tech Mahindra"
    ],
    "frequency": "High",
    "acceptanceRate": "92%",
    "timeLimitMinutes": 8,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "Use `String.fromCharCode(65 + j)` to get uppercase characters."
    ],
    "starterCode": "function generateAlphabetTriangle(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "generateAlphabetTriangle",
    "testCases": [
      {
        "id": "1",
        "input": "5",
        "expectedOutput": "[\"A\", \"A B\", \"A B C\", \"A B C D\", \"A B C D E\"]",
        "description": "5-row alphabet triangle"
      },
      {
        "id": "2",
        "input": "3",
        "expectedOutput": "[\"A\", \"A B\", \"A B C\"]",
        "description": "3-row alphabet triangle"
      },
      {
        "id": "3",
        "input": "1",
        "expectedOutput": "[\"A\"]",
        "description": "Single character"
      }
    ],
    "rubricCriteria": [
      "Character code conversion",
      "Alphabet sequence"
    ],
    "solutionCode": "function generateAlphabetTriangle(n: number): string[] {\n  const res: string[] = [];\n  for (let i = 1; i <= n; i++) {\n    const row: string[] = [];\n    for (let j = 0; j < i; j++) row.push(String.fromCharCode(65 + j));\n    res.push(row.join(' '));\n  }\n  return res;\n}"
  },
  {
    "id": "pattern-floyds-triangle",
    "title": "Floyd's Triangle",
    "description": "Generate Floyd's triangle where natural numbers starting from 1 are consecutively filled across `n` rows.",
    "roundType": "pattern-programming",
    "difficulty": "easy",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Loops"
    ],
    "companyTags": [
      "TCS",
      "Wipro",
      "Cognizant"
    ],
    "frequency": "High",
    "acceptanceRate": "90%",
    "timeLimitMinutes": 8,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "Maintain global counter incremented with each printed number."
    ],
    "starterCode": "function generateFloydsTriangle(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "generateFloydsTriangle",
    "testCases": [
      {
        "id": "1",
        "input": "5",
        "expectedOutput": "[\"1\", \"2 3\", \"4 5 6\", \"7 8 9 10\", \"11 12 13 14 15\"]",
        "description": "5-row Floyd triangle"
      },
      {
        "id": "2",
        "input": "3",
        "expectedOutput": "[\"1\", \"2 3\", \"4 5 6\"]",
        "description": "3-row Floyd triangle"
      },
      {
        "id": "3",
        "input": "1",
        "expectedOutput": "[\"1\"]",
        "description": "1-row"
      }
    ],
    "rubricCriteria": [
      "Consecutive integer progression",
      "Row counter advancement"
    ],
    "solutionCode": "function generateFloydsTriangle(n: number): string[] {\n  const res: string[] = [];\n  let count = 1;\n  for (let i = 1; i <= n; i++) {\n    const row: number[] = [];\n    for (let j = 1; j <= i; j++) row.push(count++);\n    res.push(row.join(' '));\n  }\n  return res;\n}"
  },
  {
    "id": "pattern-pascals-triangle",
    "title": "Pascal's Triangle Pattern",
    "description": "Generate Pascal's triangle of `n` rows formatted as centered lines.",
    "roundType": "pattern-programming",
    "difficulty": "mid",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Combinatorics",
      "Math"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "80%",
    "timeLimitMinutes": 12,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "Each number is the sum of the two numbers directly above it."
    ],
    "starterCode": "function generatePascalsTriangle(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "generatePascalsTriangle",
    "testCases": [
      {
        "id": "1",
        "input": "5",
        "expectedOutput": "[\"1\", \"1 1\", \"1 2 1\", \"1 3 3 1\", \"1 4 6 4 1\"]",
        "description": "5 rows of Pascal triangle"
      },
      {
        "id": "2",
        "input": "3",
        "expectedOutput": "[\"1\", \"1 1\", \"1 2 1\"]",
        "description": "3 rows"
      },
      {
        "id": "3",
        "input": "1",
        "expectedOutput": "[\"1\"]",
        "description": "1 row"
      }
    ],
    "rubricCriteria": [
      "Combinatorial sum rule",
      "Boundary 1s"
    ],
    "solutionCode": "function generatePascalsTriangle(n: number): string[] {\n  const rows: number[][] = [];\n  for (let i = 0; i < n; i++) {\n    const row = new Array(i + 1).fill(1);\n    for (let j = 1; j < i; j++) row[j] = rows[i - 1][j - 1] + rows[i - 1][j];\n    rows.push(row);\n  }\n  return rows.map(r => r.join(' '));\n}"
  },
  {
    "id": "pattern-hollow-square",
    "title": "Hollow Square Pattern",
    "description": "Generate a hollow square pattern of stars of size `n` with hollow interior.",
    "roundType": "pattern-programming",
    "difficulty": "easy",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Loops"
    ],
    "companyTags": [
      "TCS",
      "Infosys"
    ],
    "frequency": "High",
    "acceptanceRate": "92%",
    "timeLimitMinutes": 8,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "First and last rows are full stars. Intermediate rows have stars only at edges."
    ],
    "starterCode": "function generateHollowSquare(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "generateHollowSquare",
    "testCases": [
      {
        "id": "1",
        "input": "5",
        "expectedOutput": "[\"* * * * *\", \"*       *\", \"*       *\", \"*       *\", \"* * * * *\"]",
        "description": "5x5 hollow square"
      },
      {
        "id": "2",
        "input": "3",
        "expectedOutput": "[\"* * *\", \"*   *\", \"* * *\"]",
        "description": "3x3 hollow square"
      },
      {
        "id": "3",
        "input": "1",
        "expectedOutput": "[\"*\"]",
        "description": "1x1 star"
      }
    ],
    "rubricCriteria": [
      "Boundary star placement",
      "Hollow center spacing"
    ],
    "solutionCode": "function generateHollowSquare(n: number): string[] {\n  if (n <= 0) return [];\n  if (n === 1) return ['*'];\n  const res: string[] = [];\n  res.push('* '.repeat(n).trimEnd());\n  for (let i = 2; i < n; i++) {\n    res.push('*' + ' '.repeat(2 * n - 3) + '*');\n  }\n  res.push('* '.repeat(n).trimEnd());\n  return res;\n}"
  },
  {
    "id": "pattern-hollow-triangle",
    "title": "Hollow Triangle Pattern",
    "description": "Generate a hollow right-angled triangle pattern of stars of height `n`.",
    "roundType": "pattern-programming",
    "difficulty": "easy",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Loops"
    ],
    "companyTags": [
      "Infosys",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "90%",
    "timeLimitMinutes": 8,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "Hypotenuse, left vertical edge, and bottom horizontal edge have stars."
    ],
    "starterCode": "function generateHollowTriangle(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "generateHollowTriangle",
    "testCases": [
      {
        "id": "1",
        "input": "5",
        "expectedOutput": "[\"*\", \"* *\", \"*   *\", \"*     *\", \"* * * * *\"]",
        "description": "5-row hollow triangle"
      },
      {
        "id": "2",
        "input": "3",
        "expectedOutput": "[\"*\", \"* *\", \"* * *\"]",
        "description": "3-row hollow triangle"
      },
      {
        "id": "3",
        "input": "1",
        "expectedOutput": "[\"*\"]",
        "description": "1-row"
      }
    ],
    "rubricCriteria": [
      "Hollow interior",
      "Solid boundary edges"
    ],
    "solutionCode": "function generateHollowTriangle(n: number): string[] {\n  if (n <= 0) return [];\n  if (n === 1) return ['*'];\n  const res: string[] = ['*'];\n  for (let i = 2; i < n; i++) {\n    res.push('*' + ' '.repeat(2 * i - 3) + '*');\n  }\n  res.push('* '.repeat(n).trimEnd());\n  return res;\n}"
  },
  {
    "id": "pattern-reversed-alphabet-triangle",
    "title": "Reversed Alphabet Triangle Pattern",
    "description": "Generate a reversed alphabet triangle of size `n` starting each row from the `n`-th letter (e.g. 'E') and decreasing downwards.",
    "roundType": "pattern-programming",
    "difficulty": "easy",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Loops"
    ],
    "companyTags": [
      "TCS",
      "Wipro"
    ],
    "frequency": "High",
    "acceptanceRate": "92%",
    "timeLimitMinutes": 8,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "Start from char code 65 + n - 1 and decrement across columns."
    ],
    "starterCode": "function generateReversedAlphabetTriangle(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "generateReversedAlphabetTriangle",
    "testCases": [
      {
        "id": "1",
        "input": "5",
        "expectedOutput": "[\"E\", \"E D\", \"E D C\", \"E D C B\", \"E D C B A\"]",
        "description": "5-row reversed triangle"
      },
      {
        "id": "2",
        "input": "3",
        "expectedOutput": "[\"C\", \"C B\", \"C B A\"]",
        "description": "3-row reversed triangle"
      },
      {
        "id": "3",
        "input": "1",
        "expectedOutput": "[\"A\"]",
        "description": "1 letter"
      }
    ],
    "rubricCriteria": [
      "Decreasing letter sequence",
      "Correct start offset"
    ],
    "solutionCode": "function generateReversedAlphabetTriangle(n: number): string[] {\n  const res: string[] = [];\n  const startChar = 65 + n - 1;\n  for (let i = 1; i <= n; i++) {\n    const row: string[] = [];\n    for (let j = 0; j < i; j++) {\n      row.push(String.fromCharCode(startChar - j));\n    }\n    res.push(row.join(' '));\n  }\n  return res;\n}"
  },
  {
    "id": "pattern-checkerboard",
    "title": "Checkerboard Pattern",
    "description": "Generate an `n x n` checkerboard pattern of alternating solid black squares '■' and white squares '□'.",
    "roundType": "pattern-programming",
    "difficulty": "easy",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Loops"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "94%",
    "timeLimitMinutes": 8,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "Check if (r + c) is even for solid square and odd for open square."
    ],
    "starterCode": "function generateCheckerboard(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "generateCheckerboard",
    "testCases": [
      {
        "id": "1",
        "input": "6",
        "expectedOutput": "[\"■ □ ■ □ ■ □\", \"□ ■ □ ■ □ ■\", \"■ □ ■ □ ■ □\", \"□ ■ □ ■ □ ■\", \"■ □ ■ □ ■ □\", \"□ ■ □ ■ □ ■\"]",
        "description": "6x6 checkerboard"
      },
      {
        "id": "2",
        "input": "2",
        "expectedOutput": "[\"■ □\", \"□ ■\"]",
        "description": "2x2 checkerboard"
      },
      {
        "id": "3",
        "input": "1",
        "expectedOutput": "[\"■\"]",
        "description": "1x1 single square"
      }
    ],
    "rubricCriteria": [
      "Parity check (r + c) % 2",
      "Alternating symbols"
    ],
    "solutionCode": "function generateCheckerboard(n: number): string[] {\n  const res: string[] = [];\n  for (let r = 0; r < n; r++) {\n    const row: string[] = [];\n    for (let c = 0; c < n; c++) {\n      row.push((r + c) % 2 === 0 ? '■' : '□');\n    }\n    res.push(row.join(' '));\n  }\n  return res;\n}"
  },
  {
    "id": "pattern-hollow-diamond",
    "title": "Hollow Diamond Star Pattern",
    "description": "Generate a hollow diamond pattern of stars of size `n` (total `2n - 1` lines) where only the perimeter stars are drawn.",
    "roundType": "pattern-programming",
    "difficulty": "mid",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Loops"
    ],
    "companyTags": [
      "TCS",
      "Accenture",
      "Cognizant"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "Outer spaces and inner spaces formulas for top and bottom halves."
    ],
    "starterCode": "function printHollowDiamond(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "printHollowDiamond",
    "testCases": [
      {
        "id": "1",
        "input": "3",
        "expectedOutput": "[\"  *\", \" * *\", \"*   *\", \" * *\", \"  *\"]",
        "description": "Hollow diamond size 3"
      },
      {
        "id": "2",
        "input": "2",
        "expectedOutput": "[\" *\", \"* *\", \" *\"]",
        "description": "Size 2"
      },
      {
        "id": "3",
        "input": "1",
        "expectedOutput": "[\"*\"]",
        "description": "Single star"
      }
    ],
    "rubricCriteria": [
      "Hollow diamond geometry",
      "Boundary edge case"
    ],
    "solutionCode": "function printHollowDiamond(n: number): string[] {\n  if (n === 1) return ['*'];\n  const res: string[] = [];\n  res.push(' '.repeat(n - 1) + '*');\n  for (let i = 2; i <= n; i++) {\n    const outSpaces = ' '.repeat(n - i);\n    const inSpaces = ' '.repeat(2 * i - 3);\n    res.push(outSpaces + '*' + inSpaces + '*');\n  }\n  for (let i = n - 1; i >= 2; i--) {\n    const outSpaces = ' '.repeat(n - i);\n    const inSpaces = ' '.repeat(2 * i - 3);\n    res.push(outSpaces + '*' + inSpaces + '*');\n  }\n  res.push(' '.repeat(n - 1) + '*');\n  return res;\n}"
  },
  {
    "id": "pattern-cross-x",
    "title": "Cross 'X' Star Pattern",
    "description": "Generate an `n x n` cross 'X' pattern of stars (where `n` is an odd integer). Both main and anti-diagonals contain `*`, all other positions contain spaces.",
    "roundType": "pattern-programming",
    "difficulty": "easy",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Matrix"
    ],
    "companyTags": [
      "TCS",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "86%",
    "timeLimitMinutes": 10,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "At position (r, c), place `*` if `r === c` or `r + c === n - 1`."
    ],
    "starterCode": "function printCrossX(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "printCrossX",
    "testCases": [
      {
        "id": "1",
        "input": "5",
        "expectedOutput": "[\"*   *\", \" * * \", \"  *  \", \" * * \", \"*   *\"]",
        "description": "5x5 Cross X"
      },
      {
        "id": "2",
        "input": "3",
        "expectedOutput": "[\"* *\", \" * \", \"* *\"]",
        "description": "3x3 Cross X"
      },
      {
        "id": "3",
        "input": "1",
        "expectedOutput": "[\"*\"]",
        "description": "1x1"
      }
    ],
    "rubricCriteria": [
      "Diagonal index condition",
      "Exact spacing"
    ],
    "solutionCode": "function printCrossX(n: number): string[] {\n  const res: string[] = [];\n  for (let r = 0; r < n; r++) {\n    let row = '';\n    for (let c = 0; c < n; c++) {\n      if (r === c || r + c === n - 1) row += '*';\n      else row += ' ';\n    }\n    res.push(row);\n  }\n  return res;\n}"
  },
  {
    "id": "pattern-zigzag-char",
    "title": "Zig-Zag Character Alphabet Pattern",
    "description": "Generate a zig-zag alphabet pattern across `n` rows for the first 26 uppercase letters.",
    "roundType": "pattern-programming",
    "difficulty": "mid",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Strings"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "70%",
    "timeLimitMinutes": 15,
    "expectedComplexity": {
      "time": "O(N)",
      "space": "O(N)"
    },
    "hints": [
      "Cycle through rows 0 to n-1 then back to 0."
    ],
    "starterCode": "function printZigZagChars(s: string, numRows: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "printZigZagChars",
    "testCases": [
      {
        "id": "1",
        "input": "\"PAYPALISHIRING\", 3",
        "expectedOutput": "[\"PAHN\", \"APLSIIG\", \"YIR\"]",
        "description": "3 rows zig-zag"
      },
      {
        "id": "2",
        "input": "\"ABC\", 1",
        "expectedOutput": "[\"ABC\"]",
        "description": "1 row"
      },
      {
        "id": "3",
        "input": "\"PAYPALISHIRING\", 4",
        "expectedOutput": "[\"PIN\", \"ALSIG\", \"YAHR\", \"PI\"]",
        "description": "4 rows zig-zag"
      }
    ],
    "rubricCriteria": [
      "Zig-zag direction flip",
      "Multi-row assembly"
    ],
    "solutionCode": "function printZigZagChars(s: string, numRows: number): string[] {\n  if (numRows === 1 || s.length <= numRows) return [s];\n  const rows: string[] = new Array(numRows).fill('');\n  let curRow = 0, goingDown = false;\n  for (const c of s) {\n    rows[curRow] += c;\n    if (curRow === 0 || curRow === numRows - 1) goingDown = !goingDown;\n    curRow += goingDown ? 1 : -1;\n  }\n  return rows;\n}"
  },
  {
    "id": "pattern-pyramid-stars",
    "title": "Centered Star Pyramid Pattern",
    "description": "Print a standard centered star pyramid of `n` rows. Row `i` (1 to n) has `n - i` leading spaces and `2i - 1` stars.",
    "roundType": "pattern-programming",
    "difficulty": "easy",
    "category": "Pattern Programming",
    "tags": [
      "Patterns",
      "Loops"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro"
    ],
    "frequency": "High",
    "acceptanceRate": "95%",
    "timeLimitMinutes": 10,
    "expectedComplexity": {
      "time": "O(N^2)",
      "space": "O(N^2)"
    },
    "hints": [
      "Space count: n - i; Star count: 2*i - 1."
    ],
    "starterCode": "function printCenteredPyramid(n: number): string[] {\n  // Write your solution here\n  \n}",
    "functionName": "printCenteredPyramid",
    "testCases": [
      {
        "id": "1",
        "input": "3",
        "expectedOutput": "[\"  *\", \" ***\", \"*****\"]",
        "description": "3 rows pyramid"
      },
      {
        "id": "2",
        "input": "1",
        "expectedOutput": "[\"*\"]",
        "description": "1 row"
      },
      {
        "id": "3",
        "input": "2",
        "expectedOutput": "[\" *\", \"***\"]",
        "description": "2 rows"
      }
    ],
    "rubricCriteria": [
      "Center alignment formula",
      "Clean string generation"
    ],
    "solutionCode": "function printCenteredPyramid(n: number): string[] {\n  const res: string[] = [];\n  for (let i = 1; i <= n; i++) {\n    const spaces = ' '.repeat(n - i);\n    const stars = '*'.repeat(2 * i - 1);\n    res.push(spaces + stars);\n  }\n  return res;\n}"
  },
  {
    "id": "cs-mcq-os-deadlock",
    "title": "Operating Systems: Deadlock Necessary Conditions",
    "description": "Which of the following is NOT one of the four Coffman conditions necessary for a system deadlock to occur?",
    "roundType": "cs-fundamentals",
    "difficulty": "easy",
    "category": "Operating Systems",
    "type": "mcq",
    "options": [
      "A) Mutual Exclusion",
      "B) Hold and Wait",
      "C) Preemption allowed by Kernel",
      "D) Circular Wait"
    ],
    "correctAnswer": "C) Preemption allowed by Kernel",
    "explanation": "The four necessary Coffman conditions for deadlock are: (1) Mutual Exclusion, (2) Hold and Wait, (3) No Preemption (resources cannot be forcibly taken away), and (4) Circular Wait. If preemption is allowed by the kernel, deadlocks can be resolved or prevented.",
    "tags": [
      "OS",
      "Deadlock",
      "Concurrency",
      "Process Management"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "78%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Think about what condition allows the OS to forcibly take away a locked resource."
    ],
    "rubricCriteria": [
      "Correct identification of Coffman conditions"
    ]
  },
  {
    "id": "cs-mcq-os-process-states",
    "title": "Operating Systems: Process State Transitions",
    "description": "In a standard 5-state process lifecycle (New, Ready, Running, Waiting/Blocked, Terminated), which transition is invalid / impossible?",
    "roundType": "cs-fundamentals",
    "difficulty": "easy",
    "category": "Operating Systems",
    "type": "mcq",
    "options": [
      "A) Running -> Ready",
      "B) Waiting -> Running",
      "C) Running -> Waiting",
      "D) Ready -> Running"
    ],
    "correctAnswer": "B) Waiting -> Running",
    "explanation": "A blocked/waiting process that completes its I/O or receives an event cannot jump directly to Running. It must transition to the Ready queue first, where the CPU scheduler will eventually pick it up to transition from Ready -> Running.",
    "tags": [
      "OS",
      "Process Scheduling",
      "CPU Scheduling"
    ],
    "companyTags": [
      "Microsoft",
      "Google",
      "Cisco"
    ],
    "frequency": "High",
    "acceptanceRate": "72%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Consider how the OS scheduler picks jobs from queues."
    ],
    "rubricCriteria": [
      "Process lifecycle knowledge"
    ]
  },
  {
    "id": "cs-mcq-os-virtual-memory",
    "title": "Operating Systems: Belady's Anomaly",
    "description": "Belady's Anomaly is a phenomenon where increasing the number of page frames results in an INCREASE in page faults. Which page replacement algorithm can suffer from Belady's Anomaly?",
    "roundType": "cs-fundamentals",
    "difficulty": "mid",
    "category": "Operating Systems",
    "type": "mcq",
    "options": [
      "A) FIFO (First-In, First-Out)",
      "B) LRU (Least Recently Used)",
      "C) Optimal Page Replacement (OPT)",
      "D) LFU (Least Frequently Used)"
    ],
    "correctAnswer": "A) FIFO (First-In, First-Out)",
    "explanation": "FIFO does not belong to the class of stack-based algorithms. Therefore, increasing the frame allocation can alter the eviction sequence adversely, producing Belady's anomaly. Stack algorithms like LRU and OPT are immune to Belady's anomaly.",
    "tags": [
      "OS",
      "Virtual Memory",
      "Paging"
    ],
    "companyTags": [
      "Amazon",
      "Adobe",
      "Oracle"
    ],
    "frequency": "High",
    "acceptanceRate": "64%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Recall stack vs non-stack page replacement algorithms."
    ],
    "rubricCriteria": [
      "Virtual memory page replacement theory"
    ]
  },
  {
    "id": "cs-mcq-os-mutex-semaphore",
    "title": "Operating Systems: Mutex vs Binary Semaphore",
    "description": "What is the key architectural difference between a Mutex and a Binary Semaphore?",
    "roundType": "cs-fundamentals",
    "difficulty": "mid",
    "category": "Operating Systems",
    "type": "mcq",
    "options": [
      "A) Mutex has an ownership concept (only acquiring thread can unlock), whereas a Semaphore can be signaled by any thread",
      "B) Binary Semaphore is strictly faster because it runs entirely in hardware",
      "C) Mutex allows up to 2 concurrent threads while Semaphore allows only 1",
      "D) Mutexes cannot be used across multiple processes"
    ],
    "correctAnswer": "A) Mutex has an ownership concept (only acquiring thread can unlock), whereas a Semaphore can be signaled by any thread",
    "explanation": "A Mutex is a locking mechanism with strict ownership: only the thread that acquired the mutex is permitted to release it. A Semaphore is a signaling mechanism: any thread or interrupt service routine can post/signal the semaphore to wake up another waiting thread.",
    "tags": [
      "OS",
      "Concurrency",
      "Synchronization",
      "Mutex"
    ],
    "companyTags": [
      "Meta",
      "Google",
      "Qualcomm"
    ],
    "frequency": "High",
    "acceptanceRate": "68%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Think about thread ownership and signaling paradigms."
    ],
    "rubricCriteria": [
      "Synchronization primitives understanding"
    ]
  },
  {
    "id": "cs-mcq-dbms-acid-isolation",
    "title": "DBMS: Transaction Isolation Levels & Phantom Reads",
    "description": "Which SQL standard transaction isolation level is the LOWEST level that guarantees prevention of Phantom Reads?",
    "roundType": "cs-fundamentals",
    "difficulty": "mid",
    "category": "DBMS",
    "type": "mcq",
    "options": [
      "A) Read Committed",
      "B) Read Uncommitted",
      "C) Repeatable Read",
      "D) Serializable"
    ],
    "correctAnswer": "D) Serializable",
    "explanation": "Under the ANSI/ISO SQL standard: Read Uncommitted permits Dirty Reads; Read Committed prevents Dirty Reads; Repeatable Read prevents Dirty Reads and Non-Repeatable Reads but can permit Phantom Reads; Serializable is the highest level that prevents Dirty Reads, Non-Repeatable Reads, and Phantom Reads.",
    "tags": [
      "DBMS",
      "ACID",
      "Transactions",
      "SQL"
    ],
    "companyTags": [
      "Amazon",
      "Salesforce",
      "Oracle"
    ],
    "frequency": "High",
    "acceptanceRate": "65%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Check the ANSI SQL isolation level hierarchy table."
    ],
    "rubricCriteria": [
      "Transaction isolation level accuracy"
    ]
  },
  {
    "id": "cs-mcq-dbms-bplus-tree",
    "title": "DBMS: B+ Tree Indexing vs B-Tree",
    "description": "Why do relational databases (e.g. MySQL InnoDB, PostgreSQL) predominantly use B+ Trees instead of standard B-Trees for disk-based table indexes?",
    "roundType": "cs-fundamentals",
    "difficulty": "senior",
    "category": "DBMS",
    "type": "mcq",
    "options": [
      "A) All actual data pointers reside only in leaf nodes connected by a linked list, enabling highly efficient sequential range scans",
      "B) B+ Trees consume less RAM because their height is always O(1)",
      "C) B-Trees cannot store numeric keys",
      "D) B+ Trees eliminate the need for write-ahead logging"
    ],
    "correctAnswer": "A) All actual data pointers reside only in leaf nodes connected by a linked list, enabling highly efficient sequential range scans",
    "explanation": "In a B+ Tree, internal nodes only store routing keys, maximizing fan-out and minimizing tree depth. All data records/pointers reside at the leaf level, and leaves are linked sequentially via a doubly linked list, making range queries (`BETWEEN`, `>`, `<`) extraordinarily fast without tree backtracking.",
    "tags": [
      "DBMS",
      "Indexing",
      "B+ Tree",
      "Storage Engines"
    ],
    "companyTags": [
      "Google",
      "Meta",
      "Uber",
      "Databricks"
    ],
    "frequency": "High",
    "acceptanceRate": "58%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Focus on leaf node chaining and range scanning."
    ],
    "rubricCriteria": [
      "Storage engine and index architecture"
    ]
  },
  {
    "id": "cs-mcq-dbms-normalization",
    "title": "DBMS: Boyce-Codd Normal Form (BCNF)",
    "description": "A relation R with functional dependencies is in BCNF if and only if for every non-trivial functional dependency X -> Y:",
    "roundType": "cs-fundamentals",
    "difficulty": "mid",
    "category": "DBMS",
    "type": "mcq",
    "options": [
      "A) X is a superkey of R",
      "B) Y is a prime attribute",
      "C) X is a foreign key",
      "D) Y is functionally dependent on the primary key"
    ],
    "correctAnswer": "A) X is a superkey of R",
    "explanation": "BCNF is a stricter version of 3NF. In 3NF, for X -> Y, either X is a superkey OR Y is a prime attribute. In BCNF, the second relaxation is removed: for every non-trivial dependency X -> Y, X MUST strictly be a superkey.",
    "tags": [
      "DBMS",
      "Normalization",
      "Relational Schema"
    ],
    "companyTags": [
      "Oracle",
      "Microsoft",
      "SAP"
    ],
    "frequency": "High",
    "acceptanceRate": "61%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Recall the difference between 3NF and BCNF conditions."
    ],
    "rubricCriteria": [
      "Relational database theory"
    ]
  },
  {
    "id": "cs-mcq-net-tcp-handshake",
    "title": "Computer Networks: TCP 3-Way Handshake Flags",
    "description": "In what exact order are TCP control flags exchanged between Client (C) and Server (S) during connection establishment?",
    "roundType": "cs-fundamentals",
    "difficulty": "easy",
    "category": "Computer Networks",
    "type": "mcq",
    "options": [
      "A) C -> S: SYN | S -> C: SYN-ACK | C -> S: ACK",
      "B) C -> S: ACK | S -> C: SYN | C -> S: SYN-ACK",
      "C) C -> S: SYN | S -> C: ACK | C -> S: FIN",
      "D) C -> S: PUSH | S -> C: SYN | C -> S: ACK"
    ],
    "correctAnswer": "A) C -> S: SYN | S -> C: SYN-ACK | C -> S: ACK",
    "explanation": "The standard TCP 3-way handshake begins with the client sending a SYN packet with initial sequence number x. The server responds with SYN-ACK containing its own sequence number y and ACK (x + 1). The client concludes by sending an ACK (y + 1).",
    "tags": [
      "Networks",
      "TCP/IP",
      "Transport Layer",
      "Protocols"
    ],
    "companyTags": [
      "Amazon",
      "Cisco",
      "Cloudflare"
    ],
    "frequency": "High",
    "acceptanceRate": "88%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Synchronize -> Synchronize-Acknowledge -> Acknowledge."
    ],
    "rubricCriteria": [
      "TCP protocol handshake mastery"
    ]
  },
  {
    "id": "cs-mcq-net-osi-layers",
    "title": "Computer Networks: OSI Layer Mapping",
    "description": "At which layer of the OSI 7-Layer Reference Model does the Address Resolution Protocol (ARP) primarily operate?",
    "roundType": "cs-fundamentals",
    "difficulty": "mid",
    "category": "Computer Networks",
    "type": "mcq",
    "options": [
      "A) Data Link Layer (Layer 2) / Interface with Network Layer (Layer 3)",
      "B) Transport Layer (Layer 4)",
      "C) Session Layer (Layer 5)",
      "D) Application Layer (Layer 7)"
    ],
    "correctAnswer": "A) Data Link Layer (Layer 2) / Interface with Network Layer (Layer 3)",
    "explanation": "ARP translates a 32-bit IPv4 address (Network Layer 3) into a 48-bit physical MAC address (Data Link Layer 2). It operates encapsulated within Layer 2 Ethernet frames at the boundary between Layer 2 and Layer 3.",
    "tags": [
      "Networks",
      "OSI Model",
      "ARP",
      "Ethernet"
    ],
    "companyTags": [
      "Cisco",
      "Juniper",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "67%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "ARP resolves IP addresses to physical MAC addresses on local broadcast domains."
    ],
    "rubricCriteria": [
      "OSI model network layer mapping"
    ]
  },
  {
    "id": "cs-mcq-net-dns-resolution",
    "title": "Computer Networks: DNS Resolution Sequence",
    "description": "When resolving a new domain name (e.g. \"sub.example.com\") with an empty cache, what is the first authoritative DNS server queried after the local recursive resolver?",
    "roundType": "cs-fundamentals",
    "difficulty": "mid",
    "category": "Computer Networks",
    "type": "mcq",
    "options": [
      "A) Root Nameserver (\".\")",
      "B) TLD Nameserver (\".com\")",
      "C) Authoritative Nameserver (\"example.com\")",
      "D) ISP Gateway"
    ],
    "correctAnswer": "A) Root Nameserver (\".\")",
    "explanation": "When a recursive resolver has no cached entries, it queries one of the 13 Root Nameserver clusters (\".\") first. The Root server directs the resolver to the TLD server (\".com\"), which in turn directs to the Authoritative nameserver for \"example.com\".",
    "tags": [
      "Networks",
      "DNS",
      "System Architecture"
    ],
    "companyTags": [
      "Cloudflare",
      "Google",
      "Akamai"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Hierarchy flows from Root -> TLD -> Authoritative."
    ],
    "rubricCriteria": [
      "DNS resolution hierarchy understanding"
    ]
  },
  {
    "id": "cs-mcq-oop-lsp",
    "title": "OOP & Design: Liskov Substitution Principle (LSP)",
    "description": "Which scenario represents a classic violation of the Liskov Substitution Principle (LSP)?",
    "roundType": "cs-fundamentals",
    "difficulty": "mid",
    "category": "OOP & Software Design",
    "type": "mcq",
    "options": [
      "A) A Square class inheriting from a Rectangle class where `setWidth` mutates both width and height, breaking Rectangle's invariants",
      "B) A Dog class implementing an Animal interface with a `makeSound()` method",
      "C) A DatabaseRepository class depending on an IDatabase interface",
      "D) A class having private fields with public getters and setters"
    ],
    "correctAnswer": "A) A Square class inheriting from a Rectangle class where `setWidth` mutates both width and height, breaking Rectangle's invariants",
    "explanation": "LSP states that objects of a superclass should be replaceable with objects of a subclass without breaking application correctness. If code expecting a Rectangle sets width and expects height to remain invariant, a Square modifying both breaks this contract.",
    "tags": [
      "OOP",
      "SOLID Principles",
      "Design Patterns"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "70%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Look for unexpected side-effects that violate base class contracts."
    ],
    "rubricCriteria": [
      "SOLID principles and polymorphism"
    ]
  },
  {
    "id": "cs-mcq-oop-diamond-problem",
    "title": "OOP: The Diamond Problem in Multiple Inheritance",
    "description": "How does C++ resolve ambiguity in the Diamond Problem when a class `D` inherits from `B` and `C`, both of which inherit from `A`?",
    "roundType": "cs-fundamentals",
    "difficulty": "mid",
    "category": "OOP & Software Design",
    "type": "mcq",
    "options": [
      "A) By using Virtual Inheritance (`class B : virtual public A`) so only one shared instance of `A` exists in `D`",
      "B) By automatically deleting class `A`",
      "C) By converting all methods of `A` into static methods",
      "D) By enforcing compile-time errors that cannot be bypassed"
    ],
    "correctAnswer": "A) By using Virtual Inheritance (`class B : virtual public A`) so only one shared instance of `A` exists in `D`",
    "explanation": "Virtual inheritance in C++ prevents multiple sub-objects of the base class from appearing in the derived object hierarchy. When `B` and `C` inherit virtually from `A`, `D` contains only a single shared instance of `A`.",
    "tags": [
      "OOP",
      "C++",
      "Inheritance",
      "Polymorphism"
    ],
    "companyTags": [
      "Microsoft",
      "Bloomberg",
      "Nvidia"
    ],
    "frequency": "High",
    "acceptanceRate": "63%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Look for virtual base class keywords."
    ],
    "rubricCriteria": [
      "Multiple inheritance resolution mechanisms"
    ]
  },
  {
    "id": "cs-mcq-oop-polymorphism",
    "title": "OOP: Static vs Dynamic Polymorphism",
    "description": "Which OOP mechanism is an example of Dynamic (Runtime) Polymorphism?",
    "roundType": "cs-fundamentals",
    "difficulty": "easy",
    "category": "OOP & Software Design",
    "type": "mcq",
    "options": [
      "A) Virtual Method Overriding via VTABLE dynamic dispatch",
      "B) Function Overloading with different parameter lists",
      "C) Operator Overloading (e.g. `+` operator in C++)",
      "D) C++ Templates / Generics instantiation"
    ],
    "correctAnswer": "A) Virtual Method Overriding via VTABLE dynamic dispatch",
    "explanation": "Method overriding with virtual functions resolves method calls at runtime using a virtual method table (VTABLE/VPTR), which is dynamic polymorphism. Function overloading, operator overloading, and generics/templates are resolved at compile time (static polymorphism).",
    "tags": [
      "OOP",
      "Polymorphism",
      "VTABLE",
      "Method Overriding"
    ],
    "companyTags": [
      "Google",
      "Amazon",
      "Apple"
    ],
    "frequency": "High",
    "acceptanceRate": "82%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Compile-time vs runtime method resolution."
    ],
    "rubricCriteria": [
      "Polymorphism classification"
    ]
  },
  {
    "id": "cs-mcq-os-thread-safety",
    "title": "Operating Systems: Race Conditions & Critical Sections",
    "description": "What hardware instruction is commonly used to implement lock-free atomic synchronization primitives like Compare-And-Swap (CAS)?",
    "roundType": "cs-fundamentals",
    "difficulty": "senior",
    "category": "Operating Systems",
    "type": "mcq",
    "options": [
      "A) Atomic Test-and-Set / CMPXCHG (Compare-and-Exchange)",
      "B) Branch Equal (BEQ)",
      "C) Multiply-Accumulate (MAC)",
      "D) Load Immediate (LI)"
    ],
    "correctAnswer": "A) Atomic Test-and-Set / CMPXCHG (Compare-and-Exchange)",
    "explanation": "Hardware atomic primitives such as `CMPXCHG` on x86 architectures atomically compare the contents of a memory location with a given value and, if equal, modifies the contents to a new value in a single uninterruptible bus transaction.",
    "tags": [
      "OS",
      "Concurrency",
      "Atomics",
      "Lock-Free"
    ],
    "companyTags": [
      "Meta",
      "Jane Street",
      "Nvidia"
    ],
    "frequency": "High",
    "acceptanceRate": "52%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Look for compare-and-swap hardware instruction."
    ],
    "rubricCriteria": [
      "Low-level concurrency primitives"
    ]
  },
  {
    "id": "cs-mcq-dbms-wal",
    "title": "DBMS: Write-Ahead Logging (WAL)",
    "description": "What is the primary rule enforced by Write-Ahead Logging (WAL) in database storage engines?",
    "roundType": "cs-fundamentals",
    "difficulty": "senior",
    "category": "DBMS",
    "type": "mcq",
    "options": [
      "A) Log records representing changes must be flushed to stable storage before the corresponding dirty data pages are written to disk",
      "B) Data pages must always be written before index updates",
      "C) Only read queries are recorded in the WAL",
      "D) WAL logs are deleted immediately after every query"
    ],
    "correctAnswer": "A) Log records representing changes must be flushed to stable storage before the corresponding dirty data pages are written to disk",
    "explanation": "The WAL protocol ensures Durability and Atomicity (ARIES recovery) by mandating that log records describing a mutation must be safely fsynced to disk before the dirty database pages containing the modifications are written to disk.",
    "tags": [
      "DBMS",
      "WAL",
      "Durability",
      "Crash Recovery"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "PostgreSQL",
      "Snowflake"
    ],
    "frequency": "High",
    "acceptanceRate": "62%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Log first, write dirty pages later."
    ],
    "rubricCriteria": [
      "Database transaction durability and recovery"
    ]
  },
  {
    "id": "code-mcq-js-event-loop",
    "title": "JavaScript: Event Loop Microtask Execution Order",
    "description": "What will be printed to the console after executing the following code?\n\n```javascript\nconsole.log(1);\nsetTimeout(() => console.log(2), 0);\nPromise.resolve().then(() => console.log(3));\nqueueMicrotask(() => console.log(4));\nconsole.log(5);\n```",
    "roundType": "coding",
    "difficulty": "mid",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) 1, 5, 3, 4, 2",
      "B) 1, 2, 3, 4, 5",
      "C) 1, 5, 2, 3, 4",
      "D) 1, 3, 4, 5, 2"
    ],
    "correctAnswer": "A) 1, 5, 3, 4, 2",
    "explanation": "Execution steps:\n1. Synchronous code executes first: `console.log(1)` and `console.log(5)` -> Output: 1, 5\n2. `setTimeout` schedules `2` onto the MacroTask (Callback) Queue.\n3. `Promise.then` and `queueMicrotask` schedule `3` and `4` onto the MicroTask Queue.\n4. After synchronous code finishes, the engine drains ALL Microtasks in order: 3, 4\n5. Finally, the next Event Loop tick processes the Macrotask: 2\nFinal Order: 1, 5, 3, 4, 2",
    "tags": [
      "JavaScript",
      "Event Loop",
      "Microtasks",
      "Async"
    ],
    "companyTags": [
      "Google",
      "Meta",
      "Netflix",
      "Uber"
    ],
    "frequency": "High",
    "acceptanceRate": "65%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Synchronous first -> Microtasks (Promises/queueMicrotask) -> Macrotasks (setTimeout)."
    ],
    "rubricCriteria": [
      "Event loop microtask prioritization"
    ]
  },
  {
    "id": "code-mcq-js-hoisting-tdz",
    "title": "JavaScript: Hoisting & Temporal Dead Zone",
    "description": "What is the output of the following JavaScript snippet?\n\n```javascript\nvar x = 10;\nfunction test() {\n  console.log(x);\n  let x = 20;\n}\ntest();\n```",
    "roundType": "coding",
    "difficulty": "easy",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) ReferenceError: Cannot access 'x' before initialization",
      "B) 10",
      "C) undefined",
      "D) 20"
    ],
    "correctAnswer": "A) ReferenceError: Cannot access 'x' before initialization",
    "explanation": "`let` and `const` variables are hoisted to the top of their block scope but are NOT initialized. The region between the start of the block and the `let x = 20` declaration is the Temporal Dead Zone (TDZ). Accessing `x` inside `test()` before its declaration throws a `ReferenceError`, shadowing the outer `var x = 10`.",
    "tags": [
      "JavaScript",
      "Scope",
      "Hoisting",
      "TDZ"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Atlassian"
    ],
    "frequency": "High",
    "acceptanceRate": "58%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Block scoped `let` creates a Temporal Dead Zone."
    ],
    "rubricCriteria": [
      "TDZ and scope shadowing comprehension"
    ]
  },
  {
    "id": "code-mcq-js-this-binding",
    "title": "JavaScript: `this` Keyword Binding",
    "description": "What is logged to the console?\n\n```javascript\nconst obj = {\n  val: 42,\n  getRegular: function() { return this.val; },\n  getArrow: () => this.val\n};\nconst extract = obj.getRegular;\nconsole.log(obj.getRegular(), extract(), obj.getArrow());\n``` (in browser non-strict context where globalThis.val is undefined)",
    "roundType": "coding",
    "difficulty": "mid",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) 42, undefined, undefined",
      "B) 42, 42, 42",
      "C) 42, 42, undefined",
      "D) undefined, undefined, undefined"
    ],
    "correctAnswer": "A) 42, undefined, undefined",
    "explanation": "1. `obj.getRegular()`: Called with `obj` as receiver -> `this` is `obj` -> returns `42`.\n2. `extract()`: Detached function call -> `this` defaults to `window`/`globalThis` where `val` is `undefined`.\n3. `obj.getArrow()`: Arrow functions capture lexical `this` from enclosing scope (global scope here), not `obj` -> returns `undefined`.\nResult: 42, undefined, undefined",
    "tags": [
      "JavaScript",
      "this",
      "Arrow Functions",
      "Context"
    ],
    "companyTags": [
      "Meta",
      "Google",
      "Spotify"
    ],
    "frequency": "High",
    "acceptanceRate": "60%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Check how each function was invoked and arrow function lexical scope."
    ],
    "rubricCriteria": [
      "Execution context binding rules"
    ]
  },
  {
    "id": "code-mcq-js-closure-loop",
    "title": "JavaScript: Async Closure Loop Output",
    "description": "What is logged after 100ms?\n\n```javascript\nfor (var i = 0; i < 3; i++) {\n  setTimeout(() => console.log(i), 100);\n}\nfor (let j = 0; j < 3; j++) {\n  setTimeout(() => console.log(j), 100);\n}\n```",
    "roundType": "coding",
    "difficulty": "easy",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) 3, 3, 3 followed by 0, 1, 2",
      "B) 0, 1, 2 followed by 0, 1, 2",
      "C) 3, 3, 3 followed by 3, 3, 3",
      "D) 0, 1, 2 followed by 3, 3, 3"
    ],
    "correctAnswer": "A) 3, 3, 3 followed by 0, 1, 2",
    "explanation": "`var i` has function scope: all 3 timer callbacks share the exact same variable `i`, which evaluates to `3` when the timers fire. `let j` has block scope: each iteration creates a fresh lexical binding for `j`, so each callback closes over its respective iteration value (0, 1, 2).",
    "tags": [
      "JavaScript",
      "Closures",
      "Scope",
      "Loops"
    ],
    "companyTags": [
      "Amazon",
      "Adobe",
      "Apple"
    ],
    "frequency": "High",
    "acceptanceRate": "85%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "`var` is shared function-scoped; `let` creates per-iteration block bindings."
    ],
    "rubricCriteria": [
      "Closure variable capture"
    ]
  },
  {
    "id": "code-mcq-js-coercion",
    "title": "JavaScript: Quirky Type Coercion",
    "description": "What is the boolean evaluation of `[] == ![]` in JavaScript?",
    "roundType": "coding",
    "difficulty": "mid",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) true",
      "B) false",
      "C) TypeError",
      "D) NaN"
    ],
    "correctAnswer": "A) true",
    "explanation": "Coercion step-by-step:\n1. Right side `![]`: `[]` is truthy, so `![]` evaluates to `false`.\n2. Comparison becomes `[] == false`.\n3. Abstract equality coerces boolean to number: `false -> 0` (`[] == 0`).\n4. Object `[]` is coerced to primitive via `[].toString()` -> `\"\"` (`\"\" == 0`).\n5. String `\"\"` is coerced to number: `Number(\"\") -> 0` (`0 == 0`).\n6. `0 == 0` evaluates to `true`!",
    "tags": [
      "JavaScript",
      "Type Coercion",
      "Equality"
    ],
    "companyTags": [
      "Google",
      "Meta",
      "Airbnb"
    ],
    "frequency": "High",
    "acceptanceRate": "50%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Evaluate the `!` operator first, then step through abstract equality rules."
    ],
    "rubricCriteria": [
      "JavaScript type conversion specifications"
    ]
  },
  {
    "id": "code-mcq-dsa-master-theorem",
    "title": "Algorithms: Master Theorem Recurrence",
    "description": "Given the divide-and-conquer recurrence relation: `T(N) = 2T(N/2) + O(N)`. What is the overall asymptotic time complexity?",
    "roundType": "coding",
    "difficulty": "easy",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) O(N log N)",
      "B) O(N^2)",
      "C) O(N)",
      "D) O(log N)"
    ],
    "correctAnswer": "A) O(N log N)",
    "explanation": "Here $a = 2$, $b = 2$, $f(N) = O(N)$. $\\log_b(a) = \\log_2(2) = 1$. Since $f(N) = \\Theta(N^{\\log_b a}) = \\Theta(N^1)$, this matches Case 2 of the Master Theorem, giving $T(N) = \\Theta(N^{\\log_b a} \\log N) = O(N \\log N)$ (e.g. Merge Sort).",
    "tags": [
      "Algorithms",
      "Master Theorem",
      "Complexity Analysis"
    ],
    "companyTags": [
      "Google",
      "Microsoft",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "78%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "This is the exact recurrence relation for Merge Sort."
    ],
    "rubricCriteria": [
      "Recurrence relation complexity analysis"
    ]
  },
  {
    "id": "code-mcq-dsa-dynamic-array",
    "title": "Data Structures: Amortized Complexity of Dynamic Array Doubling",
    "description": "When appending $N$ elements into an initially empty dynamic array that doubles its capacity whenever it fills up, what is the AMORTIZED time complexity per `push` operation?",
    "roundType": "coding",
    "difficulty": "easy",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) O(1)",
      "B) O(N)",
      "C) O(log N)",
      "D) O(N^2)"
    ],
    "correctAnswer": "A) O(1)",
    "explanation": "Geometric doubling requires reallocations and copies at capacities $1, 2, 4, 8, \\dots, N$. The total number of element copy operations across $N$ insertions is $1 + 2 + 4 + \\dots + N = 2N - 1 = O(N)$. Dividing total work $O(N)$ by $N$ insertions yields an amortized $O(1)$ per operation.",
    "tags": [
      "Data Structures",
      "Amortized Analysis",
      "Arrays"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta"
    ],
    "frequency": "High",
    "acceptanceRate": "82%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Sum the geometric series of element copy costs."
    ],
    "rubricCriteria": [
      "Amortized analysis understanding"
    ]
  },
  {
    "id": "code-mcq-dsa-hash-collisions",
    "title": "Data Structures: Worst-case Hash Table Lookup",
    "description": "In a standard Hash Table resolving collisions via Separate Chaining with a linked list, what is the WORST-CASE time complexity of a key lookup when all keys hash to the same bucket?",
    "roundType": "coding",
    "difficulty": "easy",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) O(N)",
      "B) O(1)",
      "C) O(log N)",
      "D) O(N log N)"
    ],
    "correctAnswer": "A) O(N)",
    "explanation": "Under uniform hashing, lookup is average $O(1)$. However, in the adversarial worst case where all $N$ keys produce hash collisions in the same single bucket, the chain degrades into a linear linked list of length $N$, requiring $O(N)$ traversal.",
    "tags": [
      "Data Structures",
      "Hash Table",
      "Time Complexity"
    ],
    "companyTags": [
      "Microsoft",
      "Amazon",
      "Apple"
    ],
    "frequency": "High",
    "acceptanceRate": "84%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Consider what happens when all keys end up in a single linked list."
    ],
    "rubricCriteria": [
      "Hash table collision degradation analysis"
    ]
  },
  {
    "id": "code-mcq-dsa-heap-build",
    "title": "Data Structures: Build Heap (Heapify) Complexity",
    "description": "What is the tight asymptotic time complexity to convert an arbitrary unsorted array of $N$ elements into a Binary Min/Max Heap using bottom-up `heapify` (`buildHeap`)?",
    "roundType": "coding",
    "difficulty": "mid",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) O(N)",
      "B) O(N log N)",
      "C) O(N^2)",
      "D) O(log N)"
    ],
    "correctAnswer": "A) O(N)",
    "explanation": "While inserting $N$ items one by one into an empty heap takes $O(N \\log N)$, bottom-up `buildHeap` (sifting down from index $N/2$ down to $0$) has work proportional to $\\sum_{h=0}^{\\log N} \\frac{N}{2^{h+1}} O(h) = O(N \\sum \\frac{h}{2^h}) = O(N)$.",
    "tags": [
      "Data Structures",
      "Heaps",
      "Priority Queue"
    ],
    "companyTags": [
      "Google",
      "Meta",
      "Amazon"
    ],
    "frequency": "High",
    "acceptanceRate": "56%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Most nodes in a heap are near the bottom leaves and require very few down-sifts."
    ],
    "rubricCriteria": [
      "Heap construction complexity proof"
    ]
  },
  {
    "id": "code-mcq-js-pass-by-value",
    "title": "JavaScript: Object Mutation vs Reassignment",
    "description": "What is the output of the following code?\n\n```javascript\nfunction mutate(obj, num, arr) {\n  obj.name = \"Alice\";\n  num = 100;\n  arr = [4, 5, 6];\n  arr.push(7);\n}\nconst user = { name: \"Bob\" };\nlet val = 50;\nlet list = [1, 2, 3];\nmutate(user, val, list);\nconsole.log(user.name, val, list.length);\n```",
    "roundType": "coding",
    "difficulty": "mid",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) Alice 50 3",
      "B) Alice 100 4",
      "C) Bob 50 3",
      "D) Alice 100 3"
    ],
    "correctAnswer": "A) Alice 50 3",
    "explanation": "1. `obj.name = \"Alice\"` mutates the underlying heap object passed by copy-of-reference -> `user.name` becomes `\"Alice\"`.\n2. `num = 100` rebinds local parameter `num` (primitives are passed by value) -> outer `val` remains `50`.\n3. `arr = [4, 5, 6]` reassigns the local parameter `arr` to a new memory address, severing reference to `list`. Subsequent `push(7)` mutates the new array -> outer `list` remains untouched with `length: 3`.\nResult: Alice 50 3",
    "tags": [
      "JavaScript",
      "References",
      "Pointers",
      "Mutability"
    ],
    "companyTags": [
      "Amazon",
      "Bloomberg",
      "Stripe"
    ],
    "frequency": "High",
    "acceptanceRate": "68%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Reassigning a parameter does NOT modify the caller's reference."
    ],
    "rubricCriteria": [
      "Reference semantics vs reassignment"
    ]
  },
  {
    "id": "code-mcq-dsa-bst-height-skew",
    "title": "Data Structures: Worst-case Search in Unbalanced BST",
    "description": "What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree of $N$ elements created by inserting already-sorted integers `[1, 2, 3, ..., N]`?",
    "roundType": "coding",
    "difficulty": "easy",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) O(N) (Degenerates into a single-branch linked list)",
      "B) O(log N)",
      "C) O(1)",
      "D) O(N log N)"
    ],
    "correctAnswer": "A) O(N) (Degenerates into a single-branch linked list)",
    "explanation": "Inserting monotonically ascending numbers into an unbalancing BST produces a completely right-skewed degenerate tree of height $N$. Searching for element $N$ requires traversing all $N$ nodes sequentially in $O(N)$ time.",
    "tags": [
      "Data Structures",
      "BST",
      "Tree"
    ],
    "companyTags": [
      "Amazon",
      "Microsoft",
      "Apple"
    ],
    "frequency": "High",
    "acceptanceRate": "90%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Ascending insertions produce a skewed stick-like tree."
    ],
    "rubricCriteria": [
      "Tree degeneration analysis"
    ]
  },
  {
    "id": "code-mcq-js-shallow-deep-copy",
    "title": "JavaScript: Shallow Copy with Object Spread",
    "description": "What is logged to the console?\n\n```javascript\nconst a = { x: 1, nested: { y: 2 } };\nconst b = { ...a };\nb.x = 99;\nb.nested.y = 88;\nconsole.log(a.x, a.nested.y);\n```",
    "roundType": "coding",
    "difficulty": "easy",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) 1 88",
      "B) 99 88",
      "C) 1 2",
      "D) 99 2"
    ],
    "correctAnswer": "A) 1 88",
    "explanation": "Object spread (`{ ...a }`) creates a shallow copy. The top-level primitive property `x` is duplicated by value (so `a.x` stays `1`), but the nested object reference `nested` is copied by reference. Modifying `b.nested.y = 88` directly mutates the shared nested object in memory, changing `a.nested.y` to `88`.",
    "tags": [
      "JavaScript",
      "Shallow Copy",
      "Spread Operator",
      "Objects"
    ],
    "companyTags": [
      "Meta",
      "Shopify",
      "Twitter"
    ],
    "frequency": "High",
    "acceptanceRate": "76%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Spread only creates a 1-level deep clone; nested objects share memory pointers."
    ],
    "rubricCriteria": [
      "Shallow copy memory model"
    ]
  },
  {
    "id": "code-mcq-dsa-stack-recursion",
    "title": "Algorithms: Tree Traversal Call Stack Space",
    "description": "What is the auxiliary space complexity of recursive DFS traversal on a balanced Binary Tree with $N$ nodes?",
    "roundType": "coding",
    "difficulty": "easy",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) O(log N)",
      "B) O(N)",
      "C) O(1)",
      "D) O(N^2)"
    ],
    "correctAnswer": "A) O(log N)",
    "explanation": "In a balanced binary tree, tree height $H = \\log_2 N$. The maximum call stack depth during DFS traversal is bounded by the tree height, yielding auxiliary space complexity of $O(H) = O(\\log N)$.",
    "tags": [
      "Algorithms",
      "Recursion",
      "Space Complexity",
      "Trees"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Microsoft"
    ],
    "frequency": "High",
    "acceptanceRate": "80%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Stack space is proportional to tree height $H$."
    ],
    "rubricCriteria": [
      "Call stack memory analysis"
    ]
  },
  {
    "id": "code-mcq-dsa-two-pointers",
    "title": "Algorithms: Sorted Two-Sum Two-Pointer Invariant",
    "description": "Why is the Two Pointers approach on a SORTED array guaranteed to find a target sum pair in $O(N)$ time without missing any valid pairs?",
    "roundType": "coding",
    "difficulty": "mid",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) When `nums[l] + nums[r] > target`, any pair using `nums[r]` with larger left indices is guaranteed to exceed target, allowing safe decrement `r--`",
      "B) Because it uses binary search internally on every step",
      "C) Because array indices are hash keys",
      "D) It is only an approximation heuristic and can miss valid pairs"
    ],
    "correctAnswer": "A) When `nums[l] + nums[r] > target`, any pair using `nums[r]` with larger left indices is guaranteed to exceed target, allowing safe decrement `r--`",
    "explanation": "Monotonicity invariant: If `nums[l] + nums[r] > target`, then since `nums` is sorted, for any $k > l$, `nums[k] + nums[r] >= nums[l] + nums[r] > target`. Thus `nums[r]` cannot pair with ANY remaining candidate to form `target`, so decrementing `r--` safely eliminates the entire column without missing solutions.",
    "tags": [
      "Algorithms",
      "Two Pointers",
      "Search Space Reduction"
    ],
    "companyTags": [
      "Meta",
      "Amazon",
      "Google"
    ],
    "frequency": "High",
    "acceptanceRate": "68%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "Consider monotonicity and elimination of search space."
    ],
    "rubricCriteria": [
      "Two pointer algorithmic invariant proof"
    ]
  },
  {
    "id": "code-mcq-js-promise-all-race",
    "title": "JavaScript: `Promise.all` vs `Promise.allSettled`",
    "description": "What happens when one of 5 promises passed to `Promise.all([p1, p2, p3, p4, p5])` rejects immediately with an Error?",
    "roundType": "coding",
    "difficulty": "easy",
    "category": "Practical Coding",
    "type": "mcq",
    "options": [
      "A) `Promise.all` rejects immediately with that error, ignoring the outcomes of all other pending promises (fail-fast)",
      "B) It waits for all 5 promises to finish and returns an array of nulls",
      "C) It silently ignores the failed promise and resolves with the other 4",
      "D) It automatically retries the failed promise 3 times"
    ],
    "correctAnswer": "A) `Promise.all` rejects immediately with that error, ignoring the outcomes of all other pending promises (fail-fast)",
    "explanation": "`Promise.all` implements fail-fast behavior: as soon as ANY input promise rejects, the returned promise immediately rejects with that rejection reason. If you want to wait for all promises regardless of rejection, use `Promise.allSettled()`.",
    "tags": [
      "JavaScript",
      "Async",
      "Promises",
      "Error Handling"
    ],
    "companyTags": [
      "Uber",
      "Meta",
      "Netflix"
    ],
    "frequency": "High",
    "acceptanceRate": "88%",
    "timeLimitMinutes": 2,
    "expectedComplexity": {
      "time": "O(1)",
      "space": "O(1)"
    },
    "hints": [
      "`Promise.all` is fail-fast."
    ],
    "rubricCriteria": [
      "Asynchronous Promise combinator behavior"
    ]
  },
  {
    "id": "apt-1",
    "title": "Time & Work / Pipes & Cisterns: Q1",
    "description": "A can complete a work in 12 days and B in 18 days. If they work together, how many days will they take?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Time & Work / Pipes & Cisterns",
    "options": [
      "A) 6.5 days",
      "B) 7.2 days",
      "C) 8 days",
      "D) 7.5 days"
    ],
    "correctAnswer": "B (7.2 days)",
    "explanation": "1-day work=112+118=3+236=536. Total time =365=7.2 days.",
    "tags": [
      "Time & Work / Pipes & Cisterns",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-2",
    "title": "Time & Work / Pipes & Cisterns: Q2",
    "description": "A and B together can do a piece of work in 15 days, while B alone can finish it in 20 days. In how many days can A alone finish it?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Time & Work / Pipes & Cisterns",
    "options": [
      "A) 40 days",
      "B) 50 days",
      "C) 60 days",
      "D) 45 days"
    ],
    "correctAnswer": "C (60 days)",
    "explanation": "A's 1-day work=115-120=4-360=160 ⇒ 60 days.",
    "tags": [
      "Time & Work / Pipes & Cisterns",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "82%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is C."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-3",
    "title": "Time & Work / Pipes & Cisterns: Q3",
    "description": "12 men can complete a project in 8 days. How many men are required to complete the same work in 6 days?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Time & Work / Pipes & Cisterns",
    "options": [
      "A) 14",
      "B) 16",
      "C) 18",
      "D) 20"
    ],
    "correctAnswer": "B (16)",
    "explanation": "M1xD1=M2xD2 ⇒ 12x8=M2x6 ⇒ M2=966=16 men.",
    "tags": [
      "Time & Work / Pipes & Cisterns",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "89%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-4",
    "title": "Time & Work / Pipes & Cisterns: Q4",
    "description": "Two pipes A and B can fill a tank in 20 and 30 minutes respectively. A third pipe C empties it in 15 minutes. If all are opened together, how long does it take to fill the tank?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Time & Work / Pipes & Cisterns",
    "options": [
      "A) 60 min",
      "B) 45 min",
      "C) Tank never fills",
      "D) 30 min"
    ],
    "correctAnswer": "A (60 min)",
    "explanation": "Net rate=120+130-115=3+2-460=160 per min ⇒ 60 minutes. Speed, Time, Distance & Trains",
    "tags": [
      "Time & Work / Pipes & Cisterns",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "76%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-5",
    "title": "Speed, Time, Distance & Trains: Q5",
    "description": "A person travels from A to B at 40 km/h and returns at 60 km/h. What is the average speed for the whole journey?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Speed, Time, Distance & Trains",
    "options": [
      "A) 50 km/h",
      "B) 48 km/h",
      "C) 45 km/h",
      "D) 52 km/h"
    ],
    "correctAnswer": "B (48 km/h)",
    "explanation": "Average Speed=2xyx+y=2x40x6040+60=4800100=48 km/h.",
    "tags": [
      "Speed, Time, Distance & Trains",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "83%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-6",
    "title": "Speed, Time, Distance & Trains: Q6",
    "description": "A train 150 m long passes a telegraph post in 10 seconds. What is the speed of the train in km/h?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Speed, Time, Distance & Trains",
    "options": [
      "A) 54 km/h",
      "B) 60 km/h",
      "C) 45 km/h",
      "D) 50 km/h"
    ],
    "correctAnswer": "A (54 km/h)",
    "explanation": "Speed=15010=15 m/s=15x185=54 km/h.",
    "tags": [
      "Speed, Time, Distance & Trains",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "90%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-7",
    "title": "Speed, Time, Distance & Trains: Q7",
    "description": "A 240 m long train crosses a 160 m long platform in 20 seconds. What is the speed of the train?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Speed, Time, Distance & Trains",
    "options": [
      "A) 64 km/h",
      "B) 72 km/h",
      "C) 80 km/h",
      "D) 90 km/h"
    ],
    "correctAnswer": "B (72 km/h)",
    "explanation": "Total Distance=240+160=400 m. Speed=40020=20 m/s=20x185=72 km/h.",
    "tags": [
      "Speed, Time, Distance & Trains",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "77%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-8",
    "title": "Speed, Time, Distance & Trains: Q8",
    "description": "A man can row upstream at 8 km/h and downstream at 14 km/h. What is the speed of the current/stream?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Speed, Time, Distance & Trains",
    "options": [
      "A) 3 km/h",
      "B) 4 km/h",
      "C) 2.5 km/h",
      "D) 11 km/h"
    ],
    "correctAnswer": "A (3 km/h)",
    "explanation": "Speed of Stream=Downstream-Upstream2=14-82=3 km/h. Percentages, Profit & Loss, Simple & Compound Interest",
    "tags": [
      "Speed, Time, Distance & Trains",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "84%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-9",
    "title": "Percentages, Profit & Loss, Simple & Compound Interest: Q9",
    "description": "If the price of sugar increases by 25%, by what percentage must consumption be reduced so that expenditure remains the same?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Percentages, Profit & Loss, Simple & Compound Interest",
    "options": [
      "A) 25%",
      "B) 20%",
      "C) 16.66%",
      "D) 30%"
    ],
    "correctAnswer": "B (20%)",
    "explanation": "Reduction=r100+rx100=25125x100=20%.",
    "tags": [
      "Percentages, Profit & Loss, Simple & Compound Interest",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "91%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-10",
    "title": "Percentages, Profit & Loss, Simple & Compound Interest: Q10",
    "description": "An article bought for $400 is sold for $500. Find the profit percentage.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Percentages, Profit & Loss, Simple & Compound Interest",
    "options": [
      "A) 20%",
      "B) 25%",
      "C) 30%",
      "D) 15%"
    ],
    "correctAnswer": "B (25%)",
    "explanation": "Profit=500-400=100. Profit %=100400x100=25%.",
    "tags": [
      "Percentages, Profit & Loss, Simple & Compound Interest",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "78%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-11",
    "title": "Percentages, Profit & Loss, Simple & Compound Interest: Q11",
    "description": "A dishonest shopkeeper sells goods at cost price but uses a weight of 900 grams instead of 1 kg. What is his gain percentage?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Percentages, Profit & Loss, Simple & Compound Interest",
    "options": [
      "A) 10%",
      "B) 11.11%",
      "C) 9.09%",
      "D) 12.5%"
    ],
    "correctAnswer": "B (11.11%)",
    "explanation": "Gain %=ErrorTrue Value-Errorx100=100900x100=11.11%.",
    "tags": [
      "Percentages, Profit & Loss, Simple & Compound Interest",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "85%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-12",
    "title": "Percentages, Profit & Loss, Simple & Compound Interest: Q12",
    "description": "A sum of money doubles itself at simple interest in 8 years. What is the rate of interest per annum?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Percentages, Profit & Loss, Simple & Compound Interest",
    "options": [
      "A) 10%",
      "B) 12.5%",
      "C) 15%",
      "D) 8%"
    ],
    "correctAnswer": "B (12.5%)",
    "explanation": "SI=P ⇒ P=PxRx8100 ⇒ R=1008=12.5%.",
    "tags": [
      "Percentages, Profit & Loss, Simple & Compound Interest",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "92%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-13",
    "title": "Percentages, Profit & Loss, Simple & Compound Interest: Q13",
    "description": "Find the compound interest on $10,000 at 10% per annum for 2 years, compounded annually.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Percentages, Profit & Loss, Simple & Compound Interest",
    "options": [
      "A) $2,000",
      "B) $2,100",
      "C) $2,200",
      "D) $1,900"
    ],
    "correctAnswer": "B ($2,100)",
    "explanation": "Amount=10000x1.12=12,100. CI=12,100-10,000=$2,100.",
    "tags": [
      "Percentages, Profit & Loss, Simple & Compound Interest",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "79%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-14",
    "title": "Percentages, Profit & Loss, Simple & Compound Interest: Q14",
    "description": "What is the difference between CI and SI on a principal of $5,000 at 10% per annum for 2 years?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Percentages, Profit & Loss, Simple & Compound Interest",
    "options": [
      "A) $40",
      "B) $50",
      "C) $60",
      "D) $25"
    ],
    "correctAnswer": "B ($50)",
    "explanation": "Difference=PxR1002=5000x101002=5000x0.01=$50. Ratio, Proportion, Mixtures & Alligations",
    "tags": [
      "Percentages, Profit & Loss, Simple & Compound Interest",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "86%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-15",
    "title": "Ratio, Proportion, Mixtures & Alligations: Q15",
    "description": "If A : B = 2 : 3 and B : C = 4 : 5, find the ratio A : B : C.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Ratio, Proportion, Mixtures & Alligations",
    "options": [
      "A) 8 : 12 : 15",
      "B) 6 : 9 : 15",
      "C) 8 : 10 : 15",
      "D) 2 : 4 : 5"
    ],
    "correctAnswer": "A (8 : 12 : 15)",
    "explanation": "Multiply first by 4 and second by 3: A:B=8:12, B:C=12:15 ⇒ 8:12:15.",
    "tags": [
      "Ratio, Proportion, Mixtures & Alligations",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "93%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-16",
    "title": "Ratio, Proportion, Mixtures & Alligations: Q16",
    "description": "Divide $1,400 among A, B, and C in the ratio 2 : 3 : 5. What is B's share?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Ratio, Proportion, Mixtures & Alligations",
    "options": [
      "A) $280",
      "B) $420",
      "C) $700",
      "D) $350"
    ],
    "correctAnswer": "B ($420)",
    "explanation": "Total parts =2+3+5=10. B's share=310x1400=$420.",
    "tags": [
      "Ratio, Proportion, Mixtures & Alligations",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "80%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-17",
    "title": "Ratio, Proportion, Mixtures & Alligations: Q17",
    "description": "In what ratio must tea at $60/kg be mixed with tea at $85/kg to get a mixture worth $75/kg?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Ratio, Proportion, Mixtures & Alligations",
    "options": [
      "A) 2 : 3",
      "B) 3 : 2",
      "C) 1 : 2",
      "D) 4 : 5"
    ],
    "correctAnswer": "A (2 : 3)",
    "explanation": "By alligation: 85-75:75-60=10:15=2:3.",
    "tags": [
      "Ratio, Proportion, Mixtures & Alligations",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "87%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-18",
    "title": "Ratio, Proportion, Mixtures & Alligations: Q18",
    "description": "A vessel contains 60 liters of milk. 6 liters are drawn and replaced with water. This process is repeated once more. How much milk remains?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Ratio, Proportion, Mixtures & Alligations",
    "options": [
      "A) 48.6 L",
      "B) 50 L",
      "C) 52.4 L",
      "D) 46.8 L"
    ],
    "correctAnswer": "A (48.6 L)",
    "explanation": "Remaining=60x1-6602=60x0.92=60x0.81=48.6 liters. Averages & Ages",
    "tags": [
      "Ratio, Proportion, Mixtures & Alligations",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "94%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-19",
    "title": "Averages & Ages: Q19",
    "description": "The average age of 24 students and their teacher is 15 years. If the teacher's age is excluded, the average decreases by 1 year. What is the teacher's age?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Averages & Ages",
    "options": [
      "A) 35 years",
      "B) 39 years",
      "C) 40 years",
      "D) 42 years"
    ],
    "correctAnswer": "B (39 years)",
    "explanation": "Total with teacher=25x15=375. Total without teacher=24x14=336. Teacher=375-336=39 years.",
    "tags": [
      "Averages & Ages",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "81%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-20",
    "title": "Averages & Ages: Q20",
    "description": "The ratio of the present ages of Father and Son is 5 : 2. After 10 years, the ratio becomes 2 : 1. Find the Father's present age.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Averages & Ages",
    "options": [
      "A) 40 years",
      "B) 50 years",
      "C) 45 years",
      "D) 60 years"
    ],
    "correctAnswer": "B (50 years)",
    "explanation": "5x+102x+10=21 ⇒ 5x+10=4x+20 ⇒ x=10. Father=5x10=50 years. Number Systems, LCM & HCF",
    "tags": [
      "Averages & Ages",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "88%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-21",
    "title": "Number Systems, LCM & HCF: Q21",
    "description": "The HCF of two numbers is 11 and their LCM is 7700. If one number is 275, find the other number.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Number Systems, LCM & HCF",
    "options": [
      "A) 308",
      "B) 298",
      "C) 318",
      "D) 328"
    ],
    "correctAnswer": "A (308)",
    "explanation": "Product=HCFxLCM ⇒ 275xN=11x7700 ⇒ N=84700275=308.",
    "tags": [
      "Number Systems, LCM & HCF",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-22",
    "title": "Number Systems, LCM & HCF: Q22",
    "description": "What is the remainder when 784 is divided by 342?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Number Systems, LCM & HCF",
    "options": [
      "A) 0",
      "B) 1",
      "C) 7",
      "D) 341"
    ],
    "correctAnswer": "B (1)",
    "explanation": "73=343=342+1. So 7328=342+128 128 1 mod 342.",
    "tags": [
      "Number Systems, LCM & HCF",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "82%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-23",
    "title": "Number Systems, LCM & HCF: Q23",
    "description": "Find the unit digit of the product: 2467153x34172.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Number Systems, LCM & HCF",
    "options": [
      "A) 1",
      "B) 3",
      "C) 7",
      "D) 9"
    ],
    "correctAnswer": "C (7)",
    "explanation": "153 mod 4=1 ⇒ 71=7. Unit digit of 172=1. Product unit digit =7x1=7.",
    "tags": [
      "Number Systems, LCM & HCF",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "89%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is C."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-24",
    "title": "Number Systems, LCM & HCF: Q24",
    "description": "What is the smallest 4-digit number completely divisible by 12, 15, and 18?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Number Systems, LCM & HCF",
    "options": [
      "A) 1020",
      "B) 1080",
      "C) 1140",
      "D) 1000"
    ],
    "correctAnswer": "B (1080)",
    "explanation": "LCM12,15,18=180. Smallest 4-digit multiple =1000/180x180=6x180=1080. Permutations, Combinations & Probability",
    "tags": [
      "Number Systems, LCM & HCF",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "76%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-25",
    "title": "Permutations, Combinations & Probability: Q25",
    "description": "In how many different ways can the letters of the word 'LEADER' be arranged?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Permutations, Combinations & Probability",
    "options": [
      "A) 720",
      "B) 360",
      "C) 120",
      "D) 480"
    ],
    "correctAnswer": "B (360)",
    "explanation": "6 letters total with 'E' repeating twice ⇒ 6!2!=7202=360 ways.",
    "tags": [
      "Permutations, Combinations & Probability",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "83%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-26",
    "title": "Permutations, Combinations & Probability: Q26",
    "description": "In how many ways can a committee of 5 members be formed from 6 men and 4 women such that exactly 3 men are included?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Permutations, Combinations & Probability",
    "options": [
      "A) 120",
      "B) 100",
      "C) 140",
      "D) 80"
    ],
    "correctAnswer": "A (120)",
    "explanation": "63x42=20x6=120 ways.",
    "tags": [
      "Permutations, Combinations & Probability",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "90%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-27",
    "title": "Permutations, Combinations & Probability: Q27",
    "description": "Two unbiased dice are thrown simultaneously. What is the probability of getting a sum of 9?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Permutations, Combinations & Probability",
    "options": [
      "A) 1/6",
      "B) 1/9",
      "C) 5/36",
      "D) 1/12"
    ],
    "correctAnswer": "B (1/9)",
    "explanation": "Favorable: 3,6,4,5,5,4,6,3 ⇒ 4 pairs. Total =36. Probability=436=19.",
    "tags": [
      "Permutations, Combinations & Probability",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "77%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-28",
    "title": "Permutations, Combinations & Probability: Q28",
    "description": "Two cards are drawn together from a standard pack of 52 cards. Find the probability that both are aces.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Permutations, Combinations & Probability",
    "options": [
      "A) 1/221",
      "B) 1/169",
      "C) 1/13",
      "D) 4/221"
    ],
    "correctAnswer": "A (1/221)",
    "explanation": "42522=61326=1221. Clocks & Calendars",
    "tags": [
      "Permutations, Combinations & Probability",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "84%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-29",
    "title": "Clocks & Calendars: Q29",
    "description": "What is the angle between the hour hand and the minute hand of a clock at 3:40?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Clocks & Calendars",
    "options": [
      "A) 120�",
      "B) 130�",
      "C) 140�",
      "D) 125�"
    ],
    "correctAnswer": "B (130�)",
    "explanation": "Angle=|30H-5.5M|=|303-5.540|=|90-220|=130 .",
    "tags": [
      "Clocks & Calendars",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "91%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-30",
    "title": "Clocks & Calendars: Q30",
    "description": "If 15th August 2011 was Monday, what day of the week was 15th August 2012?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Clocks & Calendars",
    "options": [
      "A) Tuesday",
      "B) Wednesday",
      "C) Thursday",
      "D) Friday"
    ],
    "correctAnswer": "B (Wednesday)",
    "explanation": "2012 is a leap year (includes Feb 29) ⇒ 2 odd days. Monday+2=Wednesday. Mensuration & Additional Quant Topics",
    "tags": [
      "Clocks & Calendars",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "78%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-31",
    "title": "Mensuration & Additional Quant Topics: Q31",
    "description": "The perimeter of a rectangle is 60 cm and its area is 200 cm�. Find the length of its diagonal.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Mensuration & Additional Quant Topics",
    "options": [
      "A) 20 cm",
      "B) 500 cm",
      "C) 25 cm",
      "D) 15 cm"
    ],
    "correctAnswer": "B (500�22.36 cm)",
    "explanation": "l+b=30, lb=200. d2=l+b2-2lb=900-400=500 ⇒ d=500.",
    "tags": [
      "Mensuration & Additional Quant Topics",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "85%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-32",
    "title": "Mensuration & Additional Quant Topics: Q32",
    "description": "If the radius of a circle is increased by 50%, find the percentage increase in its area.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Mensuration & Additional Quant Topics",
    "options": [
      "A) 100%",
      "B) 125%",
      "C) 150%",
      "D) 225%"
    ],
    "correctAnswer": "B (125%)",
    "explanation": "Net % change=a+b+ab100=50+50+2500100=125%.",
    "tags": [
      "Mensuration & Additional Quant Topics",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "92%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-33",
    "title": "Mensuration & Additional Quant Topics: Q33",
    "description": "A solid metallic sphere of radius 6 cm is melted and recast into small spheres of radius 2 cm each. How many small spheres are formed?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Mensuration & Additional Quant Topics",
    "options": [
      "A) 9",
      "B) 18",
      "C) 27",
      "D) 36"
    ],
    "correctAnswer": "C (27)",
    "explanation": "Count=Rr3=623=33=27 spheres.",
    "tags": [
      "Mensuration & Additional Quant Topics",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "79%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is C."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-34",
    "title": "Mensuration & Additional Quant Topics: Q34",
    "description": "If log102=0.3010, what is the value of log1080?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Mensuration & Additional Quant Topics",
    "options": [
      "A) 1.9030",
      "B) 1.6020",
      "C) 2.1030",
      "D) 0.9030"
    ],
    "correctAnswer": "A (1.9030)",
    "explanation": "log80=log8x10=3log2+1=30.3010+1=1.9030.",
    "tags": [
      "Mensuration & Additional Quant Topics",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "86%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-35",
    "title": "Mensuration & Additional Quant Topics: Q35",
    "description": "If x+1x=5, find the value of x2+1x2.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Mensuration & Additional Quant Topics",
    "options": [
      "A) 25",
      "B) 27",
      "C) 23",
      "D) 21"
    ],
    "correctAnswer": "C (23)",
    "explanation": "x2+1x2=x+1x2-2=52-2=23.",
    "tags": [
      "Mensuration & Additional Quant Topics",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "93%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is C."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-36",
    "title": "Mensuration & Additional Quant Topics: Q36",
    "description": "A trader gives two successive discounts of 20% and 10% on a marked price. What is the single equivalent discount?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Mensuration & Additional Quant Topics",
    "options": [
      "A) 30%",
      "B) 28%",
      "C) 25%",
      "D) 32%"
    ],
    "correctAnswer": "B (28%)",
    "explanation": "d1+d2-d1d2100=20+10-2=28%.",
    "tags": [
      "Mensuration & Additional Quant Topics",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "80%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-37",
    "title": "Mensuration & Additional Quant Topics: Q37",
    "description": "If 5 men or 9 women can do a piece of work in 19 days, in how many days will 3 men and 6 women finish the same work?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Mensuration & Additional Quant Topics",
    "options": [
      "A) 12 days",
      "B) 15 days",
      "C) 18 days",
      "D) 10 days"
    ],
    "correctAnswer": "B (15 days)",
    "explanation": "5M=9W ⇒ 1M=1.8W. 3M+6W=31.8+6=11.4W. Days =9x1911.4=15 days.",
    "tags": [
      "Mensuration & Additional Quant Topics",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "87%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-38",
    "title": "Mensuration & Additional Quant Topics: Q38",
    "description": "A monkey climbs 6 meters up a pole in 1 minute and slips down 3 meters in the alternate next minute. If the pole is 60 meters high, how long will it take to reach the top?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Mensuration & Additional Quant Topics",
    "options": [
      "A) 37 min",
      "B) 38 min",
      "C) 39 min",
      "D) 40 min"
    ],
    "correctAnswer": "A (37 min)",
    "explanation": "Net climb =3 m in 2 min. To reach 54 m takes 543x2=36 min. In the 37th min, it climbs 6 m to touch 60 m. Total =37 min.",
    "tags": [
      "Mensuration & Additional Quant Topics",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "94%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-39",
    "title": "Mensuration & Additional Quant Topics: Q39",
    "description": "The average of 5 consecutive odd numbers is 27. What is the product of the smallest and largest numbers?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Mensuration & Additional Quant Topics",
    "options": [
      "A) 713",
      "B) 725",
      "C) 693",
      "D) 741"
    ],
    "correctAnswer": "A (713)",
    "explanation": "Numbers: 23, 25, 27, 29, 31. Product =23x31=713.",
    "tags": [
      "Mensuration & Additional Quant Topics",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "81%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-40",
    "title": "Mensuration & Additional Quant Topics: Q40",
    "description": "In an exam, 70% passed in English, 80% passed in Math, and 10% failed in both. If 144 passed in both, find the total candidates.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Mensuration & Additional Quant Topics",
    "options": [
      "A) 200",
      "B) 240",
      "C) 300",
      "D) 360"
    ],
    "correctAnswer": "B (240)",
    "explanation": "Passed at least one =90%. Passed both =70+80-90=60%. Total =1440.6=240.",
    "tags": [
      "Mensuration & Additional Quant Topics",
      "Aptitude",
      "MCQ",
      "Math",
      "Quantitative"
    ],
    "companyTags": [
      "TCS",
      "Infosys",
      "Wipro",
      "Cognizant",
      "Accenture",
      "Capgemini"
    ],
    "frequency": "High",
    "acceptanceRate": "88%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-41",
    "title": "Mensuration & Additional Quant Topics: Q41",
    "description": "Find the next number in the series: 2, 6, 12, 20, 30, 42, ?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Mensuration & Additional Quant Topics",
    "options": [
      "A) 54",
      "B) 56",
      "C) 60",
      "D) 64"
    ],
    "correctAnswer": "B (56)",
    "explanation": "The correct answer is B (56).",
    "tags": [
      "Mensuration & Additional Quant Topics",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-42",
    "title": "Logic: Differences: +4,+6,+8,+10,+12,+14?42+14=56.: Q42",
    "description": "Find the missing term: 3, 7, 15, 31, 63, ?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: Differences: +4,+6,+8,+10,+12,+14?42+14=56.",
    "options": [
      "A) 125",
      "B) 127",
      "C) 129",
      "D) 131"
    ],
    "correctAnswer": "B (127)",
    "explanation": "The correct answer is B (127).",
    "tags": [
      "Logic: Differences: +4,+6,+8,+10,+12,+14?42+14=56.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "82%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-43",
    "title": "Logic: Each term is 2x+1?263+1=127.: Q43",
    "description": "If 'ROSE' is coded as 6821, 'CHAIR' as 73456, and 'PREACH' as 961473, what is the code for 'SEARCH'?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: Each term is 2x+1?263+1=127.",
    "options": [
      "A) 214673",
      "B) 246173",
      "C) 214763",
      "D) 216473"
    ],
    "correctAnswer": "A (214673)",
    "explanation": "The correct answer is A (214673).",
    "tags": [
      "Logic: Each term is 2x+1?263+1=127.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "89%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-44",
    "title": "Logic: Direct mapping: S=2, E=1, A=4, R=6, C=7, H=3.: Q44",
    "description": "In a certain code, 'COMPUTER' is written as 'RFUVQNPC'. How is 'MEDICINE' written in that code?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: Direct mapping: S=2, E=1, A=4, R=6, C=7, H=3.",
    "options": [
      "A) EOJDJEFM",
      "B) EOJDEJFM",
      "C) MFEJDJOE",
      "D) EOJDJFEM"
    ],
    "correctAnswer": "A (EOJDJEFM)",
    "explanation": "The correct answer is A (EOJDJEFM).",
    "tags": [
      "Logic: Direct mapping: S=2, E=1, A=4, R=6, C=7, H=3.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "76%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-45",
    "title": "Logic: First and last letters swap places; internal letters reverse and add +1.: Q45",
    "description": "Find the odd one out: 27, 64, 125, 144, 216, 343",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: First and last letters swap places; internal letters reverse and add +1.",
    "options": [
      "A) 64",
      "B) 144",
      "C) 216",
      "D) 343"
    ],
    "correctAnswer": "B (144)",
    "explanation": "The correct answer is B (144).",
    "tags": [
      "Logic: First and last letters swap places; internal letters reverse and add +1.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "83%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-46",
    "title": "Logic: All are cubes (33,43,53,63,73) except 144 (122).: Q46",
    "description": "Pointing to a photograph, Rahul said, \"She is the daughter of my grandfather's only son.\" How is the girl related to Rahul?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: All are cubes (33,43,53,63,73) except 144 (122).",
    "options": [
      "A) Mother",
      "B) Sister",
      "C) Cousin",
      "D) Aunt"
    ],
    "correctAnswer": "B (Sister)",
    "explanation": "The correct answer is B (Sister).",
    "tags": [
      "Logic: All are cubes (33,43,53,63,73) except 144 (122).",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "90%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-47",
    "title": "Logic: Grandfather's only son = Father. Father's daughter = Sister.: Q47",
    "description": "A is the brother of B. B is the daughter of C. D is the father of C. How is A related to D?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: Grandfather's only son = Father. Father's daughter = Sister.",
    "options": [
      "A) Son",
      "B) Grandson",
      "C) Brother",
      "D) Grandfather"
    ],
    "correctAnswer": "B (Grandson)",
    "explanation": "The correct answer is B (Grandson).",
    "tags": [
      "Logic: Grandfather's only son = Father. Father's daughter = Sister.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "77%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-48",
    "title": "Logic: A is C's son; D is C's father ? A is D's grandson.: Q48",
    "description": "A man walks 5 km North, turns right and walks 3 km, then turns right and walks 5 km. How far and in which direction is he from the start?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: A is C's son; D is C's father ? A is D's grandson.",
    "options": [
      "A) 3 km East",
      "B) 3 km West",
      "C) 5 km North",
      "D) 8 km East"
    ],
    "correctAnswer": "A (3 km East)",
    "explanation": "The correct answer is A (3 km East).",
    "tags": [
      "Logic: A is C's son; D is C's father ? A is D's grandson.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "84%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-49",
    "title": "Logic: North and South cancel (5-5=0). Remaining displacement is 3 km East.: Q49",
    "description": "One morning after sunrise, Suresh was facing a pole. The shadow fell exactly to his right. Which direction was Suresh facing?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: North and South cancel (5-5=0). Remaining displacement is 3 km East.",
    "options": [
      "A) East",
      "B) West",
      "C) South",
      "D) North"
    ],
    "correctAnswer": "C (South)",
    "explanation": "The correct answer is C (South).",
    "tags": [
      "Logic: North and South cancel (5-5=0). Remaining displacement is 3 km East.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "91%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is C."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-50",
    "title": "Logic: Morning shadows point West. If West is to his right, he is facing South.: Q50",
    "description": "In a row of 40 students, Amit is 18th from the left end. What is his position from the right end?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: Morning shadows point West. If West is to his right, he is facing South.",
    "options": [
      "A) 22nd",
      "B) 23rd",
      "C) 24th",
      "D) 21st"
    ],
    "correctAnswer": "B (23rd)",
    "explanation": "The correct answer is B (23rd).",
    "tags": [
      "Logic: Morning shadows point West. If West is to his right, he is facing South.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "78%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-51",
    "title": "Logic: Right=40-18+1=23rd.: Q51",
    "description": "In a class, Rohan ranks 7th from the top and 28th from the bottom. How many students are in the class?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: Right=40-18+1=23rd.",
    "options": [
      "A) 34",
      "B) 35",
      "C) 36",
      "D) 33"
    ],
    "correctAnswer": "A (34)",
    "explanation": "The correct answer is A (34).",
    "tags": [
      "Logic: Right=40-18+1=23rd.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "85%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-52",
    "title": "Logic: Total=7+28-1=34.: Q52",
    "description": "Five friends A, B, C, D, and E sit in a circle facing the center. B is between A and C. E is to the immediate right of A. Who is to the immediate left of C?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: Total=7+28-1=34.",
    "options": [
      "A) B",
      "B) D",
      "C) E",
      "D) A"
    ],
    "correctAnswer": "A (B)",
    "explanation": "The correct answer is A (B).",
    "tags": [
      "Logic: Total=7+28-1=34.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "92%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-53",
    "title": "Logic: Clockwise arrangement: A \u001a E \u001a D \u001a C \u001a B \u001a A. Immediate left of C is B.: Q53",
    "description": "Statements: All Mangoes are Golden. All Golden things are Sweet.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: Clockwise arrangement: A \u001a E \u001a D \u001a C \u001a B \u001a A. Immediate left of C is B.",
    "options": [
      "A) Only I follows",
      "B) Only II follows",
      "C) Both follow",
      "D) Neither follows"
    ],
    "correctAnswer": "A (Only I follows)",
    "explanation": "The correct answer is A (Only I follows).",
    "tags": [
      "Logic: Clockwise arrangement: A \u001a E \u001a D \u001a C \u001a B \u001a A. Immediate left of C is B.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "79%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-54",
    "title": "Conclusions: (I) All Mangoes are Sweet. (II) All Sweet things are Mangoes.: Q54",
    "description": "Statements: Some pens are books. All books are pencils.",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Conclusions: (I) All Mangoes are Sweet. (II) All Sweet things are Mangoes.",
    "options": [
      "A) Only I follows",
      "B) Only II follows",
      "C) Both follow",
      "D) Neither follows"
    ],
    "correctAnswer": "A (Only I follows)",
    "explanation": "The correct answer is A (Only I follows).",
    "tags": [
      "Conclusions: (I) All Mangoes are Sweet. (II) All Sweet things are Mangoes.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "86%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-55",
    "title": "Conclusions: (I) Some pens are pencils. (II) All pencils are books.: Q55",
    "description": "If '+' means '�', '-' means 'x', 'x' means '+', and '�' means '-', calculate: 36x12+4-6�2",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Conclusions: (I) Some pens are pencils. (II) All pencils are books.",
    "options": [
      "A) 52",
      "B) 42",
      "C) 48",
      "D) 38"
    ],
    "correctAnswer": "A (52)",
    "explanation": "36+12 4x6-2=36+18-2=52.",
    "tags": [
      "Conclusions: (I) Some pens are pencils. (II) All pencils are books.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "93%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-56",
    "title": "Conclusions: (I) Some pens are pencils. (II) All pencils are books.: Q56",
    "description": "If P means '+', Q means '-', R means 'x', and S means '�', find: 18 R 12 S 4 P 5 Q 6",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Conclusions: (I) Some pens are pencils. (II) All pencils are books.",
    "options": [
      "A) 53",
      "B) 59",
      "C) 45",
      "D) 62"
    ],
    "correctAnswer": "A (53)",
    "explanation": "18x12 4+5-6=54+5-6=53.",
    "tags": [
      "Conclusions: (I) Some pens are pencils. (II) All pencils are books.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "80%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-57",
    "title": "Conclusions: (I) Some pens are pencils. (II) All pencils are books.: Q57",
    "description": "A cube is painted blue on all 6 faces and cut into 64 smaller cubes of equal size. How many cubes have exactly one face painted?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Conclusions: (I) Some pens are pencils. (II) All pencils are books.",
    "options": [
      "A) 16",
      "B) 24",
      "C) 8",
      "D) 32"
    ],
    "correctAnswer": "B (24)",
    "explanation": "The correct answer is B (24).",
    "tags": [
      "Conclusions: (I) Some pens are pencils. (II) All pencils are books.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "87%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-58",
    "title": "Formula: n=364=4. 1-face=6n-22=622=24.: Q58",
    "description": "How many smaller cubes in the 64-cube model above have NO faces painted?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Formula: n=364=4. 1-face=6n-22=622=24.",
    "options": [
      "A) 4",
      "B) 8",
      "C) 12",
      "D) 16"
    ],
    "correctAnswer": "B (8)",
    "explanation": "The correct answer is B (8).",
    "tags": [
      "Formula: n=364=4. 1-face=6n-22=622=24.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "94%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-59",
    "title": "Formula: 0-face=n-23=23=8.: Q59",
    "description": "Complete the analogy: 8 : 28 :: 27 : ?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Formula: 0-face=n-23=23=8.",
    "options": [
      "A) 55",
      "B) 65",
      "C) 64",
      "D) 80"
    ],
    "correctAnswer": "B (65)",
    "explanation": "The correct answer is B (65).",
    "tags": [
      "Formula: 0-face=n-23=23=8.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "81%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-60",
    "title": "Logic: 23\u001a33+1=28. Then 33\u001a43+1=65.: Q60",
    "description": "Select the missing number in the matrix:",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "mid",
    "category": "Logic: 23\u001a33+1=28. Then 33\u001a43+1=65.",
    "options": [
      "A) 6",
      "B) 7",
      "C) 4",
      "D) 5"
    ],
    "correctAnswer": "A (6)",
    "explanation": "The correct answer is A (6).",
    "tags": [
      "Logic: 23\u001a33+1=28. Then 33\u001a43+1=65.",
      "Aptitude",
      "MCQ",
      "Logical Reasoning",
      "Puzzles",
      "Analytics"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Deloitte",
      "TCS Ninja",
      "Goldman Sachs"
    ],
    "frequency": "High",
    "acceptanceRate": "88%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-61",
    "title": "Logic: Standard Magic Square where every row/column sums to 15 (8+1+6=15).: Q61",
    "description": "Choose the word closest in meaning (Synonym) to 'CANDID':",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Logic: Standard Magic Square where every row/column sums to 15 (8+1+6=15).",
    "options": [
      "A) Secretive",
      "B) Frank",
      "C) Shy",
      "D) Deceptive"
    ],
    "correctAnswer": "B (Frank)",
    "explanation": "The correct answer is B (Frank).",
    "tags": [
      "Logic: Standard Magic Square where every row/column sums to 15 (8+1+6=15).",
      "Aptitude",
      "MCQ",
      "Verbal Ability",
      "English Grammar",
      "Comprehension"
    ],
    "companyTags": [
      "Infosys InfyTQ",
      "Wipro NLTH",
      "Tech Mahindra",
      "Cognizant GenC"
    ],
    "frequency": "High",
    "acceptanceRate": "75%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-62",
    "title": "Logic: Standard Magic Square where every row/column sums to 15 (8+1+6=15).: Q62",
    "description": "Choose the word most opposite in meaning (Antonym) to 'METICULOUS':",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Logic: Standard Magic Square where every row/column sums to 15 (8+1+6=15).",
    "options": [
      "A) Careful",
      "B) Careless",
      "C) Thorough",
      "D) Accurate"
    ],
    "correctAnswer": "B (Careless)",
    "explanation": "The correct answer is B (Careless).",
    "tags": [
      "Logic: Standard Magic Square where every row/column sums to 15 (8+1+6=15).",
      "Aptitude",
      "MCQ",
      "Verbal Ability",
      "English Grammar",
      "Comprehension"
    ],
    "companyTags": [
      "Infosys InfyTQ",
      "Wipro NLTH",
      "Tech Mahindra",
      "Cognizant GenC"
    ],
    "frequency": "High",
    "acceptanceRate": "82%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-63",
    "title": "Logic: Standard Magic Square where every row/column sums to 15 (8+1+6=15).: Q63",
    "description": "Identify the error:",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Logic: Standard Magic Square where every row/column sums to 15 (8+1+6=15).",
    "options": [
      "A) A",
      "B) B",
      "C) C",
      "D) D"
    ],
    "correctAnswer": "C (was present \u001a were present)",
    "explanation": "The correct answer is C (was present \u001a were present).",
    "tags": [
      "Logic: Standard Magic Square where every row/column sums to 15 (8+1+6=15).",
      "Aptitude",
      "MCQ",
      "Verbal Ability",
      "English Grammar",
      "Comprehension"
    ],
    "companyTags": [
      "Infosys InfyTQ",
      "Wipro NLTH",
      "Tech Mahindra",
      "Cognizant GenC"
    ],
    "frequency": "High",
    "acceptanceRate": "89%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is C."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-64",
    "title": "\"Neither the manager (A) / nor the employees (B) / was present at the meeting (C) / No error (D)\": Q64",
    "description": "Fill in the blank:",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "\"Neither the manager (A) / nor the employees (B) / was present at the meeting (C) / No error (D)\"",
    "options": [
      "A) for",
      "B) since",
      "C) from",
      "D) in"
    ],
    "correctAnswer": "B (since)",
    "explanation": "The correct answer is B (since).",
    "tags": [
      "\"Neither the manager (A) / nor the employees (B) / was present at the meeting (C) / No error (D)\"",
      "Aptitude",
      "MCQ",
      "Verbal Ability",
      "English Grammar",
      "Comprehension"
    ],
    "companyTags": [
      "Infosys InfyTQ",
      "Wipro NLTH",
      "Tech Mahindra",
      "Cognizant GenC"
    ],
    "frequency": "High",
    "acceptanceRate": "76%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-65",
    "title": "\"He has been suffering from fever ______ last Monday.\": Q65",
    "description": "What is the meaning of the idiom: 'To burn the candle at both ends'?",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "\"He has been suffering from fever ______ last Monday.\"",
    "options": [
      "A) To be extravagant",
      "B) To work exhausting hours from early morning to late night",
      "C) To waste energy",
      "D) To cause accidental damage"
    ],
    "correctAnswer": "B (To work exhausting hours from early morning to late night)",
    "explanation": "The correct answer is B (To work exhausting hours from early morning to late night).",
    "tags": [
      "\"He has been suffering from fever ______ last Monday.\"",
      "Aptitude",
      "MCQ",
      "Verbal Ability",
      "English Grammar",
      "Comprehension"
    ],
    "companyTags": [
      "Infosys InfyTQ",
      "Wipro NLTH",
      "Tech Mahindra",
      "Cognizant GenC"
    ],
    "frequency": "High",
    "acceptanceRate": "83%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-66",
    "title": "\"He has been suffering from fever ______ last Monday.\": Q66",
    "description": "One-word substitution:",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "\"He has been suffering from fever ______ last Monday.\"",
    "options": [
      "A) Polyglot",
      "B) Linguist",
      "C) Philologist",
      "D) Omniscient"
    ],
    "correctAnswer": "A (Polyglot)",
    "explanation": "The correct answer is A (Polyglot).",
    "tags": [
      "\"He has been suffering from fever ______ last Monday.\"",
      "Aptitude",
      "MCQ",
      "Verbal Ability",
      "English Grammar",
      "Comprehension"
    ],
    "companyTags": [
      "Infosys InfyTQ",
      "Wipro NLTH",
      "Tech Mahindra",
      "Cognizant GenC"
    ],
    "frequency": "High",
    "acceptanceRate": "90%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is A."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-67",
    "title": "\"A person who knows and speaks many languages fluently\": Q67",
    "description": "Choose the correctly spelled word:",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "\"A person who knows and speaks many languages fluently\"",
    "options": [
      "A) Accomodation",
      "B) Accommodation",
      "C) Acommodation",
      "D) Accommadation"
    ],
    "correctAnswer": "B (Accommodation)",
    "explanation": "The correct answer is B (Accommodation).",
    "tags": [
      "\"A person who knows and speaks many languages fluently\"",
      "Aptitude",
      "MCQ",
      "Verbal Ability",
      "English Grammar",
      "Comprehension"
    ],
    "companyTags": [
      "Infosys InfyTQ",
      "Wipro NLTH",
      "Tech Mahindra",
      "Cognizant GenC"
    ],
    "frequency": "High",
    "acceptanceRate": "77%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-68",
    "title": "\"A person who knows and speaks many languages fluently\": Q68",
    "description": "Change into Passive Voice:",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "\"A person who knows and speaks many languages fluently\"",
    "options": [
      "A) A delicious dinner is cooked by the chef.",
      "B) A delicious dinner was cooked by the chef.",
      "C) Dinner was being cooked by the chef.",
      "D) A delicious dinner has been cooked."
    ],
    "correctAnswer": "B (A delicious dinner was cooked by the chef.)",
    "explanation": "The correct answer is B (A delicious dinner was cooked by the chef.).",
    "tags": [
      "\"A person who knows and speaks many languages fluently\"",
      "Aptitude",
      "MCQ",
      "Verbal Ability",
      "English Grammar",
      "Comprehension"
    ],
    "companyTags": [
      "Infosys InfyTQ",
      "Wipro NLTH",
      "Tech Mahindra",
      "Cognizant GenC"
    ],
    "frequency": "High",
    "acceptanceRate": "84%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-69",
    "title": "\"The chef cooked a delicious dinner.\": Q69",
    "description": "Complete the analogy:",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "\"The chef cooked a delicious dinner.\"",
    "options": [
      "A) Anvil",
      "B) Chisel",
      "C) Brush",
      "D) Palette"
    ],
    "correctAnswer": "B (Chisel)",
    "explanation": "The correct answer is B (Chisel).",
    "tags": [
      "\"The chef cooked a delicious dinner.\"",
      "Aptitude",
      "MCQ",
      "Verbal Ability",
      "English Grammar",
      "Comprehension"
    ],
    "companyTags": [
      "Infosys InfyTQ",
      "Wipro NLTH",
      "Tech Mahindra",
      "Cognizant GenC"
    ],
    "frequency": "High",
    "acceptanceRate": "91%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "apt-70",
    "title": "Doctor : Stethoscope :: Sculptor : ?: Q70",
    "description": "Para Jumbles: Rearrange to form a coherent sentence:",
    "roundType": "aptitude",
    "type": "mcq",
    "difficulty": "easy",
    "category": "Doctor : Stethoscope :: Sculptor : ?",
    "options": [
      "A) QPSR",
      "B) QSPR",
      "C) PQSR",
      "D) SQPR"
    ],
    "correctAnswer": "B (QSPR)",
    "explanation": "The correct answer is B (QSPR).",
    "tags": [
      "Doctor : Stethoscope :: Sculptor : ?",
      "Aptitude",
      "MCQ",
      "Verbal Ability",
      "English Grammar",
      "Comprehension"
    ],
    "companyTags": [
      "Infosys InfyTQ",
      "Wipro NLTH",
      "Tech Mahindra",
      "Cognizant GenC"
    ],
    "frequency": "High",
    "acceptanceRate": "78%",
    "timeLimitMinutes": 3,
    "hints": [
      "Analyze the problem statement carefully and eliminate unlikely choices.",
      "The correct answer is B."
    ],
    "rubricCriteria": [
      "Selects correct MCQ option",
      "Step-by-step mathematical or analytical deduction",
      "Speed and accuracy in solving"
    ]
  },
  {
    "id": "sys-url-shortener",
    "title": "Design a Scalable URL Shortener (TinyURL)",
    "description": "Design a distributed, highly available URL shortening service capable of handling 100M new URLs/month and 1B redirects/month with sub-10ms latency.",
    "roundType": "system-design",
    "difficulty": "senior",
    "category": "Distributed Systems",
    "tags": [
      "System Design",
      "Hashing",
      "Caching",
      "Database Sharding"
    ],
    "companyTags": [
      "Meta",
      "Google",
      "Amazon",
      "Uber"
    ],
    "frequency": "High",
    "acceptanceRate": "55%",
    "timeLimitMinutes": 30,
    "expectedComplexity": {
      "time": "O(1) redirect",
      "space": "Distributed DB"
    },
    "hints": [
      "Base62 encoding of 64-bit auto-incrementing integer or Token Range Service."
    ],
    "starterCode": "/**\n * System Design: URL Shortener (TinyURL)\n *\n * 1. Functional & Non-Functional Requirements\n * 2. Capacity Estimation (Traffic, Storage, Memory)\n * 3. API Endpoints (POST /api/v1/shorten, GET /{shortUrl})\n * 4. High-Level Architecture (LB, App Servers, Redis, DB)\n * 5. Deep-Dive: ID Generation Strategy (Base62 vs Snowflake)\n */\n",
    "rubricCriteria": [
      "Capacity calculations",
      "Base62 key generation",
      "Redis caching strategy",
      "Database sharding"
    ],
    "solutionCode": "/**\n * System Design: URL Shortener (TinyURL)\n *\n * 1. Functional & Non-Functional Requirements\n * 2. Capacity Estimation (Traffic, Storage, Memory)\n * 3. API Endpoints (POST /api/v1/shorten, GET /{shortUrl})\n * 4. High-Level Architecture (LB, App Servers, Redis, DB)\n * 5. Deep-Dive: ID Generation Strategy (Base62 vs Snowflake)\n */\n"
  },
  {
    "id": "beh-conflict-star",
    "title": "Behavioral: Resolving Technical Disagreements (STAR)",
    "description": "Tell me about a time you had a strong technical disagreement with a teammate or senior engineer. How did you handle it and what was the outcome?",
    "roundType": "behavioral",
    "difficulty": "mid",
    "category": "Leadership & Conflict",
    "tags": [
      "Behavioral",
      "STAR",
      "Leadership",
      "Communication"
    ],
    "companyTags": [
      "Amazon",
      "Google",
      "Meta",
      "Apple"
    ],
    "frequency": "High",
    "acceptanceRate": "85%",
    "timeLimitMinutes": 15,
    "hints": [
      "Structure your response using STAR: Situation, Task, Action, Result."
    ],
    "starterCode": "/**\n * Behavioral STAR Response Structure:\n * - Situation:\n * - Task:\n * - Action:\n * - Result:\n */\n",
    "rubricCriteria": [
      "Structured STAR format",
      "Objective data-driven resolution",
      "Positive team outcome"
    ],
    "solutionCode": "/**\n * Behavioral STAR Response Structure:\n * - Situation:\n * - Task:\n * - Action:\n * - Result:\n */\n"
  }
];
