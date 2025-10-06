import { yamaha } from "@/api/client/yamaha";

export const useRooms = () => yamaha.useGetRooms({}, { refetchInterval: 5000 });
