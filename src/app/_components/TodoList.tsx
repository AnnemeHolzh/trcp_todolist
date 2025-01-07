"use client";
import { trpc } from "../_trpc/client";

export default function TodoList() {
    const getTodos = trpc.getTodos.useQuery();

    return (
        <div>
            <h1>Todo List</h1>
            <div>{JSON.stringify(getTodos.data)}</div>
        </div>
    );
}
