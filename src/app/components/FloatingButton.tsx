/* eslint-disable import/order */
'use client';

import React, { useState, useEffect } from 'react';
import { Mic, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FloatingMicButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dots, setDots] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsListening(false);
      setIsExpanded(false);
    }
  };

  const startListening = () => {
    setIsListening(true);
    setIsExpanded(true);
  };

  const stopListening = () => setIsListening(false);

  useEffect(() => {
    if (isOpen && isListening) {
      const interval = setInterval(() => {
        setDots(prev => (prev.length === 3 ? '' : prev + '.'));
      }, 500);
      return () => clearInterval(interval);
    }
  }, [isOpen, isListening]);

  return (
    <div className='fixed bottom-4 right-4'>
      <Button
        variant='outline'
        className='z-10 flex h-16 w-16 items-center justify-center rounded-full bg-black p-0 shadow-lg hover:bg-gray-900'
        onClick={togglePopup}
      >
        <Mic className='size-8 text-[#E1FF41]' />
      </Button>
      <div
        className={`
        absolute bottom-0 right-0 
        rounded-xl bg-black text-white shadow-lg
        transition-all duration-500 ease-in-out
        ${
          isOpen
            ? isExpanded
              ? 'h-[40rem] w-[24rem]'
              : 'h-64 w-64'
            : 'h-0 w-0'
        } 
        ${isOpen ? 'opacity-100' : 'opacity-0'}
        overflow-hidden
      `}
      >
        <div className='relative flex h-full flex-col items-center justify-start p-6'>
          <Button
            variant='ghost'
            size='icon'
            className='absolute right-2 top-2 rounded-full text-white hover:bg-gray-800'
            onClick={togglePopup}
          >
            <X className='h-4 w-4' />
          </Button>

          {/* State 1: Initial State */}
          <div
            className={`mb-4 text-center transition-opacity duration-300 ${
              isExpanded ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <h2 className='mb-2 text-xl font-bold'>Voice Assistant</h2>
            <p className='text-sm text-gray-300'>
              Tap and hold to ask anything
            </p>
          </div>

          {/* State 2: Expanded State */}
          {isExpanded && (
            <div className='w-full grow'>
              {/* Add your recording visualization or transcription here */}
            </div>
          )}

          <div className='absolute bottom-4 right-4 flex items-center'>
            <p className='mr-4 text-sm text-gray-300'>
              {isListening ? `Listening${dots}` : 'Ready to listen'}
            </p>
            <Button
              className='relative flex  h-16  items-center justify-center rounded-full bg-[#E1FF41] text-black transition-all
                duration-500 ease-in-out hover:bg-[#c8e639]'
              onMouseDown={startListening}
              onMouseUp={stopListening}
              onTouchStart={startListening}
              onTouchEnd={stopListening}
            >
              <Mic className='h-8 w-8 text-black' />
              {isListening && (
                <svg
                  className='absolute inset-0 h-full w-full'
                  viewBox='0 0 100 100'
                >
                  <circle
                    className='spectrum-circle'
                    cx='50'
                    cy='50'
                    r='48'
                    fill='none'
                    stroke='#000000'
                    strokeWidth='2'
                  />
                  <circle
                    className='spectrum-circle'
                    cx='50'
                    cy='50'
                    r='48'
                    fill='none'
                    stroke='#000000'
                    strokeWidth='2'
                  />
                  <circle
                    className='spectrum-circle'
                    cx='50'
                    cy='50'
                    r='48'
                    fill='none'
                    stroke='#000000'
                    strokeWidth='2'
                  />
                </svg>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingMicButton;
