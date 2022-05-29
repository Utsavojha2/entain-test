export interface IUserRequestResponse {
  id: string;
  username: string;
}

export interface IOnlineClientPayload {
  id: string;
  clientName: string;
}

export interface INoteItemPayload {
  id: string;
  username: string;
  text: string;
  userId: string;
  timestamp: number;
}

export enum URL {
  editIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Edit_icon_%28the_Noun_Project_30184%29.svg/1024px-Edit_icon_%28the_Noun_Project_30184%29.svg.png'
}