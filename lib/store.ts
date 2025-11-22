import { create } from "zustand";

interface Block {
  id: string;
  props: Record<string, any>;
  [key: string]: any;
}

interface Store {
  blocks: Block[];
  add: (b: Block) => void;
  update: (id: string, props: Record<string, any>) => void;
  saveToBackend: () => Promise<any>;
}

export const useBuilder = create<Store>((set, get) => ({
  blocks: [],
  add: (b) => set({ blocks: [...get().blocks, b] }),
  update: (id, props) =>
    set({
      blocks: get().blocks.map((b) =>
        b.id === id ? { ...b, props: { ...b.props, ...props } } : b
      ),
    }),
  saveToBackend: async () => {
    const res = await fetch("/api/blocks", {
      method: "POST",
      body: JSON.stringify(get().blocks),
    });
    return res.json();
  },
}));
