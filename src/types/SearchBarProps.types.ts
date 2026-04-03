export interface SearchBarProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  onSearch: (e: React.SyntheticEvent) => void;
  loading: boolean;
}
