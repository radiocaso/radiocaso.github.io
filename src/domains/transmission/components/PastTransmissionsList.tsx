import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { usePastTransmissions } from "@/domains/transmission/hooks/usePastTransmissions";
import formatDate from "@/utils/formatDate";
import { PlayIcon } from "@phosphor-icons/react";

//HACK: que esto este dos veces es raro
interface CurrentAudio {
  title: string;
  artist: string;
  url: string;
  album?: string;
}

type Props = {
  onPlay: (arg0: CurrentAudio) => void;
};

export default function PastTransmissionsList({ onPlay }: Props) {
  const { data: transmissions, isLoading } = usePastTransmissions();

  if (isLoading) return null;

  console.log(transmissions?.filter((t) => t.archiveId));

  return (
    <ul className="flex flex-col gap-1">
      {transmissions?.map((t) => (
        <li key={t._id}>
          <div className="flex items-center">
            {t?.date && <div>{formatDate({ date: t.date, short: true })}</div>}
            {t?.title && t?.archiveId ? (
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  // onPlay({
                  //   title: t.title,
                  //   artist: t?.title,
                  //   url: t.url?.url,
                  // })

                  onPlay(console.log(t.archiveId))
                }
              >
                <PlayIcon />
              </Button>
            ) : (
              <div className="px-2 opacity-10">
                <PlayIcon />
              </div>
            )}
            <div>{t.title}</div>

            <div className="ml-auto flex gap-1 lowercase">
              {t.transmissionType?.map((tt) => (
                <Badge variant="secondary" key={tt._id}>
                  {tt.label}
                </Badge>
              ))}
            </div>
          </div>
          <Separator />
        </li>
      ))}
    </ul>
  );
}
