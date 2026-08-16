import type { Question } from '@/types'

/**
 * Generates language-specific starter boilerplate for any question and language.
 */
export function getStarterCodeForLanguage(
  question: Question,
  language: string
): string {
  if (question.languageStarterCodes && question.languageStarterCodes[language]) {
    return question.languageStarterCodes[language]
  }

  const fn = question.functionName || 'solution'

  switch (language.toLowerCase()) {
    case 'java':
      if (question.id === 'dsa-1') {
        return `import java.util.*;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        // TODO: Implement solution
        return new int[]{};
    }
}`
      }
      if (question.id === 'dsa-2') {
        return `class ListNode {
    int val;
    ListNode next;
    ListNode(int val) { this.val = val; }
}

class Solution {
    public ListNode reverseList(ListNode head) {
        // TODO: Implement solution
        return null;
    }
}`
      }
      if (question.id === 'dsa-3') {
        return `import java.util.*;

class Solution {
    public boolean isValidParentheses(String s) {
        // TODO: Implement solution
        return false;
    }
}`
      }
      if (question.id === 'dsa-4') {
        return `class Solution {
    public int maxSubArray(int[] nums) {
        // TODO: Implement solution
        return 0;
    }
}`
      }
      if (question.id === 'code-1') {
        return `import java.util.*;

class Solution {
    public int lengthOfLongestSubstring(String s) {
        // TODO: Implement solution
        return 0;
    }
}`
      }
      if (question.id === 'code-2') {
        return `import java.util.*;

class Solution {
    public List<List<String>> groupAnagrams(String[] strs) {
        // TODO: Implement solution
        return new ArrayList<>();
    }
}`
      }
      if (question.id === 'code-3') {
        return `class Solution {
    public boolean isPalindrome(String s) {
        // TODO: Implement solution
        return false;
    }
}`
      }
      if (question.id === 'code-4') {
        return `import java.util.*;

class Solution {
    public int[][] merge(int[][] intervals) {
        // TODO: Implement solution
        return new int[][]{};
    }
}`
      }
      return `import java.util.*;

class Solution {
    public void ${fn}() {
        // TODO: Write your Java solution here
    }
}`

    case 'python':
      if (question.id === 'dsa-1') {
        return `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # TODO: Implement solution
        return []
`
      }
      if (question.id === 'dsa-3') {
        return `class Solution:
    def isValidParentheses(self, s: str) -> bool:
        # TODO: Implement solution
        return False
`
      }
      if (question.id === 'dsa-4') {
        return `class Solution:
    def maxSubArray(self, nums: list[int]) -> int:
        # TODO: Implement solution
        return 0
`
      }
      if (question.id === 'code-1') {
        return `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # TODO: Implement solution
        return 0
`
      }
      if (question.id === 'code-3') {
        return `class Solution:
    def isPalindrome(self, s: str) -> bool:
        # TODO: Implement solution
        return False
`
      }
      return `class Solution:
    def ${fn}(self) -> None:
        # TODO: Write your Python solution here
        pass
`

    case 'cpp':
      if (question.id === 'dsa-1') {
        return `#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        // TODO: Implement solution
        return {};
    }
};`
      }
      if (question.id === 'dsa-3') {
        return `#include <string>
#include <stack>
using namespace std;

class Solution {
public:
    bool isValidParentheses(string s) {
        // TODO: Implement solution
        return false;
    }
};`
      }
      if (question.id === 'dsa-4') {
        return `#include <vector>
#include <algorithm>
using namespace std;

class Solution {
public:
    int maxSubArray(vector<int>& nums) {
        // TODO: Implement solution
        return 0;
    }
};`
      }
      return `#include <iostream>
#include <vector>
using namespace std;

class Solution {
public:
    void ${fn}() {
        // TODO: Write your C++ solution here
    }
};`

    case 'javascript':
    case 'typescript':
    default:
      return question.starterCode || `function ${fn}() {\n  // TODO: Write your solution here\n}`
  }
}
