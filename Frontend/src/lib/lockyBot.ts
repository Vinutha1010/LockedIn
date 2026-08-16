import type { Question } from '@/types'

export interface LockyMessage {
  id: string
  sender: 'locky' | 'user'
  text: string
  timestamp: string
  quickAction?: string
}

interface LockyContext {
  currentQuestion?: Question
  activeCode?: string
  activeLanguage?: string
  candidateName?: string
  targetRole?: string
  timeRemainingMinutes?: number
}

/**
 * Intelligent client-side AI conversation engine for Locky.
 * Generates context-aware, witty, encouraging, and accurate interview coaching responses.
 */
export function generateLockyResponse(
  userQuery: string,
  context: LockyContext
): string {
  const queryLower = userQuery.toLowerCase()
  const q = context.currentQuestion
  const code = (context.activeCode || '').trim()
  const lang = context.activeLanguage || 'typescript'
  const name = context.candidateName || 'there'

  // 1. Quick Action / Direct Intent: "debug", "review my code"
  if (queryLower.includes('debug') || queryLower.includes('review') || queryLower.includes('check my code') || queryLower.includes('find bug')) {
    if (!code || code.length < 15) {
      return `Hey ${name}! 🔒 Looks like the code editor is still mostly empty. Start writing your logic or pseudo-code, and I'll gladly inspect it for edge cases and syntax bugs!`
    }

    if (q?.id === 'dsa-1') {
      // Two Sum
      const hasMap = code.toLowerCase().includes('map') || code.toLowerCase().includes('hashmap') || code.toLowerCase().includes('{}')
      const hasComplement = code.toLowerCase().includes('target -') || code.toLowerCase().includes('target-') || code.toLowerCase().includes('needed')
      const hasNestedLoops = /for.*for/.test(code.replace(/\n/g, ' '))

      if (hasNestedLoops && !hasMap) {
        return `🔍 **Locky's Code Inspection:**
I notice you're using **nested loops** ($O(N^2)$ brute force).

✨ **Optimization Tip:**
Instead of re-scanning the array for each number, can you store numbers in a **Hash Map** as you iterate?
- For each number \`nums[i]\`, calculate \`complement = target - nums[i]\`.
- Check if \`map.containsKey(complement)\` in $O(1)$ time!`
      }

      if (hasMap && hasComplement) {
        return `🌟 **Locky's Review:**
Awesome job! Your single-pass Hash Map approach is optimal ($O(N)$ time and $O(N)$ space).

⚠️ **Edge case to double-check:**
Make sure you check for the complement in the map **before** inserting the current element so you don't use the same element twice (e.g. \`[3, 3]\` with target \`6\`).`
      }

      return `🔍 **Locky's Hint:**
For Two Sum, make sure you store \`{ numberValue -> index }\` in your map and check \`target - nums[i]\` on each step. Press **Run Tests** (\`Ctrl + Enter\`) to test it!`
    }

    if (q?.id === 'dsa-3') {
      // Valid Parentheses
      return `🔍 **Locky's Stack Check:**
For **Valid Parentheses**:
1. When you see an opening bracket \`(\`, \`{\`, \`[\`, push it onto your stack.
2. When you see a closing bracket, verify the stack is **not empty** and that \`pop()\` matches the bracket type.
3. Don't forget the final check: \`return stack.isEmpty()\` at the very end!`
    }

    if (q?.id === 'dsa-4') {
      // Kadane's
      return `🔍 **Locky's Kadane Check:**
At each index \`i\`, the recurrence relation is:
\`currentSum = Math.max(nums[i], currentSum + nums[i])\`
\`maxSum = Math.max(maxSum, currentSum)\`

💡 **Edge Case:** Initializing \`maxSum = 0\` can fail when all numbers are negative (e.g., \`[-2, -1]\`). Always initialize \`maxSum = nums[0]\`!`
    }

    return `🔍 **Locky's Quick Code Check:**
Your code structure in **${lang}** looks clean! Here are 3 quick things interviewers check:
1. **Edge cases:** Empty arrays, single-element inputs, or null values.
2. **Complexity:** Are there any unintentional $O(N^2)$ operations inside loops?
3. **Variable naming:** Clear names like \`complement\` or \`leftPtr\` make communication shine!`
  }

  // 2. Quick Action: "hint", "give me a hint"
  if (queryLower.includes('hint') || queryLower.includes('stuck') || queryLower.includes('help')) {
    if (q?.hints && q.hints.length > 0) {
      return `💡 **Locky's Socratic Hint for "${q.title}":**\n\n> *"${q.hints[0]}"*\n\nThink about what data structure lets you do fast lookups in $O(1)$ time, or how pointers can eliminate redundant passes!`
    }
    return `💡 **Locky's General Strategy Hint:**
1. State the **brute force** approach first ($O(N^2)$).
2. Identify the bottleneck (e.g., repeated lookups or sorting).
3. Ask yourself: *"Can a Hash Map, Two Pointers, or Binary Search reduce this to $O(N)$ or $O(N \\log N)$?"*`
  }

  // 3. Quick Action: "complexity", "big o", "time complexity"
  if (queryLower.includes('complexity') || queryLower.includes('big o') || queryLower.includes('runtime') || queryLower.includes('space')) {
    if (q?.expectedComplexity) {
      return `⚡ **Expected Complexity for "${q.title}":**
- **Time Complexity:** \`${q.expectedComplexity.time}\`
- **Space Complexity:** \`${q.expectedComplexity.space}\`

🎯 **Interview Tip:**
Always state your complexities before you write the final return statement. Interviewers love hearing: *"This runs in linear time $O(N)$ with $O(N)$ extra space for the hash table."*`
    }
    return `⚡ **Big-O Complexity Quick Guide:**
- **$O(1)$:** Hash Map lookup, array indexing, pointer shift.
- **$O(\\log N)$:** Binary search, balanced BST operations.
- **$O(N)$:** Single loop traversal, sliding window, BFS/DFS.
- **$O(N \\log N)$:** Efficient sorting (MergeSort, QuickSort, TimSort).
- **$O(N^2)$:** Nested loops over the same array.`
  }

  // 4. Quick Action: "star", "behavioral", "leadership"
  if (queryLower.includes('star') || queryLower.includes('behavioral') || queryLower.includes('situation') || queryLower.includes('leadership')) {
    return `🗣️ **Locky's STAR Method Masterclass:**

1. **📍 Situation (15-20s):** Set the stage. *"At my previous company, our payment microservice experienced 40% latency spikes during flash sales..."*
2. **🎯 Task (15-20s):** The mission. *"I was tasked with diagnosing the bottleneck and ensuring sub-100ms response times without exceeding budget."*
3. **🛠️ Action (60-90s):** *Your* specific contribution. *"I profiled Redis queries, identified a missing cache index, and implemented a distributed token bucket rate limiter with atomic Lua scripts..."*
4. **📊 Result (20-30s):** Concrete metrics. *"We reduced p99 latency by 72% and maintained 99.99% uptime during Black Friday with zero downtime!"*`
  }

  // 5. System Design / Architecture Questions
  if (queryLower.includes('system design') || queryLower.includes('rate limit') || queryLower.includes('cache') || queryLower.includes('scale')) {
    return `🌐 **Locky's System Design Framework:**
1. **Scope & Scale:** Clarify DAU, read:write ratio, and throughput (QPS).
2. **High-Level Diagram:** Client -> CDN/DNS -> API Gateway -> Load Balancer -> Stateless App Services -> Cache (Redis) -> DB (Sharded Postgres/DynamoDB).
3. **Deep Dive Bottlenecks:** Address single points of failure (SPOF), replication lag, cache eviction (LRU), and consistency (CAP theorem).`
  }

  // 6. Greetings & Chit-chat
  if (queryLower.includes('hello') || queryLower.includes('hi') || queryLower.includes('hey') || queryLower === 'locky') {
    return `Hey ${name}! 🔒 Locky here, your AI interview copilot!
I'm right by your side to help you lock in this mock interview!

Feel free to ask me to:
- 🔍 **"Review my code"** for potential bugs
- 💡 **"Give me a hint"** if you get stuck
- ⚡ **"Explain time complexity"** for this problem
- 🗣️ **"Help with STAR method"** for behavioral answers!`
  }

  // 7. General AI fallback response
  return `🤖 **Locky's Tip:**
That's a great interview question! When tackling **"${userQuery}"**:

1. **Clarify Constraints:** Make sure to confirm input bounds, nullability, and scale.
2. **Communicate Aloud:** Walk the interviewer through your thought process step by step.
3. **Verify:** Walk through a test case (e.g. \`[2, 7, 11, 15]\` with target \`9\`) before declaring the code ready!

Need a specific hint, code review, or complexity check? Just let me know! 🚀`
}
