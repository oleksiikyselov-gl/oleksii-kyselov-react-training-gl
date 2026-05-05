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
    <div className="relative w-full" ref={containerRef}>
      <Button
        type="button"
        variant={'outline'}
        className={cn(
          'w-full justify-start text-left font-normal h-8 px-2.5 py-1 text-sm',
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
            defaultMonth={selected}
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
                'px-2 py-1 rounded-lg border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer transition-colors hover:bg-accent',
              dropdown_month: 'font-medium',
              dropdown_year: 'font-medium',
              cell: 'p-1',
              caption_label: 'hidden',
              months: 'overflow-y-auto overflow-x-hidden',
              day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md',
              day_selected:
                'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
              day_today: 'bg-accent text-accent-foreground',
            }}
            className="w-full"
          />
        </div>
      )}
    </div>
  );
}
