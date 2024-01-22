import { AxiosResponse } from "axios"
import { MouseEventHandler } from "react"

export default interface Teacher {
    id: number;
    name: string;
  }
  

  export interface teacherData {
    id: number
    title: string
    faculty: string
    description: string
    features: string[]
    available: boolean
    image: string
  }


  export type cardInfoProps = {
    id: number;
    title: string;
    faculty: string;
    description: string;
    features: string[];
    available: boolean;
    image: string;
    onAddClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  };

  export type cartItemProps = {
    id: number
    title: string
    faculty: string
    description: string
    features: string[]
    available: boolean
    image: string
    amount: number
    updateAllow: boolean
    onDelete: (id: number) => void
    onAmountUpdate: (id: number, action: number) => void
  }
  
  export type Response = Promise<AxiosResponse> | any
  interface Customer {
    email: string
  }
  
  export type applicationData = {
    id: number
    status: number
    audience: string
    day_lesson: number
    time_lesson: number
    created_at: string
    formed_at: string
    completed_at: string
    moderator: string
    customer: Customer
  }

  export interface Dates {
    start_date: string
    end_date: string
  }
  