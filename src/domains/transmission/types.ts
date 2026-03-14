type Tag = {
  id: string;
  label: string;
};

type TransmissionType = {
  id: string;
  label: string;
};

export interface Transmission {
  id: string;
  title: string;
  slug: string;
  date: Date;
  audioUrl: string | null;
  tags: Tag[] | null;
  info: string | null;
  transmissionTypes: TransmissionType[] | null;
}
