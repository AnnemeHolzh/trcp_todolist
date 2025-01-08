"use client";
import { trpc } from "../_trpc/client";
import { useState } from "react";

export default function TodoList() {
    const getTodos = trpc.getTodos.useQuery();
    const addTodo = trpc.addTodo.useMutation({
        onSettled: () => {
            getTodos.refetch(); //refreshes the data being displayed 
        },
    });
    const [content, setContent] = useState("");

    return (
       <div>
        <div> {JSON.stringify(getTodos.data)} </div>
        <div>
            <label htmlFor="content">Content</label>
            <input 
            type="text" 
            id="content" 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="text-black border rounded-md px-2 py-1"/>
            <button 
            onClick={async () => {
                if (content.length) {
                    addTodo.mutate(content);
                    setContent("");
                }
            }}>
                Add Todo
            </button>
        </div>
       </div>
    );
}
