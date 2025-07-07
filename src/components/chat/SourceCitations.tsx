
import React from 'react';
import { Info } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Source } from '@/types/chat';

interface SourceCitationsProps {
  sources: Source[];
}

const SourceCitations = ({ sources }: SourceCitationsProps) => {
  if (!sources || sources.length === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-muted">
      <span className="text-xs text-muted-foreground">Sources:</span>
      {sources.map((source, index) => (
        <Popover key={source.metadata.chunk_id || index}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0 rounded-full bg-muted hover:bg-muted/80"
            >
              <Info className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="start">
            <div className="space-y-3">
              <h4 className="font-medium text-sm">{source.metadata.source}</h4>
              {source.metadata.page_num && (
                <div className="text-xs text-muted-foreground">
                  Page: {source.metadata.page_num}
                </div>
              )}
              <div className="text-sm leading-relaxed max-h-60 overflow-y-auto">
                {source.text}
              </div>
              <div className="text-xs text-muted-foreground">
                Content Type: {source.metadata.content_type}
              </div>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </div>
  );
};

export default SourceCitations;
