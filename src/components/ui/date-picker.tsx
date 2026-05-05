import { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import { DayPicker } from 'react-day-picker';
import 'react-day-picker/style.css';

interface DatePickerProps {
  selected?: Date;
  onSelect: (date: Date | undefined) => void;
  className?: string;
}

export function DatePicker({ selected, onSelect, className }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
      document.addEventListener('keydown', handleEscapeKey);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen]);

  return (
    <div className="relative w-full max-w-80" ref={containerRef}>
      <Button
        type="button"
        variant={'outline'}
        className={cn(
          'w-full justify-start text-left font-normal h-10',
          !selected && 'text-muted-foreground',
          className
        )}
        onClick={e => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {selected ? format(selected, 'PPP') : <span>Pick a date</span>}
      </Button>
      {isOpen && (
        <div className="absolute top-full mt-2 z-50 bg-background border border-border rounded-xl shadow-xl p-4 w-full overflow-x-hidden">
          <DayPicker
            mode="single"
            selected={selected}
            month={selected}
            onSelect={date => {
              onSelect(date);
              setIsOpen(false);
            }}
            autoFocus
            captionLayout="dropdown"
            startMonth={new Date(1930, 0)}
            endMonth={new Date()}
            disabled={{ after: new Date() }}
            classNames={{
              caption_dropdowns: 'flex gap-2 justify-center items-center',
              dropdown:
                'p-1 rounded-md border border-border bg-background text-sm',
              dropdown_month: 'font-medium',
              dropdown_year: 'font-medium',
              cell: 'p-1',
              caption_label: 'hidden',
              months: 'overflow-y-auto overflow-x-hidden',
            }}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
