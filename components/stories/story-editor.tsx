import { Canvas, Image as SkiaImage, Text as SkiaText, useFont, useImage } from "@shopify/react-native-skia";
import { useRef, useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import ViewShot from "react-native-view-shot";

const { width, height } = Dimensions.get("window");

export default function StoryEditor({ image, onClose }: { image: string; onClose: () => void }) {
  const viewShotRef = useRef(null);
  const font = useFont(require("../../assets/font/Inter-VariableFont_opsz,wght.ttf"), 40);
  // Load background image
  const bgImage = useImage(image);

  // Editable elements (texts + emojis)
  const [elements, setElements] = useState<any[]>([
    {
      id: "1",
      type: "text",
      value: "Tap to Edit",
      x: 50,
      y: 50,
      scale: 1,
    },
  ]);

  const addText = () => {
    setElements([
      ...elements,
      {
        id: Date.now().toString(),
        type: "text",
        value: "New Text",
        x: 100,
        y: 100,
        scale: 1,
      },
    ]);
  };

  const addEmoji = () => {
    setElements([
      ...elements,
      {
        id: Date.now().toString(),
        type: "emoji",
        value: "🔥",
        x: 140,
        y: 140,
        scale: 1,
      },
    ]);
  };

  const saveImage = async () => {
    const uri = await viewShotRef.current.capture();
    console.log("Saved final image:", uri);
    onClose(); // close editor
  };

  return (
    <View style={{ position: "absolute", width, height, backgroundColor: "black" }}>
      {/* Top Close Button */}
      <TouchableOpacity
        onPress={onClose}
        style={{ position: "absolute", top: 40, left: 20, zIndex: 20 }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>Close</Text>
      </TouchableOpacity>

      {/* Skia Canvas wrapped in ViewShot to export */}
      <ViewShot ref={viewShotRef} style={{ flex: 1 }} options={{ format: "jpg", quality: 0.9 }}>
        <Canvas style={{ width, height }}>
          {/* Background Image */}
          {bgImage && (
            <SkiaImage image={bgImage} x={0} y={0} width={width} height={height} />
          )}

          {/* Render Elements */}
          {elements.map((el) =>
            el.type === "text" ? (
              <SkiaText
                key={el.id}
                text={el.value}
                x={el.x}
                y={el.y}
                color="white"
                font={font}
              />
            ) : (
              <SkiaText
                key={el.id}
                text={el.value}
                x={el.x}
                y={el.y}
                font={font}
              />
            )
          )}
        </Canvas>
      </ViewShot>

      {/* Bottom Buttons */}
      <View
        style={{
          position: "absolute",
          bottom: 40,
          width,
          flexDirection: "row",
          justifyContent: "space-evenly",
        }}
      >
        <TouchableOpacity onPress={addText}>
          <Text style={{ backgroundColor: "white", padding: 10, borderRadius: 8 }}>Add Text</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={addEmoji}>
          <Text style={{ backgroundColor: "white", padding: 10, borderRadius: 8 }}>Emoji</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={saveImage}>
          <Text style={{ backgroundColor: "white", padding: 10, borderRadius: 8 }}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
