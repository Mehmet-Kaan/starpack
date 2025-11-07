export type AuthContextType = {
  currentUser: {
    uid: string;
    displayName: string;
    // add other properties if needed
    [key: string]: any;
  } | null;
};

//********* Orders *********
export interface OrderProps {
  id: string;
  name: string;
  date: string;
  orderID: string;
  content: {
    id: string;
    name: string;
    price: string;
    qty: number;
    image?: string;
  }[];
}

export interface ProductType {
  id: string;
  name: string;
  description: string;
  price: string;
  cost: string;
  group: string;
  image: string;
  originalName: string;
}
export interface ProductOnBackend {
  Name: string;
  Description: string;
  price: string;
  cost: string;
  group: string;
  image: string;
  originalName: string;
}
