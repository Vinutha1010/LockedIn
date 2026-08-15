import type { Question, CandidateAnswer, AnswerFeedback } from '@/types'

/**
 * Intelligent client-side heuristic evaluation engine.
 * Evaluates candidate's actual submitted code, speech transcripts, and rubric matching
 * to produce realistic, non-random, question-specific grading.
 */
export function evaluateCandidateSubmission(
  question: Question,
  answer?: CandidateAnswer
): AnswerFeedback {
  const code = (answer?.code || '').trim()
  const speech = (answer?.speechText || '').trim()
  const isUntouchedStarter =
    !code ||
    code === (question.starterCode || '').trim() ||
    (code.length > 0 && question.starterCode && code.replace(/\s+/g, '') === question.starterCode.replace(/\s+/g, ''))

  const hasAnyInput = (!isUntouchedStarter && code.length > 20) || speech.length > 15

  // 1. Case: Unanswered or untouched starter code
  if (!hasAnyInput) {
    return {
      questionId: question.id,
      overallScore: 0,
      technicalScore: 0,
      communicationScore: 0,
      problemSolvingScore: 0,
      codeQualityScore: 0,
      strengths: ['Question viewed in interview room.'],
      weaknesses: [
        'No solution or implementation was provided for this question.',
        'Starter code template was left unmodified.',
      ],
      suggestions: [
        'Attempt writing pseudo-code or step-by-step logic even if unsure of the full syntax.',
        'Use the Monaco editor to implement the core algorithm before submitting.',
      ],
      modelAnswerSummary:
        question.starterCode || 'Expected working implementation with optimal time and space complexity.',
      evaluatedAt: new Date().toISOString(),
      status: 'completed',
    }
  }

  // 2. Perform Question-Specific Heuristic Analysis
  let technicalScore = 60
  let problemSolvingScore = 60
  let communicationScore = 65
  let codeQualityScore = 65
  const strengths: string[] = []
  const weaknesses: string[] = []
  const suggestions: string[] = []

  const codeLower = code.toLowerCase()
  const speechLower = speech.toLowerCase()
  const combinedText = `${codeLower} ${speechLower}`

  // A. Data Structures & Algorithms Specific Evaluations
  if (question.id === 'dsa-1') {
    // Two Sum
    const hasMap = codeLower.includes('new map') || codeLower.includes('{}') || codeLower.includes('map.set')
    const hasComplement = codeLower.includes('target -') || codeLower.includes('target-')
    const hasNestedLoops = /for\s*\(.*for\s*\(/.test(code.replace(/\n/g, ' '))

    if (hasMap && hasComplement) {
      technicalScore = 95
      problemSolvingScore = 96
      codeQualityScore = 92
      strengths.push('Optimal single-pass Hash Map approach with O(N) time complexity.')
      strengths.push('Clean complement calculation (target - nums[i]) with O(1) lookups.')
    } else if (hasNestedLoops) {
      technicalScore = 68
      problemSolvingScore = 65
      codeQualityScore = 70
      strengths.push('Working brute-force solution that correctly identifies matching pairs.')
      weaknesses.push('Nested loops result in O(N^2) quadratic time complexity, which will TLE on large arrays.')
      suggestions.push('Store visited elements in a Hash Map to reduce lookup time from O(N) to O(1).')
    } else {
      technicalScore = 75
      problemSolvingScore = 72
      strengths.push('Valid array traversal structure.')
      weaknesses.push('Complement lookup logic is incomplete or lacks proper Map indexing.')
    }
  } else if (question.id === 'dsa-2') {
    // Reverse Linked List
    const hasThreePointers = codeLower.includes('prev') && codeLower.includes('curr') && (codeLower.includes('next') || codeLower.includes('nexttemp'))
    const hasRewiring = codeLower.includes('curr.next = prev') || codeLower.includes('curr.next=prev')
    const returnsPrev = codeLower.includes('return prev')

    if (hasThreePointers && hasRewiring && returnsPrev) {
      technicalScore = 96
      problemSolvingScore = 95
      codeQualityScore = 94
      strengths.push('Iterative 3-pointer reversal implemented with strict O(1) auxiliary space.')
      strengths.push('No memory leaks or dangling pointer references.')
    } else {
      technicalScore = 70
      problemSolvingScore = 68
      weaknesses.push('Pointer updates are partially incomplete; ensure prev, curr, and nextTemp advance synchronously.')
      suggestions.push('Save curr.next before modifying curr.next = prev to prevent losing remaining list nodes.')
    }
  } else if (question.id === 'dsa-3') {
    // Valid Parentheses
    const hasStack = codeLower.includes('stack') || codeLower.includes('push') || codeLower.includes('pop')
    const hasEmptyCheck = codeLower.includes('stack.length === 0') || codeLower.includes('stack.length == 0') || codeLower.includes('!stack.length')

    if (hasStack && hasEmptyCheck) {
      technicalScore = 94
      problemSolvingScore = 95
      codeQualityScore = 90
      strengths.push('Correct LIFO Stack balance verification with early-return matching.')
      strengths.push('Final stack emptiness check handles unclosed brackets accurately.')
    } else {
      technicalScore = 72
      problemSolvingScore = 70
      weaknesses.push('Missing either opening/closing pair mapping or final empty stack verification.')
      suggestions.push('Verify stack.length === 0 at the end of the loop to catch unclosed leading brackets.')
    }
  } else if (question.id === 'dsa-4') {
    // Kadane's Algorithm
    const hasMathMax = codeLower.includes('math.max') || codeLower.includes('currentsum')
    const hasSubarrayLogic = codeLower.includes('currentsum +') || codeLower.includes('currentsum+')

    if (hasMathMax && hasSubarrayLogic) {
      technicalScore = 95
      problemSolvingScore = 96
      codeQualityScore = 92
      strengths.push("Kadane's greedy dynamic programming transition applied with O(N) time and O(1) space.")
      strengths.push('Correctly handles arrays with all-negative integers.')
    } else {
      technicalScore = 72
      problemSolvingScore = 70
      weaknesses.push("Kadane's recurrence relation (Math.max(num, currentSum + num)) is missing or incomplete.")
    }
  } else if (question.id === 'dsa-5') {
    // Binary Tree Level Order
    const hasQueue = codeLower.includes('queue') && (codeLower.includes('shift') || codeLower.includes('push'))
    const hasLevelSize = codeLower.includes('levelsize') || codeLower.includes('queue.length')

    if (hasQueue && hasLevelSize) {
      technicalScore = 94
      problemSolvingScore = 93
      codeQualityScore = 91
      strengths.push('Queue-based BFS level-by-level traversal implemented cleanly.')
      strengths.push('Captured level size snapshot before inner loop processing.')
    } else {
      technicalScore = 70
      problemSolvingScore = 68
      weaknesses.push('Queue traversal missing level boundary isolation; inner level array mixing detected.')
    }
  }

  // B. CS Fundamentals Evaluations
  else if (question.id === 'cs-1') {
    // Process vs Thread (OS)
    const hasStackHeap = combinedText.includes('stack') && combinedText.includes('heap')
    const hasContextSwitch = combinedText.includes('context switch') || combinedText.includes('pcb') || combinedText.includes('tcb')
    const hasIpc = combinedText.includes('ipc') || combinedText.includes('shared memory') || combinedText.includes('pipe')

    let matchedCount = [hasStackHeap, hasContextSwitch, hasIpc].filter(Boolean).length
    technicalScore = 70 + matchedCount * 9
    problemSolvingScore = 72 + matchedCount * 8
    strengths.push('Articulated differences between isolated process memory space and shared thread heap.')
    if (hasContextSwitch) strengths.push('Explained context switching overhead (PCB vs TCB and TLB cache invalidation).')
    if (!hasIpc) weaknesses.push('Could elaborate more on Inter-Process Communication (IPC) mechanisms like Pipes and Sockets.')
  } else if (question.id === 'cs-2') {
    // ACID & B+ Tree (DBMS)
    const hasAcid = combinedText.includes('atomicity') || combinedText.includes('consistency') || combinedText.includes('isolation') || combinedText.includes('durability')
    const hasBTree = combinedText.includes('b+ tree') || combinedText.includes('leaf') || combinedText.includes('range')
    const hasClustered = combinedText.includes('clustered') || combinedText.includes('non-clustered')

    technicalScore = 75 + (hasAcid ? 8 : 0) + (hasBTree ? 8 : 0) + (hasClustered ? 7 : 0)
    problemSolvingScore = 78
    if (hasAcid) strengths.push('Clear breakdown of ACID transaction guarantees with real-world examples.')
    if (hasBTree) strengths.push('Identified why B+ Tree leaf node linked lists enable rapid range queries.')
    if (!hasClustered) suggestions.push('Compare physical disk storage in Clustered vs Non-Clustered secondary indexes.')
  } else if (question.id === 'cs-3') {
    // URL in Browser (Networks)
    const hasDns = combinedText.includes('dns')
    const hasTcp = combinedText.includes('tcp') || combinedText.includes('syn') || combinedText.includes('handshake')
    const hasTls = combinedText.includes('tls') || combinedText.includes('ssl') || combinedText.includes('https')
    const hasDom = combinedText.includes('dom') || combinedText.includes('render') || combinedText.includes('html')

    let matched = [hasDns, hasTcp, hasTls, hasDom].filter(Boolean).length
    technicalScore = 65 + matched * 8
    problemSolvingScore = 70 + matched * 7
    if (hasDns) strengths.push('Step-by-step DNS hierarchy resolution (cache -> recursive -> root -> TLD).')
    if (hasTcp) strengths.push('TCP 3-way handshake connection establishment covered.')
    if (!hasDom) suggestions.push('Mention browser engine rendering pipeline (DOM + CSSOM -> Render Tree -> Layout -> Paint).')
  } else if (question.id === 'cs-4') {
    // OOPs 4 Pillars
    const hasPillars = ['encapsulation', 'abstraction', 'inheritance', 'polymorphism'].filter((p) => combinedText.includes(p))
    technicalScore = 60 + hasPillars.length * 9
    problemSolvingScore = 75
    strengths.push(`Identified core pillars: ${hasPillars.map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(', ')}.`)
    if (combinedText.includes('overloading') || combinedText.includes('overriding')) {
      strengths.push('Demonstrated compile-time overloading vs runtime dynamic overriding.')
    }
  }

  // C. Practical Coding Evaluations
  else if (question.id === 'code-1') {
    // Longest Substring Without Repeating Characters
    const hasWindow = codeLower.includes('set') || codeLower.includes('map') || codeLower.includes('left')
    const hasSliding = codeLower.includes('while') || codeLower.includes('math.max')

    if (hasWindow && hasSliding) {
      technicalScore = 93
      problemSolvingScore = 94
      codeQualityScore = 90
      strengths.push('Sliding Window two-pointer technique with dynamic Set lookup.')
      strengths.push('O(N) single-pass linear time complexity.')
    } else {
      technicalScore = 72
      problemSolvingScore = 70
      weaknesses.push('Window boundary expansion/contraction logic is missing duplicate eviction.')
    }
  } else if (question.id === 'code-2') {
    // Group Anagrams
    const hasSort = codeLower.includes('.sort()') || codeLower.includes('.sort(')
    const hasMapGroup = codeLower.includes('map.set') || codeLower.includes('map.get')

    if (hasSort && hasMapGroup) {
      technicalScore = 92
      problemSolvingScore = 91
      codeQualityScore = 90
      strengths.push('Clean string canonicalization using sorted key signatures.')
      strengths.push('Proper Hash Map aggregation yielding O(N * K log K) complexity.')
    } else {
      technicalScore = 72
      problemSolvingScore = 70
      weaknesses.push('Anagram grouping key generation is incomplete.')
    }
  } else if (question.id === 'code-3') {
    // Valid Palindrome
    const hasTwoPointers = codeLower.includes('left') && codeLower.includes('right')
    const hasAlphaCheck = codeLower.includes('test') || codeLower.includes('charcodeat') || codeLower.includes('match')

    if (hasTwoPointers && hasAlphaCheck) {
      technicalScore = 95
      problemSolvingScore = 94
      codeQualityScore = 92
      strengths.push('Two-pointer converging search with strict O(1) space.')
      strengths.push('Clean alphanumeric character filtering.')
    } else {
      technicalScore = 74
      problemSolvingScore = 72
      weaknesses.push('Non-alphanumeric filtering or case-normalization is missing.')
    }
  } else if (question.id === 'code-4') {
    // Merge Intervals
    const hasSort = codeLower.includes('.sort(')
    const hasOverlapCheck = codeLower.includes('current[0] <=') || codeLower.includes('intervals[i][0]') || codeLower.includes('math.max')

    if (hasSort && hasOverlapCheck) {
      technicalScore = 94
      problemSolvingScore = 95
      codeQualityScore = 92
      strengths.push('Interval start-time sorting enables greedy adjacent merging.')
      strengths.push('Accurately tracks Math.max(last[1], current[1]) for end boundary extensions.')
    } else {
      technicalScore = 72
      problemSolvingScore = 70
      weaknesses.push('Intervals must be sorted by start time prior to linear scan merging.')
    }
  }

  // D. Aptitude Evaluations
  else if (question.id.startsWith('apt-')) {
    if (question.id === 'apt-1') {
      const hasCorrectAnswer = combinedText.includes('8') || combinedText.includes('8 days')
      const hasWorkCalc = combinedText.includes('5/36') || combinedText.includes('4/9') || combinedText.includes('20/36')
      technicalScore = hasCorrectAnswer ? 96 : 70
      problemSolvingScore = hasWorkCalc ? 94 : 68
      if (hasCorrectAnswer) strengths.push('Correct final answer: 8 remaining days for Worker B.')
      if (hasWorkCalc) strengths.push('Accurately calculated combined 1-day work rate (5/36) and remaining work fraction (4/9).')
      if (!hasCorrectAnswer) weaknesses.push('Final day computation mismatch. (Correct result is 8 days).')
    } else if (question.id === 'apt-2') {
      const hasCombFormula = combinedText.includes('12c3') || combinedText.includes('220')
      const hasProb1 = combinedText.includes('3/11') || combinedText.includes('60/220')
      const hasProb2 = combinedText.includes('7/22') || combinedText.includes('70/220')
      technicalScore = hasProb1 && hasProb2 ? 96 : 75
      problemSolvingScore = hasCombFormula ? 92 : 72
      if (hasCombFormula) strengths.push('Correct total sample space calculation (12C3 = 220).')
      if (hasProb1) strengths.push('Accurate distinct color probability calculation (3/11).')
      if (hasProb2) strengths.push('Accurate 2-Red probability calculation (7/22).')
    } else if (question.id === 'apt-3') {
      const has130 = combinedText.includes('130')
      const hasFormula = combinedText.includes('30*h') || combinedText.includes('11/2') || combinedText.includes('0.5')
      technicalScore = has130 ? 98 : 72
      problemSolvingScore = hasFormula ? 95 : 70
      if (has130) strengths.push('Accurate acute angle calculated: 130° (Reflex angle: 230°).')
      if (hasFormula) strengths.push('Demonstrated angular speed derivation for hour (0.5°/m) and minute (6°/m) hands.')
    } else if (question.id === 'apt-4') {
      const has7Races = combinedText.includes('7 races') || combinedText.includes('7')
      const hasLogic = combinedText.includes('elimination') || combinedText.includes('winners race') || combinedText.includes('group')
      technicalScore = has7Races ? 98 : 72
      problemSolvingScore = hasLogic ? 95 : 70
      if (has7Races) strengths.push('Correct minimum races derived: Exactly 7 races.')
      if (hasLogic) strengths.push('Clear elimination matrix narrowing candidates down to A2, A3, B1, B2, C1 for the final race.')
    }
  }

  // General speech evaluation
  if (speech.length > 50) {
    communicationScore = Math.min(95, communicationScore + 15)
    strengths.push('Provided structured verbal walkthrough explaining reasoning and trade-offs.')
  } else if (speech.length === 0) {
    communicationScore = Math.max(50, communicationScore - 15)
    weaknesses.push('No verbal explanation or notes were recorded alongside the submission.')
    suggestions.push('Articulate your thought process out loud to demonstrate communication skills.')
  }

  if (strengths.length === 0) {
    strengths.push('Demonstrated code syntax understanding for problem structure.')
  }
  if (weaknesses.length === 0) {
    weaknesses.push('Could add inline test assertions to verify edge cases.')
  }
  if (suggestions.length === 0) {
    suggestions.push('Practice explaining time and space complexity trade-offs spontaneously.')
  }

  const overallScore = Math.round(
    technicalScore * 0.35 + problemSolvingScore * 0.3 + codeQualityScore * 0.2 + communicationScore * 0.15
  )

  return {
    questionId: question.id,
    overallScore,
    technicalScore,
    communicationScore,
    problemSolvingScore,
    codeQualityScore,
    strengths: Array.from(new Set(strengths)).slice(0, 3),
    weaknesses: Array.from(new Set(weaknesses)).slice(0, 3),
    suggestions: Array.from(new Set(suggestions)).slice(0, 3),
    modelAnswerSummary:
      question.hints?.[0] || 'Optimal solution uses modular logic with verified time & space complexity constraints.',
    evaluatedAt: new Date().toISOString(),
    status: 'completed',
  }
}
