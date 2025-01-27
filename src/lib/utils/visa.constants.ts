export const Visas = {
  O1: 'O-1',
  EB1A: 'EB-1A',
  EB2NIW: 'EB-2-NIW',
  NOT_KNOWN: "I don't know",
};

type VisasType = readonly { label: string; value: string }[];

export function VisasToArray(): VisasType {
  return Object.entries(Visas).map(([key, value]) => ({
    label: value,
    value: key,
  }));
}
