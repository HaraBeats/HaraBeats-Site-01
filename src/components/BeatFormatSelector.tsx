import type { BeatFormat } from '../types';

interface BeatFormatSelectorProps {
  formats: BeatFormat[];
  selectedFormat?: BeatFormat;
  onSelect: (format: BeatFormat) => void;
}

export default function BeatFormatSelector({ 
  formats, 
  selectedFormat, 
  onSelect 
}: BeatFormatSelectorProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-medium text-sm text-gray-300">Select Format</h3>
      <div className="grid gap-2">
        {formats.map((format) => (
          <button
            key={format.type}
            onClick={() => onSelect(format)}
            className={`flex justify-between items-center p-3 rounded-md border transition-all ${
              selectedFormat?.type === format.type
                ? 'border-purple-500 bg-purple-500 bg-opacity-10'
                : 'border-gray-700 hover:border-purple-400'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className="text-left">
                <p className="font-medium">
                  {format.type.toUpperCase()}
                  {format.quality && ` - ${format.quality}`}
                </p>
                <p className="text-sm text-gray-400">
                  {format.type === 'stems' ? 'Individual Track Stems' : 
                   format.type === 'wav' ? 'Uncompressed Audio' : 
                   'Compressed Audio'}
                </p>
              </div>
            </div>
            <p className="font-bold">${format.price}</p>
          </button>
        ))}
      </div>
    </div>
  );
}