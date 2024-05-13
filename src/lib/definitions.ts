export type Country = {
  name: CountryName;
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: "user-asigned" | "officially-assigned";
  unMember: boolean;
  currencies: Currencies;
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: Languages;
  translations: Translations;
  latlng: [number, number];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: Demonyms;
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  gini: Record<string | number, number>;
  fifa: string;
  car: {
    signs: string[];
    side: "right" | "left";
  };
  timezones: string[];
  continents: Continent[];
  flags: {
    png: string;
    svg: string;
    alt: string;
  };
  coatOfArms: {
    png: string;
    svg: string;
  };
  capitalInfo: {
    latlng: [number, number];
  };
  startOfWeek: "monday" | "sunday" | "saturday";
  postalCode?: {
    format: string;
    regex: string;
  };
};

export type CountryName = {
  common: string;
  official: string;
  nativeName: Record<
    string,
    {
      official: string;
      common: string;
    }
  >;
};

export type Currencies = Record<
  string,
  {
    name: string;
    symbol: string;
  }
>;

export type Languages = Record<string, string>;

export type Translations = Record<
  string,
  {
    official: string;
    common: string;
  }
>;

export type Demonyms = Record<
  string,
  {
    f: string;
    m: string;
  }
>;

export type Continent =
  | "Africa"
  | "Europe"
  | "Asia"
  | "North America"
  | "South America"
  | "Oceania"
  | "Antarctica";
