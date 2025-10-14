'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodeBlock({ code, language = 'clarity', showLineNumbers = true }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.trim().split('\n');

  return (
    <div className="relative group">
      <div className="absolute top-3 right-3 z-10">
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="bg-gray-800/50 backdrop-blur-sm border-gray-700 text-gray-300 hover:bg-gray-700"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-1" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-2xl border border-gray-800">
        <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="ml-2 text-sm text-gray-400">{language}</span>
        </div>

        <div className="overflow-x-auto">
          <pre className="p-4 text-sm">
            <code className="text-gray-300 font-mono">
              {lines.map((line, i) => (
                <div key={i} className="flex">
                  {showLineNumbers && (
                    <span className="select-none text-gray-600 mr-4 text-right" style={{ minWidth: '2em' }}>
                      {i + 1}
                    </span>
                  )}
                  <span className="flex-1">{line || ' '}</span>
                </div>
              ))}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
}
