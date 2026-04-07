"use client";

import { useQuery } from "@tanstack/react-query";
import { qk } from "@/client/queries/keys";
import { fetchJson } from "@/client/api/jsonutils";

export type Subscriber = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
};

export function useSubscribers() {
    return useQuery({
        queryKey: qk.subscribers,
        queryFn: () => fetchJson<Subscriber[]>("/api/subscribers"),
    });
}
