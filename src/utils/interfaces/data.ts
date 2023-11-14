interface DataValidity {
  loading: boolean;
  hasError: boolean;
  errorMessage: string;
}

export interface UserInterface {
  id: number;
  name: string;
  email: string;
  dateCreated: number;
}

export interface UsersStateInterface extends DataValidity {
  data: UserInterface[];
  reports: ReportInterface[];
}

export interface ReportInterface {
  id: number;
  userId: number;
  title: string;
  content: string;
  dateCreated: number;
}

export interface FilterValue {
  id: number;
  label: string;
}

export interface ReportsStateInterface extends DataValidity {
  data: ReportInterface[];
  filterValues: Array<FilterValue>;
}