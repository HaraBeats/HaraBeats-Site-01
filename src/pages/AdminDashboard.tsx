import { useState } from 'react';
import { Upload, Save, Plus, Trash2 } from 'lucide-react';
import type { Beat, BeatFormat } from '../types';

interface FileUpload {
  type: BeatFormat['type'];
  quality?: string;
  file: File;
}

export default function AdminDashboard() {
  const [beats, setBeats] = useState<Beat[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [fileUploads, setFileUploads] = useState<FileUpload[]>([]);

  const generateSerialNumber = () => {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 7);
    return `HB-${timestamp}-${random}`.toUpperCase();
  };

  const handleFileAdd = (type: BeatFormat['type'], quality: string = '') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'mp3' ? '.mp3' : 
                   type === 'wav' ? '.wav' : 
                   '.zip';
    
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setFileUploads([...fileUploads, { type, quality, file }]);
      }
    };
    
    input.click();
  };

  const removeFileUpload = (index: number) => {
    setFileUploads(fileUploads.filter((_, i) => i !== index));
  };

  const handleBeatUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const formats: BeatFormat[] = fileUploads.map(upload => ({
      type: upload.type,
      quality: upload.quality,
      price: Number(formData.get(`price_${upload.type}`)) || 0,
      fileUrl: URL.createObjectURL(upload.file)
    }));

    const newBeat: Beat = {
      id: crypto.randomUUID(),
      title: formData.get('title') as string,
      formats,
      imageUrl: URL.createObjectURL(formData.get('image') as File),
      bpm: Number(formData.get('bpm')),
      key: formData.get('key') as string,
      mood: formData.get('mood') as string,
      genre: formData.get('genre') as string,
      uploadDate: new Date().toISOString(),
      serialNumber: generateSerialNumber()
    };

    setBeats([newBeat, ...beats]);
    setIsUploading(false);
    setFileUploads([]);
    form.reset();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-gray-400">Upload and manage your beats</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6 flex items-center">
            <Plus className="w-5 h-5 mr-2" />
            Upload New Beat
          </h2>

          <form onSubmit={handleBeatUpload} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  required
                  className="w-full bg-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Genre</label>
                <input
                  type="text"
                  name="genre"
                  required
                  className="w-full bg-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">BPM</label>
                <input
                  type="number"
                  name="bpm"
                  required
                  className="w-full bg-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Key</label>
                <input
                  type="text"
                  name="key"
                  required
                  className="w-full bg-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Mood</label>
                <input
                  type="text"
                  name="mood"
                  required
                  className="w-full bg-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-4">Audio Files</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleFileAdd('mp3', '320kbps')}
                      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
                    >
                      Add MP3 (320kbps)
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFileAdd('wav')}
                      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
                    >
                      Add WAV
                    </button>
                    <button
                      type="button"
                      onClick={() => handleFileAdd('stems')}
                      className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
                    >
                      Add Stems (ZIP)
                    </button>
                  </div>

                  {fileUploads.map((upload, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 p-3 rounded-md">
                      <div>
                        <p className="font-medium">
                          {upload.type.toUpperCase()}
                          {upload.quality && ` - ${upload.quality}`}
                        </p>
                        <p className="text-sm text-gray-400">{upload.file.name}</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div>
                          <label className="text-sm">Price ($)</label>
                          <input
                            type="number"
                            name={`price_${upload.type}`}
                            step="0.01"
                            required
                            className="w-24 bg-gray-600 rounded-md px-2 py-1"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFileUpload(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Cover Image</label>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  required
                  className="w-full bg-gray-700 rounded-md px-3 py-2 focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isUploading || fileUploads.length === 0}
              className="w-full bg-purple-600 hover:bg-purple-700 py-2 px-4 rounded-md flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploading ? (
                <>
                  <Upload className="w-5 h-5 animate-spin" />
                  <span>Uploading...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Upload Beat</span>
                </>
              )}
            </button>
          </form>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-6">Recent Uploads</h2>
          <div className="space-y-4">
            {beats.length === 0 ? (
              <p className="text-gray-400 text-center py-8">No beats uploaded yet</p>
            ) : (
              beats.map((beat) => (
                <div key={beat.id} className="bg-gray-700 rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{beat.title}</h3>
                      <p className="text-sm text-gray-400">
                        {beat.genre} • {beat.bpm} BPM • {beat.key}
                      </p>
                      <div className="mt-2 space-y-1">
                        {beat.formats.map((format) => (
                          <p key={format.type} className="text-sm">
                            {format.type.toUpperCase()}
                            {format.quality && ` - ${format.quality}`}: ${format.price}
                          </p>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-400">ID: {beat.serialNumber}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}