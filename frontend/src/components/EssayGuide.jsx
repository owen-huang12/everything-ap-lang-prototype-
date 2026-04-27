import { useState } from "react";
import EssayGuideHome from "./EssayGuideHome.jsx";
import EssayGuideContent from "./EssayGuideContent.jsx";

export default function EssayGuide() {
  const [selected, setSelected] = useState(null);

  if (selected) {
    return <EssayGuideContent guide={selected} onBack={() => setSelected(null)} />;
  }

  return <EssayGuideHome onSelect={setSelected} />;
}
