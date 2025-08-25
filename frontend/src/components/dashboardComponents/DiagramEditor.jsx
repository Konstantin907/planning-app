import { useRef } from 'react'
import { Excalidraw } from "@excalidraw/excalidraw";
import api from '../../api';

const DiagramEditor = () => {

    const excalidrawRef = useRef(null);

    // TODO api/diagram/save
  const handleSaveDiagram = async () => {
    const sceneData = await excalidrawRef.current.getSceneElements();
    const appState = await excalidrawRef.current.getAppState();

    const payload = {
      name: "diagram_" + Date.now(),
      scene: {
        elements: sceneData,
        appState,
      },
    };

    try {
      const res = await api.post('/diagram/save', payload);
      console.log("Saved:", res.data);
    } catch (err) {
      console.error("Error saving diagram:", err);
    }
  };

  return (
    <div className="h-screen w-full bg-[#0f0f0f] text-white p-4 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2 text-xl font-bold tracking-wide">
          🧠 Drawing Board
        </div>
        <span className="text-sm text-gray-400">
          Tip: Use spacebar or middle click to move canvas
        </span>
      </div>

      {/* Canvas */}
      <div className="flex-1 border border-neutral-700 rounded-xl overflow-hidden shadow-lg">
        <Excalidraw
          ref={excalidrawRef}
          theme="dark"
          UIOptions={{
            canvasActions: {
              loadScene: true,
              saveFileToDisk: true,
              saveAsImage: true,
              export: { saveFileToDisk: true },
              changeViewBackgroundColor: true,
              clearCanvas: true,
            },
          }}
        />
      </div>
    </div>
  );
}

export default DiagramEditor
