export default interface Teacher {
    id: number;
    name: string;
  }
  
  export type cardInfoProps = {
    id: number;
    title: string;
    faculty: string;
    description: string;
    features: string[];
    available: boolean;
    image: string;
  };