import type { Question } from '@/types'

export const QUESTION_BANK: Question[] = [
  // =========================================================================
  // 1. DATA STRUCTURES & ALGORITHMS (DSA)
  // =========================================================================
  {
    id: 'dsa-1',
    title: 'Two Sum (Optimal Hash Map Approach)',
    description:
      'Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice. Aim for O(N) time complexity using a Hash Map.',
    roundType: 'dsa',
    difficulty: 'easy',
    category: 'Arrays & Hashing',
    tags: ['Hash Map', 'Arrays', 'Two Sum', 'Lookup'],
    companyTags: ['Amazon', 'Google', 'TCS', 'Infosys', 'Microsoft'],
    frequency: 'High',
    acceptanceRate: '92%',
    timeLimitMinutes: 15,
    hints: [
      'Instead of checking all pairs with two nested loops (O(N^2)), can you store numbers you have already seen in a Hash Map?',
      'For each element `num`, calculate its complement: `target - num`. Check if the complement exists in the map.',
    ],
    starterCode: `function twoSum(nums: number[], target: number): number[] {
  // TODO: Implement single-pass Hash Map solution in O(N) time
  
  return [];
}`,
    functionName: 'twoSum',
    testCases: [
      {
        id: '1',
        input: '[2, 7, 11, 15], 9',
        expectedOutput: '[0, 1]',
        description: 'Standard case where nums[0] + nums[1] = 9',
      },
      {
        id: '2',
        input: '[3, 2, 4], 6',
        expectedOutput: '[1, 2]',
        description: 'Non-consecutive elements',
      },
      {
        id: '3',
        input: '[3, 3], 6',
        expectedOutput: '[0, 1]',
        description: 'Duplicate values adding to target',
      },
    ],
    language: 'typescript',
    expectedComplexity: {
      time: 'O(N)',
      space: 'O(N)',
    },
    rubricCriteria: [
      'Hash Map single-pass lookup logic',
      'Proper index retrieval and edge-case handling',
      'Correct time and space complexity explanation',
    ],
  },
  {
    id: 'dsa-2',
    title: 'Reverse a Singly Linked List',
    description:
      'Given the `head` of a singly linked list, reverse the list iteratively and return the reversed list\'s head. Discuss both the iterative three-pointer technique (prev, curr, next) and recursive approaches.',
    roundType: 'dsa',
    difficulty: 'easy',
    category: 'Linked Lists',
    tags: ['Linked List', 'Pointers', 'Recursion'],
    companyTags: ['Microsoft', 'Amazon', 'Wipro', 'Accenture'],
    frequency: 'High',
    acceptanceRate: '88%',
    timeLimitMinutes: 12,
    hints: [
      'Maintain three pointers: `prev` initialized to null, `curr` initialized to head, and `nextTemp`.',
      'In each iteration, save `curr.next`, point `curr.next` to `prev`, advance `prev = curr`, and `curr = nextTemp`.',
    ],
    starterCode: `class ListNode {
  val: number;
  next: ListNode | null;
  constructor(val?: number, next?: ListNode | null) {
    this.val = val === undefined ? 0 : val;
    this.next = next === undefined ? null : next;
  }
}

function reverseList(head: ListNode | null): ListNode | null {
  // TODO: Implement iterative 3-pointer list reversal
  
  return null;
}`,
    functionName: 'reverseList',
    testCases: [
      {
        id: '1',
        input: 'null',
        expectedOutput: 'null',
        description: 'Empty list edge case',
      },
    ],
    language: 'typescript',
    expectedComplexity: {
      time: 'O(N)',
      space: 'O(1) iterative',
    },
    rubricCriteria: [
      'Correct pointer rewiring without losing node references',
      'Handling empty list and single-node list edge cases',
      'O(1) auxiliary space compliance',
    ],
  },
  {
    id: 'dsa-3',
    title: 'Valid Parentheses (Stack Balance)',
    description:
      'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if open brackets are closed by the same type of brackets and closed in the correct order.',
    roundType: 'dsa',
    difficulty: 'easy',
    category: 'Stacks & Queues',
    tags: ['Stack', 'Strings', 'Matching'],
    companyTags: ['Google', 'Meta', 'Capgemini', 'Cognizant'],
    frequency: 'High',
    acceptanceRate: '90%',
    timeLimitMinutes: 12,
    hints: [
      'Use a Stack to push opening brackets `(`, `{`, `[`.',
      'When encountering a closing bracket, check if the stack is non-empty and whether the top matches the corresponding opening bracket.',
      'At the end of the string, verify if the stack is completely empty.',
    ],
    starterCode: `function isValidParentheses(s: string): boolean {
  // TODO: Use a LIFO stack to match opening and closing brackets
  
  return false;
}`,
    functionName: 'isValidParentheses',
    testCases: [
      {
        id: '1',
        input: '"()"',
        expectedOutput: 'true',
        description: 'Single valid pair',
      },
      {
        id: '2',
        input: '"()[]{}"',
        expectedOutput: 'true',
        description: 'Multiple valid consecutive pairs',
      },
      {
        id: '3',
        input: '"(]"',
        expectedOutput: 'false',
        description: 'Mismatched closing bracket type',
      },
      {
        id: '4',
        input: '"([)]"',
        expectedOutput: 'false',
        description: 'Improper nesting sequence',
      },
      {
        id: '5',
        input: '"{[]}"',
        expectedOutput: 'true',
        description: 'Valid nested brackets',
      },
    ],
    language: 'typescript',
    expectedComplexity: {
      time: 'O(N)',
      space: 'O(N)',
    },
    rubricCriteria: [
      'LIFO stack usage',
      'Handling starting closing bracket edge case',
      'Final stack emptiness check',
    ],
  },
  {
    id: 'dsa-4',
    title: 'Maximum Subarray (Kadane\'s Algorithm)',
    description:
      'Given an integer array `nums`, find the subarray with the largest sum, and return its sum. Implement the optimal O(N) solution using Kadane\'s algorithm.',
    roundType: 'dsa',
    difficulty: 'medium',
    category: 'Dynamic Programming',
    tags: ['Kadane Algorithm', 'Dynamic Programming', 'Arrays'],
    companyTags: ['Amazon', 'Flipkart', 'Paytm', 'Oracle'],
    frequency: 'High',
    acceptanceRate: '82%',
    timeLimitMinutes: 15,
    hints: [
      'At each index `i`, you have two choices: either extend the existing subarray sum (`currentSum + nums[i]`) or start a fresh subarray from `nums[i]`.',
      'Track `maxSum` globally across the loop.',
    ],
    starterCode: `function maxSubArray(nums: number[]): number {
  // TODO: Implement Kadane's O(N) dynamic programming algorithm
  
  return 0;
}`,
    functionName: 'maxSubArray',
    testCases: [
      {
        id: '1',
        input: '[-2, 1, -3, 4, -1, 2, 1, -5, 4]',
        expectedOutput: '6',
        description: 'Subarray [4, -1, 2, 1] has max sum 6',
      },
      {
        id: '2',
        input: '[1]',
        expectedOutput: '1',
        description: 'Single element array',
      },
      {
        id: '3',
        input: '[5, 4, -1, 7, 8]',
        expectedOutput: '23',
        description: 'All-positive except one number',
      },
      {
        id: '4',
        input: '[-5, -2, -8, -1]',
        expectedOutput: '-1',
        description: 'All negative numbers (should return max negative element)',
      },
    ],
    language: 'typescript',
    expectedComplexity: {
      time: 'O(N)',
      space: 'O(1)',
    },
    rubricCriteria: [
      'Kadane\'s greedy dynamic transition formula',
      'Handling all-negative array cases correctly',
      'Clear trade-off comparison with O(N^2) brute force',
    ],
  },
  {
    id: 'dsa-5',
    title: 'Binary Tree Level Order Traversal (BFS)',
    description:
      'Given the `root` of a binary tree, return the level order traversal of its nodes\' values (i.e., from left to right, level by level) using a Queue.',
    roundType: 'dsa',
    difficulty: 'medium',
    category: 'Trees & Graphs',
    tags: ['Binary Tree', 'BFS', 'Queue', 'Traversal'],
    companyTags: ['Adobe', 'Cisco', 'Samsung', 'Amazon'],
    frequency: 'High',
    acceptanceRate: '85%',
    timeLimitMinutes: 15,
    hints: [
      'Use a Queue initialized with the root node.',
      'In a loop, determine the number of nodes at the current level (`queue.length`), process all of them, and push their left and right children.',
    ],
    starterCode: `class TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
  constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
    this.val = val === undefined ? 0 : val;
    this.left = left === undefined ? null : left;
    this.right = right === undefined ? null : right;
  }
}

function levelOrder(root: TreeNode | null): number[][] {
  // TODO: Implement BFS level-by-level queue traversal
  
  return [];
}`,
    functionName: 'levelOrder',
    testCases: [
      {
        id: '1',
        input: 'null',
        expectedOutput: '[]',
        description: 'Empty root node returns empty array',
      },
    ],
    language: 'typescript',
    expectedComplexity: {
      time: 'O(N)',
      space: 'O(W) where W is maximum width of tree',
    },
    rubricCriteria: [
      'Queue-based BFS implementation',
      'Correct level boundary segmentation with levelSize variable',
      'Null root edge case handling',
    ],
  },

  // =========================================================================
  // 2. COMPUTER SCIENCE (CS) FUNDAMENTALS (OS, DBMS, NETWORKS, OOPS)
  // =========================================================================
  {
    id: 'cs-1',
    title: 'Processes vs Threads & Context Switching (Operating Systems)',
    description:
      'Explain the fundamental differences between a Process and a Thread in Operating Systems. Discuss how memory is shared (heap vs stack), PCB/TCB structures, the cost of context switching, and inter-process communication (IPC) methods.',
    roundType: 'cs-fundamentals',
    difficulty: 'mid',
    category: 'Operating Systems',
    tags: ['OS', 'Processes', 'Threads', 'Context Switch', 'IPC'],
    companyTags: ['Microsoft', 'Qualcomm', 'Intel', 'Samsung', 'Oracle'],
    frequency: 'High',
    acceptanceRate: '86%',
    timeLimitMinutes: 12,
    hints: [
      'A process is an executing program instance with its own virtual address space; threads within the same process share code, data, and heap but have their own registers and stack.',
      'Why is thread context switching cheaper than process context switching? Mention TLB flushing and page table swaps.',
      'List common IPC mechanisms: Pipes, Shared Memory, Message Queues, Sockets, and Semaphores.',
    ],
    starterCode: `/**
 * CS Fundamentals: Operating Systems Concept Breakdown
 *
 * 1. Process vs Thread Architecture:
 *    - Memory layout (Stack vs Heap)
 *    - Control Blocks (PCB vs TCB)
 *
 * 2. Context Switching Overhead:
 *    - Registers, Program Counter, CPU cache, TLB invalidation
 *
 * 3. IPC (Inter-Process Communication) Mechanisms:
 *    - Sockets, Pipes, Shared Memory, Message Queues
 */
`,
    language: 'typescript',
    rubricCriteria: [
      'Accurate memory layout distinction (Stack per thread, Shared Heap)',
      'Explanation of Context Switching overhead (PCB vs TCB, CPU registers, TLB cache invalidation)',
      'Concurrency vs Parallelism definition',
      'IPC mechanisms overview',
    ],
  },
  {
    id: 'cs-2',
    title: 'ACID Properties & Database Indexing (DBMS & SQL)',
    description:
      'Explain the four ACID properties in relational database management systems. Then, explain how B+ Tree indexes work, why B+ Trees are preferred over Binary Search Trees or Hash Tables for disk storage, and the difference between Clustered and Non-Clustered indexes.',
    roundType: 'cs-fundamentals',
    difficulty: 'mid',
    category: 'Database Management Systems',
    tags: ['DBMS', 'SQL', 'ACID', 'Indexing', 'B+ Tree'],
    companyTags: ['Oracle', 'Amazon', 'SAP', 'Goldman Sachs'],
    frequency: 'High',
    acceptanceRate: '80%',
    timeLimitMinutes: 15,
    hints: [
      'A - Atomicity (All or nothing), C - Consistency (Schema invariants), I - Isolation (Concurrency control), D - Durability (Write-Ahead Logging / WAL).',
      'B+ Trees store data pointers only at leaf nodes, and leaf nodes are linked sequentially, allowing ultra-fast range queries (`BETWEEN`, `>`, `<`).',
      'A Clustered index defines the physical order of rows on disk (only 1 per table, usually Primary Key), whereas Non-Clustered creates a separate lookup structure.',
    ],
    starterCode: `/**
 * DBMS & SQL Architecture Notes
 *
 * 1. ACID Properties:
 *    - Atomicity: ...
 *    - Consistency: ...
 *    - Isolation: ...
 *    - Durability: ...
 *
 * 2. Indexing Data Structures:
 *    - Why B+ Trees for Disk Blocks: ...
 *    - Clustered vs Non-Clustered Indexes: ...
 */
`,
    language: 'typescript',
    rubricCriteria: [
      'Clear definition and real-world banking example for ACID transactions',
      'B+ Tree structural advantages for block storage and range scans',
      'Clustered vs Non-Clustered index trade-offs',
      'Understanding when NOT to add an index (write-heavy overhead)',
    ],
  },
  {
    id: 'cs-3',
    title: 'What Happens When You Enter a URL in a Browser? (Computer Networks)',
    description:
      'Walk step-by-step through everything that happens from the moment a user types a URL (e.g. `https://example.com`) in the browser address bar and hits Enter until the webpage renders on the screen. Cover DNS resolution, TCP 3-Way Handshake, TLS/SSL handshake, HTTP request/response, and browser DOM/CSSOM rendering.',
    roundType: 'cs-fundamentals',
    difficulty: 'mid',
    category: 'Computer Networks',
    tags: ['Networks', 'DNS', 'TCP/IP', 'HTTPS', 'HTTP', 'Browser'],
    companyTags: ['Google', 'Cisco', 'Paypal', 'Akamai'],
    frequency: 'High',
    acceptanceRate: '79%',
    timeLimitMinutes: 15,
    hints: [
      '1. DNS lookup: Browser cache -> OS cache -> Router cache -> Recursive resolver -> Root/TLD/Authoritative nameservers.',
      '2. Transport Layer: TCP 3-Way Handshake (SYN -> SYN-ACK -> ACK).',
      '3. Security: TLS handshake for HTTPS (certificate verification, asymmetric key exchange, symmetric session key).',
      '4. Application: HTTP GET request, server response (200 OK with HTML).',
      '5. Browser Engine: Parse HTML to DOM tree, CSS to CSSOM, render tree creation, layout/reflow, and paint.',
    ],
    starterCode: `/**
 * Networking & Browser Request Lifecycle
 *
 * 1. DNS Resolution Stages: ...
 * 2. TCP 3-Way Handshake: ...
 * 3. TLS 1.3 Handshake & Encryption: ...
 * 4. HTTP Request / Response: ...
 * 5. Browser Critical Rendering Path (DOM -> CSSOM -> Layout -> Paint): ...
 */
`,
    language: 'typescript',
    rubricCriteria: [
      'Recursive vs Iterative DNS resolution breakdown',
      'TCP 3-way handshake sequence (SYN, SYN-ACK, ACK)',
      'TLS handshake role in encryption and authenticity',
      'Critical rendering path overview',
    ],
  },
  {
    id: 'cs-4',
    title: 'Four Pillars of Object-Oriented Programming (OOPs)',
    description:
      'Explain the four fundamental pillars of Object-Oriented Programming: Encapsulation, Abstraction, Inheritance, and Polymorphism. Provide clean code examples demonstrating Method Overloading (Compile-time) vs Method Overriding (Runtime), and discuss the difference between an Abstract Class and an Interface.',
    roundType: 'cs-fundamentals',
    difficulty: 'easy',
    category: 'Object Oriented Programming',
    tags: ['OOPs', 'Polymorphism', 'Inheritance', 'Abstraction', 'Encapsulation'],
    companyTags: ['Java', 'C++', 'TCS', 'Infosys', 'Wipro', 'Oracle'],
    frequency: 'High',
    acceptanceRate: '94%',
    timeLimitMinutes: 12,
    hints: [
      'Encapsulation: Bundling data and methods into a single unit and restricting direct access (getters/setters, private fields).',
      'Abstraction: Hiding internal complexity and showing only essential features to the outside world.',
      'Inheritance: Mechanism where a child class acquires properties and behaviors from a parent class (code reusability).',
      'Polymorphism: "Many forms" — static/compile-time (overloading) and dynamic/runtime (overriding with virtual functions).',
    ],
    starterCode: `// Write your OOPs demonstration class hierarchy here
abstract class Vehicle {
  // 1. Encapsulation: Private members with accessors
  // 2. Abstraction: Abstract methods
}

class Car extends Vehicle {
  // 3. Inheritance & 4. Polymorphism
}
`,
    language: 'typescript',
    rubricCriteria: [
      'Accurate definitions for all 4 OOP pillars',
      'Compile-time vs Runtime polymorphism distinction',
      'Abstract Class vs Interface comparison',
      'Clear practical code illustration',
    ],
  },

  // =========================================================================
  // 3. PRACTICAL CODING & STRING / ARRAY PROBLEM SOLVING
  // =========================================================================
  {
    id: 'code-1',
    title: 'Longest Substring Without Repeating Characters',
    description:
      'Given a string `s`, find the length of the longest substring without repeating characters using the Sliding Window technique with a Set or Map.',
    roundType: 'coding',
    difficulty: 'medium',
    category: 'Strings & Sliding Window',
    tags: ['Sliding Window', 'Set', 'Two Pointers', 'Strings'],
    companyTags: ['Amazon', 'Microsoft', 'Google', 'Meta'],
    frequency: 'High',
    acceptanceRate: '78%',
    timeLimitMinutes: 15,
    hints: [
      'Use two pointers `left` and `right` representing the current window boundary.',
      'Maintain a Set of characters in the current window. If `s[right]` is already in the set, shrink window from `left` until the duplicate is removed.',
      'Update `maxLength = Math.max(maxLength, right - left + 1)`.',
    ],
    starterCode: `function lengthOfLongestSubstring(s: string): number {
  // TODO: Implement sliding window technique using a Set or Map
  
  return 0;
}`,
    functionName: 'lengthOfLongestSubstring',
    testCases: [
      {
        id: '1',
        input: '"abcabcbb"',
        expectedOutput: '3',
        description: 'Answer is "abc", with length 3',
      },
      {
        id: '2',
        input: '"bbbbb"',
        expectedOutput: '1',
        description: 'Answer is "b", with length 1',
      },
      {
        id: '3',
        input: '"pwwkew"',
        expectedOutput: '3',
        description: 'Answer is "wke", with length 3',
      },
      {
        id: '4',
        input: '""',
        expectedOutput: '0',
        description: 'Empty string',
      },
    ],
    language: 'typescript',
    expectedComplexity: {
      time: 'O(N)',
      space: 'O(min(N, M)) where M is character set size',
    },
    rubricCriteria: [
      'Sliding window boundary adjustments',
      'O(N) time efficiency guarantee',
      'Handling empty string and identical character strings',
    ],
  },
  {
    id: 'code-2',
    title: 'Group Anagrams',
    description:
      'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order. Two strings are anagrams if they contain the same characters with the exact same frequencies.',
    roundType: 'coding',
    difficulty: 'medium',
    category: 'Arrays & Hashing',
    tags: ['Hash Map', 'Anagrams', 'Sorting', 'Strings'],
    companyTags: ['Uber', 'Flipkart', 'Bloomberg', 'Goldman Sachs'],
    frequency: 'High',
    acceptanceRate: '84%',
    timeLimitMinutes: 15,
    hints: [
      'Sort each word alphabetically: words like "eat", "tea", "ate" all become "aet".',
      'Use the sorted word as the key in a Hash Map `Map<string, string[]>` to group matching anagrams.',
    ],
    starterCode: `function groupAnagrams(strs: string[]): string[][] {
  // TODO: Group words by their sorted character signature using a Map
  
  return [];
}`,
    functionName: 'groupAnagrams',
    testCases: [
      {
        id: '1',
        input: '["eat", "tea", "tan", "ate", "nat", "bat"]',
        expectedOutput: '[["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]',
        description: '3 anagram groupings',
      },
      {
        id: '2',
        input: '[""]',
        expectedOutput: '[[""]]',
        description: 'Single empty string',
      },
      {
        id: '3',
        input: '["a"]',
        expectedOutput: '[["a"]]',
        description: 'Single character string',
      },
    ],
    language: 'typescript',
    expectedComplexity: {
      time: 'O(N * K log K) where K is max word length',
      space: 'O(N * K)',
    },
    rubricCriteria: [
      'Correct key canonicalization (sorting or frequency array)',
      'Hash Map grouping logic',
      'Edge cases (empty strings, single characters)',
    ],
  },
  {
    id: 'code-3',
    title: 'Valid Palindrome (Ignoring Alphanumeric)',
    description:
      'A phrase is a palindrome if, after converting all uppercase letters into lowercase letters and removing all non-alphanumeric characters, it reads the same forward and backward. Implement an O(1) space two-pointer solution.',
    roundType: 'coding',
    difficulty: 'easy',
    category: 'Strings & Pointers',
    tags: ['Two Pointers', 'Strings', 'Palindrome'],
    companyTags: ['Meta', 'Microsoft', 'Cognizant', 'TCS'],
    frequency: 'High',
    acceptanceRate: '95%',
    timeLimitMinutes: 10,
    hints: [
      'Initialize `left = 0` and `right = s.length - 1`.',
      'Skip non-alphanumeric characters using helper `isAlphanumeric()`.',
      'Compare `s[left].toLowerCase()` with `s[right].toLowerCase()`. If they mismatch, return false.',
    ],
    starterCode: `function isPalindrome(s: string): boolean {
  // TODO: Implement two-pointer palindrome check in O(1) space
  
  return false;
}`,
    functionName: 'isPalindrome',
    testCases: [
      {
        id: '1',
        input: '"A man, a plan, a canal: Panama"',
        expectedOutput: 'true',
        description: 'Valid phrase with punctuation and spaces',
      },
      {
        id: '2',
        input: '"race a car"',
        expectedOutput: 'false',
        description: 'Not a palindrome',
      },
      {
        id: '3',
        input: '" "',
        expectedOutput: 'true',
        description: 'Single space is an empty palindrome',
      },
    ],
    language: 'typescript',
    expectedComplexity: {
      time: 'O(N)',
      space: 'O(1)',
    },
    rubricCriteria: [
      'Two pointer pointer traversal without building extra modified strings',
      'Correct alphanumeric filtering',
      'Case insensitivity',
    ],
  },
  {
    id: 'code-4',
    title: 'Merge Intervals',
    description:
      'Given an array of `intervals` where `intervals[i] = [starti, endi]`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.',
    roundType: 'coding',
    difficulty: 'medium',
    category: 'Sorting & Intervals',
    tags: ['Intervals', 'Sorting', 'Arrays'],
    companyTags: ['Google', 'Amazon', 'Cisco', 'Salesforce'],
    frequency: 'High',
    acceptanceRate: '80%',
    timeLimitMinutes: 15,
    hints: [
      'First sort the intervals by their start times: `intervals.sort((a, b) => a[0] - b[0])`.',
      'Iterate through sorted intervals: if the current interval starts before or at the end of the previous merged interval, merge them by updating `end = Math.max(prevEnd, currEnd)`.',
    ],
    starterCode: `function merge(intervals: number[][]): number[][] {
  // TODO: Sort intervals by start time and merge overlapping intervals
  
  return [];
}`,
    functionName: 'merge',
    testCases: [
      {
        id: '1',
        input: '[[1, 3], [2, 6], [8, 10], [15, 18]]',
        expectedOutput: '[[1, 6], [8, 10], [15, 18]]',
        description: 'Merging [1, 3] and [2, 6] into [1, 6]',
      },
      {
        id: '2',
        input: '[[1, 4], [4, 5]]',
        expectedOutput: '[[1, 5]]',
        description: 'Intervals overlapping at endpoint 4',
      },
    ],
    language: 'typescript',
    expectedComplexity: {
      time: 'O(N log N) due to sorting',
      space: 'O(N) for output array',
    },
    rubricCriteria: [
      'Sorting by start time',
      'Overlap merging condition `current[0] <= last[1]`',
      'Correct non-overlapping interval push',
    ],
  },

  // =========================================================================
  // 4. APTITUDE & LOGICAL REASONING
  // =========================================================================
  {
    id: 'apt-1',
    title: 'Time & Work: Combined Worker Efficiency',
    description:
      'Person A can complete a software project in 12 days, while Person B can complete the same project in 18 days. If they work together for 4 days, and then Person A leaves, how many more days will Person B take to finish the remaining work?\n\nExplain your step-by-step mathematical reasoning and calculate the exact answer.',
    roundType: 'aptitude',
    difficulty: 'easy',
    category: 'Quantitative Aptitude',
    tags: ['Time and Work', 'Math', 'Problem Solving', 'Fractions'],
    companyTags: ['TCS NQT', 'Infosys InfyTQ', 'Wipro NLTH', 'Cognizant GenC'],
    frequency: 'High',
    acceptanceRate: '85%',
    timeLimitMinutes: 8,
    hints: [
      'Find 1 day work of A = 1/12, and 1 day work of B = 1/18.',
      'Combined 1 day work = 1/12 + 1/18 = 5/36.',
      'Work done in 4 days = 4 * (5/36) = 20/36 = 5/9.',
      'Remaining work = 1 - 5/9 = 4/9. Time taken by B alone = (4/9) / (1/18) = 8 days.',
    ],
    starterCode: `/**
 * Aptitude Problem: Time & Work
 *
 * Calculate step-by-step:
 * 1. 1-day work of Person A = 
 * 2. 1-day work of Person B = 
 * 3. Work completed in 4 days = 
 * 4. Remaining work = 
 * 5. Days taken by Person B = 
 */
`,
    language: 'typescript',
    rubricCriteria: [
      'Correct calculation of individual daily unit work',
      'Accurate total work fraction completed in 4 days',
      'Correct final days computation (8 days)',
      'Clear structured verbal or written derivation',
    ],
  },
  {
    id: 'apt-2',
    title: 'Probability & Combinatorics: Cards & Balls',
    description:
      'A bag contains 5 Red, 4 Blue, and 3 Green marbles. Three marbles are drawn at random without replacement. What is the probability that:\n1. All three marbles are of different colors?\n2. Exactly two marbles are Red?\n\nShow your combinatorial formulas using combinations (nCr).',
    roundType: 'aptitude',
    difficulty: 'mid',
    category: 'Quantitative Aptitude',
    tags: ['Probability', 'Combinatorics', 'Permutations', 'Math'],
    companyTags: ['Accenture', 'Capgemini', 'DXC', 'Deloitte'],
    frequency: 'High',
    acceptanceRate: '78%',
    timeLimitMinutes: 10,
    hints: [
      'Total marbles = 5 + 4 + 3 = 12. Total ways to pick 3 marbles = 12C3 = (12 * 11 * 10) / (3 * 2 * 1) = 220.',
      'Part 1 (All different): Pick 1 Red, 1 Blue, 1 Green = 5C1 * 4C1 * 3C1 = 5 * 4 * 3 = 60. Probability = 60 / 220 = 3/11.',
      'Part 2 (Exactly 2 Red): Pick 2 Red and 1 Non-Red (7 others) = 5C2 * 7C1 = 10 * 7 = 70. Probability = 70 / 220 = 7/22.',
    ],
    starterCode: `/**
 * Aptitude Problem: Probability & Combinatorics
 *
 * 1. Total Sample Space (12C3): ...
 * 2. Case 1 (All 3 distinct colors: 5C1 * 4C1 * 3C1 / 12C3): ...
 * 3. Case 2 (Exactly 2 Red: 5C2 * 7C1 / 12C3): ...
 */
`,
    language: 'typescript',
    rubricCriteria: [
      'Correct total sample space calculation (12C3 = 220)',
      'Correct favorable outcomes for distinct colors (3/11)',
      'Correct favorable outcomes for 2 Red (7/22)',
    ],
  },
  {
    id: 'apt-3',
    title: 'Clock & Angles Problem',
    description:
      'At 3:40 PM, what is the exact angle (both acute and reflex) between the hour hand and the minute hand of a clock?\n\nDerive the formula using the angular speed of the minute hand (6°/min) and hour hand (0.5°/min).',
    roundType: 'aptitude',
    difficulty: 'easy',
    category: 'Logical Reasoning',
    tags: ['Clocks', 'Angles', 'Geometry', 'Speed'],
    companyTags: ['Tech Mahindra', 'Mindtree', 'LTI', 'Hexaware'],
    frequency: 'High',
    acceptanceRate: '90%',
    timeLimitMinutes: 8,
    hints: [
      'Standard formula: Angle = |30*H - (11/2)*M|.',
      'At 3:40: H = 3, M = 40.',
      'Angle = |30(3) - (11/2)(40)| = |90 - 220| = 130°.',
      'Reflex angle = 360° - 130° = 230°.',
    ],
    starterCode: `/**
 * Clock Angle Derivation:
 * Time: 3:40
 * Formula: Angle = |30*H - (11/2)*M|
 *
 * 1. Angle Calculation: ...
 * 2. Acute Angle: ...
 * 3. Reflex Angle: ...
 */
`,
    language: 'typescript',
    rubricCriteria: [
      'Explanation of hour hand movement rate (0.5 deg/min) and minute hand (6 deg/min)',
      'Accurate acute angle calculation (130°)',
      'Accurate reflex angle calculation (230°)',
    ],
  },
  {
    id: 'apt-4',
    title: '25 Horses Puzzle (Classic Logic Puzzle)',
    description:
      'You have 25 horses and a race track with 5 lanes (so max 5 horses can race at once). You have no stopwatch and can only observe the relative finishing order of horses in each race.\n\nWhat is the absolute minimum number of races needed to determine the top 3 fastest horses? Explain every race and elimination logic.',
    roundType: 'aptitude',
    difficulty: 'mid',
    category: 'Logical Reasoning & Puzzles',
    tags: ['Puzzles', 'Brainteaser', 'Elimination Logic', 'Optimization'],
    companyTags: ['Google', 'Goldman Sachs', 'Amazon', 'Morgan Stanley'],
    frequency: 'High',
    acceptanceRate: '75%',
    timeLimitMinutes: 10,
    hints: [
      'Phase 1: Divide 25 horses into 5 groups of 5. Run 5 races (Races 1-5).',
      'Phase 2: Race the 5 winners against each other (Race 6) to rank the group winners A1 > B1 > C1 > D1 > E1. A1 is guaranteed 1st fastest overall!',
      'Phase 3: Eliminate impossible candidates. Only A2, A3, B1, B2, and C1 can compete for 2nd and 3rd place.',
      'Race 7: Race those 5 horses to find 2nd and 3rd place. Total = 7 races!',
    ],
    starterCode: `/**
 * 25 Horses Puzzle Breakdown
 *
 * Phase 1 (Group Stage Races 1 to 5): ...
 * Phase 2 (Winners Race 6): ...
 * Phase 3 (Candidate Elimination Logic): ...
 * Phase 4 (Final Showdown Race 7): ...
 *
 * Total Races = 
 */
`,
    language: 'typescript',
    rubricCriteria: [
      'Clear breakdown of initial 5 group races',
      'Race 6 (winners race) and identification of #1 horse',
      'Elimination reasoning why only 5 specific horses remain for 2nd & 3rd',
      'Final answer of exactly 7 races',
    ],
  },
]
