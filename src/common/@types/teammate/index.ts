export type Teammate = {
  id: string;
  type: TeammateType;
  name: string;
  dataStart: string;
  img: string;
  linkReviews: string;
  linkAppointment: string;
};

export enum TeammateType {
  juniorBarber = "Молодший баребер",
  barber = "Барбер",
  seniorBarber = "Cтарший барбер",
}
export enum ModeTeamContainer {
  SHOW = "show",
  UPDATE = "update",
}

export interface ITeammateCardProps {
  mode: ModeTeamContainer;
  teammate: Teammate;
}
export interface ITeamsContainerProps {
  mode: ModeTeamContainer;
}
export interface ICreateNewTeammateProps {}

export interface IModalUpdateTeammateProps {
  isModalOpen: boolean;
  setIsModalOpen: any;
  teammate: Teammate;
}
