import { useRef } from 'react';
import { IconUpload } from './icons';

interface UploadEvidenceProps {
  onAdd: (file: { name: string; sizeLabel: string }) => void;
}

// UI/state scaffold only. Real document parsing/ingestion is connected later.
export default function UploadEvidence({ onAdd }: UploadEvidenceProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    for (const f of files) {
      const sizeLabel = f.size ? `${(f.size / 1024).toFixed(0)} KB` : 'uploaded';
      onAdd({ name: f.name, sizeLabel });
    }
    if (inputRef.current) inputRef.current.value = '';
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="btn-ghost w-full justify-center border-dashed border-white/15 hover:border-alpha-accent/50"
      >
        <IconUpload size={16} /> Add Evidence
      </button>
      <input
        ref={inputRef}
        type="file"
        multiple
        accept=".pdf,.docx,.txt,image/*"
        className="hidden"
        onChange={handleFiles}
      />
      <p className="mt-2 text-center text-[11px] text-alpha-faint">
        Accepted: PDF · DOCX · TXT · Images
      </p>
    </div>
  );
}
