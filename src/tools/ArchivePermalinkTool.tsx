import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

type ArchiveFile = {
  name: string;
  format: string;
  track?: string;
};

export default function ArchivePermalinkTool() {
  const [identifier, setIdentifier] = useState("");
  const [metadata, setMetadata] = useState(null);
  const [files, setFiles] = useState<ArchiveFile[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    if (!identifier) return;

    try {
      setLoading(true);

      const res = await fetch(`https://archive.org/metadata/${identifier}`);

      const json = await res.json();

      setMetadata(json);
      setFiles(json.files ?? []);
    } catch (err) {
      console.error(err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  }

  function buildPermalink(fileName: string) {
    return `https://archive.org/download/${identifier}/${encodeURIComponent(
      fileName,
    )}`;
  }

  const mp3Files = files
    .filter((file) => file.name.toLowerCase().endsWith(".mp3"))
    .map((file) => ({
      name: file.name,
      permalink: buildPermalink(file.name),
      track: file.track,
    }));

  return (
    <div className="flex flex-col gap-2">
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2">
        <input
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          type="text"
          className="border px-2"
        />
        <Button type="submit" className="cursor-pointer">
          Buscar ID
        </Button>
      </form>

      {loading && <p>Cargando...</p>}

      {mp3Files?.length > 0 ? (
        <div className="mb-12">
          {mp3Files.map((i) => (
            <div key={i.name} className="mb-6 flex flex-col items-start gap-1">
              <div>track: {i.track ?? "?"}</div>
              <div>name: {i.name}</div>
              <div className="bg-foreground text-background self-start p-2">
                {i.permalink}
              </div>
              <a href={i.permalink} target="_blank">
                <Button variant="link" className="cursor-pointer">
                  probar link
                </Button>
              </a>
              <Separator />
            </div>
          ))}
        </div>
      ) : (
        <div>...</div>
      )}
      {metadata && (
        <>
          <h2>metadata:</h2>
          <pre className="max-h-96 overflow-auto border text-xs">
            {JSON.stringify(metadata, null, 2)}
          </pre>
        </>
      )}
    </div>
  );
}
