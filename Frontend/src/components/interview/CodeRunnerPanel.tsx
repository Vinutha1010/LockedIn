import { useState, type FC } from 'react'
import {
  Play,
  CheckCircle2,
  XCircle,
  Clock,
  Terminal,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Cpu,
} from 'lucide-react'
import type { TestCase, TestExecutionResult } from '@/types'
import { cn } from '@/lib/utils'

interface CodeRunnerPanelProps {
  testCases?: TestCase[]
  results: TestExecutionResult[]
  isRunning: boolean
  logs: string[]
  totalExecutionTimeMs?: number
  compileError?: string
  onRunCode: () => void
  isExpanded: boolean
  onToggleExpand: () => void
}

export const CodeRunnerPanel: FC<CodeRunnerPanelProps> = ({
  testCases = [],
  results,
  isRunning,
  logs,
  totalExecutionTimeMs,
  compileError,
  onRunCode,
  isExpanded,
  onToggleExpand,
}) => {
  const [activeTab, setActiveTab] = useState<'tests' | 'console'>('tests')
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0)

  const hasRun = results.length > 0 || Boolean(compileError) || logs.length > 0
  const allPassed = results.length > 0 && results.every((r) => r.passed)
  const passedCount = results.filter((r) => r.passed).length
  const currentResult = results[selectedTestCaseIndex]
  const currentTestCase = testCases[selectedTestCaseIndex]

  return (
    <div className="border-t border-slate-800 bg-[#090d16] flex flex-col shrink-0 transition-all duration-200">
      {/* 1. TOP RUNNER HEADER */}
      <div className="h-10 px-4 flex items-center justify-between bg-slate-900/90 border-b border-slate-800/80">
        {/* Left: Tab Switcher & Status Badges */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('tests')}
            className={cn(
              'px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors',
              activeTab === 'tests'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>Test Cases</span>
            {testCases.length > 0 && (
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-700/80 text-slate-300">
                {testCases.length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('console')}
            className={cn(
              'px-2.5 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors',
              activeTab === 'console'
                ? 'bg-slate-800 text-white border border-slate-700'
                : 'text-slate-400 hover:text-slate-200'
            )}
          >
            <Terminal className="w-3.5 h-3.5 text-indigo-400" />
            <span>Console</span>
            {logs.length > 0 && (
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            )}
          </button>

          {/* Quick Result Status */}
          {hasRun && !compileError && results.length > 0 && (
            <div className="hidden sm:flex items-center gap-1.5 ml-2 text-xs font-medium">
              {allPassed ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-950/70 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Passed all {results.length} tests
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-rose-950/70 text-rose-400 border border-rose-500/30 flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {passedCount} of {results.length} passed
                </span>
              )}

              {totalExecutionTimeMs !== undefined && (
                <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3 text-slate-500" />
                  {totalExecutionTimeMs}ms
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2">
          {/* Main Run Code Button */}
          <button
            onClick={onRunCode}
            disabled={isRunning}
            className={cn(
              'px-3.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all',
              isRunning
                ? 'bg-slate-800 text-slate-400 cursor-wait'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/20'
            )}
            title="Run code against test cases (Ctrl + Enter)"
          >
            {isRunning ? (
              <>
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 fill-white" />
                <span>Run Code</span>
              </>
            )}
          </button>

          {/* Expand / Collapse Button */}
          <button
            onClick={onToggleExpand}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            title={isExpanded ? 'Collapse panel' : 'Expand panel'}
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* 2. EXPANDED PANEL CONTENT */}
      {isExpanded && (
        <div className="h-44 p-3.5 overflow-y-auto bg-[#070a11] text-xs font-sans">
          {activeTab === 'tests' ? (
            <div className="flex flex-col h-full space-y-3">
              {/* Test Case Pill Buttons */}
              <div className="flex items-center gap-2 border-b border-slate-800/80 pb-2">
                {testCases.map((tc, idx) => {
                  const res = results[idx]
                  const isSelected = idx === selectedTestCaseIndex
                  return (
                    <button
                      key={tc.id}
                      onClick={() => setSelectedTestCaseIndex(idx)}
                      className={cn(
                        'px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all',
                        isSelected
                          ? 'bg-slate-800 text-white border border-slate-700 shadow-sm'
                          : 'bg-slate-900/60 text-slate-400 hover:text-slate-200 border border-slate-800/60',
                        res && res.passed && 'border-emerald-500/40 text-emerald-300',
                        res && !res.passed && 'border-rose-500/40 text-rose-300'
                      )}
                    >
                      {res ? (
                        res.passed ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5 text-rose-400" />
                        )
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-600" />
                      )}
                      <span>Case {idx + 1}</span>
                    </button>
                  )
                })}

                {testCases.length === 0 && (
                  <span className="text-slate-500 text-xs italic">
                    No predefined unit test cases for this conceptual/system design question. Click Run Code to check syntax and evaluate stdout.
                  </span>
                )}
              </div>

              {/* Selected Test Case Details */}
              {currentTestCase && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1">
                  {/* Input */}
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col">
                    <span className="text-[10px] font-semibold uppercase text-slate-400 mb-1">
                      Input
                    </span>
                    <pre className="text-xs text-cyan-300 font-mono whitespace-pre-wrap overflow-x-auto my-auto">
                      {currentTestCase.input}
                    </pre>
                  </div>

                  {/* Expected Output */}
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col">
                    <span className="text-[10px] font-semibold uppercase text-slate-400 mb-1">
                      Expected Output
                    </span>
                    <pre className="text-xs text-emerald-300 font-mono whitespace-pre-wrap overflow-x-auto my-auto">
                      {currentTestCase.expectedOutput}
                    </pre>
                  </div>

                  {/* Actual Output */}
                  <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800 flex flex-col">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-semibold uppercase text-slate-400">
                        Actual Output
                      </span>
                      {currentResult && (
                        <span className="text-[10px] font-mono text-slate-400">
                          {currentResult.executionTimeMs}ms
                        </span>
                      )}
                    </div>
                    {currentResult ? (
                      currentResult.error ? (
                        <span className="text-xs text-rose-400 font-mono leading-tight my-auto">
                          {currentResult.error}
                        </span>
                      ) : (
                        <pre
                          className={cn(
                            'text-xs font-mono whitespace-pre-wrap overflow-x-auto my-auto',
                            currentResult.passed ? 'text-emerald-300' : 'text-rose-300'
                          )}
                        >
                          {currentResult.actualOutput}
                        </pre>
                      )
                    ) : (
                      <span className="text-slate-500 text-xs italic my-auto">
                        Click "Run Code" to execute
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Compilation / Syntax Error Notice */}
              {compileError && (
                <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span className="font-mono">{compileError}</span>
                </div>
              )}
            </div>
          ) : (
            /* Console Output Tab */
            <div className="h-full flex flex-col space-y-1.5 font-mono text-xs text-slate-300">
              <div className="flex items-center justify-between text-[11px] text-slate-500 border-b border-slate-800/80 pb-1">
                <span>Standard Output (stdout)</span>
                {totalExecutionTimeMs !== undefined && (
                  <span>Runtime: {totalExecutionTimeMs}ms</span>
                )}
              </div>

              <div className="flex-1 overflow-y-auto space-y-1 pt-1">
                {logs.length === 0 ? (
                  <p className="text-slate-500 italic">No output logged yet. Use console.log() to debug values.</p>
                ) : (
                  logs.map((log, i) => (
                    <div
                      key={i}
                      className={cn(
                        'leading-relaxed',
                        log.startsWith('[Error]') || log.startsWith('Compilation Error')
                          ? 'text-rose-400'
                          : log.startsWith('[Warn]')
                          ? 'text-amber-400'
                          : 'text-slate-200'
                      )}
                    >
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
